"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/*
 * The mist tiles shared by the WhatsApp planners (hotels, cabs): a labelled
 * field on the sand ground that lifts to white while it has focus. Native
 * date and select controls sit invisibly over their tile, so phones get the
 * system picker and keyboards keep working.
 */

export function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function Tile({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-[5.75rem] flex-col justify-center overflow-hidden rounded-2xl bg-sand px-4 py-3 transition-[box-shadow,background-color] duration-200 focus-within:bg-bone focus-within:ring-2 focus-within:ring-clay",
        className,
      )}
    >
      {htmlFor ? (
        <label htmlFor={htmlFor} className="text-label font-extrabold text-taupe uppercase">
          {label}
        </label>
      ) : (
        <span className="text-label font-extrabold text-taupe uppercase">{label}</span>
      )}
      {children}
    </div>
  );
}

export function DateTile({
  label,
  ariaLabel,
  value,
  min,
  onChange,
  className,
}: {
  label: string;
  ariaLabel?: string;
  value: string;
  min?: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const shown = value ? longDate(value) : "";
  return (
    <Tile label={label} className={className}>
      <span className={cn("mt-1 text-[1.25rem] leading-tight font-extrabold", value ? "text-ink" : "font-light text-taupe/60")}>
        {shown ? shown.split(" ").slice(0, 2).join(" ") : "Add date"}
      </span>
      <span className="mt-0.5 text-[0.75rem] text-taupe">{shown ? shown.split(" ")[2] : "Optional"}</span>
      <input
        type="date"
        value={value}
        min={min}
        aria-label={ariaLabel ?? `${label} date`}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => {
          try {
            e.currentTarget.showPicker?.();
          } catch {
            /* the native input remains keyboard-editable */
          }
        }}
        className="absolute inset-0 size-full cursor-pointer appearance-none rounded-2xl opacity-0"
      />
    </Tile>
  );
}

/* Quarter-hour slots, 00:00 to 23:45, shown on a 12-hour clock. */
const SLOTS = Array.from({ length: 96 }, (_, i) => {
  const h = Math.floor(i / 4);
  const m = (i % 4) * 15;
  const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const label = `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  return { value, label };
});

export function timeLabel(value: string): string {
  return SLOTS.find((slot) => slot.value === value)?.label ?? value;
}

export function TimeTile({
  label,
  ariaLabel,
  value,
  onChange,
  className,
}: {
  label: string;
  ariaLabel?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const shown = value ? timeLabel(value) : "";
  return (
    <Tile label={label} className={className}>
      <span className={cn("mt-1 text-[1.25rem] leading-tight font-extrabold", value ? "text-ink" : "font-light text-taupe/60")}>
        {shown ? shown.split(" ")[0] : "Add time"}
      </span>
      <span className="mt-0.5 text-[0.75rem] text-taupe">{shown ? shown.split(" ")[1] : "Optional"}</span>
      <select
        value={value}
        aria-label={ariaLabel ?? `${label} time`}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 size-full cursor-pointer appearance-none rounded-2xl opacity-0"
      >
        <option value="">Add time</option>
        {SLOTS.map((slot) => (
          <option key={slot.value} value={slot.value}>
            {slot.label}
          </option>
        ))}
      </select>
    </Tile>
  );
}

export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  display,
  note,
  className,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  /** What the big number reads as, when the bare count is not enough. */
  display?: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-[5.75rem] items-center justify-between gap-2 rounded-2xl bg-sand px-4 py-3", className)}>
      <span>
        <span className="block text-label font-extrabold text-taupe uppercase">{label}</span>
        <span aria-live="polite" className="mt-1 block text-[1.375rem] leading-tight font-extrabold text-ink tabular-nums">
          {display ?? value}
        </span>
        {note && <span className="mt-0.5 block text-[0.75rem] text-taupe">{note}</span>}
      </span>
      <span className="flex gap-1.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className="grid size-10 place-items-center rounded-full bg-bone text-lg font-extrabold text-ink transition-colors hover:bg-ink hover:text-bone disabled:opacity-30 disabled:hover:bg-bone disabled:hover:text-ink"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          className="grid size-10 place-items-center rounded-full bg-bone text-lg font-extrabold text-ink transition-colors hover:bg-ink hover:text-bone disabled:opacity-30 disabled:hover:bg-bone disabled:hover:text-ink"
        >
          +
        </button>
      </span>
    </div>
  );
}

/* A single choice among a few options, as pills on the sand ground. */
export function ChoicePills<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  layout = "grid-2",
}: {
  legend: string;
  name: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  layout?: "grid-2" | "grid-3" | "wrap";
}) {
  return (
    <fieldset>
      <legend className="text-label font-extrabold text-taupe uppercase">{legend}</legend>
      <div
        className={cn(
          "mt-2.5 gap-2",
          layout === "wrap" ? "flex flex-wrap" : "grid",
          layout === "grid-2" && "grid-cols-2",
          layout === "grid-3" && "grid-cols-3",
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-3 text-center text-[0.8125rem] leading-snug transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
              value === option.value ? "bg-ink font-extrabold text-bone" : "bg-sand text-ink hover:bg-line",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
