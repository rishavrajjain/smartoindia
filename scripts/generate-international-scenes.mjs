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
  {
    id: 'intl-bali',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'Emerald rice terraces curving down a valley in central Bali in early morning mist, coconut palms along the ridges, a small thatched shrine at the edge of a paddy. No people.',
  },
  {
    id: 'intl-vietnam',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A calm bay in northern Vietnam at dawn with tall limestone karst islands rising from green water, one traditional wooden junk boat with plain rust-coloured sails, soft mist. No people.',
  },
  {
    id: 'intl-singapore',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A modern tropical city waterfront at blue hour: glass towers with gardens growing on their terraces, a calm bay reflecting the lights, lush palms along a promenade, no recognisable landmarks, no signs. No people.',
  },
  {
    id: 'intl-malaysia',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'Rainforest-covered islands rising from a turquoise Andaman sea in Malaysia, a strip of white beach, a few small boats, bright tropical daylight. No people.',
  },
  {
    id: 'intl-philippines',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A hidden lagoon in Palawan: sheer black limestone cliffs draped in jungle around clear turquoise water, a wooden outrigger bangka boat moored near the entrance. No people.',
  },
  {
    id: 'intl-maldives',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A row of overwater villas on stilts over a clear turquoise lagoon in the Maldives, a timber walkway, a sandbar and palm island behind, gentle midday light. No people.',
  },
  {
    id: 'intl-sri-lanka',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'Sri Lankan hill country: rolling tea estates in bright green rows over steep slopes, a winding road, silver-oak shade trees and drifting cloud over blue mountains. No people.',
  },
  {
    id: 'intl-turkey',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'Cappadocia at sunrise: soft rock fairy chimneys and valleys in warm light, several hot-air balloons in plain solid colours floating in a pale sky, no writing on the balloons. No people.',
  },
  {
    id: 'intl-azerbaijan',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A village in the Caucasus foothills of Azerbaijan in autumn: stone houses with tiled roofs, walnut trees turning gold, forested mountains behind under a clear sky. No people.',
  },
  {
    id: 'intl-kazakhstan',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A turquoise mountain lake in the Tian Shan above Almaty, steep slopes of dark spruce forest, snowy peaks behind, still water, crisp morning light. No people.',
  },
  {
    id: 'intl-japan',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'Mount Fuji in the distance across a calm lake in spring, cherry trees in pale pink bloom along the shore, a small wooden boat pier, soft clear morning light. No people.',
  },
  {
    id: 'intl-greece',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A Greek island village of whitewashed houses and blue-domed chapels stepping down a cliff to the deep blue Aegean at golden hour, bougainvillea on a terrace wall. No people.',
  },
  {
    id: 'intl-uk',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A Scottish Highland glen: a long still loch between steep green hills, heather in bloom, a single-track road, low cloud catching the hilltops. No people.',
  },
  {
    id: 'intl-mauritius',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A calm turquoise lagoon in Mauritius with a basalt mountain rising behind a white beach, casuarina and palm trees along the shore, a small wooden pirogue boat. No people.',
  },
  {
    id: 'intl-seychelles',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'Smooth pink-grey granite boulders on a white-sand beach in the Seychelles, clear shallow turquoise water, leaning palms, soft afternoon light. No people.',
  },
  {
    id: 'intl-south-africa',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'An African savanna at golden hour: flat-topped acacia trees, tall dry grass, two giraffes browsing in the middle distance, a warm hazy sky. No people.',
  },
  {
    id: 'intl-australia',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A rugged Australian coastline at sunset: tall golden limestone sea stacks standing in the surf off steep cliffs, long waves, a warm glowing sky. No people.',
  },
  {
    id: 'intl-new-zealand',
    size: '1536x1024',
    out: { width: 1400 },
    prompt:
      'A fiord in New Zealand: sheer green cliffs dropping straight into dark still water, thin waterfalls tumbling down the rock, low cloud on the peaks. No people.',
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
