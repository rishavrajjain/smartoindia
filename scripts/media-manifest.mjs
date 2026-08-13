/**
 * Media manifest for development-time asset generation.
 *
 * Every entry records where the asset is used, what it shows, the aspect ratio
 * it is cropped to, and the exact prompt used. `scripts/generate-images.mjs`
 * reads this file; the site itself never calls the image API at runtime.
 *
 * Art direction: bright, warm, sunlit and alive. Real families and young
 * travellers enjoying themselves, saturated but believable colour, blue skies
 * and big cloud. Not moody, not empty, not a stock brochure.
 *
 * People shown here are generic travellers. Per the repo instructions they are
 * never captioned as Smarto staff, drivers, guides, or customers.
 *
 *   pnpm generate:images -- --force        regenerate everything
 *   pnpm generate:images -- home-hero      regenerate one asset
 */

/**
 * @typedef {object} MediaAsset
 * @property {string} id            Stable key; also the output filename stem.
 * @property {string} usedOn        Route and section where the asset appears.
 * @property {string} subject       Short human description of the content.
 * @property {'3:2'|'4:3'} aspect
 * @property {'1536x1024'|'1024x1024'} size
 * @property {'high'|'medium'|'low'} quality
 * @property {'lively'|'detail'} style  House style block, see generate-images.mjs.
 * @property {number} width         Output width after optimisation.
 * @property {string} alt           Default alt text for the asset.
 * @property {string} prompt        Subject prompt; the style block is appended.
 */

