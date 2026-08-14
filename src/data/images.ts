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
  heroDawnRidges: image(
    "hero-dawn-ridges",
    1280,
    1920,
    "Layered green mountain ridges under a soft golden dawn sky, with gentle mist settling in the dark valley below",
  ),
  heroTeaDawn: image(
    "hero-tea-dawn",
    1280,
    1920,
    "Smooth rolling curves of a tea garden glowing in golden morning light beneath a soft hazy sky",
  ),
  heroRiver: image(
    "hero-river-morning",
    1280,
    1920,
    "A slender wooden boat drifting on crystal-clear turquoise water in a sunlit green gorge under a bright blue sky",
  ),
  heroFlagsRoad: image(
    "hero-flags-road",
    1280,
    1920,
    "A white car sweeping up a sunlit green mountain road beneath strings of colourful prayer flags against a deep blue sky",
  ),
  homeHeroValley: image(
    "hero-valley-dusk",
    1200,
    1800,
    "A white sedan parked on mossy grass in a vast green valley, steep mountain walls rising into low cloud on both sides",
  ),
  homeHero: image(
    "home-hero",
    2000,
    1333,
    "A family standing at a green hill viewpoint in Meghalaya on a bright morning, with sunlit ridges rolling into the distance",
  ),
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

  cabsHero: image(
    "cabs-hero",
    2000,
    1333,
    "A family loading bags into a clean white car parked on a sunny hill road with green slopes behind",
  ),
  cabsAirport: image(
    "cabs-airport",
    1000,
    750,
    "A sunny kerbside pickup lane outside a small regional airport with palms, parked cars and arriving travellers",
  ),
  cabsOutstation: image(
    "cabs-outstation",
    1000,
    750,
    "A long highway running through bright green Assamese countryside under a blue sky",
  ),
  cabsEv: image(
    "cabs-ev",
    1000,
    750,
    "A white electric car plugged into an outdoor charging post beside bright green hedges in sunshine",
  ),

  corporateHero: image(
    "corporate-hero",
    2000,
    1333,
    "A group of colleagues boarding clean white passenger vans in an open yard on a bright morning",
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
