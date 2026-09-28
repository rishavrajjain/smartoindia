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
  /** Reviewer's first name and last initial as Google shows it, or "Google review". */
  author: string;
  /** Where the review is from and its rating, e.g. "Google, 5 stars". */
  context: string;
  /** Star rating, only where it was seen on Google; cards show stars only then. */
  rating?: number;
  quote: string;
  /** One-line pull quote for compact tiles, drawn from `quote`. */
  highlight: string;
  status: ContentStatus;
}

export interface ImpactCommitment {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
}

/*
 * The fifty-journey outstation catalog, transcribed from Manav's
 * "Smarto Travel, Outstation Packages" PDF (Aug 2026). Owner-supplied,
 * verified content, every field mirrors the printed catalog.
 */

export type JourneyLength = "Short escape" | "Mid-length" | "Extended";

export interface JourneyDay {
  /** 1-indexed day number within the journey. */
  day: number;
  title: string;
  /** Printed drive leg, e.g. "Guwahati to Shillong", or null for local days. */
  route: string | null;
  /** Printed drive time/distance, e.g. "3 hours, 100 km", or null. */
  drive: string | null;
  body: string;
  /** Where the traveller sleeps that night, or null on the departure day. */
  overnight: string | null;
}

export interface Journey {
  /** Catalog number as printed, e.g. "01". */
  num: string;
  slug: string;
  title: string;
  subtitle: string;
  /** Catalog group chips (Popular, Family, Offbeat, ...) minus length tiers. */
  styles: string[];
  /** Length tier, from the catalog's own grouping chips. */
  length: JourneyLength;
  /** True when the catalog groups this journey under Multi-state. */
  multiState: boolean;
  nights: number;
  days: number;
  states: NortheastState[];
  pace: string;
  /** The full printed route chain, stop by stop. */
  route: string[];
  vehicle: string;
  bestMonths: string;
  idealFor: string;
  itinerary: JourneyDay[];
  /** "Where you stay" bullets, hotel names and star ratings as printed. */
  stay: string[];
  included: string;
  notIncluded: string;
  /** Printed permit callout (Arunachal journeys), when the catalog has one. */
  permit?: string;
  /** Printed altitude advisory, when the catalog has one. */
  altitude?: string;
  /** Printed total-distance line, e.g. "960 km. Longest single driving day is 340 km." */
  routeNote?: string;
  /** Printed group-departure note, when the catalog has one. */
  groupNote?: string;
  hero: SiteImage;
  /** Prefilled WhatsApp body for this journey. */
  enquiry: string;
  status: ContentStatus;
}
