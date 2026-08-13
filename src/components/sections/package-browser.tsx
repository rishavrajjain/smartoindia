"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";

import { PackageCard } from "@/components/ui/package-card";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { cn } from "@/lib/cn";
import { enquiry } from "@/lib/whatsapp";
import {
  NORTHEAST_STATES,
  PACKAGE_TAGS,
  type NortheastState,
  type PackageTag,
  type TravelPackage,
} from "@/types";

const DURATIONS = [
  { id: "short", label: "Up to 5 days", test: (d: number) => d <= 5 },
  { id: "medium", label: "6 to 8 days", test: (d: number) => d >= 6 && d <= 8 },
  { id: "long", label: "9 days or more", test: (d: number) => d >= 9 },
] as const;

type DurationId = (typeof DURATIONS)[number]["id"];

const CARD_SIZES =
  "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2.5rem)";

/**
 * Package index with search, filters, and shareable URL state.
 *
 * Filter state lives in the query string so a filtered view can be sent to
 * someone else and the back button steps through choices. The free-text search
 * stays local: pushing a history entry per keystroke would make back unusable.
 */
export function PackageBrowser({ packages }: { packages: TravelPackage[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  // Keeps typing responsive when the list re-filters on every keystroke.
  const deferredQuery = useDeferredValue(query);

  const activeState = searchParams.get("state");
  const activeTag = searchParams.get("tag");
  const activeDuration = searchParams.get("duration");

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
    const needle = deferredQuery.trim().toLowerCase();

    return packages.filter((item) => {
      if (activeState && item.state !== activeState) return false;
      if (activeTag && !item.tags.includes(activeTag as PackageTag)) {
        return false;
      }
      if (activeDuration) {
        const rule = DURATIONS.find((d) => d.id === activeDuration);
        if (rule && !rule.test(item.durationDays)) return false;
      }
      if (!needle) return true;

      // Search titles, summaries, and destination names — the three things a
      // visitor is realistically typing.
      const haystack = [
        item.title,
        item.summary,
        item.state,
        ...item.destinations,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [packages, activeState, activeTag, activeDuration, deferredQuery]);

  const filterCount =
    (activeState ? 1 : 0) + (activeTag ? 1 : 0) + (activeDuration ? 1 : 0);
  const hasAnyFilter = filterCount > 0 || query.trim().length > 0;

  return (
    <div>
      <div className="border-t border-line pt-5 sm:p-6">
        <label htmlFor="package-search" className="block text-label font-medium text-taupe uppercase">
          Search destinations
        </label>
        <div className="relative mt-2">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-taupe"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5 17 17" />
          </svg>
          <input
            id="package-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Shillong, Kaziranga, Tawang…"
            autoComplete="off"
            className="h-12 w-full rounded-sm border border-line-strong bg-paper pr-4 pl-11 text-base text-ink placeholder:text-taupe/70 focus:border-clay"
          />
        </div>

        <div className="mt-5 space-y-4">
          <FilterRow
            legend="State"
            options={NORTHEAST_STATES.map((state) => ({
              id: state,
              label: state,
            }))}
            active={activeState}
            onSelect={(value) => setParam("state", value as NortheastState)}
          />
          <FilterRow
            legend="Trip length"
            options={DURATIONS.map((d) => ({ id: d.id, label: d.label }))}
            active={activeDuration}
            onSelect={(value) => setParam("duration", value as DurationId)}
          />
          <FilterRow
            legend="Style"
            options={PACKAGE_TAGS.map((tag) => ({ id: tag, label: tag }))}
            active={activeTag}
            onSelect={(value) => setParam("tag", value as PackageTag)}
          />
        </div>

        {hasAnyFilter && (
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
            <p className="text-sm font-semibold text-taupe">
              {results.length === packages.length
                ? `Showing all ${packages.length} trips`
                : `${results.length} of ${packages.length} trips match`}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="link-rule text-sm font-medium text-clay"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div aria-live="polite" className="sr-only">
        {results.length} trips match your filters
      </div>

      {results.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item, position) => (
            <li key={item.slug} className="reveal">
              <PackageCard
                item={item}
                sizes={CARD_SIZES}
                priority={position < 3}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-sm border border-dashed border-line-strong bg-paper px-6 py-14 text-center">
          <h3 className="text-[1.75rem] text-ink">
            Nothing matches that combination
          </h3>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-taupe">
            These are only the routes we have written up. We plan custom trips
            across the whole region. Tell us where you want to go and we will
            build it around your dates.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppLink
              message={enquiry(
                "I could not find a trip that fits. Here is what I have in mind:",
              )}
              location="packages-empty-state"
              size="md"
            >
              Plan a custom trip
            </WhatsAppLink>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex min-h-12 items-center rounded-sm border border-line-strong px-6 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink/40 hover:bg-sand"
            >
              Clear filters
            </button>
          </div>
          <p className="mt-6 text-sm text-taupe">
            Or browse{" "}
            <Link href="/festivals" className="text-clay underline underline-offset-4">
              trips built around festivals
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  legend,
  options,
  active,
  onSelect,
}: {
  legend: string;
  options: Array<{ id: string; label: string }>;
  active: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-label font-medium text-taupe uppercase">
        {legend}
      </legend>
      {/* Scrolls horizontally on narrow screens rather than wrapping into a
          wall of chips that pushes the results below the fold. */}
      <div className="no-scrollbar -mx-1 mt-2.5 flex gap-2 overflow-x-auto px-1 pb-1">
        {options.map((option) => {
          const selected = active === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option.id)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center rounded-sm border px-4 text-sm whitespace-nowrap transition-colors duration-200",
                selected
                  ? "border-ink bg-ink text-bone"
                  : "border-line-strong bg-transparent text-taupe hover:border-ink/40 hover:text-ink",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
