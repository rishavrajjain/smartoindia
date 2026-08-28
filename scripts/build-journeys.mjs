/**
 * Merges the transcribed catalog JSON (scratchpad trips-*.json) into the
 * typed journey data at src/data/journeys.ts. Deterministic and re-runnable:
 * when Manav ships a new PDF, re-transcribe and re-run.
 *
 *   node scripts/build-journeys.mjs <dir-with-trips-json>
 *
 * Hero images are assigned by the journey's dominant destination, drawn from
 * the generated destination pool (public/images/dest-*.webp) and the existing
 * pkg-* set. Alt text is templated per destination.
 */

import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')

/**
 * Ordered rules, most specific first. Matching runs in two passes — first
 * against "title + tags" (the journey's own identity), then against the route
 * interior + states — so a trip that merely passes through Kaziranga doesn't
 * wear Kaziranga's photo. Guwahati is excluded from route matching entirely
 * (every journey starts there); only the Ambubachi title reaches its image.
 */
const IMAGE_RULES = [
  { re: /torgya|winter/, img: 'dest-tawang-winter', alt: 'A whitewashed Buddhist monastery with golden roofs on a snow-dusted Himalayan ridge' },
  { re: /ambubachi/, img: 'dest-guwahati', alt: 'Ferries on the Brahmaputra at Guwahati as the sun sets' },
  { re: /ziro|apatani/, img: 'dest-ziro', alt: 'Green rice paddies and pine groves across the Ziro valley' },
  { re: /root bridge|nongriat|living root|mawlynnong|rain and root/, img: 'pkg-meghalaya-root-bridge', alt: 'A living root bridge woven across a forest stream in Meghalaya' },
  { re: /dawki|shnongpdeng|crystal/, img: 'dest-dawki', alt: 'Wooden boats on the transparent green water of the Dawki river' },
  { re: /majuli|brahmaputra|river/, img: 'dest-majuli', alt: 'The braided sandbars of the Brahmaputra at golden hour' },
  { re: /nameri|wild frontier|frontier|eastern/, img: 'dest-nameri', alt: 'Morning mist over a calm forest river at the edge of Nameri' },
  { re: /tea/, img: 'pkg-assam-tea', alt: 'Rows of tea bushes under shade trees on an Assam estate' },
  { re: /umiam|lakes/, img: 'dest-umiam', alt: 'The blue-green water of Umiam lake among pine-covered hills' },
  { re: /kaziranga|rhino|wildlife|safari/, img: 'pkg-assam-kaziranga', alt: 'A one-horned rhinoceros grazing in the tall grass of Kaziranga' },
  { re: /honeymoon|romance|for two/, img: 'dest-honeymoon', alt: 'A lamplit mountain cottage at dusk among pines and misty ridges' },
  { re: /tawang|monaster/, img: 'pkg-arunachal-tawang', alt: 'A Buddhist monastery complex high in the Arunachal mountains' },
  { re: /sela|dirang|bomdila|high altitude|passes|mountain/, img: 'dest-sela', alt: 'Prayer flags over a turquoise lake at a high Himalayan pass' },
  { re: /family/, img: 'pkg-meghalaya-family', alt: 'A quiet viewpoint over the green canyons of Meghalaya' },
  { re: /cherrapunjee|waterfall|caves|canopies|cloud/, img: 'pkg-meghalaya-waterfalls', alt: 'A waterfall plunging off the Cherrapunjee plateau into a green gorge' },
  { re: /shillong|weekender|city break|meghalaya/, img: 'dest-shillong', alt: 'Tin-roofed cottages among the pines of Shillong in morning mist' },
  { re: /arunachal/, img: 'dest-sela', alt: 'Prayer flags over a turquoise lake at a high Himalayan pass' },
  { re: /assam/, img: 'pkg-assam-tea', alt: 'Rows of tea bushes under shade trees on an Assam estate' },
]
const FALLBACK = { img: 'dest-shillong', alt: 'Tin-roofed cottages among the pines of Shillong in morning mist' }

const LENGTHS = ['Short escape', 'Mid-length', 'Extended']

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

function pickImage(trip) {
  const identity = `${trip.title} ${trip.tags.join(' ')}`.toLowerCase()
  const terrain = `${trip.route.filter((p) => !/guwahati/i.test(p)).join(' ')} ${trip.states.join(' ')}`.toLowerCase()
  for (const rule of IMAGE_RULES) if (rule.re.test(identity)) return rule
  for (const rule of IMAGE_RULES) if (rule.re.test(terrain)) return rule
  return FALLBACK
}

