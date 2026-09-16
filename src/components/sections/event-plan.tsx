"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

/*
 * The movement plan: Manav's signature piece for the events page. Pick an
 * event type, set guests and days, and see the shape of the logistics: how
 * many guest journeys the event actually involves, cars in rotation at peak,
 * and arrival/departure waves. The maths and assumptions come from his
 * mockup and are labelled on the page as an estimate, never a quote.
 */

const SEATS_PER_CAR = 3;

const EVENT_TYPES = [
  { id: "wedding", label: "Wedding", legsPerDay: 2.2, peak: 0.3, waves: 6 },
  {
    id: "corporate",
    label: "Corporate event",
    legsPerDay: 2.0,
    peak: 0.4,
    waves: 4,
  },
  {
    id: "conference",
    label: "Conference",
    legsPerDay: 1.4,
    peak: 0.55,
    waves: 3,
  },
] as const;

type EventTypeId = (typeof EVENT_TYPES)[number]["id"];

const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

export function EventPlan() {
  const [typeId, setTypeId] = useState<EventTypeId>("wedding");
  const [guests, setGuests] = useState(200);
  const [days, setDays] = useState(3);

  const type = EVENT_TYPES.find((t) => t.id === typeId) ?? EVENT_TYPES[0];
  const legs = guests * (2 + days * type.legsPerDay);
  const journeys = Math.ceil(legs / SEATS_PER_CAR);
  const cars = Math.max(2, Math.ceil((guests * type.peak) / SEATS_PER_CAR));

  return (
    <div>
      <div
        role="group"
        aria-label="Type of event"
        className="mt-7 flex flex-wrap gap-2"
      >
        {EVENT_TYPES.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={option.id === typeId}
            onClick={() => setTypeId(option.id)}
            className={cn(
              "min-h-11 rounded-full px-4 text-[0.8125rem] transition-colors duration-[260ms]",
              option.id === typeId
                ? "bg-white font-extrabold text-ink"
                : "bg-white/7 text-bone/80 hover:bg-white/12",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="event-guests"
            className="text-[0.75rem] text-bone/60"
          >
            Guests
          </label>
          <span className="text-[1.125rem] font-extrabold tabular-nums">
            {fmt(guests)}
          </span>
        </div>
        <input
          id="event-guests"
          type="range"
          min={25}
          max={800}
          step={25}
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          className="range-dark mt-3"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <label htmlFor="event-days" className="text-[0.75rem] text-bone/60">
            Days
          </label>
          <span className="text-[1.125rem] font-extrabold tabular-nums">
            {days}
          </span>
        </div>
        <input
          id="event-days"
          type="range"
          min={1}
          max={6}
          step={1}
          value={days}
          onChange={(event) => setDays(Number(event.target.value))}
          className="range-dark mt-3"
        />
      </div>

      <div aria-live="polite" className="mt-9 text-center">
        <p className="text-[4.25rem] leading-[0.94] font-extrabold tracking-[-0.045em] text-green tabular-nums">
          {fmt(journeys)}
        </p>
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-bone/60">
          guest journeys to plan, book and run
          <br />
          across your event.
        </p>
      </div>

      <dl className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10">
        <Stat value={fmt(cars)} label={<>cars in rotation<br />at peak</>} />
        <Stat value={String(type.waves)} label={<>arrival and<br />departure waves</>} />
        <Stat value={String(days + 2)} label={<>days of<br />coverage</>} />
      </dl>
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: React.ReactNode;
}) {
  return (
    <div className="bg-clay-deep px-2 py-4 text-center">
      <dd className="text-[1.5rem] font-extrabold tracking-[-0.03em] tabular-nums">
        {value}
      </dd>
      <dt className="mt-1.5 text-[0.65625rem] leading-snug text-bone/50">
        {label}
      </dt>
    </div>
  );
}
