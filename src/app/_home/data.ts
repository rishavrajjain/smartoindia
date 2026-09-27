import { STAYS, type Stay } from "@/data/hotels";
import { JOURNEYS } from "@/data/journeys";
import type { Journey, SiteImage } from "@/types";

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

/* Photographs of stops that appear on the printed routes, so a rail can
   show a different place on the same route instead of repeating a photo. */
const STOP_IMAGE: Record<string, string> = {
  Shillong: "/images/dest-shillong.webp",
  Cherrapunjee: "/images/pkg-meghalaya-waterfalls.webp",
  Kaziranga: "/images/pkg-assam-kaziranga.webp",
  Tawang: "/images/dest-tawang-winter.webp",
  Dirang: "/images/dest-sela.webp",
  Bomdila: "/images/pkg-arunachal-tawang.webp",
  Tezpur: "/images/dest-nameri.webp",
  Umiam: "/images/dest-umiam.webp",
  Ziro: "/images/dest-ziro.webp",
  Jorhat: "/images/pkg-assam-tea.webp",
  Dibrugarh: "/images/pkg-assam-tea.webp",
  Dawki: "/images/dest-dawki.webp",
};

/** Keeps every card in a rail on its own photograph. */
export function distinctThumbs(list: TrailJourney[]): TrailJourney[] {
  const used = new Set<string>();
  return list.map((j) => {
    const candidates = [
      j.hero.src,
      ...j.stops.flatMap((s) => s.split("/")).map((s) => STOP_IMAGE[s.trim()]),
    ].filter((c): c is string => Boolean(c));
    const pick = candidates.find((c) => !used.has(c)) ?? j.hero.src;
    used.add(pick);
    return pick === j.hero.src ? j : { ...j, hero: { ...j.hero, src: pick, alt: "" } };
  });
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

/* --- The catalog's own popular five, with no photograph repeated. */

export const POPULAR: TrailJourney[] = distinctThumbs(
  JOURNEYS.filter((j) => j.styles.includes("Popular")).map(toTrailJourney),
);

/* --- Places: real stops from the printed routes, with honest counts. */

export interface Place {
  name: string;
  line: string;
  image: string;
  count: number;
}

const PLACE_SPECS = [
  { name: "Guwahati", line: "Where every trip begins", image: "/images/dest-guwahati.webp" },
  { name: "Shillong", line: "Pine hills and cafés", image: "/images/dest-shillong.webp" },
  { name: "Cherrapunjee", line: "Waterfall country", image: "/images/pkg-meghalaya-waterfalls.webp" },
  { name: "Kaziranga", line: "Rhino country", image: "/images/pkg-assam-kaziranga.webp" },
  { name: "Tawang", line: "Monasteries up high", image: "/images/dest-tawang-winter.webp" },
  { name: "Dawki", line: "Glass-clear water", image: "/images/dest-dawki.webp" },
  { name: "Umiam", line: "A lake in the pines", image: "/images/dest-umiam.webp" },
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

export const JOURNEY_COUNT = JOURNEYS.length;

/* --- Stays: the catalog's Shillong and Cherrapunjee hotels, with the
   number of journeys each one appears on. */

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
