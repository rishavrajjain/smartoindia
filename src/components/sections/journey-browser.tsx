"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

import { JourneyCard } from "@/components/ui/journey-card";
import {
  CalendarIcon,
  HeartIcon,
  HouseIcon,
  PeopleIcon,
} from "@/components/ui/line-icons";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { cn } from "@/lib/cn";
import { enquiry } from "@/lib/whatsapp";
import type { Journey, JourneyLength } from "@/types";

/*
 * The fifty-journey index as a three-step trip builder: where, how long,
 * what kind of trip. Every option shows how many journeys it would leave
 * given the other choices, and dead ends dim out instead of producing an
 * empty page. Choices live in the query string so a filtered view can be
 * shared and the back button steps through them; search stays local, since
 * a history entry per keystroke would make back unusable.
 */

const REGIONS = [
  {
    id: "Meghalaya",
    line: "Waterfalls and root bridges",
    image: "/images/pkg-meghalaya-waterfalls.webp",
  },
  {
    id: "Arunachal Pradesh",
    line: "Monasteries and high passes",
    image: "/images/dest-sela.webp",
  },
  {
    id: "Assam",
    line: "Rhinos, tea and the big river",
    image: "/images/pkg-assam-kaziranga.webp",
  },
  {
    id: "Multi-state",
    line: "The long way round",
    image: "/images/dest-majuli.webp",
  },
] as const;

const LENGTHS: JourneyLength[] = ["Short escape", "Mid-length", "Extended"];

/** Display order for the catalog's travel-style groups. */
const STYLE_ORDER = [
  "Popular",
  "Family",
  "Family adventure",
  "Honeymoon",
  "Solo",
  "Group departure",
  "Wildlife & nature",
  "Offbeat",
  "Festivals",
  "Senior-friendly",
];

const SUGGESTIONS = ["Tawang", "Kaziranga", "Cherrapunjee", "Ziro", "Dawki"];

interface Filters {
  state: string | null;
  length: string | null;
  style: string | null;
  q: string;
}

