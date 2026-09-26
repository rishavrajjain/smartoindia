import { JOURNEYS } from "@/data/journeys";
import type { Journey, JourneyLength, SiteImage } from "@/types";

/*
 * Server-side shaping for the /b homepage. Client components receive these
 * slim records as props, so the full fifty-journey catalog (itineraries,
 * stays, notes) never ships to the browser.
 */

export interface TrailJourney {
  slug: string;
  title: string;
  nights: number;
  days: number;
  /** Stops after Guwahati, in route order, de-duplicated. */
  stops: string[];
  hero: SiteImage;
}

export function toTrailJourney(journey: Journey): TrailJourney {
  const stops = [...new Set(journey.route)].filter((s) => s !== "Guwahati");
  return {
    slug: journey.slug,
    title: journey.title,
    nights: journey.nights,
    days: journey.days,
    stops,
    hero: journey.hero,
  };
}

/**
 * The same predicate the /packages search uses, so a count printed on a tile
 * here always equals the results that page shows for `?q=`.
 */
export function matchesQuery(journey: Journey, query: string): boolean {
  const hay =
    `${journey.title} ${journey.subtitle} ${journey.route.join(" ")} ${journey.states.join(" ")}`.toLowerCase();
  return hay.includes(query.trim().toLowerCase());
}

export function countFor(query: string): number {
  return JOURNEYS.filter((j) => matchesQuery(j, query)).length;
}

/* --- Who's coming along: each picker maps onto the catalog's own styles. */

export interface Traveller {
  id: string;
  label: string;
  /** Heading for the rail once this traveller is picked. */
  heading: string;
  /** Catalog styles this traveller browses; the first feeds the "see all" link. */
  styles: string[];
  image: string;
  /** object-position that keeps faces inside the circular crop. */
  focus: string;
  journeys: TrailJourney[];
}

const TRAVELLER_SPECS = [
  {
    id: "couples",
    label: "Couples",
    heading: "Picked for two",
    styles: ["Honeymoon"],
    image: "/images/b-who-couple.webp",
    focus: "50% 60%",
  },
  {
    id: "families",
    label: "Families",
    heading: "Picked for families",
    styles: ["Family", "Family adventure"],
    image: "/images/b-who-family.webp",
    focus: "50% 40%",
  },
  {
    id: "friends",
    label: "Friends",
    heading: "Picked for a crew",
    styles: ["Offbeat", "Group departure"],
    image: "/images/b-who-friends.webp",
    focus: "50% 38%",
  },
  {
    id: "solo",
    label: "Solo",
    heading: "Picked for going solo",
    styles: ["Solo"],
    image: "/images/b-who-solo.webp",
    focus: "45% 30%",
  },
  {
    id: "seniors",
    label: "Seniors",
    heading: "Picked for an easy pace",
    styles: ["Senior-friendly"],
    image: "/images/b-who-seniors.webp",
    focus: "50% 30%",
  },
] as const;

export const TRAVELLERS: Traveller[] = TRAVELLER_SPECS.map((spec) => ({
  ...spec,
  styles: [...spec.styles],
  journeys: JOURNEYS.filter((j) =>
    j.styles.some((s) => (spec.styles as readonly string[]).includes(s)),
  ).map(toTrailJourney),
}));

export const POPULAR: TrailJourney[] = JOURNEYS.filter((j) =>
  j.styles.includes("Popular"),
).map(toTrailJourney);

/* --- Places: real stops from the printed routes, with honest counts. */

export interface Place {
  name: string;
  line: string;
  image: string;
  count: number;
}

const PLACE_SPECS = [
  { name: "Shillong", line: "Pine hills and cafés", image: "/images/dest-shillong.webp" },
  { name: "Cherrapunjee", line: "Waterfalls and root bridges", image: "/images/pkg-meghalaya-waterfalls.webp" },
  { name: "Kaziranga", line: "Rhino country", image: "/images/pkg-assam-kaziranga.webp" },
  { name: "Tawang", line: "Monasteries up high", image: "/images/dest-tawang-winter.webp" },
  { name: "Dawki", line: "The glass-clear river", image: "/images/dest-dawki.webp" },
  { name: "Umiam", line: "The lake on the hill road", image: "/images/dest-umiam.webp" },
  { name: "Ziro", line: "Rice fields and pine", image: "/images/dest-ziro.webp" },
];

