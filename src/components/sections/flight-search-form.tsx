"use client";

import Form from "next/form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { ChevronIcon, PlaneIcon, SwapIcon } from "@/components/ui/flight-icons";
import { POPULAR_SECTORS, findAirport } from "@/data/airports";
import { cn } from "@/lib/cn";
import {
  addDays,
  airportGroups,
  dateParts,
  isCalendarDay,
  paxSummary,
} from "@/lib/flights";
import type { Airport, TripType } from "@/types/flights";

/*
 * The search form. Every control is a native element, selects, date inputs,
 * radios, number inputs, dressed as flat mist tiles, so the phone's own
 * pickers do the heavy lifting, screen readers get real semantics, and the
 * form still submits as a plain GET without JavaScript. `next/form` turns that
 * GET into a client-side navigation to /flights?… and prefetches the results
 * skeleton while the form is on screen.
 */

interface Initial {
  trip: TripType;
  from: Airport;
  to: Airport;
  date: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
}

const MAX_SEATS = 9;
const MAX_CHILDREN = 8;

function readInitial(
  sp: URLSearchParams,
  today: string,
  maxDate: string,
  defaultDate: string,
): Initial {
  const from = findAirport(sp.get("from")) ?? findAirport("DEL")!;
  let to = findAirport(sp.get("to")) ?? findAirport("GAU")!;
  if (to.code === from.code) to = findAirport(from.code === "GAU" ? "DEL" : "GAU")!;

  const rawDate = sp.get("date") ?? "";
  const date =
    isCalendarDay(rawDate) && rawDate >= today && rawDate <= maxDate ? rawDate : defaultDate;
  const rawRet = sp.get("ret") ?? "";
  const returnDate = isCalendarDay(rawRet) && rawRet >= date ? rawRet : "";

  const int = (key: string, fallback: number, min: number, max: number) => {
    const n = Number(sp.get(key));
    return Number.isInteger(n) && n >= min && n <= max ? n : fallback;
  };
  const adults = int("adults", 1, 1, MAX_SEATS);
  const children = int("children", 0, 0, Math.min(MAX_CHILDREN, MAX_SEATS - adults));
  const infants = int("infants", 0, 0, adults);

  return { trip: returnDate ? "round" : "oneway", from, to, date, returnDate, adults, children, infants };
}

interface PanelProps {
  /** Today's date in IST, computed on the server so both sides agree. */
  today: string;
  maxDate: string;
  /** Pre-filled departure date for a fresh visit and the quick-pick chips. */
  defaultDate: string;
}

/** Re-keys the form on every URL change so it always reflects the address bar. */
export function FlightSearchPanel(props: PanelProps) {
  const sp = useSearchParams();
  return (
    <FlightSearchForm
      key={sp.toString()}
      initial={readInitial(sp, props.today, props.maxDate, props.defaultDate)}
      {...props}
    />
  );
}

