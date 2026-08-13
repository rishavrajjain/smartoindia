"use client";

import { useMemo, useState } from "react";

import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { MONTH_NAMES, MONTH_ORDER } from "@/data/festivals";
import { cn } from "@/lib/cn";
import type { Festival, Season } from "@/types";

type MonthFilter = Season | "all";

/**
 * Month-based festival explorer.
 *
 * Months with nothing in them are rendered as disabled buttons rather than
 * hidden, so the calendar reads as a full year and a visitor can see at a glance
 * that July is quiet — which is itself useful planning information.
 */
export function FestivalExplorer({ festivals }: { festivals: Festival[] }) {
  const [month, setMonth] = useState<MonthFilter>("all");

  const byMonth = useMemo(() => {
    const map = new Map<Season, Festival[]>();
    for (const festival of festivals) {
      const list = map.get(festival.month) ?? [];
      list.push(festival);
      map.set(festival.month, list);
    }
    return map;
  }, [festivals]);

  const visible = useMemo(() => {
    if (month === "all") {
      // Calendar order rather than data order.
      return [...festivals].sort(
        (a, b) => MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month),
      );
    }
    return byMonth.get(month) ?? [];
  }, [festivals, byMonth, month]);

  return (
    <div>
      <fieldset className="[min-inline-size:0]">
        <legend className="text-label font-medium text-clay-deep uppercase">
          Choose a month
        </legend>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
          <MonthButton
            label="All year"
            selected={month === "all"}
            onClick={() => setMonth("all")}
          />
          {MONTH_ORDER.map((key) => {
            const count = byMonth.get(key)?.length ?? 0;
            return (
              <MonthButton
                key={key}
                label={MONTH_NAMES[key].slice(0, 3)}
                fullLabel={MONTH_NAMES[key]}
                count={count}
                disabled={count === 0}
                selected={month === key}
                onClick={() => setMonth(key)}
              />
            );
          })}
        </div>
      </fieldset>

      <div aria-live="polite" className="sr-only">
        {month === "all"
          ? `Showing all ${visible.length} festivals`
          : `${visible.length} festivals in ${MONTH_NAMES[month]}`}
      </div>

      <p className="mt-6 text-sm font-semibold text-taupe">
        {month === "all"
          ? `${visible.length} festivals across the year`
          : `${visible.length} in ${MONTH_NAMES[month]}`}
      </p>

      <ul className="mt-5 grid gap-5 md:grid-cols-2">
        {visible.map((festival) => (
          <li key={festival.id} className="reveal">
            <FestivalCard festival={festival} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MonthButton({
  label,
  fullLabel,
  count,
  selected,
  disabled = false,
  onClick,
}: {
  label: string;
  fullLabel?: string;
  count?: number;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-sm border px-3.5 text-sm transition-colors duration-200",
        disabled && "cursor-not-allowed border-line text-taupe/40",
        !disabled && selected && "border-ink bg-ink text-bone",
        !disabled &&
          !selected &&
          "border-line-strong bg-transparent text-taupe hover:border-ink/40 hover:text-ink",
      )}
    >
      <span aria-hidden={fullLabel ? "true" : undefined}>{label}</span>
      {fullLabel && <span className="sr-only">{fullLabel}</span>}
      {typeof count === "number" && count > 0 && (
        <span
          className={cn(
            "text-xs tabular-nums",
            selected ? "text-bone/60" : "text-taupe",
          )}
        >
          {count}
        </span>
      )}
      {disabled && <span className="sr-only">no festivals listed</span>}
    </button>
  );
}

function FestivalCard({ festival }: { festival: Festival }) {
  return (
    <article className="flex h-full flex-col border-t border-line pt-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="border border-line-strong px-2.5 py-1 text-label font-medium text-taupe uppercase">
          {festival.state}
        </span>
        <span className="border border-clay/40 bg-clay-soft px-2.5 py-1 text-label font-medium text-clay uppercase">
          {festival.monthLabel}
        </span>
      </div>

      <h3 className="mt-4 text-[1.5rem] leading-tight text-ink">{festival.name}</h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-taupe">
        {festival.summary}
      </p>

      <h4 className="mt-5 text-sm font-semibold text-ink">
        What to expect
      </h4>
      <ul className="mt-2 space-y-1.5">
        {festival.whatToExpect.map((line) => (
          <li
            key={line}
            className="flex gap-2.5 text-sm leading-relaxed text-taupe"
          >
            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-line-strong" />
            {line}
          </li>
        ))}
      </ul>

      <p className="mt-5 border-l border-clay/40 pl-4 text-sm leading-relaxed text-ink">
        {festival.travelNote}
      </p>

      <div className="mt-6 flex-1" />
      <WhatsAppLink
        message={festival.enquiry}
        location="festival-card"
        subject={festival.id}
        tone="quiet"
        size="sm"
      >
        Plan around {festival.name}
      </WhatsAppLink>
    </article>
  );
}