export const PLACES: Place[] = PLACE_SPECS.map((p) => ({
  ...p,
  count: countFor(p.name),
})).filter((p) => p.count > 0);

/* --- Search index: journeys and the places/states they pass through. */

export interface SearchEntry {
  kind: "place" | "state" | "journey";
  label: string;
  meta: string;
  href: string;
  /** Lower-cased text the query is matched against. */
  hay: string;
}

const STATE_NAMES = ["Assam", "Meghalaya", "Arunachal Pradesh"] as const;

function journeysLabel(n: number) {
  return `${n} ${n === 1 ? "journey" : "journeys"}`;
}

export const SEARCH_INDEX: SearchEntry[] = [
  ...(() => {
    const counts = new Map<string, number>();
    for (const j of JOURNEYS) {
      for (const stop of new Set(j.route)) {
        // Printed chains like "Dawki/Shillong" name two places at once.
        if (stop.includes("/") || stop.includes(" local")) continue;
        counts.set(stop, (counts.get(stop) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => {
        const n = countFor(name);
        return {
          kind: "place" as const,
          label: name,
          meta: journeysLabel(n),
          href: `/packages?q=${encodeURIComponent(name)}#journeys`,
          hay: name.toLowerCase(),
        };
      });
  })(),
  ...STATE_NAMES.map((state) => ({
    kind: "state" as const,
    label: state,
    meta: journeysLabel(JOURNEYS.filter((j) => j.states.includes(state)).length),
    href: `/packages?state=${encodeURIComponent(state)}#journeys`,
    hay: state.toLowerCase(),
  })),
  ...JOURNEYS.map((j) => ({
    kind: "journey" as const,
    label: j.title,
    meta: `${j.nights} nights · ${[...new Set(j.route)].filter((s) => s !== "Guwahati").slice(0, 3).join(", ")}`,
    href: `/packages/${j.slug}`,
    hay: `${j.title} ${j.subtitle} ${j.route.join(" ")} ${j.states.join(" ")} ${j.styles.join(" ")}`.toLowerCase(),
  })),
];

/* --- Journeys by length: six tiles per tier, no photograph twice. */

export const LENGTH_TIERS: { id: JourneyLength; label: string; nights: string }[] = [
  { id: "Short escape", label: "Short escapes", nights: "2 to 3 nights" },
  { id: "Mid-length", label: "Mid-length", nights: "4 to 6 nights" },
  { id: "Extended", label: "Extended", nights: "7 nights or more" },
];

function pickDistinct(pool: Journey[], n: number): Journey[] {
  const seen = new Set<string>();
  const picked: Journey[] = [];
  // Styled journeys first, so each tier leads with the catalog's highlights.
  const ordered = [...pool].sort(
    (a, b) => Number(b.styles.length > 0) - Number(a.styles.length > 0),
  );
  for (const j of ordered) {
    if (seen.has(j.hero.src)) continue;
    seen.add(j.hero.src);
    picked.push(j);
    if (picked.length === n) return picked;
  }
  for (const j of ordered) {
    if (picked.length === n) break;
    if (!picked.includes(j)) picked.push(j);
  }
  return picked;
}

export const BY_LENGTH: Record<JourneyLength, TrailJourney[]> = {
  "Short escape": pickDistinct(
    JOURNEYS.filter((j) => j.length === "Short escape"),
    6,
  ).map(toTrailJourney),
  "Mid-length": pickDistinct(
    JOURNEYS.filter((j) => j.length === "Mid-length"),
    6,
  ).map(toTrailJourney),
  Extended: pickDistinct(
    JOURNEYS.filter((j) => j.length === "Extended"),
    6,
  ).map(toTrailJourney),
};

export const LENGTH_COUNTS: Record<JourneyLength, number> = {
  "Short escape": JOURNEYS.filter((j) => j.length === "Short escape").length,
  "Mid-length": JOURNEYS.filter((j) => j.length === "Mid-length").length,
  Extended: JOURNEYS.filter((j) => j.length === "Extended").length,
};

export const JOURNEY_COUNT = JOURNEYS.length;
