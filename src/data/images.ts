import type { SiteImage } from "@/types";

/**
 * Typed registry of the generated site imagery.
 *
 * Mirrors `public/images/manifest.json`, which `scripts/generate-images.mjs`
 * writes. Kept as a TS module so every `next/image` call gets real intrinsic
 * dimensions at build time and reserves the right space, which is what keeps
 * cumulative layout shift at zero.
 */
function image(
  id: string,
  width: number,
  height: number,
  alt: string,
): SiteImage {
  return { src: `/images/${id}.webp`, width, height, alt };
}

export const IMAGES = {
  homeRoad: image(
    "home-road",
    1600,
    1067,
    "A clean white car on a sunlit hill highway curving between bright green forested slopes",
  ),
  homeFood: image(
    "home-food",
    1200,
    800,
    "Hands reaching across a sunlit wooden table spread with a home-style Assamese meal of rice, curries and greens",
  ),

  meghalayaWaterfalls: image(
    "pkg-meghalaya-waterfalls",
    1600,
    1067,
    "A tall waterfall falling into a bright green gorge in Meghalaya with a rainbow forming in the spray",
  ),
  meghalayaRootBridge: image(
    "pkg-meghalaya-root-bridge",
    1600,
    1067,
    "Two young travellers crossing a living root bridge over a clear turquoise stream in sunlit forest",
  ),
  meghalayaFamily: image(
    "pkg-meghalaya-family",
    1600,
    1067,
    "A family in a small rowing boat on a bright green lake ringed with pine forest",
  ),
  assamKaziranga: image(
    "pkg-assam-kaziranga",
    1600,
    1067,
    "Golden elephant grass and open wetland at sunrise in the Assam floodplain, with egrets rising off the water",
  ),
  assamTea: image(
    "pkg-assam-tea",
    1600,
    1067,
    "Bright green rows of tea bushes stretching to the horizon under a blue sky with tall white clouds",
  ),
  arunachalTawang: image(
    "pkg-arunachal-tawang",
    1600,
    1067,
    "Bright prayer flags strung across a high Himalayan pass with snow peaks under a deep blue sky",
  ),
  sikkimNorth: image(
    "pkg-sikkim-north",
    1600,
    1067,
    "A green alpine valley in North Sikkim carpeted with wildflowers below bright snow-covered peaks",
  ),
  nagalandHills: image(
    "pkg-nagaland-hills",
    1600,
    1067,
    "A hillside village in the Naga hills catching morning sun above a valley filled with white cloud",
  ),
  northeastCircuit: image(
    "pkg-northeast-circuit",
    1600,
    1067,
    "A wide sunlit river in Assam with golden sandbanks and a small passenger ferry crossing",
  ),



  festBihu: image(
    "fest-bihu",
    900,
    675,
    "Dancers in traditional red-and-white Assamese dress mid-movement at an outdoor Bihu gathering in bright daylight",
  ),
  festHornbill: image(
    "fest-hornbill",
    900,
    675,
    "Naga performers in traditional shawls and headdresses at an outdoor cultural festival",
  ),
  festWangala: image(
    "fest-wangala",
    900,
    675,
    "A line of drummers in traditional dress playing long drums at an outdoor Garo harvest festival",
  ),
  festLosar: image(
    "fest-losar",
    900,
    675,
    "Colourful prayer flags strung before a whitewashed Buddhist monastery in the mountains under a bright sky",
  ),
  festivalsHero: image(
    "festivals-hero",
    2000,
    1333,
    "Dancers in bright traditional dress performing at an outdoor festival ground in Northeast India in daylight",
  ),
  festivalTextiles: image(
    "festival-textiles",
    1000,
    750,
    "Brightly coloured handwoven shawls with red and black geometric patterns stacked in sunlight",
  ),
  festivalDrums: image(
    "festival-drums",
    1000,
    750,
    "Drummers in traditional dress playing long hand drums outdoors in bright sunlight",
  ),

  impactHero: image(
    "impact-hero",
    2000,
    1333,
    "Bright green terraced fields and small homesteads on a hillside in warm afternoon light",
  ),
  impactForest: image(
    "impact-forest",
    1000,
    750,
    "Sunlight streaming through the vivid green interior of a broadleaf forest with ferns and moss",
  ),
} as const satisfies Record<string, SiteImage>;
