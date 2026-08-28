/**
 * One-off: the glossy 3D Smarto cab that anchors the homepage service orbit.
 *
 * Two candidates, generated in one run:
 *   - `hero`      a single three-quarter view, matching the service icons'
 *                 premium 3D-emoji style (see generate-icons.mjs).
 *   - `turntable` a 3x2 sheet of the same car at 60° steps; if the views come
 *                 out consistent the orbit can spin the cab frame-by-frame.
 *
 * gpt-image-2 has no transparent background and the car's livery is violet,
 * so both render on flat chroma green (magenta would eat the livery) and are
 * keyed out here. Outputs land in scripts/.image-cache/ for inspection first;
 * nothing is written to public/ until a human (or agent) has looked at it.
 *
 *   node scripts/generate-cab-orbit.mjs [hero|turntable]
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const RAW = path.join(ROOT, 'scripts', '.image-cache')

const CAR = [
  'a compact white Indian sedan taxi styled as a premium collectible toy:',
  'clean glossy white body, a violet-to-purple gradient branding panel across both doors',
  'with the word "Smarto" in small white rounded lettering on the front door,',
  'a small white roof-mounted taxi sign, dark tinted windows,',
  'simple dark grey wheels with neat silver hubcaps.',
].join(' ')

const STYLE = [
  'Rendered in the style of a premium mobile-app category icon or modern 3D emoji:',
  'smooth rounded forms, realistic glossy materials with soft highlights,',
  'soft even studio lighting, gentle ambient occlusion.',
  'No other text, no drop shadow and no ground shadow beneath the object.',
  'The entire background is one solid flat uniform chroma-key green (#00b140)',
  'filling the whole frame with nothing else; the car itself contains no green anywhere.',
].join(' ')

const JOBS = {
  hero: {
    size: '1536x1024',
    prompt: [
      `Glossy 3D miniature of ${CAR}`,
      'Seen in three-quarter view from the front-left, camera slightly elevated, car centered.',
      STYLE,
    ].join(' '),
  },
  turntable: {
    size: '1536x1024',
    prompt: [
      'A turntable sprite sheet: exactly six views of the IDENTICAL car, arranged in a 3-column by 2-row grid with even spacing, every view the same size and same camera elevation.',
      `The car is ${CAR}`,
      'Reading left to right, top to bottom, the car rotates in 60-degree steps:',
      '1) front three-quarter from the left, 2) left side profile, 3) rear three-quarter from the left,',
      '4) rear three-quarter from the right, 5) right side profile, 6) front three-quarter from the right.',
      STYLE,
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

async function generate(apiKey, name, job) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(15 * 60 * 1000),
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt: job.prompt,
      size: job.size,
      quality: 'high',
      output_format: 'png',
      n: 1,
    }),
  })

  if (!res.ok)
    throw new Error(`${name}: ${res.status} ${(await res.text()).slice(0, 300)}`)
  const b64 = (await res.json())?.data?.[0]?.b64_json
  if (!b64) throw new Error(`${name}: response contained no image data`)

  const png = Buffer.from(b64, 'base64')
  await writeFile(path.join(RAW, `cab-orbit-${name}-raw.png`), png)
  const keyed = await keyOutGreen(png)
  const outPath = path.join(RAW, `cab-orbit-${name}-keyed.png`)
  await writeFile(outPath, keyed)
  console.log(`wrote ${outPath}`)
}

async function main() {
  await mkdir(RAW, { recursive: true })
  const apiKey = await loadKey()
  const only = process.argv[2]
  const jobs = Object.entries(JOBS).filter(([name]) => !only || name === only)
  await Promise.all(jobs.map(([name, job]) => generate(apiKey, name, job)))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
