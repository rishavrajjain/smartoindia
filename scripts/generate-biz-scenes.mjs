/**
 * Scene photography for the business pages' redesign (events, corporate,
 * partners): approachable, image-led heroes instead of typographic walls.
 * Landscape 3:2, editorial and grounded, no people posed as staff or
 * customers (empty scenes; the cars carry the story).
 *
 *   node scripts/generate-biz-scenes.mjs
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const RAW = path.join(ROOT, 'scripts', '.image-cache')

const STYLE = [
  'Editorial photography, natural light, grounded realistic colours, believable Indian setting,',
  'shot on a full-frame camera with a 35mm lens, gentle depth of field,',
  'no oversaturation, no people anywhere, no readable text or signage or number plates.',
].join(' ')

const SCENES = [
  {
    id: 'biz-events',
    prompt:
      'The entrance drive of an elegant Indian wedding venue at dusk: an archway gate decorated with fresh marigold garlands, warm string lights coming on, and a neat line of clean white sedans waiting along the driveway, tail lights glowing softly, lawn and trees behind.',
  },
  {
    id: 'biz-corporate',
    prompt:
      'The porch of a modern glass office building in an Indian city on a bright morning: a clean white electric sedan waiting at the entrance canopy, a second one arriving up the drive, planters and cool reflections in the glass, crisp professional light.',
  },
  {
    id: 'biz-partners',
    prompt:
      'The covered portico of a graceful hillside heritage hotel in Northeast India in late afternoon: stone columns, potted ferns, a polished white sedan waiting under the canopy with luggage stacked neatly on a brass cart beside it, pine-covered hills soft in the background.',
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
      size: '1536x1024',
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
  const out = await sharp(png).webp({ quality: 78, effort: 6 }).toBuffer()
  await writeFile(path.join(ROOT, 'public', 'images', `${scene.id}.webp`), out)
  console.log(`${scene.id}: ${(out.length / 1024).toFixed(0)}kb`)
}

async function main() {
  await mkdir(RAW, { recursive: true })
  const apiKey = await loadKey()
  await Promise.all(SCENES.map((s) => generate(apiKey, s)))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
