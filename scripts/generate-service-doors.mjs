/**
 * The four Smarto service doors on the homepage (Cabs, Flights, Packages,
 * Hotels) as glossy 3D objects in the service-icon style. Each renders on
 * the mist tone of the card it sits on (#eef0f4), so nothing is keyed out
 * and the brand's purples and greens stay intact. The cab is edited from
 * the smartocabs.com Tata Tigor EV reference photos so it is the real car.
 * No airline, hotel or other third-party branding appears anywhere.
 *
 *   node scripts/generate-service-doors.mjs [id ...] [--from-cache]
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const RAW = path.join(ROOT, 'scripts', '.image-cache')
const REFS = ['ref-front.png', 'ref-fleet.png'].map((f) => path.join(RAW, 'ref', f))

const STYLE = [
  'Rendered as a single centred object in the style of a premium mobile-app category icon or modern 3D emoji:',
  'smooth rounded forms, realistic glossy materials with soft highlights, soft even studio lighting,',
  'gentle ambient occlusion and a soft subtle contact shadow directly beneath.',
  'Palette of white, deep navy (#282560), violet (#7b3f7e) and fresh green (#75b884) accents.',
  'The object fills about 70% of the frame with generous margins.',
  'The entire background is one solid flat uniform very light cool grey (#eef0f4) with nothing else in it.',
].join(' ')

const DOORS = [
  {
    id: 'door-cabs',
    edit: true,
    prompt:
      'A glossy 3D collectible-toy miniature of the exact car in the reference photos: the white Tata Tigor EV taxi with its teal grille accent, a pale lilac front-door panel carrying the Smarto wordmark and a deep purple rear-door panel. Three-quarter front view, cheerful and premium. The only lettering is the Smarto wordmark on the door; plates are plain with no characters.',
  },
  {
    id: 'door-flights',
    prompt:
      'A glossy 3D friendly passenger jet, white with a deep navy underside and a violet tail fin, banking gently upward to the right, with a small white boarding-pass ticket floating beside its wing. No logos, no text, no airline markings.',
  },
  {
    id: 'door-packages',
    edit: true,
    prompt:
      'A glossy 3D open gift box, deep navy with a violet satin ribbon and bow, its lid tilted open, with a whole tiny holiday rising out of it as one bundle: two rounded green hills, a small white waterfall, a few rounded pine trees, a little white cottage with a lit window, and a winding road carrying a tiny white Tata Tigor EV taxi in the Smarto livery from the reference photos. A small cloud floats above. Joyful, premium, clearly a travel package. No text or labels anywhere.',
  },
  {
    id: 'door-hotels',
    prompt:
      'A glossy 3D little boutique hill hotel: a two-storey white cottage with a deep navy pitched roof, warmly lit windows, a small wooden balcony and a tiny violet door, sitting on a rounded grassy mound among a few rounded pine trees. No signs, no text.',
  },
]

async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
  const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8')
  const line = raw.split('\n').find((l) => l.startsWith('OPENAI_API_KEY='))
  if (!line) throw new Error('OPENAI_API_KEY not found in env or .env.local')
  return line.slice('OPENAI_API_KEY='.length).trim()
}

async function render(apiKey, door, refs) {
  const prompt = `${door.prompt} ${STYLE}`
  let res
  if (door.edit) {
    const form = new FormData()
    form.append('model', 'gpt-image-2')
    form.append('prompt', prompt)
    form.append('size', '1024x1024')
    form.append('quality', 'high')
    form.append('n', '1')
    refs.forEach((buf, i) =>
      form.append('image[]', new Blob([buf], { type: 'image/png' }), `ref-${i}.png`),
    )
    res = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(15 * 60 * 1000),
      body: form,
    })
  } else {
    res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15 * 60 * 1000),
      body: JSON.stringify({
        model: 'gpt-image-2',
        prompt,
        size: '1024x1024',
        quality: 'high',
        output_format: 'png',
        n: 1,
      }),
    })
  }
  if (!res.ok) throw new Error(`${door.id}: ${res.status} ${(await res.text()).slice(0, 300)}`)
  const b64 = (await res.json())?.data?.[0]?.b64_json
  if (!b64) throw new Error(`${door.id}: no image data`)

  const png = Buffer.from(b64, 'base64')
  await writeFile(path.join(RAW, `${door.id}-raw.png`), png)
  await tighten(door.id, png)
}

/*
 * Crops a render to its object plus a little air, centred on a 4:3 canvas
 * of the render's own background tone, so every tile frames its object the
 * same way. Writes public/images/service-<name>.webp (new names: the
 * earlier door-*.webp files are already cached immutably).
 */
async function tighten(id, png) {
  const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true })
  const [r, g, b] = [data[0], data[1], data[2]]
  const trimmed = await sharp(png)
    .trim({ background: { r, g, b }, threshold: 14 })
    .toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = trimmed.info
  const pad = Math.round(Math.max(w, h) * 0.07)
  let W = w + pad * 2
  let H = h + pad * 2
  if (W / H > 4 / 3) H = Math.round((W * 3) / 4)
  else W = Math.round((H * 4) / 3)
  const out = await sharp(trimmed.data)
    .extend({
      top: Math.floor((H - h) / 2),
      bottom: Math.ceil((H - h) / 2),
      left: Math.floor((W - w) / 2),
      right: Math.ceil((W - w) / 2),
      background: { r, g, b },
    })
    .resize({ width: 640 })
    .webp({ quality: 84, effort: 6 })
    .toBuffer()
  const name = id.replace(/^door-/, 'service-')
  await writeFile(path.join(ROOT, 'public', 'images', `${name}.webp`), out)
  console.log(`${name}: ${(out.length / 1024).toFixed(0)}kb (from ${info.width}px, object ${w}x${h})`)
}

async function main() {
  await mkdir(RAW, { recursive: true })
  const args = process.argv.slice(2)
  const only = args.filter((a) => !a.startsWith('--'))
  const queue = only.length ? DOORS.filter((d) => only.includes(d.id)) : DOORS
  // --from-cache re-crops the saved raw renders without calling the API.
  if (args.includes('--from-cache')) {
    for (const d of queue) await tighten(d.id, await readFile(path.join(RAW, `${d.id}-raw.png`)))
    return
  }
  const apiKey = await loadKey()
  const refs = await Promise.all(REFS.map((f) => readFile(f)))
  const results = await Promise.allSettled(queue.map((d) => render(apiKey, d, refs)))
  results.filter((r) => r.status === 'rejected').forEach((r) => console.error(String(r.reason)))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
