import { JOURNEYS } from "@/data/journeys";
import type { ContentStatus } from "@/types";

/*
 * Stays in Shillong and Cherrapunjee, taken from the "Where you stay" lines
 * of Manav's outstation catalog: names and star ratings as printed, notes
 * quoted from it, features drawn only from what those notes say. The
 * 3-star and budget tier names no hotel because the catalog names none;
 * those cards are an offer to suggest options on WhatsApp, pending Manav's
 * own list.
 */

export type StayTier = "5-star" | "4-star" | "3-star & budget";

export interface Stay {
  id: string;
  /** Exactly as the catalog prints it, used to count the journeys it is on. */
  name: string;
  place: "Shillong" | "Cherrapunjee";
  tier: StayTier;
  /** Star rating as printed; 3 for the budget tier's "up to 3-star". */
  stars: number;
  note: string;
  features: string[];
  /** A named hotel from the catalog, or an on-request tier with no name. */
  kind: "named" | "on-request";
  status: ContentStatus;
}

export const STAYS: Stay[] = [
  {
    id: "courtyard-shillong",
    name: "Courtyard by Marriott Shillong",
    place: "Shillong",
    tier: "5-star",
    stars: 5,
    note: "Brings international luxury to the heart of the city.",
    features: ["City centre", "International dining", "Lift access"],
    kind: "named",
    status: "verified",
  },
  {
    id: "polo-orchid-cherrapunjee",
    name: "Polo Orchid Resort, Cherrapunjee",
    place: "Cherrapunjee",
    tier: "4-star",
    stars: 4,
    note: "A premium resort perched on the edge of a cliff.",
    features: ["Clifftop", "Private balconies", "Waterfall views"],
    kind: "named",
    status: "verified",
  },
  {
    id: "vivanta-shillong",
    name: "Vivanta Meghalaya, Shillong",
    place: "Shillong",
    tier: "5-star",
    stars: 5,
    note: "Premium Taj hospitality in the heart of the city.",
    features: ["Taj hospitality", "Central", "Accessible"],
    kind: "named",
    status: "verified",
  },
  {
    id: "jiva-cherrapunjee",
    name: "Jiva Resort, Cherrapunjee",
    place: "Cherrapunjee",
    tier: "4-star",
    stars: 4,
    note: "High-end comfort with beautiful valley views.",
    features: ["Boutique", "Valley views"],
    kind: "named",
    status: "verified",
  },
  {
    id: "pinewood-shillong",
    name: "Pinewood Hotel, Shillong",
    place: "Shillong",
    tier: "4-star",
    stars: 4,
    note: "A stunning heritage property offering classic colonial elegance.",
    features: ["Heritage", "Colonial-era"],
    kind: "named",
    status: "verified",
  },
  {
    id: "budget-shillong",
    name: "3-star and budget stays",
    place: "Shillong",
    tier: "3-star & budget",
    stars: 3,
    note: "Tell us your budget and dates, and we will suggest clean, central options on WhatsApp.",
    features: ["On request", "Your budget"],
    kind: "on-request",
    status: "mock",
  },
  {
    id: "budget-cherrapunjee",
    name: "3-star and budget stays",
    place: "Cherrapunjee",
    tier: "3-star & budget",
    stars: 3,
    note: "Simpler rooms close to the falls and viewpoints, suggested on WhatsApp for your dates.",
    features: ["On request", "Your budget"],
    kind: "on-request",
    status: "mock",
  },
];

/* The stays with the number of catalog journeys each one appears on. */
export interface StayCard extends Stay {
  journeys: number;
}

export const STAY_CARDS: StayCard[] = STAYS.map((stay) => ({
  ...stay,
  journeys:
    stay.kind === "named"
      ? JOURNEYS.filter((j) => j.stay.some((line) => line.includes(stay.name)))
          .length
      : 0,
}));
