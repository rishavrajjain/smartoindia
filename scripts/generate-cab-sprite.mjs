/**
 * One-off: the Smarto cab sprite for the /b route bar.
 *
 * Modelled on Smarto's real airport cab (white compact sedan with a purple
 * gradient door livery and the Smarto wordmark). gpt-image-2 does not support
 * transparent backgrounds, so the car is generated on a flat chroma green and
 * keyed out here before it rides the hairline road in the bottom bar.
 *
 *   node scripts/generate-cab-sprite.mjs
 *
 * Output: public/brand/smarto-cab.webp (trimmed, alpha preserved) plus the raw
 * PNG in scripts/.image-cache/ for inspection.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')

const PROMPT = [
  'Minimal flat vector-style illustration of a compact white sedan taxi in perfect side profile, facing right, centered.',
  'Styled like an Indian ride-hailing cab: clean white body; a slim purple-to-violet gradient branding panel running across both doors;',
  'the word "Smarto" in white rounded lettering on the rear door panel; a small white roof-mounted taxi sign;',
  'dark tinted windows; simple dark grey wheels with neat silver hubcaps; a subtle teal accent line along the lower front fender.',
  'Crisp smooth shapes, soft minimal shading, no outlines, no drop shadow, no ground line.',
  'The entire background is one solid flat uniform chroma-key green (#00b140) with nothing else in it;',
  'the car itself contains no green anywhere.',
  'No other text, numbers, phone numbers, or QR codes anywhere.',
].join(' ')

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
    // How strongly green dominates the pixel. 0 on the car, high on the backdrop.
    const dominance = g - Math.max(r, b)
    if (dominance > 60) {
      data[i + 3] = 0
    } else if (dominance > 20) {
      // Feather the edge and pull the green cast out of the fringe.
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

async function main() {
  const apiKey = await loadKey()

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(15 * 60 * 1000),
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt: PROMPT,
      size: '1280x640',
      quality: 'high',
      output_format: 'png',
      n: 1,
    }),
  })

  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`)
  const body = await res.json()
  const b64 = body?.data?.[0]?.b64_json
  if (!b64) throw new Error('response contained no image data')

  const png = Buffer.from(b64, 'base64')
  const cacheDir = path.join(ROOT, 'scripts', '.image-cache')
  await mkdir(cacheDir, { recursive: true })
  await writeFile(path.join(cacheDir, 'smarto-cab-raw.png'), png)

  const keyed = await keyOutGreen(png)
  const out = await sharp(keyed)
    .trim({ threshold: 8 })
    .resize({ width: 360 })
    .webp({ quality: 90, effort: 6 })
    .toBuffer()

  const outPath = path.join(ROOT, 'public', 'brand', 'smarto-cab.webp')
  await writeFile(outPath, out)
  const meta = await sharp(out).metadata()
  console.log(`wrote ${outPath} (${meta.width}x${meta.height}, ${(out.length / 1024).toFixed(0)}kb)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
