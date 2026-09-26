/**
 * Photography for the /b homepage concept (PickYourTrail-inspired layout).
 * Three wide hero stills that crossfade behind the desktop search, and five
 * square "who's coming along" portraits for the traveller pickers. The
 * people are illustrative travellers only, never presented as Smarto staff,
 * drivers, customers or review authors. No readable text, logos or plates.
 *
 *   node scripts/generate-b-scenes.mjs
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
    id: 'b-hero-clouds',
    size: '1536x1024',
    out: { width: 1536 },
    prompt:
      'A clean white electric SUV driving along a ridge road high above a sea of low morning cloud in the Meghalaya hills, first sunlight catching green grassy slopes, the road curving in from the lower left, wide cinematic composition with calm open sky across the upper half. No people visible.',
  },
  {
    id: 'b-hero-passes',
    size: '1536x1024',
    out: { width: 1536 },
    prompt:
      'A white car rounding a bend on a high mountain road in western Arunachal Pradesh beneath strings of faded prayer flags, snow-dusted peaks far behind, crisp clear blue sky, dry alpine grass and rock, wide composition with calm sky across the upper half. No people visible.',
  },
  {
    id: 'b-hero-tea',
    size: '1536x1024',
    out: { width: 1536 },
    prompt:
      'A white sedan parked on a narrow estate road through an Assam tea garden at sunrise, neat rows of tea bushes rolling toward tall shade trees, soft ground mist, warm low sun, wide composition with a calm hazy sky across the upper half. No people visible.',
  },
  {
    id: 'b-who-couple',
    size: '1024x1024',
    out: { width: 640 },
    prompt:
      'Square portrait: a young Indian couple in their late twenties sharing a laugh at a pine-forest viewpoint in the Khasi hills, light jackets, heads close together, candid moment, soft overcast light, a misty green valley blurred behind them. Both faces centred in the frame for a circular crop.',
  },
  {
    id: 'b-who-family',
    size: '1024x1024',
    out: { width: 640 },
    prompt:
      'Square portrait: an Indian family of four, parents in their thirties with a girl about eight and a boy about five, walking together on a sunny path through an Assam tea garden, the children smiling in front, candid and relaxed, rows of tea bushes behind. The group centred in the frame for a circular crop.',
  },
  {
    id: 'b-who-friends',
    size: '1024x1024',
    out: { width: 640 },
    prompt:
      'Square portrait: four friends in their twenties, two women and two men, sitting close together on large rocks beside a clear green river in the Meghalaya hills, laughing at something off camera, casual travel clothes and small backpacks, bright daylight. The group centred in the frame for a circular crop.',
  },
  {
    id: 'b-who-solo',
    size: '1024x1024',
    out: { width: 640 },
    prompt:
      'Square portrait: a young Indian woman travelling solo with a small backpack, standing on a grassy hillside trail and looking out over rolling green hills and low cloud, seen in three-quarter view with a calm half smile, windblown hair, soft daylight. Her figure centred in the frame for a circular crop.',
  },
  {
    id: 'b-who-seniors',
    size: '1024x1024',
    out: { width: 640 },
    prompt:
      'Square portrait: a retired Indian couple in their sixties walking arm in arm along a lakeside path lined with pine trees, relaxed genuine smiles, cardigan and a woollen shawl, soft morning light with light mist over the lake behind them. Both centred in the frame for a circular crop.',
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
