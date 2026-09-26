/**
 * The two cut-out cab sprites, redrawn as Smarto's real Tata Tigor EV:
 *   - `side`   a clean side profile facing right (route bar, chat avatar)
 *   - `orbit`  a glossy 3D miniature in three-quarter view (cab turntable)
 *
 * Rendered on flat chroma green from the smartocabs.com reference photos and
 * keyed out here. The car must carry no green of its own (plates stay plain
 * white), or the key would eat it. Raw and keyed files land in
 * scripts/.image-cache/ for inspection before anything reaches public/.
 *
 *   node scripts/generate-fleet-sprites.mjs [side|orbit]
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

const CAR = [
  'the exact vehicle in the reference photos: a white Tata Tigor EV compact sedan with its thin',
  'teal-blue accent line along the lower grille, and Smarto livery: a pale lilac-white panel on the',
  'front door with the Smarto wordmark in deep navy-purple, and a deep purple-to-violet gradient',
  'panel on the rear door. No roof sign. The only lettering is the Smarto wordmark: no phone numbers,',
  'prices, QR codes, taglines or other words. Number plates are plain white with no characters.',
  'The car contains no green anywhere.',
].join(' ')

const BACKDROP = [
  'No drop shadow and no ground shadow beneath the car.',
  'The entire background is one solid flat uniform chroma-key green (#00b140) filling the whole',
  'frame with nothing else.',
].join(' ')

const JOBS = {
  side: {
    size: '1536x1024',
    prompt: [
      `A clean, realistic studio side profile of ${CAR}`,
      'Seen exactly side-on from the driver side with the front of the car pointing to the RIGHT of the frame.',
      'The FRONT door (right half of the car) carries the pale lilac panel with the Smarto wordmark; the REAR door (left half) carries the deep purple gradient panel, exactly as on the real cars.',
      'camera at wheel height, the whole car centred with generous margins, soft even studio lighting.',
      BACKDROP,
    ].join(' '),
  },
  orbit: {
    size: '1536x1024',
    prompt: [
      `A glossy 3D miniature collectible-toy version of ${CAR}`,
      'Rendered like a premium mobile-app category icon or modern 3D emoji: smooth slightly rounded forms,',
      'realistic glossy paint with soft highlights, soft even studio lighting, gentle ambient occlusion.',
      'Seen in three-quarter view from the front-left, camera slightly elevated, the car centred with generous margins.',
      BACKDROP,
    ].join(' '),
  },
}

/** Turns the flat chroma-green backdrop into transparency, with soft edges. */
async function keyOutGreen(png) {
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const dominance = g - Math.max(r, b)
    if (dominance > 60) {
      data[i + 3] = 0
    } else if (dominance > 20) {
      data[i + 3] = Math.round(255 * (1 - (dominance - 20) / 40))
      data[i + 1] = Math.max(r, b)
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toBuffer()
}

async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
  const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8')
  const line = raw.split('\n').find((l) => l.startsWith('OPENAI_API_KEY='))
  if (!line) throw new Error('OPENAI_API_KEY not found in env or .env.local')
  return line.slice('OPENAI_API_KEY='.length).trim()
}

async function generate(apiKey, name, job, refs) {
  const form = new FormData()
  form.append('model', 'gpt-image-2')
  form.append('prompt', job.prompt)
  form.append('size', job.size)
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
    throw new Error(`${name}: ${res.status} ${(await res.text()).slice(0, 300)}`)
  const b64 = (await res.json())?.data?.[0]?.b64_json
  if (!b64) throw new Error(`${name}: response contained no image data`)

  const png = Buffer.from(b64, 'base64')
  await writeFile(path.join(RAW, `fleet-${name}-raw.png`), png)
  const keyed = await sharp(await keyOutGreen(png)).trim().png().toBuffer()
  const outPath = path.join(RAW, `fleet-${name}-keyed.png`)
  await writeFile(outPath, keyed)
  console.log(`wrote ${outPath}`)
}

async function main() {
  await mkdir(RAW, { recursive: true })
  const apiKey = await loadKey()
  const refs = await Promise.all(REFS.map((f) => readFile(f)))
  const only = process.argv[2]
  const jobs = Object.entries(JOBS).filter(([name]) => !only || name === only)
  await Promise.all(jobs.map(([name, job]) => generate(apiKey, name, job, refs)))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