function matches(j: Journey, f: Filters): boolean {
  if (f.state === "Multi-state" && !j.multiState) return false;
  if (
    f.state &&
    f.state !== "Multi-state" &&
    !j.states.includes(f.state as Journey["states"][number])
  )
    return false;
  if (f.length && j.length !== f.length) return false;
  if (f.style && !j.styles.includes(f.style)) return false;
  const q = f.q.trim().toLowerCase();
  if (q) {
    const hay =
      `${j.title} ${j.subtitle} ${j.route.join(" ")} ${j.states.join(" ")}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

export function JourneyBrowser({ journeys }: { journeys: Journey[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // A search handed over from elsewhere (?q=) seeds the box once.
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const deferredQuery = useDeferredValue(query);

  const activeState = searchParams.get("state");
  const activeLength = searchParams.get("length");
  const activeStyle = searchParams.get("style");

  const panelRef = useRef<HTMLDivElement>(null);
  const [panelGone, setPanelGone] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setPanelGone(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  const styles = useMemo(() => {
    const present = new Set(journeys.flatMap((j) => j.styles));
    return STYLE_ORDER.filter((s) => present.has(s));
  }, [journeys]);

  /* Day and night ranges per tier, read from the catalog itself. */
  const tiers = useMemo(
    () =>
      LENGTHS.map((id) => {
        const inTier = journeys.filter((j) => j.length === id);
        const nights = inTier.map((j) => j.nights);
        const days = inTier.map((j) => j.days);
        return {
          id,
          minNights: Math.min(...nights),
          maxNights: Math.max(...nights),
          days: `${Math.min(...days)} to ${Math.max(...days)} days`,
        };
      }),
    [journeys],
  );

  const results = useMemo(
    () =>
      journeys.filter((j) =>
        matches(j, {
          state: activeState,
          length: activeLength,
          style: activeStyle,
          q: deferredQuery,
        }),
      ),
    [journeys, activeState, activeLength, activeStyle, deferredQuery],
  );

  /* What each option would leave, holding the other choices fixed. */
  const facets = useMemo(() => {
    const base: Filters = {
      state: activeState,
      length: activeLength,
      style: activeStyle,
      q: deferredQuery,
    };
    const count = (patch: Partial<Filters>) =>
      journeys.filter((j) => matches(j, { ...base, ...patch })).length;
    return {
      state: Object.fromEntries(REGIONS.map((r) => [r.id, count({ state: r.id })])),
      length: Object.fromEntries(LENGTHS.map((l) => [l, count({ length: l })])),
      style: Object.fromEntries(styles.map((s) => [s, count({ style: s })])),
    } as Record<"state" | "length" | "style", Record<string, number>>;
  }, [journeys, styles, activeState, activeLength, activeStyle, deferredQuery]);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === null || next.get(key) === value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const clearAll = () => {
    setQuery("");
    router.replace(pathname, { scroll: false });
  };

  const editFilters = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const activeTier = tiers.find((t) => t.id === activeLength);
  const tokens = [
    activeState && {
      key: "state",
      label: activeState,
      clear: () => setParam("state", null),
    },
    activeTier && {
      key: "length",
      label: `${activeTier.id}, ${activeTier.days}`,
      clear: () => setParam("length", null),
    },
    activeStyle && {
      key: "style",
      label: activeStyle,
      clear: () => setParam("style", null),
    },
    query.trim() && {
      key: "q",
      label: `“${query.trim()}”`,
      clear: () => setQuery(""),
    },
  ].filter((t): t is { key: string; label: string; clear: () => void } =>
    Boolean(t),
  );

  const tierIndex = tiers.findIndex((t) => t.id === activeLength);
  // Cards re-deal when a filter changes, not on every keystroke.
  const dealKey = `${activeState}|${activeLength}|${activeStyle}`;

  return (
    <div id="journeys" className="scroll-mt-24">
      {/* --- The trip builder. */}
      <div
        ref={panelRef}
        className="relative scroll-mt-24 overflow-hidden rounded-[2rem] bg-sand p-5 sm:p-7 lg:p-9"
      >
        <span aria-hidden="true" className="spark-fill absolute inset-x-0 top-0 h-1" />

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-label font-extrabold text-clay uppercase">
              Find your journey
            </p>
            <h2 className="mt-2 text-[1.5rem] leading-tight sm:text-[1.875rem] lg:text-[2.125rem]">
              Three taps to <span className="accent">your trip</span>
            </h2>
          </div>
          <p aria-live="polite" className="flex shrink-0 items-end gap-2 text-right">
            <span
              key={results.length}
              className="text-[2.5rem] leading-[0.85] font-extrabold text-ink tabular-nums motion-safe:animate-fare-pulse lg:text-[3.25rem]"
            >
              {results.length}
            </span>
            <span className="pb-0.5 text-left text-[0.75rem] leading-tight text-taupe">
              of {journeys.length}
              <br />
              journeys
            </span>
          </p>
        </div>

        {/* Search, with a few real stops to try. */}
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5">
          <div className="flex h-14 items-center gap-3 rounded-full bg-bone px-5 ring-1 ring-line transition-shadow focus-within:ring-2 focus-within:ring-ink lg:w-[26rem] lg:shrink-0">
            <label htmlFor="journey-search" className="sr-only">
              Search journeys
            </label>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true" className="size-[1.125rem] shrink-0 text-taupe">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id="journey-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a place or journey"
              className="h-full min-w-0 flex-1 bg-transparent text-[1rem] text-ink outline-none placeholder:text-taupe/60 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="grid size-8 shrink-0 place-items-center rounded-full bg-sand text-taupe transition-colors hover:bg-ink hover:text-bone"
              >
                <span className="sr-only">Clear search</span>
                <CrossGlyph className="size-3.5" />
              </button>
            )}
          </div>
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            <span className="shrink-0 text-[0.75rem] text-taupe">Try</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className={cn(
                  "min-h-9 shrink-0 rounded-full px-3.5 text-[0.75rem] font-extrabold transition-colors",
                  query.trim().toLowerCase() === s.toLowerCase()
                    ? "bg-ink text-bone"
                    : "text-ink ring-1 ring-line-strong hover:bg-bone",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 01 · Where */}
        <Step n="01" title="Where to?">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {REGIONS.map((region) => {
              const on = activeState === region.id;
              const n = facets.state[region.id];
              const dead = n === 0 && !on;
              return (
                <button
                  key={region.id}
                  type="button"
                  aria-pressed={on}
                  disabled={dead}
                  onClick={() => setParam("state", region.id)}
                  className={cn(
                    "group relative h-36 overflow-hidden rounded-2xl text-left transition-[transform,box-shadow,opacity,filter] duration-300 ease-out active:scale-[0.97] sm:h-44",
                    on
                      ? "shadow-[0_14px_30px_rgba(40,37,96,0.28)] ring-[3px] ring-ink ring-offset-[3px] ring-offset-sand"
                      : "enabled:hover:-translate-y-1 enabled:hover:shadow-[0_12px_26px_rgba(40,37,96,0.18)]",
                    activeState && !on && !dead && "opacity-75 saturate-[0.55] hover:opacity-100 hover:saturate-100",
                    dead && "cursor-not-allowed opacity-40 grayscale",
                  )}
                >
                  <Image
                    src={region.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      on ? "scale-110" : "group-enabled:group-hover:scale-105",
                    )}
                  />
                  <span aria-hidden="true" className="photo-scrim absolute inset-0" />
                  <CheckBadge on={on} className="absolute top-3 right-3" />
                  <span className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                    <span className="block text-[1rem] leading-tight font-extrabold text-bone sm:text-[1.1875rem]">
                      {region.id}
                    </span>
                    <span className="mt-0.5 hidden text-[0.75rem] text-bone/75 sm:block">
                      {region.line}
                    </span>
                    <span
                      className={cn(
                        "mt-2 inline-flex rounded-full px-2 py-0.5 text-[0.6875rem] font-extrabold tabular-nums transition-colors",
                        on ? "bg-green text-clay-deep" : "bg-bone/90 text-ink",
                      )}
                    >
                      {n} {n === 1 ? "journey" : "journeys"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        {/* 02 · How long */}
        <Step n="02" title="How long?">
          <div className="relative grid grid-cols-3 gap-1 rounded-2xl bg-bone p-1.5 ring-1 ring-line">
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1.5 bottom-1.5 rounded-xl bg-ink shadow-[0_10px_24px_rgba(40,37,96,0.3)] transition-[left,opacity] duration-500 ease-[cubic-bezier(0.22,0.8,0.28,1)]",
                tierIndex < 0 && "opacity-0",
              )}
              style={{
                left: `calc(0.375rem + ${Math.max(tierIndex, 0)} * ((100% - 1.25rem) / 3 + 0.25rem))`,
                width: "calc((100% - 1.25rem) / 3)",
              }}
            />
            {tiers.map((tier) => {
              const on = activeLength === tier.id;
              const n = facets.length[tier.id];
              const dead = n === 0 && !on;
              const dots = tier.maxNights - tier.minNights + 1;
              return (
                <button
                  key={tier.id}
                  type="button"
                  aria-pressed={on}
                  disabled={dead}
                  onClick={() => setParam("length", tier.id)}
                  className={cn(
                    "relative z-10 flex min-h-[5.75rem] flex-col items-center justify-center rounded-xl px-1.5 py-3 text-center transition-colors duration-300 active:scale-[0.98] sm:min-h-[6.25rem]",
                    on ? "text-bone" : "text-ink enabled:hover:bg-sand",
                    dead && "cursor-not-allowed opacity-40",
                  )}
                >
                  <span className="text-[0.8125rem] leading-tight font-extrabold sm:text-[0.9375rem]">
                    {tier.id}
                  </span>
                  <span className={cn("mt-1 text-[0.6875rem] sm:text-[0.75rem]", on ? "text-bone/70" : "text-taupe")}>
                    {tier.days}
                  </span>
                  <span aria-hidden="true" className="mt-2 flex gap-1">
                    {Array.from({ length: dots }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "size-1.5 rounded-full transition-colors duration-300",
                          on ? "bg-green" : "bg-line-strong",
                        )}
                        style={{ transitionDelay: on ? `${i * 45}ms` : "0ms" }}
                      />
                    ))}
                  </span>
                  <span className={cn("mt-1.5 text-[0.6875rem] tabular-nums", on ? "text-bone/60" : "text-taupe/70")}>
                    {n} {n === 1 ? "journey" : "journeys"}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        {/* 03 · Travel style */}
        <Step n="03" title="What kind of trip?">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {styles.map((style) => {
              const on = activeStyle === style;
              const n = facets.style[style];
              const dead = n === 0 && !on;
              const Icon = STYLE_ICON[style] ?? StarGlyph;
              return (
                <button
                  key={style}
                  type="button"
                  aria-pressed={on}
                  disabled={dead}
                  onClick={() => setParam("style", style)}
                  className={cn(
                    "group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 text-[0.8125rem] transition-[background-color,color,box-shadow,transform] duration-200 active:scale-95",
                    on
                      ? "bg-ink font-extrabold text-bone shadow-[0_10px_22px_rgba(40,37,96,0.28)]"
                      : "bg-bone text-ink ring-1 ring-line enabled:hover:ring-ink/35",
                    dead && "cursor-not-allowed opacity-40",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full transition-colors duration-200",
                      on ? "bg-green text-clay-deep" : "bg-sand text-taupe group-enabled:group-hover:text-ink",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  {style}
                  <span className={cn("text-[0.6875rem] tabular-nums", on ? "text-bone/65" : "text-taupe/70")}>
                    {n}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>
      </div>

      {/* --- What's applied, each removable on its own. */}
      {tokens.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-[0.75rem] text-taupe">Showing</span>
          {tokens.map((token) => (
            <button
              key={token.key}
              type="button"
              onClick={token.clear}
              className="group inline-flex min-h-9 items-center gap-2 rounded-full bg-ink/[0.06] py-1 pr-1.5 pl-3.5 text-[0.75rem] font-extrabold text-ink transition-colors hover:bg-ink hover:text-bone motion-safe:animate-rise"
            >
              {token.label}
              <span className="grid size-6 place-items-center rounded-full bg-ink/10 transition-colors group-hover:bg-bone/20">
                <CrossGlyph className="size-3" />
              </span>
              <span className="sr-only">(remove)</span>
            </button>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="ml-1 min-h-9 px-1 text-[0.75rem] font-extrabold text-taupe underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink"
          >
            Clear all
          </button>
        </div>
      )}

      {/* --- A slim summary that follows the results once the panel scrolls away. */}
      <div className="sticky top-16 z-30 h-0 lg:top-[4.75rem]">
        <div
          aria-hidden={!panelGone}
          className={cn(
            "absolute inset-x-0 top-2 flex items-center gap-3 rounded-full bg-clay-deep/95 py-1.5 pr-1.5 pl-4 text-bone shadow-[0_14px_34px_rgba(28,26,69,0.35)] backdrop-blur-md transition-[opacity,transform] duration-300 sm:mx-auto sm:max-w-xl",
            panelGone ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          <span className="shrink-0 text-[0.9375rem] font-extrabold tabular-nums">
            {results.length}
          </span>
          <span className="min-w-0 flex-1 truncate text-[0.75rem] text-bone/75">
            {tokens.length ? tokens.map((t) => t.label).join(" · ") : "All journeys"}
          </span>
          <button
            type="button"
            tabIndex={panelGone ? 0 : -1}
            onClick={editFilters}
            className="min-h-9 shrink-0 rounded-full bg-bone px-4 text-[0.75rem] font-extrabold text-ink transition-colors hover:bg-sand"
          >
            Edit filters
          </button>
        </div>
      </div>

      {/* --- Results. */}
      {results.length > 0 ? (
        <ul
          key={dealKey}
          className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {results.map((journey, index) => (
            <li
              key={journey.slug}
              className="motion-safe:animate-rise"
              style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
            >
              <JourneyCard journey={journey} eager={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-[2rem] bg-sand px-6 py-14 text-center">
          <p className="text-[1.25rem] text-ink">
            Nothing matches <span className="accent">that exact mix.</span>
          </p>
          <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-taupe">
            Loosen a filter, or tell us what you have in mind and we will
            shape a journey around it.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex min-h-12 items-center rounded-full bg-bone px-6 text-[0.9375rem] font-extrabold text-ink ring-1 ring-line-strong transition-colors hover:ring-ink/40"
            >
              Clear filters
            </button>
            <WhatsAppLink
              message={enquiry(
                "I am looking for a trip. Here is what I have in mind:",
              )}
              location="packages-empty-state"
              size="md"
            >
              Ask on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className="mt-7 border-t border-line pt-6 lg:mt-8 lg:pt-7">
      <p className="flex items-baseline gap-3">
        <span className="text-[0.75rem] font-extrabold text-green-deep tabular-nums">
          {n}
        </span>
        <span id={id} className="text-[1.0625rem] font-extrabold text-ink lg:text-[1.125rem]">
          {title}
        </span>
      </p>
      <div role="group" aria-labelledby={id} className="mt-4">
        {children}
      </div>
    </div>
  );
}

/* A check that draws itself in when its tile is picked. */
function CheckBadge({ on, className }: { on: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-7 place-items-center rounded-full transition-[transform,background-color,box-shadow] duration-300 ease-out",
        on
          ? "scale-100 bg-green text-clay-deep shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
          : "scale-90 bg-bone/20 ring-1 ring-bone/70 backdrop-blur-sm",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path
          d="M5 12.5l4.5 4.5L19 7.5"
          className={cn(
            "transition-[stroke-dashoffset] delay-100 duration-300 ease-out [stroke-dasharray:22]",
            on ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:22]",
          )}
        />
      </svg>
    </span>
  );
}

type IconProps = { className?: string };

function glyph(path: ReactNode) {
  return function Glyph({ className }: IconProps) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
        {path}
      </svg>
    );
  };
}

const StarGlyph = glyph(<path d="m12 3 2.7 5.5 6 .9-4.35 4.25 1 6L12 16.8l-5.35 2.85 1-6L3.3 9.4l6-.9z" />);
const CompassGlyph = glyph(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </>,
);
const BackpackGlyph = glyph(
  <>
    <path d="M6 10a6 6 0 0 1 12 0v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z" />
    <path d="M9 4.5V3.5h6v1M9 14h6M9 21v-4h6v4" />
  </>,
);
const LeafGlyph = glyph(
  <>
    <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
    <path d="M5 19 13 11" />
  </>,
);
const MapGlyph = glyph(
  <>
    <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
    <path d="M9 4v14M15 6v14" />
  </>,
);
const ArmchairGlyph = glyph(
  <>
    <path d="M6 11V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
    <path d="M4 11a2 2 0 0 1 2 2v2h12v-2a2 2 0 1 1 4 0v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2zM6 18v2M18 18v2" />
  </>,
);
const CrossGlyph = glyph(<path d="M6 6l12 12M18 6 6 18" />);

const STYLE_ICON: Record<string, ComponentType<IconProps>> = {
  Popular: StarGlyph,
  Family: HouseIcon,
  "Family adventure": CompassGlyph,
  Honeymoon: HeartIcon,
  Solo: BackpackGlyph,
  "Group departure": PeopleIcon,
  "Wildlife & nature": LeafGlyph,
  Offbeat: MapGlyph,
  Festivals: CalendarIcon,
  "Senior-friendly": ArmchairGlyph,
};
