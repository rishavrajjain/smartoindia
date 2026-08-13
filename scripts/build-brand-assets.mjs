/**
 * Turns the supplied Smarto logo into the variants the site actually needs.
 *
 * Source: public/brand/smarto-logo-source.png (2048x736, wordmark + tagline).
 * The tagline is illegible below ~200px wide, so the header uses a wordmark-only
 * crop. A light knockout variant is produced for dark surfaces, where the
 * original's dark violet would fall below AA contrast against forest green.
 *
 *   node scripts/build-brand-assets.mjs
 */

import path from 'node:path'
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const SRC = path.join(ROOT, 'public', 'brand', 'smarto-logo-source.png')
const OUT = path.join(ROOT, 'public', 'brand')

/** The wordmark occupies roughly the top 62% of the source; the rest is tagline. */
const WORDMARK_HEIGHT_RATIO = 0.63

/** Repaints every visible pixel ivory while keeping the original alpha mask. */
async function recolourToIvory(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += info.channels) {
    data[i] = 0xf7
    data[i + 1] = 0xf5
    data[i + 2] = 0xef
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toBuffer()
}

async function main() {
  // sharp applies `trim` before `extract`, so each crop needs its own pass.
  const trimmed = await sharp(SRC).trim({ threshold: 1 }).png().toBuffer()
  const full = await sharp(trimmed).metadata()
  if (!full.width || !full.height) throw new Error('Could not read logo dimensions')
  console.log(`source trimmed to ${full.width}x${full.height}`)

  // 1. Wordmark only — the tagline is illegible at header sizes.
  const wordmark = await sharp(trimmed)
    .extract({
      left: 0,
      top: 0,
      width: full.width,
      height: Math.round(full.height * WORDMARK_HEIGHT_RATIO),
    })
    .png()
    .toBuffer()
    .then((buf) => sharp(buf).trim({ threshold: 1 }).png().toBuffer())

  const wordmarkMeta = await sharp(wordmark).metadata()
  if (!wordmarkMeta.width || !wordmarkMeta.height) throw new Error('Wordmark crop failed')
  console.log(`wordmark trimmed to ${wordmarkMeta.width}x${wordmarkMeta.height}`)

  await sharp(wordmark)
    .resize({ width: 720 })
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(OUT, 'smarto-wordmark.webp'))

  // 2. Knockout variant for dark surfaces: flatten every visible pixel to ivory,
  //    preserving the original alpha so the letterforms stay identical.
  //    The source violet sits at ~1.6:1 against forest green, far below AA.
  const knockout = await recolourToIvory(wordmark)

  await sharp(knockout)
    .resize({ width: 720 })
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(OUT, 'smarto-wordmark-light.webp'))

  // 3. Full lockup (wordmark + tagline) for the footer and social cards.
  await sharp(trimmed)
    .resize({ width: 900 })
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(OUT, 'smarto-lockup.webp'))

  // 4. Favicon: an ivory "S" knocked out of a forest tile, so it stays legible
  //    at 32px. The original violet-on-forest combination is unreadable at size.
  const sCrop = await sharp(wordmark)
    .extract({
      left: 0,
      top: 0,
      width: Math.round(wordmarkMeta.width * 0.17),
      height: wordmarkMeta.height,
    })
    .png()
    .toBuffer()
    .then((buf) => sharp(buf).trim({ threshold: 1 }).png().toBuffer())

  const sGlyph = await sharp(await recolourToIvory(sCrop))
    .resize({ width: 320, height: 320, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const icon = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0x17, g: 0x3a, b: 0x2b, alpha: 1 },
    },
  })
    .composite([{ input: await sharp(sGlyph).png().toBuffer(), gravity: 'centre' }])
    .png()
    .toBuffer()

  await writeFile(path.join(ROOT, 'src', 'app', 'icon.png'), icon)
  await writeFile(path.join(ROOT, 'src', 'app', 'apple-icon.png'), icon)

  console.log('brand assets written to public/brand/ and src/app/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
