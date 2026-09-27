import type { ContentStatus } from "@/types";

/*
 * International trips, by region. Smarto plans international travel on
 * request (RRJ, 27 Sep 2026) but has no printed international itineraries
 * yet, so these are enquiry doors, not packages: no fixed routes, prices or
 * durations. The regions themselves are the build team's suggestion and
 * stay "mock" until Manav confirms which countries Smarto sells.
 */

export interface IntlRegion {
  id: string;
  name: string;
  /** Countries named on the tile, as examples within the region. */
  places: string[];
  line: string;
  image: string;
  alt: string;
  status: ContentStatus;
}

export const INTL_REGIONS: IntlRegion[] = [
  {
    id: "himalaya",
    name: "Bhutan & Nepal",
    places: ["Bhutan", "Nepal"],
    line: "Next door to the Northeast, a short hop away",
    image: "/images/intl-himalaya.webp",
    alt: "Terraced fields and whitewashed farmhouses in a Himalayan valley under snow peaks",
    status: "mock",
  },
  {
    id: "southeast-asia",
    name: "Southeast Asia",
    places: ["Thailand", "Bali", "Vietnam", "Singapore"],
    line: "Beaches, islands and easy city breaks",
    image: "/images/intl-southeast-asia.webp",
    alt: "A turquoise bay with limestone cliffs and wooden longtail boats",
    status: "mock",
  },
  {
    id: "middle-east",
    name: "Dubai & the Middle East",
    places: ["Dubai", "Abu Dhabi", "Oman"],
    line: "Desert evenings and city lights",
    image: "/images/intl-middle-east.webp",
    alt: "Golden desert dunes at sunset",
    status: "mock",
  },
  {
    id: "europe",
    name: "Europe",
    places: ["Switzerland", "France", "Italy"],
    line: "Lakes, mountains and old towns",
    image: "/images/intl-europe.webp",
    alt: "Pastel houses and a small church beside an alpine lake",
    status: "mock",
  },
];
