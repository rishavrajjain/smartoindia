import type { ImpactCommitment } from "@/types";

/**
 * Impact and sustainability content.
 *
 * PLACEHOLDER CONTENT, DELIBERATELY QUALITATIVE.
 *
 * There are no numbers here on purpose. Smarto has not supplied measured figures
 * for emissions, EV share, local spend, or anything else, and an invented metric
 * on this page would be the single most damaging thing on the site. Each item is
 * written as an intention rather than an achievement.
 *
 * When Manav provides evidence, add the figure to the specific record, flip its
 * `status` to `"verified"`, and only then present it as a claim.
 */
export const IMPACT_COMMITMENTS: ImpactCommitment[] = [
  {
    id: "electric-where-it-works",
    title: "Electric where it genuinely works",
    description:
      "We run electric vehicles on city routes and shorter intercity legs, where charging exists and the range maths holds. We do not put an EV on a Tawang run to look good in a brochure, and we will tell you which one your trip should use.",
    status: "mock",
  },
  {
    id: "money-that-stays",
    title: "Money that stays in the valley",
    description:
      "We favour family-run guesthouses, village homestays, and local guides over chains, and we pay them directly. On village nights the household is paid for the room and the food, not a commission on a booking made somewhere else.",
    status: "mock",
  },
  {
    id: "fewer-longer-trips",
    title: "Fewer places, longer stays",
    description:
      "Most of our itineraries cover less ground than a comparable trip elsewhere. Long driving days burn fuel, exhaust travellers, and push money towards highways rather than the places you came to see.",
    status: "mock",
  },
  {
    id: "respect-at-the-door",
    title: "Asking before photographing",
    description:
      "Festivals here are observances, not performances. Our drivers and guides brief travellers on when to ask, when to put the camera away, and where visitors are simply not expected to go.",
    status: "mock",
  },
  {
    id: "carry-it-out",
    title: "Carrying out what we carry in",
    description:
      "Vehicles go out with drinking water in refillable bottles and come back with whatever waste the day produced. Several of the places these itineraries visit have no waste collection at all.",
    status: "mock",
  },
  {
    id: "honest-about-limits",
    title: "Honest about the limits",
    description:
      "Road travel in the Northeast has a real footprint and a private vehicle has a larger one than a shared bus. We are not going to describe that as carbon neutral. What we can do is plan tighter routes, fill vehicles properly, and use electric where it fits.",
    status: "mock",
  },
];
