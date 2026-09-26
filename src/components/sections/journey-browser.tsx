"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";

import { JourneyCard } from "@/components/ui/journey-card";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { cn } from "@/lib/cn";
import { enquiry } from "@/lib/whatsapp";
import type { Journey, JourneyLength } from "@/types";

const STATES = ["Meghalaya", "Arunachal Pradesh", "Assam", "Multi-state"] as const;

const LENGTHS: { id: JourneyLength; hint: string }[] = [
  { id: "Short escape", hint: "2–4 days" },
  { id: "Mid-length", hint: "5–7 days" },
  { id: "Extended", hint: "8–12 days" },
];

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

/**
 * The fifty-journey index: search plus three filter axes (state, length,
 * travel style), all mirrored into the query string so a filtered view can be
 * shared and the back button steps through choices. Search stays local, a
 * history entry per keystroke would make back unusable.
 */
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
  const hasFilters = Boolean(activeState || activeLength || activeStyle || query);

  const styles = useMemo(() => {
    const present = new Set(journeys.flatMap((j) => j.styles));
    return STYLE_ORDER.filter((s) => present.has(s));
  }, [journeys]);

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

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return journeys.filter((j) => {
      if (activeState === "Multi-state" && !j.multiState) return false;
      if (
        activeState &&
        activeState !== "Multi-state" &&
        !j.states.includes(activeState as Journey["states"][number])
      )
        return false;
      if (activeLength && j.length !== activeLength) return false;
      if (activeStyle && !j.styles.includes(activeStyle)) return false;
      if (q) {
        const hay =
          `${j.title} ${j.subtitle} ${j.route.join(" ")} ${j.states.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [journeys, activeState, activeLength, activeStyle, deferredQuery]);

  return (
    <div id="journeys" className="scroll-mt-24">
      {/* --- The refine bar. */}
      <div className="border-y border-line py-6">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="w-full max-w-sm">
            <label
              htmlFor="journey-search"
              className="block text-label font-extrabold text-taupe uppercase"
            >
              Search journeys
            </label>
            <div className="mt-2 flex items-center gap-2.5 border-b border-line-strong pb-2 focus-within:border-ink">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="size-4 shrink-0 text-taupe"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="m13.5 13.5 4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <input
                id="journey-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try Tawang, waterfalls, Ziro…"
                className="w-full bg-transparent text-[1rem] text-ink outline-none placeholder:text-taupe/60"
              />
            </div>
          </div>

          <p
            aria-live="polite"
            className="text-label font-extrabold text-taupe uppercase"
          >
            {results.length} of {journeys.length} journeys
            {hasFilters && (
              <>
                {" · "}
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                >
                  Clear all
                </button>
              </>
            )}
          </p>
        </div>

        <FilterRow label="State">
          {STATES.map((state) => (
            <FilterPill
              key={state}
              active={activeState === state}
              onClick={() => setParam("state", state)}
            >
              {state}
            </FilterPill>
          ))}
        </FilterRow>

        <FilterRow label="Length">
          {LENGTHS.map(({ id, hint }) => (
            <FilterPill
              key={id}
              active={activeLength === id}
              onClick={() => setParam("length", id)}
            >
              {id}
              <span
                className={cn(
                  "ml-1.5 font-light",
                  activeLength === id ? "text-bone/70" : "text-taupe",
                )}
              >
                {hint}
              </span>
            </FilterPill>
          ))}
        </FilterRow>

        <FilterRow label="Travel style">
          {styles.map((style) => (
            <FilterPill
              key={style}
              active={activeStyle === style}
              onClick={() => setParam("style", style)}
            >
              {style}
            </FilterPill>
          ))}
        </FilterRow>
      </div>

      {/* --- Results. */}
      {results.length > 0 ? (
        <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((journey, index) => (
            <li key={journey.slug}>
              <JourneyCard journey={journey} eager={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border border-line px-6 py-14 text-center">
          <p className="text-[1.25rem] text-ink">
            Nothing matches that exact mix.
          </p>
          <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-taupe">
            Loosen a filter, or tell us what you have in mind and we will
            shape a journey around it.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex min-h-12 items-center border border-line-strong px-6 text-[0.9375rem] font-extrabold text-ink transition-colors hover:border-ink/40 hover:bg-sand"
            >
              Clear filters
            </button>
            <WhatsAppLink
              message={enquiry(
                "I am looking for a trip. Here is what I have in mind:",
              )}
              location="packages-index"
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

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
      <legend className="float-left mr-3 w-24 py-2 text-label font-extrabold text-taupe uppercase">
        {label}
      </legend>
      {children}
    </fieldset>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 items-center rounded-full px-4 text-[0.8125rem] font-extrabold transition-colors",
        active ? "bg-ink text-bone" : "bg-sand text-ink hover:bg-line",
      )}
    >
      {children}
    </button>
  );
}
