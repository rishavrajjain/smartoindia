/**
 * Destination photography for the fifty-journey catalog (docs: Manav's
 * Smarto Travel PDF). One image per recurring overnight base that the
 * existing pkg-* set doesn't already cover; journeys map to these by their
 * primary destination. Landscape 3:2, natural light, no people posed as
 * staff or customers, geography kept credible.
 *
 *   node scripts/generate-journey-images.mjs
 *
 * Output: public/images/dest-<id>.webp (1536px wide, q78) + raw PNGs in
 * scripts/.image-cache/ for inspection.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const RAW = path.join(ROOT, 'scripts', '.image-cache')

const STYLE = [
  'Editorial travel photography, natural daylight, grounded realistic colours,',
  'believable weather and terrain, shot on a full-frame camera with a 35mm lens,',
  'gentle depth, no oversaturation, no HDR halos, no text or signage anywhere.',
].join(' ')

const SCENES = [
  {
    id: 'dest-shillong',
    prompt:
      'A quiet hillside town in Northeast India in soft morning mist: colonial-era cottages with pitched tin roofs scattered among tall pine trees on rolling green hills, a winding road with a few parked cars, cool blue-green light.',
  },
  {
    id: 'dest-dawki',
    prompt:
      'A crystal-clear emerald river in a forested gorge in Meghalaya, so transparent the rounded stones of the riverbed show through, two slender wooden rowing boats moored near a pebble bank, limestone cliffs and dense green forest, soft overcast light.',
  },
  {
    id: 'dest-ziro',
    prompt:
      'A wide highland valley in Arunachal Pradesh with a patchwork of lush green rice paddies, low wooden farm huts on stilts at the field edges, groves of tall pine trees on gentle ridges, blue mountains layered behind, late afternoon light.',
  },
  {
    id: 'dest-sela',
    prompt:
      'A high-altitude Himalayan mountain pass in Arunachal Pradesh: a still turquoise alpine lake beside a narrow paved road, strings of colourful prayer flags fluttering across stone cairns, bare rocky slopes with patches of snow, thin bright air, deep blue sky.',
  },
  {
    id: 'dest-majuli',
    prompt:
      'The vast Brahmaputra river in Assam at golden hour: an enormous calm braided river with pale sandbars, a small flat ferry boat crossing far away, silhouettes of fishing canoes near the shore, huge open sky with warm haze.',
  },
  {
    id: 'dest-umiam',
    prompt:
      'A large serene reservoir lake among pine-covered hills in Meghalaya, seen from a high viewpoint: deep blue-green water with small islands, scattered clouds and their reflections, one small boat leaving a gentle wake, fresh clear daylight.',
  },
  {
    id: 'dest-tawang-winter',
    prompt:
      'A large Tibetan Buddhist monastery complex of whitewashed walls and golden-yellow roofs on a Himalayan ridge in winter, light snow on the courtyards and surrounding peaks, prayer flags dusted with frost, crisp pale morning light.',
  },
  {
    id: 'dest-nameri',
    prompt:
      'A calm forest river at the edge of a national park in Assam at dawn: a wide shallow river with smooth grey stones, dense semi-evergreen forest rising on the far bank, low mist over the water, one inflatable raft pulled up on the near gravel bank, no people.',
  },
  {
    id: 'dest-honeymoon',
    prompt:
      'A cosy mountain resort cottage in the Northeast Indian hills at dusk: a small timber-and-stone cottage with warm lamplight in the windows, a private verandah with two empty chairs and a lantern, pine forest and misty blue ridges behind, first stars appearing.',
  },
  {
    id: 'dest-guwahati',
    prompt:
      'The Brahmaputra riverfront at Guwahati at sunset: wide golden river, a white river ferry and small boats, the silhouette of a hill with a temple spire across the water, warm orange sky fading to violet, city lights just beginning to glow.',
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
  // Batches of three keep parallelism polite.
  for (let i = 0; i < SCENES.length; i += 3) {
    await Promise.all(SCENES.slice(i, i + 3).map((s) => generate(apiKey, s)))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
