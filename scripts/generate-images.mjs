/**
 * Development-time image generation for Smarto.
 *
 * Reads scripts/media-manifest.mjs, generates any missing assets with the OpenAI
 * Image API, optimises them to WebP in public/images/, and writes a JSON record of
 * what was produced to public/images/manifest.json.
 *
 * This script is never imported by the site. OPENAI_API_KEY stays server-side and
 * out of Git; generated output is committed so production never calls the API.
 *
 *   pnpm generate:images                 # only assets that are missing
 *   pnpm generate:images -- --force      # regenerate everything
 *   pnpm generate:images -- home-hero    # regenerate specific ids
 */

import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'
import { assets } from './media-manifest.mjs'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const OUT_DIR = path.join(ROOT, 'public', 'images')
const RAW_DIR = path.join(ROOT, 'scripts', '.image-cache')
const CONCURRENCY = 3

/** House style blocks. An asset picks one via its `style` field. */
const STYLES = {
  // Bright, warm and alive. The default for anything a visitor sees large.
  lively: [
    'Shot on a full-frame camera with a fast prime lens in strong natural daylight.',
    'Rich warm colour and clean vivid greens, deep blue sky, bright cloud, crisp sunlight with open shadows.',
    'Genuinely candid body language, real smiles, believable skin texture, ordinary modern clothing.',
    'Editorial travel photography with real depth and a strong sense of place — inviting, energetic and human.',
    'No text, no lettering, no signage, no logos, no watermarks, no number plates.',
    'Avoid HDR halos, plastic skin, waxy faces, duplicated limbs, stiff posed group shots, and any visible AI artifacts.',
  ].join(' '),
  // Still lifes and close detail, where the subject carries it rather than light.
  detail: [
    'Shot close on a full-frame camera with a macro-capable prime lens in bright natural daylight.',
    'Saturated true-to-life colour, fine texture, shallow depth of field, clean crisp highlights.',
    'No text, no lettering, no signage, no logos, no watermarks.',
    'Avoid HDR halos, plastic surfaces, perfect symmetry, and any visible AI artifacts.',
  ].join(' '),
}

/** Load OPENAI_API_KEY from .env.local without adding a dotenv dependency. */
async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
  try {
    const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8')
    const line = raw.split('\n').find((l) => l.startsWith('OPENAI_API_KEY='))
    if (line) return line.slice('OPENAI_API_KEY='.length).trim()
  } catch {
    /* fall through */
  }
  throw new Error('OPENAI_API_KEY is not set. Add it to .env.local (see .env.example).')
}

async function exists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function requestImage(asset, apiKey) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    // High-quality renders regularly take 2-3 minutes; the default fetch timeout
    // is far too short for them.
    signal: AbortSignal.timeout(15 * 60 * 1000),
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt: `${asset.prompt} ${STYLES[asset.style ?? 'lively']}`,
      size: asset.size,
      quality: asset.quality,
      n: 1,
    }),
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`)
  }

  const body = await res.json()
  const b64 = body?.data?.[0]?.b64_json
  if (!b64) throw new Error('response contained no image data')
  return Buffer.from(b64, 'base64')
}

/** Retries transient network failures, which this endpoint produces often under load. */
async function generate(asset, apiKey, attempts = 4) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await requestImage(asset, apiKey)
    } catch (err) {
      lastError = err
      if (attempt === attempts) break
      const backoff = 4000 * 2 ** (attempt - 1)
      console.warn(`retry  ${asset.id} (attempt ${attempt} failed: ${err.message}) in ${backoff / 1000}s`)
      await sleep(backoff)
    }
  }
  throw lastError
}

/** Crop to the manifest aspect ratio, resize, and write WebP. */
async function optimise(asset, png) {
  const [aw, ah] = asset.aspect.split(':').map(Number)
  const height = Math.round((asset.width * ah) / aw)

  const webp = await sharp(png)
    .resize(asset.width, height, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 6 })
    .toBuffer()

  await writeFile(path.join(OUT_DIR, `${asset.id}.webp`), webp)
  return { width: asset.width, height, bytes: webp.length }
}

async function run() {
  const argv = process.argv.slice(2)
  const force = argv.includes('--force')
  const only = argv.filter((a) => !a.startsWith('--'))

  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(RAW_DIR, { recursive: true })

  const apiKey = await loadKey()

  const queue = []
  for (const asset of assets) {
    if (only.length && !only.includes(asset.id)) continue
    if (!force && (await exists(path.join(OUT_DIR, `${asset.id}.webp`)))) {
      console.log(`skip   ${asset.id} (already generated)`)
      continue
    }
    queue.push(asset)
  }

  console.log(`\nGenerating ${queue.length} asset(s) with gpt-image-2, ${CONCURRENCY} at a time.\n`)

  const results = new Map()
  const failures = []
  let cursor = 0

  async function worker() {
    while (cursor < queue.length) {
      const asset = queue[cursor++]
      const started = Date.now()
      try {
        const png = await generate(asset, apiKey)
        await writeFile(path.join(RAW_DIR, `${asset.id}.png`), png)
        const out = await optimise(asset, png)
        results.set(asset.id, out)
        const secs = ((Date.now() - started) / 1000).toFixed(0)
        console.log(
          `ok     ${asset.id.padEnd(28)} ${out.width}x${out.height}  ${(out.bytes / 1024).toFixed(0)}kb  ${secs}s`,
        )
      } catch (err) {
        failures.push(`${asset.id}: ${err.message}`)
        console.error(`FAIL   ${asset.id}: ${err.message}`)
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  // Rebuild the public record from whatever is actually on disk.
  const record = []
  for (const asset of assets) {
    const file = path.join(OUT_DIR, `${asset.id}.webp`)
    if (!(await exists(file))) continue
    const meta = results.get(asset.id) ?? (await sharp(file).metadata())
    record.push({
      id: asset.id,
      src: `/images/${asset.id}.webp`,
      width: meta.width,
      height: meta.height,
      aspect: asset.aspect,
      alt: asset.alt,
      usedOn: asset.usedOn,
      subject: asset.subject,
      prompt: asset.prompt,
      model: 'gpt-image-2',
      status: 'generated',
    })
  }

  await writeFile(path.join(OUT_DIR, 'manifest.json'), `${JSON.stringify(record, null, 2)}\n`)
  console.log(`\nWrote ${record.length} entries to public/images/manifest.json`)

  if (failures.length) {
    console.error(`\n${failures.length} asset(s) failed:\n  ${failures.join('\n  ')}`)
    process.exitCode = 1
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
