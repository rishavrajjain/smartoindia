import type { ContentStatus, SiteImage } from "@/types";

/*
 * Smarto's international sample itineraries, one per destination.
 *
 * Written from scratch by the build team from widely known routes and
 * sights; nothing here is copied or reworded from another operator's
 * itineraries. Every trip is one continuous route: you fly into one city,
 * stay in each place exactly once, and fly home from the last, so nobody
 * is sent back to somewhere they have already stayed. The check at the
 * bottom of this file enforces that at build time.
 *
 * No prices, hotel names or inclusions: Smarto tailors dates, pace and
 * stays and quotes all-in on WhatsApp. Status stays "mock" until Manav has
 * reviewed each route.
 */

export type IntlRegionName =
  | "Near India"
  | "Southeast Asia"
  | "Middle East & Central Asia"
  | "Europe"
  | "East Asia & Oceania"
  | "Africa & Indian Ocean";

export const INTL_REGION_ORDER: IntlRegionName[] = [
  "Near India",
  "Southeast Asia",
  "Middle East & Central Asia",
  "Europe",
  "East Asia & Oceania",
  "Africa & Indian Ocean",
];

export interface IntlStop {
  place: string;
  nights: number;
  /** One line per day spent here; the first is the day you arrive. */
  days: string[];
}

export interface IntlTrip {
  slug: string;
  country: string;
  region: IntlRegionName;
  title: string;
  subtitle: string;
  flyIn: string;
  flyOut: string;
  /** Said plainly when the way home connects through another airport. */
  flyOutNote?: string;
  stops: IntlStop[];
  bestMonths: string;
  idealFor: string;
  pace: "Easy" | "Moderate" | "Active";
  highlights: string[];
  image: SiteImage;
  status: ContentStatus;
}

function image(id: string, alt: string): SiteImage {
  return { src: `/images/${id}.webp`, alt, width: 1400, height: 933 };
}

