/**
 * Fresh photography for the service-page redesign (cabs, flights, events,
 * corporate). All new generations per RRJ: nothing reused from the pool.
 * Landscape 3:2, editorial and grounded. People appear only distant or from
 * behind, never posed as staff, drivers or customers; the cars and places
 * carry the warmth. No readable branding, text or number plates.
 *
 *   node scripts/generate-service-scenes.mjs
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const RAW = path.join(ROOT, 'scripts', '.image-cache')

const STYLE = [
  'Editorial travel photography, natural light, grounded realistic colours,',
  'believable Northeast Indian setting, shot on a full-frame camera with a 35mm lens,',
  'gentle depth of field, no oversaturation, no readable text, signage, logos or number plates.',
].join(' ')

const SCENES = [
  {
    id: 'svc-cabs-hero',
    prompt:
      'A clean white electric sedan parked at a scenic pull-off on a winding hill road in Meghalaya, rear door open, a small stack of travel bags beside it, morning mist lifting off green ridges behind, dew on the tarmac, fresh soft light. No people.',
  },
  {
    id: 'svc-cabs-city',
    prompt:
      'A white electric sedan gliding down a leafy avenue in Guwahati in early morning: wet asphalt reflecting soft light, old trees arching overhead, a few distant pedestrians from behind, calm unhurried city mood.',
  },
  {
    id: 'svc-cabs-railway',
    prompt:
      'The forecourt of an Indian railway station at golden hour: a white sedan waiting at the kerb with its boot open, a trolley of luggage beside it, the station building warm in the background, one traveller seen from behind walking toward the car.',
  },
  {
    id: 'svc-cabs-airport',
    prompt:
      'The departures kerb of a small modern Indian airport at dawn: a white electric sedan at the drop-off, a suitcase on the kerb beside it, glass terminal glowing warmly, hills faint in the distance, quiet early light. No people.',
  },
  {
    id: 'svc-flights-hero',
    prompt:
      'A commercial passenger aircraft parked at a small hillside Indian airport at sunrise, seen across the tarmac: soft golden haze, green hills layered behind the runway, ground reflections after light rain, calm and optimistic. No people.',
  },
  {
    id: 'svc-events-conference',
    prompt:
      'The entrance of a modern Indian convention centre in the evening: glass facade glowing, a line of white sedans queued along the covered drive, soft blue dusk sky, lanterns lit along the walkway. No people.',
  },
  {
    id: 'svc-events-festival',
    prompt:
      'A festival ground in Northeast India at blue hour seen from a distance: strings of warm fairy lights over bamboo pavilions, a traditional gateway, parked cars along the field edge, hills silhouetted behind, festive but calm. People only as tiny distant silhouettes.',
  },
  {
    id: 'svc-corporate-fleet',
    prompt:
      'A neat row of identical white electric sedans charging at sleek charging posts in an office campus parking area at dusk: charge-port lights glowing green, a modern glass building softly lit behind, clean corporate calm. No people.',
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
  for (let i = 0; i < SCENES.length; i += 3) {
    await Promise.all(SCENES.slice(i, i + 3).map((s) => generate(apiKey, s)))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
