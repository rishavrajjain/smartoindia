"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IntlTripCard } from "@/components/ui/intl-trip-card";
import {
  INTL_REGION_ORDER,
  INTL_TRIPS,
  type IntlRegionName,
} from "@/data/international-trips";
import { cn } from "@/lib/cn";

/*
 * The international catalog: region chips over a grid of destinations. The
 * chosen region lives in the query string (?region=), so a filtered view
 * can be shared and the back button steps through choices.
 */
export function IntlCatalog({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = searchParams.get("region");
  const active = INTL_REGION_ORDER.find((r) => r === raw) ?? null;
  const trips = active ? INTL_TRIPS.filter((t) => t.region === active) : INTL_TRIPS;

  const pick = (region: IntlRegionName | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (!region || region === active) next.delete("region");
    else next.set("region", region);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const count = (region: IntlRegionName) =>
    INTL_TRIPS.filter((t) => t.region === region).length;

  return (
    <div id="destinations" className="scroll-mt-24">
      <div
        role="group"
        aria-label="Filter by region"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <Chip on={!active} onClick={() => pick(null)} label="All" n={INTL_TRIPS.length} />
        {INTL_REGION_ORDER.map((region) => (
          <Chip
            key={region}
            on={active === region}
            onClick={() => pick(region)}
            label={region}
            n={count(region)}
          />
        ))}
      </div>

      <ul key={active ?? "all"} className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {trips.map((trip, i) => (
          <li
            key={trip.slug}
            className="motion-safe:animate-rise"
            style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
          >
            <IntlTripCard trip={trip} />
          </li>
        ))}
        {children}
      </ul>
    </div>
  );
}

function Chip({
  on,
  onClick,
  label,
  n,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  n: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.8125rem] transition-colors",
        on ? "bg-ink font-extrabold text-bone" : "bg-sand text-ink hover:bg-clay-soft",
      )}
    >
      {label}
      <span className={cn("text-[0.6875rem] tabular-nums", on ? "text-bone/65" : "text-taupe")}>
        {n}
      </span>
    </button>
  );
}