/** @type {MediaAsset[]} */
export const assets = [
  {
    id: 'fx-mist',
    style: 'fx',
    usedOn: '/ — hero cloud-motion overlay (screen blend)',
    subject: 'Wispy drifting fog streaks on solid black, for screen-blend compositing',
    aspect: '3:1',
    size: '1536x512',
    quality: 'medium',
    width: 1536,
    alt: '',
    prompt:
      'Long wispy streaks of drifting fog and thin low cloud floating on a pure solid black background. Soft diffuse edges, varied density with large calm gaps of plain black, gentle horizontal flow, pale neutral grey mist, photographic and volumetric, monochrome. The black background must stay pure black with no gradient, no stars, no noise.',
  },
  {
    id: 'hero-valley-dusk',
    style: 'moody',
    usedOn: '/ — full-bleed portrait hero',
    subject: 'Lone white sedan in an immense misty green valley under a heavy sky',
    aspect: '2:3',
    size: '1024x1536',
    quality: 'high',
    width: 1280,
    alt: 'A white sedan parked on mossy grass in a vast green valley, steep mountain walls rising into low cloud on both sides',
    prompt:
      'A small plain white sedan seen from the rear three-quarter, parked alone at the centre of a vast flat mossy green meadow on the floor of an immense symmetric U-shaped glacial valley. Two colossal dark green mountain walls rise steeply on the left and right of the frame, converging toward a distant narrow gap at the centre, with low grey storm cloud filling the sky and long ribbons of white mist hanging between the walls. Very dark, brooding overcast light with a cold blue-grey grade, deeply shadowed greens, wet grass texture in the foreground, the car small and centred in the lower third of the frame. Cinematic, still, completely silent. No people, no road, no buildings, no number plate, no badges.',
  },
  {
    id: 'home-hero',
    usedOn: '/ — full-bleed hero',
    subject: 'Family at a hill viewpoint on a bright morning',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 2000,
    alt: 'A family standing at a green hill viewpoint in Meghalaya on a bright morning, with sunlit ridges rolling into the distance',
    prompt:
      'A young Indian family — two parents and two children — standing together at a grassy viewpoint high in the Meghalaya hills on a brilliant clear morning, laughing, one child pointing out at the view. Behind them sunlit green ridges roll away layer after layer under a big blue sky with tall white clouds, a thin road curving along a distant spur. Shot from slightly behind and to the side so the landscape dominates and the family reads as small warm figures low in the frame.',
  },
  {
    id: 'home-road',
    usedOn: '/ — the way we travel section',
    subject: 'Bright empty hill highway curving through green slopes',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 1600,
    alt: 'A clean white car on a sunlit hill highway curving between bright green forested slopes',
    prompt:
      'A clean white car on a beautiful sweeping curve of hill highway in Northeast India on a sunny afternoon, seen from a high vantage point. Brilliant green forested slopes on both sides, wildflowers on the verge, blue sky with bright cumulus, warm sunlight on the tarmac. Cheerful, open, full of momentum. No branding on the vehicle, no number plate.',
  },
  {
    id: 'home-food',
    usedOn: '/ — local knowledge section',
    subject: 'Family sharing an Assamese meal at a sunlit table',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'medium',
    style: 'lively',
    width: 1200,
    alt: 'Hands reaching across a sunlit wooden table spread with a home-style Assamese meal of rice, curries and greens',
    prompt:
      'An overhead view of a generous home-style Assamese meal spread across a sunlit wooden table: steamed rice, yellow dal, bright stir-fried greens, fish curry, pickles, sliced lime and green chilli in mismatched steel and ceramic bowls. Several pairs of hands reaching in to serve and share, including a child\'s. Warm daylight from a window, vivid natural food colour, generous and social.',
  },

  {
    id: 'pkg-meghalaya-waterfalls',
    usedOn: '/packages and the Meghalaya waterfalls trip — hero',
    subject: 'Huge sunlit waterfall with a rainbow in the spray',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 1600,
    alt: 'A tall waterfall falling into a bright green gorge in Meghalaya with a rainbow forming in the spray',
    prompt:
      'A tall powerful waterfall dropping into a vivid green gorge in Meghalaya on a bright sunny day, with a clear rainbow forming in the spray at its base. Brilliant sunlit foliage on the surrounding cliffs, blue sky and white cloud above the plateau rim, sparkling white water. Joyful, vivid, full of light.',
  },
  {
    id: 'pkg-meghalaya-root-bridge',
    usedOn: '/packages/living-root-bridges-and-villages — hero',
    subject: 'Young travellers crossing a sunlit living root bridge',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 1600,
    alt: 'Two young travellers crossing a living root bridge over a clear turquoise stream in sunlit forest',
    prompt:
      'Two young travellers with small daypacks crossing a living root bridge in a Meghalaya rainforest, one turning back to the other and smiling. Thick intertwined fig roots form the walkway, a clear turquoise stream runs over pale boulders below, bright sunlight pours through gaps in the canopy and dapples everything. Vivid greens, sparkling water, warm and adventurous.',
  },
  {
    id: 'pkg-assam-kaziranga',
    usedOn: '/packages/kaziranga-and-the-brahmaputra — hero',
    subject: 'Golden grassland and wetland at sunrise, full of birds',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 1600,
    alt: 'Golden elephant grass and open wetland at sunrise in the Assam floodplain, with egrets rising off the water',
    prompt:
      'Sunrise over the Assam floodplain: golden elephant grass catching warm low light, open wetland pools glowing, a scatter of white egrets lifting off the water. Blue hills on the horizon, soft pink and gold sky, a few silk-cotton trees. Fresh, bright, full of life and movement.',
  },
  {
    id: 'pkg-assam-tea',
    usedOn: '/packages/upper-assam-tea-and-river-towns — hero',
    subject: 'Vivid green tea garden under a big blue sky',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'medium',
    style: 'lively',
    width: 1600,
    alt: 'Bright green rows of tea bushes stretching to the horizon under a blue sky with tall white clouds',
    prompt:
      'Brilliant green rows of tea bushes running to the horizon in Upper Assam under a huge blue sky stacked with white cumulus, tall shade trees casting long morning shadows, a red dirt track curving through the garden. Saturated, fresh, sunlit, cheerful.',
  },
  {
    id: 'pkg-arunachal-tawang',
    usedOn: '/packages/tawang-high-passes — hero',
    subject: 'Colourful prayer flags on a sunlit high pass',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 1600,
    alt: 'Bright prayer flags strung across a high Himalayan pass with snow peaks under a deep blue sky',
    prompt:
      'Masses of brightly coloured prayer flags — red, yellow, blue, green, white — snapping in the wind across a high pass in the eastern Himalaya, with brilliant snow-covered peaks behind under a deep blue high-altitude sky. Crisp sunlight, sharp clean air, patches of snow on golden grass. Exhilarating and vivid.',
  },
  {
    id: 'pkg-sikkim-north',
    usedOn: '/packages/north-sikkim-valleys — hero',
    subject: 'Alpine valley with wildflowers and snow peaks',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 1600,
    alt: 'A green alpine valley in North Sikkim carpeted with wildflowers below bright snow-covered peaks',
    prompt:
      'A broad alpine valley in North Sikkim in early summer: green meadow carpeted with yellow and pink wildflowers, a clear braided stream running through it, brilliant snow-covered peaks rising behind under a deep blue sky. A few yaks grazing in the middle distance. Bright, fresh, joyful high-mountain colour.',
  },
  {
    id: 'pkg-nagaland-hills',
    usedOn: '/packages/nagaland-hills-and-hornbill — hero',
    subject: 'Sunlit ridge village above a sea of white cloud',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 1600,
    alt: 'A hillside village in the Naga hills catching morning sun above a valley filled with white cloud',
    prompt:
      'A village of tin-roofed houses along a green ridge in the Naga hills, catching bright morning sunlight above a valley filled with brilliant white cloud. Terraced vegetable plots and flowering trees between the houses, blue ridges breaking through the cloud beyond, clear blue sky above. Warm, alive, uplifting.',
  },
  {
    id: 'pkg-northeast-circuit',
    usedOn: '/packages/northeast-grand-circuit — hero',
    subject: 'Wide bright river with a ferry and golden sandbanks',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 1600,
    alt: 'A wide sunlit river in Assam with golden sandbanks and a small passenger ferry crossing',
    prompt:
      'The Brahmaputra on a bright afternoon: an immense sparkling river split by warm golden sandbanks, a small wooden passenger ferry crossing with people sitting along its roof, blue hills on the far bank, big white clouds in a blue sky. Wide, sunlit, full of life and colour.',
  },
  {
    id: 'pkg-meghalaya-family',
    usedOn: '/packages/meghalaya-easy-family-loop — hero',
    subject: 'Family in a rowing boat on a bright green lake',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 1600,
    alt: 'A family in a small rowing boat on a bright green lake ringed with pine forest',
    prompt:
      'A family of four in a small brightly painted rowing boat on a clear green lake ringed with pine forest in the Meghalaya highlands, the children trailing hands in the water and laughing, a parent rowing. Sunny afternoon, sparkling water, blue sky with white cloud, warm relaxed holiday feeling.',
  },

  {
    id: 'cabs-hero',
    usedOn: '/cabs — hero',
    subject: 'Family loading a car at the start of a sunny trip',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 2000,
    alt: 'A family loading bags into a clean white car parked on a sunny hill road with green slopes behind',
    prompt:
      'A young family loading bags into the back of a clean white car parked on the shoulder of a sunlit hill road in Northeast India, a child already climbing into the back seat, everyone in bright everyday clothes and clearly in a good mood. Vivid green slopes and blue sky behind, warm morning light. No badges, no branding, no lettering, no number plate.',
  },
  {
    id: 'cabs-airport',
    usedOn: '/cabs — airport transfer card',
    subject: 'Sunny arrivals kerb outside a small regional airport',
    aspect: '4:3',
    size: '1024x1024',
    quality: 'medium',
    style: 'lively',
    width: 1000,
    alt: 'A sunny kerbside pickup lane outside a small regional airport with palms, parked cars and arriving travellers',
    prompt:
      'The kerbside arrivals lane outside a small regional airport in Northeast India on a bright sunny day: a few clean white cars waiting, travellers wheeling suitcases out under a concrete canopy, palms and vivid green hills beyond the car park, blue sky. Cheerful, easy, everything going smoothly. No text or signage anywhere.',
  },
  {
    id: 'cabs-outstation',
    usedOn: '/cabs — outstation card',
    subject: 'Sunlit highway running through bright green countryside',
    aspect: '4:3',
    size: '1024x1024',
    quality: 'medium',
    style: 'lively',
    width: 1000,
    alt: 'A long highway running through bright green Assamese countryside under a blue sky',
    prompt:
      'A long open highway running through vivid green Assamese countryside on a bright morning, banana and bamboo along the verge, a river bridge ahead, blue sky with big white clouds. Warm sunlight, saturated greens, a sense of an easy road trip beginning. No text or signage.',
  },
  {
    id: 'cabs-ev',
    usedOn: '/cabs — EV fleet section',
    subject: 'Electric car charging in bright sunshine',
    aspect: '4:3',
    size: '1024x1024',
    quality: 'medium',
    style: 'lively',
    width: 1000,
    alt: 'A white electric car plugged into an outdoor charging post beside bright green hedges in sunshine',
    prompt:
      'A clean white electric car plugged into a simple outdoor charging post on a sunny day, bright green hedges and flowering shrubs behind, blue sky, the charging cable curving down to the car. Crisp warm sunlight, fresh and optimistic. No logos, no screens with text, no number plate.',
  },

  {
    id: 'corporate-hero',
    usedOn: '/corporate — hero',
    subject: 'Colleagues boarding vans on a bright morning',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 2000,
    alt: 'A group of colleagues boarding clean white passenger vans in an open yard on a bright morning',
    prompt:
      'A group of young colleagues in smart casual clothes boarding two clean white passenger vans in an open yard on a bright sunny morning, some carrying bags and coffee, talking and laughing as they climb in. Green hills and blue sky behind, warm early light on the vehicles. Completely unbranded vans, no lettering, no number plates.',
  },

  {
    id: 'festivals-hero',
    usedOn: '/festivals — hero',
    subject: 'Bright daytime festival dance in full colour',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 2000,
    alt: 'Dancers in bright traditional dress performing at an outdoor festival ground in Northeast India in daylight',
    prompt:
      'An outdoor festival ground in a Northeast Indian hill town in bright afternoon sunshine: rows of dancers in vivid red, black and white handwoven dress mid-movement, feathers and beadwork catching the light, a happy crowd of families watching from the grass, colourful stalls at the edge of the frame. Saturated colour, blue sky, real celebratory energy, faces candid and joyful.',
  },
  {
    id: 'festival-textiles',
    usedOn: '/festivals — craft and textile card',
    subject: 'Vivid handwoven shawls in sunlight',
    aspect: '4:3',
    size: '1024x1024',
    quality: 'medium',
    style: 'detail',
    width: 1000,
    alt: 'Brightly coloured handwoven shawls with red and black geometric patterns stacked in sunlight',
    prompt:
      'A close view of vividly coloured handwoven shawls with red, black, yellow and white geometric banding, stacked and hung on a wooden loom in bright daylight, a bamboo shuttle resting on the warp. Rich saturated dye colour, crisp sunlight, beautiful craft texture. No people, no text.',
  },
  {
    id: 'festival-drums',
    usedOn: '/festivals — music and dance card',
    subject: 'Drummers playing in bright daylight',
    aspect: '4:3',
    size: '1024x1024',
    quality: 'medium',
    style: 'lively',
    width: 1000,
    alt: 'Drummers in traditional dress playing long hand drums outdoors in bright sunlight',
    prompt:
      'Three drummers in bright traditional Northeast Indian dress playing long wooden hand drums outdoors in strong afternoon sunlight, mid-beat, clearly enjoying themselves. Green trees and blue sky behind, warm colour, motion in the hands. Candid and energetic. No text.',
  },

  {
    id: 'impact-hero',
    usedOn: '/impact — hero',
    subject: 'Sunlit terraced smallholdings on a green hillside',
    aspect: '3:2',
    size: '1536x1024',
    quality: 'high',
    style: 'lively',
    width: 2000,
    alt: 'Bright green terraced fields and small homesteads on a hillside in warm afternoon light',
    prompt:
      'Bright green terraced vegetable fields and a handful of small homesteads on a Northeast Indian hillside in warm late-afternoon light, laundry drying on a line, bamboo groves between the plots, flowering trees, forested ridges layered into blue distance. Rich saturated green, golden light, a place clearly lived in and cared for.',
  },
  {
    id: 'impact-forest',
    usedOn: '/impact — low-impact travel section',
    subject: 'Sunlit forest interior, vivid green',
    aspect: '4:3',
    size: '1024x1024',
    quality: 'medium',
    style: 'detail',
    width: 1000,
    alt: 'Sunlight streaming through the vivid green interior of a broadleaf forest with ferns and moss',
    prompt:
      'The interior of a lush broadleaf forest in Northeast India with strong sunlight streaming through the canopy in visible shafts, lighting up ferns, moss and translucent green leaves. Vivid fresh greens, sparkling highlights, humid and alive. No path, no people, no text.',
  },
]