function normalizeTag(tag) {
  const t = tag.trim().toLowerCase()
  const map = {
    'popular': 'Popular',
    'short escape': 'Short escape',
    'mid-length': 'Mid-length',
    'mid length': 'Mid-length',
    'extended': 'Extended',
    'solo': 'Solo',
    'group departure': 'Group departure',
    'family adventure': 'Family adventure',
    'family': 'Family',
    'wildlife & nature': 'Wildlife & nature',
    'wildlife and nature': 'Wildlife & nature',
    'offbeat': 'Offbeat',
    'festivals': 'Festivals',
    'honeymoon': 'Honeymoon',
    'senior-friendly': 'Senior-friendly',
    'senior friendly': 'Senior-friendly',
    'multi-state': 'Multi-state',
    'meghalaya': 'Meghalaya',
    'assam': 'Assam',
    'arunachal pradesh': 'Arunachal Pradesh',
  }
  return map[t] ?? tag.trim()
}

async function main() {
  const dir = process.argv[2]
  if (!dir) throw new Error('usage: node scripts/build-journeys.mjs <dir-with-trips-json>')

  const files = (await readdir(dir)).filter((f) => /^trips-.*\.json$/.test(f)).sort()
  if (!files.length) throw new Error(`no trips-*.json in ${dir}`)

  const all = []
  for (const f of files) {
    const arr = JSON.parse(await readFile(path.join(dir, f), 'utf8'))
    all.push(...arr)
  }

  // Dedupe by num (agents at range boundaries may overlap), sort by number.
  const byNum = new Map()
  for (const t of all) if (!byNum.has(t.num)) byNum.set(t.num, t)
  const trips = [...byNum.values()].sort((a, b) => Number(a.num) - Number(b.num))

  const seenSlugs = new Set()
  const journeys = trips.map((t) => {
    // Trip 41 prints its route as prose, not an arrow chain.
    if (typeof t.route === 'string') t.route = [t.route]
    const tags = t.tags.map(normalizeTag)
    const length =
      LENGTHS.find((l) => tags.includes(l)) ??
      (t.days <= 4 ? 'Short escape' : t.days <= 7 ? 'Mid-length' : 'Extended')
    // Styles: group chips minus length tiers and plain state names.
    const styles = tags.filter(
      (x) => !LENGTHS.includes(x) && !['Meghalaya', 'Assam', 'Arunachal Pradesh', 'Multi-state'].includes(x),
    )
    let slug = slugify(t.title)
    if (seenSlugs.has(slug)) slug = `${slug}-${t.num}`
    seenSlugs.add(slug)
    const image = pickImage(t)

    return {
      num: t.num,
      slug,
      title: t.title,
      subtitle: t.subtitle,
      styles,
      length,
      multiState: tags.includes('Multi-state'),
      nights: t.nights,
      days: t.days,
      states: t.states,
      pace: t.pace,
      route: t.route,
      vehicle: t.vehicle,
      bestMonths: t.bestMonths,
      idealFor: t.idealFor,
      itinerary: t.itinerary.map((d) => {
        // The PDF's text layer drops the decimal point when a drive value
        // wraps ("Drive: 4" + body starting "5 hours, 190 km. ..."): every
        // drive in the catalog is a single value, so rejoin as "4.5 hours".
        let drive = d.drive ?? null
        let body = d.body
        if (drive && /^\d+$/.test(drive.trim())) {
          const m = body.match(/^(\d+\s*hours?,\s*\d+\s*km)\.?\s*/i)
          if (m) {
            drive = `${drive.trim()}.${m[1]}`
            body = body.slice(m[0].length)
          }
        }
        return {
          day: d.day,
          title: d.title,
          route: d.route ?? null,
          drive,
          body,
          overnight: d.overnight ?? null,
        }
      }),
      stay: t.stay,
      included: t.included,
      notIncluded: t.notIncluded,
      ...(t.permit ? { permit: t.permit } : {}),
      ...(t.altitude ? { altitude: t.altitude } : {}),
      ...(t.routeNote ? { routeNote: t.routeNote } : {}),
      ...(t.groupNote ? { groupNote: t.groupNote } : {}),
      hero: {
        src: `/images/${image.img}.webp`,
        alt: image.alt,
        width: 1536,
        height: 1024,
      },
      enquiry: `Hi Smarto, I would like a quote for the "${t.title}" journey (${t.nights} nights / ${t.days} days).`,
      status: 'verified',
    }
  })

  const header = `/*
 * GENERATED by scripts/build-journeys.mjs — do not edit by hand.
 * Source: Manav's "Smarto Travel — Outstation Packages" PDF (Aug 2026),
 * transcribed page-for-page. ${journeys.length} journeys. Pricing is quoted on
 * enquiry only — the catalog publishes no numbers, and neither do we.
 */

import type { Journey } from "@/types";

export const JOURNEYS: Journey[] = `

  const out = header + JSON.stringify(journeys, null, 2) + ';\n'
  const outPath = path.join(ROOT, 'src', 'data', 'journeys.ts')
  await writeFile(outPath, out)
  console.log(`wrote ${outPath}: ${journeys.length} journeys (${trips.map((t) => t.num).join(', ')})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
