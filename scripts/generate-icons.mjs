/**
 * Generates the glossy 3D service icons for the homepage cab list, in the
 * style of Airbnb's 3D category icons (realistic materials, soft studio light,
 * playful premium objects).
 *
 * gpt-image-2 has no transparent background, and several icons are green, so
 * they are rendered on a flat MAGENTA chroma key and keyed out here.
 *
 *   node scripts/generate-icons.mjs
 *
 * Output: public/icons/<id>.webp (trimmed, alpha preserved).
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const OUT = path.join(ROOT, 'public', 'icons')
const RAW = path.join(ROOT, 'scripts', '.image-cache')

const STYLE = [
  'Rendered as a single centered object in the style of a premium mobile-app category icon or modern 3D emoji:',
  'smooth rounded forms, realistic glossy materials with soft highlights, soft even studio lighting, gentle ambient occlusion.',
  'No text, no lettering, no drop shadow and no ground shadow beneath the object.',
  'The entire background is one solid flat uniform bright magenta (#ff00ff) filling the whole frame with nothing else;',
  'the object itself must contain no magenta or pink at all.',
].join(' ')

const ICONS = [
  {
    id: 'ic-airport',
    prompt:
      'A friendly glossy 3D passenger airplane, mostly white with a soft sky-blue underside and a small warm-orange tail fin, banking gently upward to the right.',
  },
  {
    id: 'ic-hills',
    prompt:
      'A glossy 3D cluster of two rounded lush green forested hills with a few tiny dark-green pine trees on top and one small fluffy white cloud beside them.',
  },
  {
    id: 'ic-train',
    prompt:
      'A glossy 3D friendly modern train engine seen three-quarter from the front, in teal and cream with a rounded yellow headlight and dark windows.',
  },
  {
    id: 'ic-milestone',
    prompt:
      'A glossy 3D roadside milestone marker: a small rounded white stone post with a warm-yellow rounded top, and a short curl of grey road wrapping past its base.',
  },
  {
    id: 'ic-clock',
    prompt:
      'A glossy 3D round twin-bell alarm clock in warm cream and brushed brass, with soft dark clock hands, cheerful and premium looking.',
  },
  {
    id: 'ic-road',
    prompt:
      'A glossy 3D winding grey mountain road ribbon with a dashed centre line, curving upward between two small rounded green hills.',
  },
]

async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
  const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8')
  const line = raw.split('\n').find((l) => l.startsWith('OPENAI_API_KEY='))
  if (!line) throw new Error('OPENAI_API_KEY not found in env or .env.local')
  return line.slice('OPENAI_API_KEY='.length).trim()
}

/** Turns the flat magenta backdrop into transparency, with a feathered edge. */
async function keyOutMagenta(png) {
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    // Magenta = high red AND high blue AND low green.
    const magenta = Math.min(r, b) - g
    if (magenta > 60) {
      data[i + 3] = 0
    } else if (magenta > 18) {
      data[i + 3] = Math.round(255 * (1 - (magenta - 18) / 42))
      // Pull the magenta cast out of the fringe.
      data[i] = Math.min(r, g + 20)
      data[i + 2] = Math.min(b, g + 20)
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toBuffer()
}

async function generate(icon, apiKey) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(15 * 60 * 1000),
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt: `${icon.prompt} ${STYLE}`,
      size: '1024x1024',
      quality: 'high',
      output_format: 'png',
      n: 1,
    }),
  })
  if (!res.ok) throw new Error(`${icon.id}: ${res.status} ${(await res.text()).slice(0, 200)}`)
  const body = await res.json()
  const b64 = body?.data?.[0]?.b64_json
  if (!b64) throw new Error(`${icon.id}: no image data`)
  return Buffer.from(b64, 'base64')
}

async function main() {
  const apiKey = await loadKey()
  await mkdir(OUT, { recursive: true })
  await mkdir(RAW, { recursive: true })

  let cursor = 0
  const failures = []
  async function worker() {
    while (cursor < ICONS.length) {
      const icon = ICONS[cursor++]
      try {
        const png = await generate(icon, apiKey)
        await writeFile(path.join(RAW, `${icon.id}-raw.png`), png)
        const keyed = await keyOutMagenta(png)
        const out = await sharp(keyed)
          .trim({ threshold: 10 })
          .resize({ width: 240, height: 240, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .webp({ quality: 92, effort: 6 })
          .toBuffer()
        await writeFile(path.join(OUT, `${icon.id}.webp`), out)
        console.log(`ok     ${icon.id}  ${(out.length / 1024).toFixed(0)}kb`)
      } catch (err) {
        failures.push(err.message)
        console.error(`FAIL   ${err.message}`)
      }
    }
  }
  await Promise.all([worker(), worker(), worker()])

  if (failures.length) process.exitCode = 1
  console.log(`\nDone. ${ICONS.length - failures.length}/${ICONS.length} icons.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