function FlightSearchForm({
  initial,
  today,
  maxDate,
  defaultDate,
}: PanelProps & { initial: Initial }) {
  const [trip, setTrip] = useState<TripType>(initial.trip);
  const [from, setFrom] = useState(initial.from);
  const [to, setTo] = useState(initial.to);
  const [date, setDate] = useState(initial.date);
  const [returnDate, setReturnDate] = useState(initial.returnDate);
  const [adults, setAdults] = useState(initial.adults);
  const [children, setChildren] = useState(initial.children);
  const [infants, setInfants] = useState(initial.infants);
  const [swaps, setSwaps] = useState(0);

  const id = useId();
  const sameAirport = from.code === to.code;
  const groups = airportGroups();

  const swap = () => {
    setFrom(to);
    setTo(from);
    setSwaps((n) => n + 1);
  };

  const pickDate = (value: string) => {
    setDate(value);
    if (returnDate && returnDate < value) setReturnDate(value);
  };

  const setAdultCount = (n: number) => {
    const next = Math.min(Math.max(1, n), MAX_SEATS - children);
    setAdults(next);
    if (infants > next) setInfants(next);
  };

  return (
    <Form action="/flights" className="flex min-w-0 flex-col gap-3" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="sr-only">
        Search flights
      </h2>

      {/* --- One way / round trip. Radios under a sliding indicator. */}
      <fieldset className="relative grid grid-cols-2 rounded-2xl bg-sand p-1">
        <legend className="sr-only">Trip type</legend>
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-bone transition-transform duration-300 ease-[var(--ease-out-quiet)]",
            trip === "round" && "translate-x-full",
          )}
        />
        {(
          [
            ["oneway", "One way"],
            ["round", "Round trip"],
          ] as const
        ).map(([value, label]) => (
          <label
            key={value}
            className={cn(
              "relative z-10 flex min-h-11 cursor-pointer items-center justify-center rounded-xl text-[0.9375rem] transition-colors duration-300",
              trip === value ? "font-extrabold text-ink" : "text-taupe hover:text-ink",
            )}
          >
            <input
              type="radio"
              name="trip"
              value={value}
              checked={trip === value}
              onChange={() => {
                setTrip(value);
                if (value === "round" && !returnDate) setReturnDate(addDays(date, 2));
              }}
              className="sr-only"
            />
            {label}
          </label>
        ))}
      </fieldset>

      {/* --- Where. Two tiles with the swap button riding the seam. */}
      <div className="relative grid grid-cols-2 gap-3">
        <AirportTile
          label="From"
          name="from"
          airport={from}
          groups={groups}
          onChange={(code) => setFrom(findAirport(code) ?? from)}
          invalid={sameAirport}
          className="pr-7"
        />
        <AirportTile
          label="To"
          name="to"
          airport={to}
          groups={groups}
          onChange={(code) => setTo(findAirport(code) ?? to)}
          invalid={sameAirport}
          className="pl-7"
        />
        <button
          type="button"
          onClick={swap}
          aria-label="Swap departure and arrival"
          className="absolute top-1/2 left-1/2 z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bone text-clay ring-4 ring-bone transition-colors hover:bg-ink hover:text-bone"
        >
          <SwapIcon
            className="transition-transform duration-500 ease-[var(--ease-out-quiet)]"
            // Each press turns the arrows over once more, in the same direction.
            style={{ transform: `rotate(${swaps * 180}deg)` }}
          />
        </button>
      </div>
      {sameAirport && (
        <p role="alert" className="-mt-1 px-1 text-[0.8125rem] font-extrabold text-error">
          Choose two different airports.
        </p>
      )}

      {/* --- When. */}
      <div className="grid grid-cols-2 gap-3">
        <DateTile
          label="Departure"
          name="date"
          value={date}
          min={today}
          max={maxDate}
          onChange={pickDate}
        />
        {trip === "round" ? (
          <DateTile
            label="Return"
            name="ret"
            value={returnDate || addDays(date, 2)}
            min={date}
            max={maxDate}
            onChange={setReturnDate}
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setTrip("round");
              setReturnDate(addDays(date, 2));
            }}
            className="flex min-h-[5.75rem] flex-col justify-center rounded-2xl border border-dashed border-line-strong px-4 text-left transition-colors hover:border-ink/40 hover:bg-sand/60"
          >
            <span className="text-label font-extrabold text-clay uppercase">+ Add return</span>
            <span className="mt-1 text-[0.8125rem] text-taupe">Same fares, one booking.</span>
          </button>
        )}
      </div>

      {/* --- Who. A details tile: the summary reads like the other tiles, the
          steppers unfold beneath it. Number inputs carry the values, so the
          form posts correctly whether or not the panel is open. */}
      <details className="group rounded-2xl bg-sand">
        <summary className="flex min-h-[5.75rem] cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 marker:hidden [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-label font-extrabold text-taupe uppercase">
              Travellers
            </span>
            <span className="mt-1 block text-[1.375rem] leading-tight font-extrabold text-ink">
              {paxSummary(adults, children, infants)}
            </span>
          </span>
          <ChevronIcon className="shrink-0 text-clay transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <div className="space-y-1 border-t border-bone px-4 py-3">
          <Stepper
            label="Adults"
            hint="12 years and over"
            name="adults"
            value={adults}
            min={1}
            max={MAX_SEATS - children}
            onChange={setAdultCount}
          />
          <Stepper
            label="Children"
            hint="2 to 11 years"
            name="children"
            value={children}
            min={0}
            max={Math.min(MAX_CHILDREN, MAX_SEATS - adults)}
            onChange={setChildren}
          />
          <Stepper
            label="Infants"
            hint="Under 2, on an adult's lap"
            name="infants"
            value={infants}
            min={0}
            max={adults}
            onChange={setInfants}
          />
          <p className="pt-2 text-[0.75rem] leading-relaxed text-taupe">
            Up to {MAX_SEATS} seats per booking. Travelling as a bigger group? Ask us on WhatsApp
            and we will block seats together.
          </p>
        </div>
      </details>

      <SubmitButton disabled={sameAirport} />

      {/* --- Quick picks: the sectors people ask us about most. Real links, so
          they work before hydration and can be shared. */}
      <div className="pt-2">
        <p className="text-label font-extrabold text-taupe uppercase">Popular routes</p>
        <ul className="no-scrollbar -mx-1 mt-2.5 flex gap-2 overflow-x-auto px-1 pb-1">
          {POPULAR_SECTORS.map(([a, b]) => {
            const fromA = findAirport(a);
            const toB = findAirport(b);
            if (!fromA || !toB) return null;
            const active = from.code === a && to.code === b;
            return (
              <li key={`${a}-${b}`} className="shrink-0">
                <Link
                  href={`/flights?from=${a}&to=${b}&date=${defaultDate}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[0.8125rem] whitespace-nowrap transition-colors duration-200",
                    active
                      ? "border-ink bg-ink font-extrabold text-bone"
                      : "border-line-strong text-taupe hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {fromA.city}
                  <PlaneIcon className="size-3.5 opacity-70" />
                  {toB.city}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Form>
  );
}

/* --- Tiles. */

function Tile({
  label,
  aside,
  children,
  invalid,
  className,
}: {
  label: string;
  /** Small text on the label row's right, e.g. the airport code. */
  aside?: ReactNode;
  children: ReactNode;
  invalid?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-[5.75rem] flex-col justify-center rounded-2xl bg-sand px-4 py-3 transition-[box-shadow,background-color] duration-200 focus-within:bg-bone focus-within:ring-2 focus-within:ring-clay",
        invalid && "ring-2 ring-error/60",
        className,
      )}
    >
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-label font-extrabold text-taupe uppercase">{label}</span>
        {aside}
      </span>
      {children}
    </div>
  );
}

function AirportTile({
  label,
  name,
  airport,
  groups,
  onChange,
  invalid,
  className,
}: {
  label: string;
  name: string;
  airport: Airport;
  groups: ReturnType<typeof airportGroups>;
  onChange: (code: string) => void;
  invalid: boolean;
  /** Extra padding on the seam side, so the swap button never sits on a name. */
  className?: string;
}) {
  return (
    <Tile
      label={label}
      invalid={invalid}
      className={className}
      aside={
        <span className="text-[0.75rem] font-extrabold tracking-[0.12em] text-taupe">
          {airport.code}
        </span>
      }
    >
      <span className="mt-1 truncate text-[1.25rem] leading-tight font-extrabold text-ink sm:text-[1.375rem]">
        {airport.city}
      </span>
      <span className="mt-0.5 truncate text-[0.75rem] text-taupe">{airport.name}</span>
      {/* The real control sits invisibly over the tile: tap anywhere to open
          the native picker; keyboard and screen readers get a plain select. */}
      <select
        name={name}
        value={airport.code}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} airport`}
        aria-invalid={invalid || undefined}
        required
        className="absolute inset-0 size-full cursor-pointer appearance-none rounded-2xl opacity-0"
      >
        {groups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.airports.map((a) => (
              <option key={a.code} value={a.code}>
                {a.city} ({a.code}), {a.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </Tile>
  );
}

function DateTile({
  label,
  name,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  min: string;
  max: string;
  onChange: (value: string) => void;
}) {
  const parts = dateParts(value);
  return (
    <Tile label={label}>
      <span className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[1.375rem] leading-tight font-extrabold text-ink tabular-nums">
          {parts.day}
        </span>
        <span className="text-[1.375rem] leading-tight font-extrabold text-ink">{parts.month}</span>
      </span>
      <span className="mt-0.5 text-[0.75rem] text-taupe">
        {parts.weekday}, {parts.year}
      </span>
      <input
        type="date"
        name={name}
        value={value}
        min={min}
        max={max}
        required
        aria-label={`${label} date`}
        onChange={(e) => {
          if (isCalendarDay(e.target.value)) onChange(e.target.value);
        }}
        // Desktop browsers focus a segment on click; ask for the calendar
        // instead, where the browser offers one. Phones open it regardless.
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

function Stepper({
  label,
  hint,
  name,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  name: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  const clamp = (n: number) => Math.min(Math.max(min, n), max);
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <label htmlFor={id} className="block">
        <span className="block text-[0.9375rem] font-extrabold text-ink">{label}</span>
        <span className="block text-[0.75rem] text-taupe">{hint}</span>
      </label>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className="grid size-11 place-items-center rounded-full bg-bone text-lg font-extrabold text-ink transition-colors hover:bg-ink hover:text-bone disabled:opacity-30 disabled:hover:bg-bone disabled:hover:text-ink"
        >
          −
        </button>
        <input
          id={id}
          type="number"
          name={name}
          value={value}
          min={min}
          max={max}
          inputMode="numeric"
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isInteger(n)) onChange(clamp(n));
          }}
          className="h-11 w-10 bg-transparent text-center text-[1.0625rem] font-extrabold text-ink tabular-nums [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          className="grid size-11 place-items-center rounded-full bg-bone text-lg font-extrabold text-ink transition-colors hover:bg-ink hover:text-bone disabled:opacity-30 disabled:hover:bg-bone disabled:hover:text-ink"
        >
          +
        </button>
      </div>
    </div>
  );
}

/** Must be a child of the form for useFormStatus to see its submission. */
function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="group relative mt-1 inline-flex min-h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-ink px-6 text-[1rem] font-extrabold text-bone transition-colors duration-300 hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-60"
    >
      <PlaneIcon
        className={cn(
          "size-5 transition-transform duration-500",
          pending ? "motion-safe:animate-plane-hop" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        )}
      />
      {pending ? "Finding fares…" : "Search flights"}
    </button>
  );
}
