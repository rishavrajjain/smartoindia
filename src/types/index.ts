/**
 * Shared domain types for the Smarto catalog.
 *
 * `ContentStatus` exists so that owner-controlled records carry their own
 * provenance. Anything still marked `"mock"` is placeholder copy written by the
 * build team and must not be presented to visitors as verified business fact.
 */
export type ContentStatus = "mock" | "verified";

export const NORTHEAST_STATES = [
  "Assam",
  "Meghalaya",
  "Arunachal Pradesh",
  "Sikkim",
  "Nagaland",
  "Multi-state",
] as const;

export type NortheastState = (typeof NORTHEAST_STATES)[number];

export const TRAVELLER_TYPES = [
  "Couples",
  "Families",
  "Small groups",
  "Solo travellers",
  "Corporate teams",
] as const;

export type TravellerType = (typeof TRAVELLER_TYPES)[number];

export const PACKAGE_TAGS = [
  "Nature",
  "Culture",
  "Slow travel",
  "Road trip",
  "Wildlife",
  "High altitude",
  "Easy pace",
  "Festival",
] as const;

export type PackageTag = (typeof PACKAGE_TAGS)[number];

export type Season =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

export interface ItineraryDay {
  /** 1-indexed day number within the trip. */
  day: number;
  title: string;
  description: string;
  /** Where the traveller sleeps that night, or `null` for a departure day. */
  stay: string | null;
}

export interface SiteImage {
  /** Path under `/public`, e.g. `/images/home-hero.webp`. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface TravelPackage {
  slug: string;
  title: string;
  /** One-sentence summary used on cards and in metadata. */
  summary: string;
  state: NortheastState;
  /** Named stops, in route order. */
  destinations: string[];
  durationDays: number;
  /** Human label such as "6 days, 5 nights". */
  durationLabel: string;
  idealFor: TravellerType[];
  bestSeason: Season[];
  bestSeasonLabel: string;
  hero: SiteImage;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  stayNotes: string;
  transportNotes: string;
  tags: PackageTag[];
  featured: boolean;
  /** Always "Request a quote" for the MVP. Never show an invented number. */
  priceLabel: string;
  /** Prefilled WhatsApp body for this package. */
  enquiry: string;
  status: ContentStatus;
}

export interface CabService {
  id: string;
  name: string;
  summary: string;
  /** What the service covers, as short scannable lines. */
  details: string[];
  /** Typical use cases, shown as small tags. */
  bestFor: string[];
  image?: SiteImage;
  enquiry: string;
  status: ContentStatus;
}

export interface VehicleClass {
  id: string;
  name: string;
  seats: string;
  description: string;
  /** True only for battery-electric vehicle classes. */
  electric: boolean;
  status: ContentStatus;
}

export interface Festival {
  id: string;
  name: string;
  state: NortheastState;
  /** Month the festival usually falls in. Exact dates shift year to year. */
  month: Season;
  monthLabel: string;
  /** The year this timing was last checked against a public source. */
  timingYear: number;
  /** Where the timing came from, so it can be re-verified before publishing. */
  timingSource: string;
  summary: string;
  whatToExpect: string[];
  travelNote: string;
  enquiry: string;
  status: ContentStatus;
}

export interface Review {
  id: string;
  /** Fictional first name or neutral label. Never a real named customer. */
  author: string;
  /** Trip context, not a verified booking record. */
  context: string;
  quote: string;
  status: ContentStatus;
}

export interface ImpactCommitment {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
}