export const INTL_TRIPS: IntlTrip[] = [
  /* --- Near India */
  {
    slug: "bhutan",
    country: "Bhutan",
    region: "Near India",
    title: "Thimphu, Punakha and Paro",
    subtitle: "The kingdom next door, from the capital to the Tiger's Nest.",
    flyIn: "Paro",
    flyOut: "Paro",
    stops: [
      {
        place: "Thimphu",
        nights: 2,
        days: [
          "Fly into Paro and drive up the valley to Thimphu.",
          "Buddha Dordenma, the weekend market and the textile museum.",
        ],
      },
      {
        place: "Punakha",
        nights: 2,
        days: [
          "Over the Dochula pass and its 108 chortens to Punakha.",
          "Punakha Dzong at the meeting of two rivers, and the long suspension bridge.",
        ],
      },
      {
        place: "Paro",
        nights: 2,
        days: [
          "Back west to Paro valley and Rinpung Dzong.",
          "The hike to Tiger's Nest monastery, clinging to the cliff.",
        ],
      },
    ],
    bestMonths: "March to May, and September to November",
    idealFor: "Couples, families and first trips abroad",
    pace: "Moderate",
    highlights: ["Tiger's Nest hike", "Dochula pass", "Punakha Dzong"],
    image: image("intl-himalaya", "Terraced fields and whitewashed farmhouses in a Himalayan valley under snow peaks"),
    status: "mock",
  },
  {
    slug: "sri-lanka",
    country: "Sri Lanka",
    region: "Near India",
    title: "Rock fortress, tea hills and the south coast",
    subtitle: "Ancient cities, a famous train ride and a fort by the sea.",
    flyIn: "Colombo",
    flyOut: "Colombo",
    stops: [
      {
        place: "Sigiriya",
        nights: 2,
        days: [
          "Land in Colombo and drive to the Cultural Triangle.",
          "Climb Sigiriya rock at first light; Dambulla's cave temples after.",
        ],
      },
      {
        place: "Kandy",
        nights: 1,
        days: ["To Kandy, its lake and the Temple of the Tooth."],
      },
      {
        place: "Nuwara Eliya",
        nights: 1,
        days: ["Up into tea country, with a tea factory on the way."],
      },
      {
        place: "Ella",
        nights: 1,
        days: ["The hill-country train to Ella, the prettiest ride on the island."],
      },
      {
        place: "Galle",
        nights: 2,
        days: [
          "Down to the south coast, with a safari stop if you like.",
          "Galle Fort's ramparts in the morning, the beach after.",
        ],
      },
    ],
    bestMonths: "December to April",
    idealFor: "Couples and families who like variety",
    pace: "Moderate",
    highlights: ["Sigiriya rock", "Kandy to Ella by train", "Galle Fort"],
    image: image("intl-sri-lanka", "Rolling tea estates on steep green slopes in Sri Lankan hill country"),
    status: "mock",
  },
  {
    slug: "maldives",
    country: "Maldives",
    region: "Near India",
    title: "An island resort, and nothing else",
    subtitle: "One island, one lagoon, no packing and unpacking.",
    flyIn: "Malé",
    flyOut: "Malé",
    stops: [
      {
        place: "Your resort island",
        nights: 4,
        days: [
          "Land in Malé and cross to your island by speedboat or seaplane.",
          "Snorkel the house reef with turtles and reef fish.",
          "A sandbank picnic, or a sunset cruise to look for dolphins.",
          "A day for the spa, or for doing nothing at all.",
        ],
      },
    ],
    bestMonths: "November to April",
    idealFor: "Honeymoons and slow holidays",
    pace: "Easy",
    highlights: ["Overwater villas", "House-reef snorkelling", "Sandbank picnic"],
    image: image("intl-maldives", "Overwater villas on stilts over a turquoise lagoon"),
    status: "mock",
  },

  /* --- Southeast Asia */
  {
    slug: "thailand",
    country: "Thailand",
    region: "Southeast Asia",
    title: "Bangkok and the Andaman coast",
    subtitle: "Temples and street food, then islands and longtail boats.",
    flyIn: "Bangkok",
    flyOut: "Phuket",
    stops: [
      {
        place: "Bangkok",
        nights: 3,
        days: [
          "Arrive and settle in; an evening boat on the Chao Phraya.",
          "The Grand Palace and Wat Pho in the cool of the morning, night markets after dark.",
          "The floating markets and Ayutthaya's ruins, or a free day.",
        ],
      },
      {
        place: "Krabi",
        nights: 2,
        days: [
          "Fly south; sunset at Ao Nang.",
          "Longtail boats to the islands and beaches around Railay.",
        ],
      },
      {
        place: "Phuket",
        nights: 2,
        days: [
          "Drive across to Phuket and wander the Old Town.",
          "A beach day, or a boat into Phang Nga Bay.",
        ],
      },
    ],
    bestMonths: "November to March",
    idealFor: "First trips abroad, friends and families",
    pace: "Moderate",
    highlights: ["Grand Palace", "Railay by longtail", "Phang Nga Bay"],
    image: image("intl-southeast-asia", "A turquoise bay with limestone cliffs and wooden longtail boats"),
    status: "mock",
  },
  {
    slug: "bali",
    country: "Bali",
    region: "Southeast Asia",
    title: "Ubud's rice terraces and the south coast",
    subtitle: "Jungle and temples inland, then cliffs and sunsets by the sea.",
    flyIn: "Denpasar",
    flyOut: "Denpasar",
    stops: [
      {
        place: "Ubud",
        nights: 3,
        days: [
          "Land at Denpasar and drive up to Ubud.",
          "Tegallalang's rice terraces and a water temple.",
          "A sunrise trek on Mount Batur, or a slow day of cafés and craft villages.",
        ],
      },
      {
        place: "Seminyak",
        nights: 3,
        days: [
          "Down to the coast, stopping at Tanah Lot for sunset.",
          "A beach day in Seminyak.",
          "Uluwatu's cliff-top temple and the fire dance at dusk.",
        ],
      },
    ],
    bestMonths: "April to October",
    idealFor: "Honeymoons and friends",
    pace: "Easy",
    highlights: ["Tegallalang terraces", "Mount Batur sunrise", "Uluwatu at dusk"],
    image: image("intl-bali", "Emerald rice terraces curving down a valley in morning mist"),
    status: "mock",
  },
  {
    slug: "vietnam",
    country: "Vietnam",
    region: "Southeast Asia",
    title: "Hanoi to Ho Chi Minh City",
    subtitle: "North to south in one line: bay, lanterns and the Mekong.",
    flyIn: "Hanoi",
    flyOut: "Ho Chi Minh City",
    stops: [
      {
        place: "Hanoi",
        nights: 2,
        days: [
          "Arrive; the Old Quarter on foot and its street food.",
          "The Temple of Literature and Hoan Kiem Lake.",
        ],
      },
      {
        place: "Ha Long Bay",
        nights: 1,
        days: ["Drive to the coast and board an overnight cruise among the limestone islands."],
      },
      {
        place: "Hoi An",
        nights: 2,
        days: [
          "Fly to Da Nang and settle into lantern-lit Hoi An.",
          "Tailors, the Japanese Bridge and a bike ride through the paddies.",
        ],
      },
      {
        place: "Ho Chi Minh City",
        nights: 2,
        days: [
          "Fly south to Ho Chi Minh City.",
          "The Cu Chi tunnels, or a day in the Mekong Delta.",
        ],
      },
    ],
    bestMonths: "February to April, and September to November",
    idealFor: "Couples and friends",
    pace: "Active",
    highlights: ["Ha Long Bay cruise", "Hoi An lanterns", "Mekong Delta"],
    image: image("intl-vietnam", "Limestone karst islands in a calm bay with a traditional junk boat"),
    status: "mock",
  },
  {
    slug: "singapore",
    country: "Singapore",
    region: "Southeast Asia",
    title: "Singapore, one easy city",
    subtitle: "One hotel, four days, every corner a short ride away.",
    flyIn: "Singapore",
    flyOut: "Singapore",
    stops: [
      {
        place: "Singapore",
        nights: 4,
        days: [
          "Arrive; the light show on Marina Bay.",
          "Gardens by the Bay and the Cloud Forest.",
          "Sentosa: beaches, the cable car and the attractions.",
          "Chinatown, Little India and Kampong Glam on foot.",
        ],
      },
    ],
    bestMonths: "All year",
    idealFor: "Families and short breaks",
    pace: "Easy",
    highlights: ["Gardens by the Bay", "Sentosa", "Hawker centres"],
    image: image("intl-singapore", "A tropical city waterfront at blue hour with gardens on the towers"),
    status: "mock",
  },
  {
    slug: "malaysia",
    country: "Malaysia",
    region: "Southeast Asia",
    title: "Kuala Lumpur and Langkawi",
    subtitle: "Towers and caves in the city, then an island in the Andaman Sea.",
    flyIn: "Kuala Lumpur",
    flyOut: "Langkawi",
    flyOutNote: "Connections home run via Kuala Lumpur airport.",
    stops: [
      {
        place: "Kuala Lumpur",
        nights: 3,
        days: [
          "Arrive; the Petronas Towers after dark.",
          "Batu Caves in the morning, Bukit Bintang in the evening.",
          "A day up at Genting Highlands, or around Putrajaya.",
        ],
      },
      {
        place: "Langkawi",
        nights: 3,
        days: [
          "Fly to the island.",
          "The cable car and the SkyBridge above the rainforest.",
          "Island hopping, with a stop at the lake of the pregnant maiden.",
        ],
      },
    ],
    bestMonths: "November to April",
    idealFor: "Families and first trips abroad",
    pace: "Easy",
    highlights: ["Petronas Towers", "Batu Caves", "Langkawi SkyBridge"],
    image: image("intl-malaysia", "Rainforest-covered islands rising from a turquoise sea"),
    status: "mock",
  },
  {
    slug: "philippines",
    country: "Philippines",
    region: "Southeast Asia",
    title: "El Nido and Coron",
    subtitle: "Palawan's lagoons, cliffs and wrecks, island to island.",
    flyIn: "Manila",
    flyOut: "Coron",
    flyOutNote: "Connections home run via Manila airport.",
    stops: [
      {
        place: "Manila",
        nights: 1,
        days: ["Arrive in Manila; Intramuros at dusk."],
      },
      {
        place: "El Nido",
        nights: 3,
        days: [
          "Fly to Palawan and drive up to El Nido.",
          "Island hopping: lagoons, caves and hidden beaches.",
          "A slow beach day, or kayaking the Big Lagoon.",
        ],
      },
      {
        place: "Coron",
        nights: 2,
        days: [
          "Ferry across to Coron.",
          "Snorkelling over wartime wrecks and swimming in Kayangan Lake.",
        ],
      },
    ],
    bestMonths: "November to May",
    idealFor: "Friends and couples who love the water",
    pace: "Active",
    highlights: ["El Nido lagoons", "Coron wrecks", "Kayangan Lake"],
    image: image("intl-philippines", "A hidden lagoon with limestone cliffs and an outrigger boat"),
    status: "mock",
  },

  /* --- Middle East & Central Asia */
  {
    slug: "dubai",
    country: "Dubai",
    region: "Middle East & Central Asia",
    title: "Dubai and Abu Dhabi",
    subtitle: "Towers, dunes and old souks, then the capital's grand mosque.",
    flyIn: "Dubai",
    flyOut: "Abu Dhabi",
    stops: [
      {
        place: "Dubai",
        nights: 4,
        days: [
          "Arrive; an evening along Dubai Marina.",
          "Burj Khalifa and the fountains at Dubai Mall.",
          "Desert safari: dunes, camels and dinner under the stars.",
          "Old Dubai: an abra across the creek and the spice and gold souks.",
        ],
      },
      {
        place: "Abu Dhabi",
        nights: 1,
        days: ["Drive to Abu Dhabi and the Sheikh Zayed Grand Mosque."],
      },
    ],
    bestMonths: "November to March",
    idealFor: "Families, shoppers and short breaks",
    pace: "Easy",
    highlights: ["Burj Khalifa", "Desert safari", "Sheikh Zayed Grand Mosque"],
    image: image("intl-middle-east", "Golden desert dunes at sunset with a distant skyline"),
    status: "mock",
  },
  {
    slug: "turkey",
    country: "Turkey",
    region: "Middle East & Central Asia",
    title: "Istanbul, Cappadocia and Ephesus",
    subtitle: "Two continents, a sky full of balloons and a Roman city.",
    flyIn: "Istanbul",
    flyOut: "Izmir",
    stops: [
      {
        place: "Istanbul",
        nights: 3,
        days: [
          "Arrive; an evening by the Bosphorus.",
          "Hagia Sophia, the Blue Mosque and Topkapi Palace.",
          "The Grand Bazaar, then a ferry to the Asian side.",
        ],
      },
      {
        place: "Cappadocia",
        nights: 2,
        days: [
          "Fly to Cappadocia; cave hotels and fairy chimneys.",
          "A sunrise balloon flight, weather permitting, and the Göreme open-air museum.",
        ],
      },
      {
        place: "Kuşadası",
        nights: 2,
        days: [
          "Fly to Izmir and drive down to the Aegean coast.",
          "The ruins of Ephesus, and the House of the Virgin Mary.",
        ],
      },
    ],
    bestMonths: "April to June, and September to October",
    idealFor: "Couples and history lovers",
    pace: "Moderate",
    highlights: ["Hagia Sophia", "Cappadocia balloons", "Ephesus"],
    image: image("intl-turkey", "Fairy chimneys in Cappadocia at sunrise with hot-air balloons"),
    status: "mock",
  },
  {
    slug: "azerbaijan",
    country: "Azerbaijan",
    region: "Middle East & Central Asia",
    title: "The Caucasus foothills and Baku",
    subtitle: "Mountain towns on the silk road, then the Caspian capital.",
    flyIn: "Baku",
    flyOut: "Baku",
    stops: [
      {
        place: "Gabala",
        nights: 1,
        days: ["Land in Baku and drive north-west through Shamakhi to the foothills at Gabala."],
      },
      {
        place: "Sheki",
        nights: 2,
        days: [
          "On to Sheki, an old silk-road town.",
          "The Khan's Palace and a night in a caravanserai-style inn.",
        ],
      },
      {
        place: "Baku",
        nights: 3,
        days: [
          "Back to the Caspian coast and into Baku.",
          "The walled Old City, Maiden Tower and the Flame Towers lit at night.",
          "Gobustan's rock carvings and the mud volcanoes.",
        ],
      },
    ],
    bestMonths: "May to June, and September to October",
    idealFor: "Couples and repeat travellers",
    pace: "Moderate",
    highlights: ["Sheki Khan's Palace", "Baku Old City", "Gobustan"],
    image: image("intl-azerbaijan", "A stone village in the Caucasus foothills in autumn"),
    status: "mock",
  },
  {
    slug: "kazakhstan",
    country: "Kazakhstan",
    region: "Middle East & Central Asia",
    title: "Almaty and the Tian Shan",
    subtitle: "One base in the city, day trips to lakes, peaks and a canyon.",
    flyIn: "Almaty",
    flyOut: "Almaty",
    stops: [
      {
        place: "Almaty",
        nights: 5,
        days: [
          "Arrive; Panfilov Park and the wooden Zenkov Cathedral.",
          "Up to Shymbulak by cable car, snow or summer.",
          "Big Almaty Lake, high in the mountains.",
          "A long day out to Charyn Canyon.",
          "The Green Bazaar and a slow last evening.",
        ],
      },
    ],
    bestMonths: "May to September",
    idealFor: "Friends and couples who like the outdoors",
    pace: "Moderate",
    highlights: ["Shymbulak", "Big Almaty Lake", "Charyn Canyon"],
    image: image("intl-kazakhstan", "A turquoise mountain lake among spruce forest and snowy peaks"),
    status: "mock",
  },

  /* --- Europe */
  {
    slug: "europe",
    country: "Europe",
    region: "Europe",
    title: "Paris and the Swiss Alps",
    subtitle: "France by the Seine, then mountains, lakes and trains.",
    flyIn: "Paris",
    flyOut: "Zurich",
    stops: [
      {
        place: "Paris",
        nights: 3,
        days: [
          "Arrive; a cruise on the Seine at dusk.",
          "The Eiffel Tower and the Louvre.",
          "Montmartre, or a day at Disneyland Paris.",
        ],
      },
      {
        place: "Interlaken",
        nights: 3,
        days: [
          "The fast train to Switzerland and on to Interlaken.",
          "Up to the Jungfraujoch, the top of Europe.",
          "Grindelwald First, or a day on Lake Thun and Lake Brienz.",
        ],
      },
      {
        place: "Lucerne",
        nights: 1,
        days: ["To Lucerne: the Chapel Bridge and Mount Pilatus."],
      },
    ],
    bestMonths: "May to September",
    idealFor: "Honeymoons and families",
    pace: "Moderate",
    highlights: ["Eiffel Tower", "Jungfraujoch", "Lake Lucerne"],
    image: image("intl-europe", "Pastel houses and a small church beside an alpine lake"),
    status: "mock",
  },
  {
    slug: "greece",
    country: "Greece",
    region: "Europe",
    title: "Athens, Mykonos and Santorini",
    subtitle: "The Acropolis, then two islands by ferry across the Aegean.",
    flyIn: "Athens",
    flyOut: "Santorini",
    flyOutNote: "Connections home run via Athens airport.",
    stops: [
      {
        place: "Athens",
        nights: 2,
        days: [
          "Arrive; dinner in the Plaka under the Acropolis.",
          "The Acropolis and its museum.",
        ],
      },
      {
        place: "Mykonos",
        nights: 2,
        days: [
          "Ferry to Mykonos; the windmills and Little Venice.",
          "Beaches, or a boat to the ancient island of Delos.",
        ],
      },
      {
        place: "Santorini",
        nights: 3,
        days: [
          "Ferry on to Santorini.",
          "Oia and its famous sunset.",
          "A volcano and hot-springs cruise, or an afternoon at a winery.",
        ],
      },
    ],
    bestMonths: "May to October",
    idealFor: "Honeymoons and couples",
    pace: "Moderate",
    highlights: ["Acropolis", "Mykonos windmills", "Oia sunset"],
    image: image("intl-greece", "Whitewashed houses and blue domes above the Aegean at golden hour"),
    status: "mock",
  },
  {
    slug: "uk",
    country: "UK",
    region: "Europe",
    title: "London, York and Edinburgh",
    subtitle: "South to north by train, with a day in the Highlands.",
    flyIn: "London",
    flyOut: "Edinburgh",
    stops: [
      {
        place: "London",
        nights: 3,
        days: [
          "Arrive; the South Bank on foot.",
          "Westminster, Buckingham Palace and a West End show.",
          "The British Museum and Camden, or a day at Windsor.",
        ],
      },
      {
        place: "York",
        nights: 1,
        days: ["Train north to York: the Minster and the Shambles."],
      },
      {
        place: "Edinburgh",
        nights: 3,
        days: [
          "On to Edinburgh and up the Royal Mile.",
          "Edinburgh Castle, then Arthur's Seat for the view.",
          "A day in the Highlands: Glencoe and Loch Ness.",
        ],
      },
    ],
    bestMonths: "May to September",
    idealFor: "Families and first trips to Europe",
    pace: "Moderate",
    highlights: ["West End show", "York Minster", "Scottish Highlands"],
    image: image("intl-uk", "A long still loch between green hills in the Scottish Highlands"),
    status: "mock",
  },

  /* --- East Asia & Oceania */
  {
    slug: "japan",
    country: "Japan",
    region: "East Asia & Oceania",
    title: "Tokyo, Hakone, Kyoto and Osaka",
    subtitle: "The golden route by bullet train, east to west.",
    flyIn: "Tokyo",
    flyOut: "Osaka",
    stops: [
      {
        place: "Tokyo",
        nights: 3,
        days: [
          "Arrive; the Shibuya crossing after dark.",
          "Senso-ji in Asakusa and the Skytree.",
          "Harajuku and Shinjuku, or a day trip to Nikko.",
        ],
      },
      {
        place: "Hakone",
        nights: 1,
        days: ["Train to Hakone: a lake cruise, hot springs and Mount Fuji if the sky is clear."],
      },
      {
        place: "Kyoto",
        nights: 3,
        days: [
          "Bullet train to Kyoto.",
          "Fushimi Inari's gates and Kiyomizu-dera.",
          "Arashiyama's bamboo grove, or Nara's deer park.",
        ],
      },
      {
        place: "Osaka",
        nights: 1,
        days: ["On to Osaka and the street food of Dotonbori."],
      },
    ],
    bestMonths: "March to May, and October to November",
    idealFor: "Couples, friends and families",
    pace: "Active",
    highlights: ["Bullet train", "Fushimi Inari", "Mount Fuji views"],
    image: image("intl-japan", "Mount Fuji across a calm lake with cherry blossom"),
    status: "mock",
  },
  {
    slug: "australia",
    country: "Australia",
    region: "East Asia & Oceania",
    title: "Melbourne, Sydney and the Gold Coast",
    subtitle: "Coast roads, a famous harbour and theme parks by the sea.",
    flyIn: "Melbourne",
    flyOut: "Brisbane",
    stops: [
      {
        place: "Melbourne",
        nights: 3,
        days: [
          "Arrive; laneways and coffee.",
          "The Great Ocean Road and the Twelve Apostles.",
          "Phillip Island's penguin parade at dusk.",
        ],
      },
      {
        place: "Sydney",
        nights: 3,
        days: [
          "Fly to Sydney; the Opera House and the Harbour Bridge.",
          "The coastal walk from Bondi to Coogee.",
          "A day in the Blue Mountains.",
        ],
      },
      {
        place: "Gold Coast",
        nights: 2,
        days: [
          "Fly to the Gold Coast.",
          "Theme parks, or the rainforest in the hinterland.",
        ],
      },
    ],
    bestMonths: "September to November, and March to May",
    idealFor: "Families and friends",
    pace: "Moderate",
    highlights: ["Great Ocean Road", "Sydney Harbour", "Gold Coast"],
    image: image("intl-australia", "Golden limestone sea stacks off a rugged coast at sunset"),
    status: "mock",
  },
  {
    slug: "new-zealand",
    country: "New Zealand",
    region: "East Asia & Oceania",
    title: "Auckland, Rotorua and Queenstown",
    subtitle: "Harbour city, geysers, then the fiords of the south.",
    flyIn: "Auckland",
    flyOut: "Queenstown",
    flyOutNote: "Connections home run via Auckland airport.",
    stops: [
      {
        place: "Auckland",
        nights: 2,
        days: [
          "Arrive; the harbour and the Sky Tower.",
          "Waiheke Island's beaches and vineyards.",
        ],
      },
      {
        place: "Rotorua",
        nights: 2,
        days: [
          "Drive south by way of Hobbiton.",
          "Geysers and mud pools, then a Māori cultural evening.",
        ],
      },
      {
        place: "Queenstown",
        nights: 3,
        days: [
          "Fly south to Queenstown.",
          "A long, beautiful day to Milford Sound.",
          "The gondola, the lake and, if you dare, a bungy jump.",
        ],
      },
    ],
    bestMonths: "November to April",
    idealFor: "Couples and adventurous families",
    pace: "Active",
    highlights: ["Hobbiton", "Rotorua geysers", "Milford Sound"],
    image: image("intl-new-zealand", "A fiord with sheer green cliffs and waterfalls"),
    status: "mock",
  },

  /* --- Africa & Indian Ocean */
  {
    slug: "mauritius",
    country: "Mauritius",
    region: "Africa & Indian Ocean",
    title: "Two coasts of Mauritius",
    subtitle: "Calm lagoons in the north, mountains and colour in the south-west.",
    flyIn: "Mauritius",
    flyOut: "Mauritius",
    stops: [
      {
        place: "Grand Baie",
        nights: 3,
        days: [
          "Arrive and transfer to the north coast.",
          "A catamaran day to the northern islets.",
          "Port Louis market and the Pamplemousses botanical garden.",
        ],
      },
      {
        place: "Le Morne",
        nights: 3,
        days: [
          "Move to the south-west; the seven-coloured earth at Chamarel.",
          "Île aux Cerfs, or a lagoon day under Le Morne.",
          "Black River Gorges on foot, or simply the beach.",
        ],
      },
    ],
    bestMonths: "May to December",
    idealFor: "Honeymoons and families",
    pace: "Easy",
    highlights: ["Catamaran day", "Chamarel", "Le Morne lagoon"],
    image: image("intl-mauritius", "A calm lagoon beneath a basalt mountain with a small wooden boat"),
    status: "mock",
  },
  {
    slug: "seychelles",
    country: "Seychelles",
    region: "Africa & Indian Ocean",
    title: "Praslin, La Digue and Mahé",
    subtitle: "Granite beaches and palm forests, island by island.",
    flyIn: "Mahé",
    flyOut: "Mahé",
    stops: [
      {
        place: "Praslin",
        nights: 3,
        days: [
          "Land on Mahé and take the ferry to Praslin.",
          "Vallée de Mai's palm forest and Anse Lazio.",
          "A day on La Digue by bike, to Anse Source d'Argent.",
        ],
      },
      {
        place: "Mahé",
        nights: 3,
        days: [
          "Ferry to Mahé and Beau Vallon beach.",
          "Victoria's market and the trails of Morne Seychellois.",
          "Snorkelling in the marine park.",
        ],
      },
    ],
    bestMonths: "April to May, and October to November",
    idealFor: "Honeymoons",
    pace: "Easy",
    highlights: ["Anse Source d'Argent", "Vallée de Mai", "Marine park"],
    image: image("intl-seychelles", "Granite boulders on a white beach with turquoise water"),
    status: "mock",
  },
  {
    slug: "south-africa",
    country: "South Africa",
    region: "Africa & Indian Ocean",
    title: "Cape Town and a Kruger safari",
    subtitle: "Mountain, penguins and winelands, then the bush.",
    flyIn: "Cape Town",
    flyOut: "Kruger",
    flyOutNote: "Connections home run via Johannesburg airport.",
    stops: [
      {
        place: "Cape Town",
        nights: 4,
        days: [
          "Arrive; the V&A Waterfront.",
          "Table Mountain by cable car, and the colours of Bo-Kaap.",
          "The Cape Peninsula: Boulders Beach penguins and Cape Point.",
          "The Winelands of Stellenbosch and Franschhoek.",
        ],
      },
      {
        place: "Kruger",
        nights: 3,
        days: [
          "Fly to the Kruger area and your safari lodge.",
          "Game drives at dawn and dusk.",
          "A last drive, then a slow afternoon at the lodge.",
        ],
      },
    ],
    bestMonths: "May to October",
    idealFor: "Couples and families",
    pace: "Moderate",
    highlights: ["Table Mountain", "Cape Point", "Kruger game drives"],
    image: image("intl-south-africa", "An African savanna at golden hour with acacia trees and giraffes"),
    status: "mock",
  },
];

/* --- Route rules, checked whenever the site builds. */
for (const trip of INTL_TRIPS) {
  const places = trip.stops.map((s) => s.place);
  const repeat = places.find((p, i) => places.indexOf(p) !== i);
  if (repeat) {
    throw new Error(`${trip.slug}: "${repeat}" is stayed in twice; each place must appear once.`);
  }
  for (const stop of trip.stops) {
    if (stop.days.length !== stop.nights) {
      throw new Error(`${trip.slug}: ${stop.place} has ${stop.nights} nights but ${stop.days.length} day plans.`);
    }
  }
}

export function tripNights(trip: IntlTrip): number {
  return trip.stops.reduce((sum, s) => sum + s.nights, 0);
}

export function findTrip(slug: string): IntlTrip | undefined {
  return INTL_TRIPS.find((t) => t.slug === slug);
}
