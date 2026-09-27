/**
 * Region photographs for /packages/international. Scenery only: no people,
 * no famous landmarks, no readable text, so no picture claims to be a
 * specific real place beyond the broad region its tile names.
 *
 *   node scripts/generate-international-scenes.mjs [id ...]
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const RAW = path.join(ROOT, 'scripts', '.image-cache')

const STYLE = [
  'Editorial travel photography, natural daylight, grounded realistic colours,',
  'believable Northeast Indian setting, shot on a full-frame camera,',
  'gentle depth of field, natural skin texture, candid body language,',
  'no oversaturation, no readable text, signage, logos or number plates.',
].join(' ')

const SCENES = [
  {
    id: 'intl-himalaya',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A Himalayan valley in Bhutan or Nepal on a clear autumn morning: terraced rice fields stepping down a green hillside, a few whitewashed farmhouses with small timber windows, strings of faded prayer flags on a ridge, snow peaks far behind under a deep blue sky. No people.',
  },
  {
    id: 'intl-southeast-asia',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A quiet tropical bay in Southeast Asia in soft late-afternoon light: turquoise water, a curve of pale sand, green limestone cliffs rising from the sea, two wooden longtail boats moored near the shore, palms at the edge. No people.',
  },
  {
    id: 'intl-middle-east',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'Rolling golden desert dunes in the Arabian Peninsula at sunset, long soft shadows across the ridges, a few low acacia shrubs, a warm hazy sky, a faint distant city skyline as simple soft shapes on the horizon with no recognisable buildings. No people.',
  },
  {
    id: 'intl-europe',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'An alpine lake village in Europe on a bright summer morning: pastel old houses and a small white church with a plain steeple along the water, green meadows and pine forest behind, mountains with a little snow, a calm reflection on the lake. No people, no signs.',
  },
]

async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
  const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8')
  const line = raw.split('\n').find((l) => l.startsWith('OPENAI_API_KEY='))
  if (!line) throw new Error('OPENAI_API_KEY not found in env or .env.local')
  return line.slice('OPENAI_API_KEY='.length).trim()
}

async function generate(apiKey, scene) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(15 * 60 * 1000),
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt: `${scene.prompt} ${STYLE}`,
      size: scene.size,
      quality: 'high',
      output_format: 'png',
      n: 1,
    }),
  })
  if (!res.ok)
    throw new Error(`${scene.id}: ${res.status} ${(await res.text()).slice(0, 200)}`)
  const b64 = (await res.json())?.data?.[0]?.b64_json
  if (!b64) throw new Error(`${scene.id}: no image data`)

  const png = Buffer.from(b64, 'base64')
  await writeFile(path.join(RAW, `${scene.id}-raw.png`), png)
  const out = await sharp(png)
    .resize({ width: scene.out.width })
    .webp({ quality: 80, effort: 6 })
    .toBuffer()
  await writeFile(path.join(ROOT, 'public', 'images', `${scene.id}.webp`), out)
  console.log(`${scene.id}: ${(out.length / 1024).toFixed(0)}kb`)
}

async function main() {
  await mkdir(RAW, { recursive: true })
  const apiKey = await loadKey()
  const only = process.argv.slice(2)
  const queue = only.length ? SCENES.filter((s) => only.includes(s.id)) : SCENES
  for (let i = 0; i < queue.length; i += 4) {
    await Promise.all(queue.slice(i, i + 4).map((s) => generate(apiKey, s)))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
