/**
 * Filenames are new (fleet-*) because /images is cached immutably: never
 * overwrite a published file, give changed content a new name.
 *
 * Regenerates every car scene with Smarto's real vehicle: the white Tata
 * Tigor EV in Smarto livery. Earlier generations drifted into generic
 * premium EVs (several read as Teslas), which Smarto does not run.
 *
 * Uses the image edit endpoint with two cropped reference photos from
 * smartocabs.com (scripts/.image-cache/ref/, not committed), so the body
 * shape, teal grille accent and door wrap stay faithful. Lettering is held
 * to the Smarto wordmark: no phone numbers, prices, QR codes or plates.
 * People appear only distant or from behind, never as drivers or staff.
 *
 *   node scripts/generate-fleet-scenes.mjs [id ...]
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const RAW = path.join(ROOT, 'scripts', '.image-cache')
const REFS = ['ref-front.png', 'ref-fleet.png'].map((f) =>
  path.join(RAW, 'ref', f),
)

export const CAR = [
  'The car is the exact vehicle in the reference photos: a white Tata Tigor EV compact sedan',
  'with its thin teal-blue accent line along the lower grille and headlamps, small EV badges,',
  'and Smarto livery: the Smarto wordmark decal across the bonnet, a pale lilac-white panel on',
  'the front door carrying the Smarto wordmark, and a deep purple-to-violet gradient panel on',
  'the rear door. No roof sign. Keep all lettering to the Smarto wordmark only: no phone numbers,',
  'prices, QR codes or other words. Number plates are plain green with no characters.',
].join(' ')

const STYLE = [
  'Editorial travel photography, natural light, grounded realistic colours,',
  'believable Northeast Indian setting, shot on a full-frame camera with a 35mm lens,',
  'gentle depth of field, no oversaturation, no readable signage or text anywhere except the Smarto wordmark on the car.',
].join(' ')

const SCENES = [
  {
    id: 'fleet-cabs-hero',
    prompt:
      'The car parked at a scenic pull-off on a winding hill road in Meghalaya, rear door open, a small stack of travel bags beside it, morning mist lifting off green ridges behind, dew on the tarmac, fresh soft light. Seen from the front three-quarter. No people.',
  },
  {
    id: 'fleet-cabs-city',
    prompt:
      'The car driving down a leafy avenue in Guwahati in early morning: wet asphalt reflecting soft light, old trees arching overhead, a few distant pedestrians seen from behind, calm city mood.',
  },
  {
    id: 'fleet-cabs-railway',
    prompt:
      'The forecourt of an Indian railway station at golden hour: the car waiting at the kerb with its boot open, a trolley of luggage beside it, the station building warm and softly out of focus behind with no readable signs, one traveller seen from behind walking toward the car.',
  },
  {
    id: 'fleet-cabs-airport',
    prompt:
      'The departures kerb of a small modern Indian airport at dawn: the car at the drop-off, a suitcase on the kerb beside it, the glass terminal glowing warmly, hills faint in the distance, quiet early light. No people.',
  },
  {
    id: 'fleet-cabs-hourly',
    prompt:
      'The car parked at a tea-garden viewpoint in Assam, seen from the front three-quarter with all doors closed, rows of tea bushes rolling away under tall shade trees, warm late-morning light. No people.',
  },
  {
    id: 'fleet-corporate-charging',
    prompt:
      'A neat row of five identical copies of the car charging at sleek charging posts in an office campus car park at dusk, charge-port lights glowing green, a modern glass building softly lit behind, clean calm mood. No people.',
  },
  {
    id: 'fleet-events-conference',
    prompt:
      'The covered drive of a modern Indian convention centre in the evening: a line of four identical copies of the car queued along the drive, glass facade glowing, soft blue dusk sky, lanterns along the walkway. No people.',
  },
  {
    id: 'fleet-corporate-porch',
    prompt:
      'Two copies of the car arriving under the glass porch of a modern office building on a bright morning, one in front at three-quarter view and one behind, polished stone paving, planters and trees, calm corporate mood. No people.',
  },
  {
    id: 'fleet-events-wedding',
    prompt:
      'An Indian wedding venue at dusk: a convoy of five identical copies of the car lined up on the drive beneath a tall ornate gateway draped in marigold garlands and warm fairy lights, palm trees and a lit marquee beyond, festive but calm. No people.',
  },
  {
    id: 'fleet-partners-hotel',
    prompt:
      'The columned porch of a heritage hill hotel in Shillong in warm morning light: the car parked at the entrance seen from the front three-quarter, a brass luggage trolley with suitcases beside it, pine-covered hills behind. No people.',
  },
  {
    id: 'fleet-hero-clouds',
    prompt:
      'The car driving along a ridge road high above a sea of low morning cloud in the Meghalaya hills, first sunlight on green grassy slopes, the road curving in from the lower left, wide cinematic composition with calm open sky across the upper half. No people visible.',
  },
  {
    id: 'fleet-hero-passes',
    prompt:
      'The car rounding a bend on a high mountain road in western Arunachal Pradesh beneath strings of faded prayer flags, snow-dusted peaks far behind, crisp clear blue sky, dry alpine grass and rock, the car small in a wide composition with calm sky across the upper half. No people visible.',
  },
  {
    id: 'fleet-hero-tea',
    prompt:
      'The car parked on a narrow estate road through an Assam tea garden at sunrise, neat rows of tea bushes rolling toward tall shade trees, soft ground mist, warm low sun, wide composition with a calm hazy sky across the upper half. No people visible.',
  },
]

async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
  const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8')
  const line = raw.split('\n').find((l) => l.startsWith('OPENAI_API_KEY='))
  if (!line) throw new Error('OPENAI_API_KEY not found in env or .env.local')
  return line.slice('OPENAI_API_KEY='.length).trim()
}

async function edit(apiKey, scene, refs) {
  const form = new FormData()
  form.append('model', 'gpt-image-2')
  form.append('prompt', `${scene.prompt} ${CAR} ${STYLE}`)
  form.append('size', '1536x1024')
  form.append('quality', 'high')
  form.append('n', '1')
  refs.forEach((buf, i) =>
    form.append('image[]', new Blob([buf], { type: 'image/png' }), `ref-${i}.png`),
  )

  const res = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    signal: AbortSignal.timeout(15 * 60 * 1000),
    body: form,
  })
  if (!res.ok)
    throw new Error(`${scene.id}: ${res.status} ${(await res.text()).slice(0, 300)}`)
  const b64 = (await res.json())?.data?.[0]?.b64_json
  if (!b64) throw new Error(`${scene.id}: no image data`)

  const png = Buffer.from(b64, 'base64')
  await writeFile(path.join(RAW, `${scene.id}-tigor-raw.png`), png)
  const out = await sharp(png).webp({ quality: 78, effort: 6 }).toBuffer()
  await writeFile(path.join(ROOT, 'public', 'images', `${scene.id}.webp`), out)
  console.log(`${scene.id}: ${(out.length / 1024).toFixed(0)}kb`)
}

async function main() {
  await mkdir(RAW, { recursive: true })
  const apiKey = await loadKey()
  const refs = await Promise.all(REFS.map((f) => readFile(f)))
  const only = process.argv.slice(2)
  const queue = only.length ? SCENES.filter((s) => only.includes(s.id)) : SCENES
  for (let i = 0; i < queue.length; i += 4) {
    const results = await Promise.allSettled(
      queue.slice(i, i + 4).map((s) => edit(apiKey, s, refs)),
    )
    results
      .filter((r) => r.status === 'rejected')
      .forEach((r) => console.error(String(r.reason)))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
