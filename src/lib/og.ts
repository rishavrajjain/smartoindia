import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
 * Shared assets for the Open Graph cards: bundled Poppins (OFL) in the
 * brand's two weights, and the light wordmark as a data URI, so every card
 * renders the real identity at build time with no network fetch.
 */

const ASSETS = join(process.cwd(), "src", "assets");

export interface OgFont {
  name: string;
  data: Buffer;
  weight: 300 | 800;
}

export async function loadOgAssets(): Promise<{
  fonts: OgFont[];
  wordmark: string;
}> {
  const [light, extrabold, wordmark] = await Promise.all([
    readFile(join(ASSETS, "fonts", "poppins-300.ttf")),
    readFile(join(ASSETS, "fonts", "poppins-800.ttf")),
    readFile(join(ASSETS, "smarto-wordmark-light.png")),
  ]);
  return {
    fonts: [
      { name: "Poppins", data: light, weight: 300 },
      { name: "Poppins", data: extrabold, weight: 800 },
    ],
    // Satori accepts a raw buffer as an <img> src; its string types don't.
    // A data URI would be cleaner, but the node OG pipeline fetches string
    // srcs through undici, which rejects data: URLs.
    wordmark: wordmark.buffer.slice(
      wordmark.byteOffset,
      wordmark.byteOffset + wordmark.byteLength,
    ) as unknown as string,
  };
}
