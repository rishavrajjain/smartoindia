/**
 * The /cabs fleet rail: one picture per vehicle Smarto runs, all in the same
 * setting and angle so the rail reads as a lineup.
 *
 * The Tigor EV uses the image edit endpoint with the cropped reference photos
 * from smartocabs.com (scripts/.image-cache/ref/, not committed), so the car
 * and its Smarto livery stay faithful. The other vehicles are plain white
 * with badges and lettering left off: Smarto's livery on them is not known.
 * Plates carry no characters. No people.
 *
 * Files are new names (fleet-lineup-*): /images is cached immutably.
 *
 *   node scripts/generate-fleet-lineup.mjs [id ...]
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

// Same description as generate-fleet-scenes.mjs. Copied, not imported:
// importing that script would run its generator.
const CAR = [
  'The car is the exact vehicle in the reference photos: a white Tata Tigor EV compact sedan',
  'with its thin teal-blue accent line along the lower grille and headlamps, small EV badges,',
  'and Smarto livery: the Smarto wordmark decal across the bonnet, a pale lilac-white panel on',
  'the front door carrying the Smarto wordmark, and a deep purple-to-violet gradient panel on',
  'the rear door. No roof sign. Keep all lettering to the Smarto wordmark only: no phone numbers,',
  'prices, QR codes or other words. Number plates are plain green with no characters.',
].join(' ')

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const RAW = path.join(ROOT, 'scripts', '.image-cache')
const REFS = ['ref-front.png', 'ref-fleet.png'].map((f) => path.join(RAW, 'ref', f))

const SETTING = [
  'Parked on a clean paved lay-by beside a quiet hill road in Meghalaya, seen from the front three-quarter view,',
  'the vehicle centred and filling about two thirds of the frame width with calm space around it.',
  'Soft bright morning light under a thin high overcast, pine-covered ridges and drifting mist softly out of focus behind,',
  'a low stone parapet at the road edge, the paving freshly damp.',
].join(' ')

const STYLE = [
  'Editorial automotive photography, natural light, grounded realistic colours, crisp clean paintwork with soft reflections,',
  'shot on a full-frame camera with a 50mm lens, gentle depth of field, no oversaturation.',
  'No people. No readable text, signs or logos anywhere in the picture.',
].join(' ')

const PLAIN = [
  'Glossy white paint, spotless.',
  'Manufacturer badges and logos are smoothed away and there is no lettering, decal or sticker anywhere on the vehicle.',
  'The number plate is blank with no characters. Accurate real-world proportions, wheels and lights.',
].join(' ')

const VEHICLES = [
  { id: 'fleet-lineup-tigor-ev', ref: true, subject: CAR },
  {
    id: 'fleet-lineup-dzire',
    subject: 'The vehicle is a white Maruti Suzuki Dzire, a compact four-door Indian sedan with a short boot.',
  },
  {
    id: 'fleet-lineup-ertiga',
    subject: 'The vehicle is a white Maruti Suzuki Ertiga, a compact seven-seat Indian MPV with three rows of windows.',
  },
  {
    id: 'fleet-lineup-innova-crysta',
    subject: 'The vehicle is a white Toyota Innova Crysta, a large premium seven-seat MPV with a tall bonnet and chrome-edged grille.',
  },
  {
    id: 'fleet-lineup-traveller',
    subject: 'The vehicle is a white Force Traveller, the classic Indian high-roof passenger minibus known as a tempo traveller, with a row of large side windows and a sliding side door.',
  },
  {
    id: 'fleet-lineup-urbania',
    subject: 'The vehicle is a white Force Urbania, a modern premium Indian passenger van with a sleek sloping nose, flush panoramic side windows and a long wheelbase.',
  },
]

async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
  const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8')
  const line = raw.split('\n').find((l) => l.startsWith('OPENAI_API_KEY='))
  if (!line) throw new Error('OPENAI_API_KEY not found in env or .env.local')
  return line.slice('OPENAI_API_KEY='.length).trim()
}

async function request(apiKey, vehicle, refs) {
  const prompt = `${vehicle.subject} ${vehicle.ref ? '' : PLAIN} ${SETTING} ${STYLE}`
  const timeout = AbortSignal.timeout(15 * 60 * 1000)
  if (vehicle.ref) {
    const form = new FormData()
    form.append('model', 'gpt-image-2')
    form.append('prompt', prompt)
    form.append('size', '1536x1024')
    form.append('quality', 'high')
    form.append('n', '1')
    refs.forEach((buf, i) =>
      form.append('image[]', new Blob([buf], { type: 'image/png' }), `ref-${i}.png`),
    )
    return fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: timeout,
      body: form,
    })
  }
  return fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    signal: timeout,
    body: JSON.stringify({ model: 'gpt-image-2', prompt, size: '1536x1024', quality: 'high', n: 1 }),
  })
}

async function generate(apiKey, vehicle, refs) {
  const res = await request(apiKey, vehicle, refs)
  if (!res.ok) throw new Error(`${vehicle.id}: ${res.status} ${(await res.text()).slice(0, 300)}`)
  const b64 = (await res.json())?.data?.[0]?.b64_json
  if (!b64) throw new Error(`${vehicle.id}: no image data`)
  const png = Buffer.from(b64, 'base64')
  await writeFile(path.join(RAW, `${vehicle.id}-raw.png`), png)
  const out = await sharp(png).resize({ width: 1200 }).webp({ quality: 78, effort: 6 }).toBuffer()
  await writeFile(path.join(ROOT, 'public', 'images', `${vehicle.id}.webp`), out)
  console.log(`${vehicle.id}: ${(out.length / 1024).toFixed(0)}kb`)
}

async function main() {
  await mkdir(RAW, { recursive: true })
  const apiKey = await loadKey()
  const refs = await Promise.all(REFS.map((f) => readFile(f)))
  const only = process.argv.slice(2)
  const queue = only.length ? VEHICLES.filter((v) => only.includes(v.id)) : VEHICLES
  const results = await Promise.allSettled(queue.map((v) => generate(apiKey, v, refs)))
  results.filter((r) => r.status === 'rejected').forEach((r) => console.error(String(r.reason)))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
