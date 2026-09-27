"use client";

import Image from "next/image";
import { useState } from "react";

import { WaCta } from "@/components/ui/wa-cta";
import type { StayTier } from "@/data/hotels";
import { cn } from "@/lib/cn";
import { enquiry } from "@/lib/whatsapp";

import type { StayCard } from "./data";
import { Rail } from "./rail";

/*
 * The catalog's stays, town by town: a swipeable row of town photographs,
 * each carrying up to three hotels as tickets, filtered by star rating. The photographs
 * are of the towns and say so; no hotel gets a generated picture under its
 * name. The budget tier is an offer to suggest rooms, not a named hotel.
 */

const FILTERS: { id: StayTier | "all"; label: string }[] = [
  { id: "all", label: "All stays" },
  { id: "5-star", label: "5-star" },
  { id: "4-star", label: "4-star" },
  { id: "3-star & budget", label: "3-star & budget" },
];

const TOWNS = [
  {
    place: "Shillong" as const,
    line: "Pine hills and cafés",
    image: "/images/dest-shillong.webp",
    alt: "Tin-roofed cottages among the pines of Shillong in morning mist",
  },
  {
    place: "Cherrapunjee" as const,
    line: "Waterfall country",
    image: "/images/pkg-meghalaya-waterfalls.webp",
    alt: "A waterfall plunging off the Cherrapunjee plateau into a green gorge",
  },
];

/* Tickets shown per town at once; a tier filter can still reach the rest. */
const PER_TOWN = 3;

export function HotelStays({
  stays,
  className,
}: {
  stays: StayCard[];
  className?: string;
}) {
  const [filter, setFilter] = useState<StayTier | "all">("all");

  return (
    <Rail
      label="hotels by town"
      resetKey={filter}
      className={className}
      header={
        <div
          role="group"
          aria-label="Filter stays by rating"
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "min-h-10 shrink-0 rounded-full px-4 text-[0.8125rem] transition-colors",
                filter === f.id
                  ? "bg-ink font-extrabold text-bone"
                  : "bg-sand text-taupe hover:bg-clay-soft hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      }
    >
      {TOWNS.map((town) => {
        const all = stays.filter((s) => s.place === town.place);
        const shown = all
          .filter((s) => filter === "all" || s.tier === filter)
          .slice(0, PER_TOWN);
        const named = all.filter((s) => s.kind === "named").length;
        return (
          <li
            key={town.place}
            className="w-[85vw] max-w-[24rem] shrink-0 snap-start sm:w-[28rem] sm:max-w-none lg:w-[36rem]"
          >
            <article className="relative isolate flex h-full min-h-[27rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-clay-deep text-bone lg:min-h-[29rem]">
              <Image
                src={town.image}
                alt={town.alt}
                fill
                sizes="(min-width: 1024px) 36rem, (min-width: 640px) 28rem, 85vw"
                className="-z-10 object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(28,26,69,0.3)] via-[rgba(28,26,69,0.5)] via-35% to-[rgba(28,26,69,0.96)]"
              />

              <div className="px-4 pt-24 pb-4 sm:px-5 sm:pb-5 lg:pt-6">
                <p className="text-[0.6875rem] font-extrabold tracking-[0.2em] text-bone/85 uppercase [text-shadow:0_1px_12px_rgba(28,26,69,0.6)]">
                  {town.line} · {named} {named === 1 ? "hotel" : "hotels"} on our journeys
                </p>
                <h3 className="mt-1 text-[2rem] leading-none font-extrabold [text-shadow:0_2px_24px_rgba(28,26,69,0.55)] lg:text-[2.5rem]">
                  {town.place}
                </h3>

                <ul key={filter} className="mt-4 space-y-2">
                  {shown.length ? (
                    shown.map((stay, i) => (
                      <li
                        key={stay.id}
                        className="motion-safe:animate-rise"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <StayTicket stay={stay} />
                      </li>
                    ))
                  ) : (
                    <li className="motion-safe:animate-rise">
                      <EmptyTicket place={town.place} tier={filter} />
                    </li>
                  )}
                </ul>
              </div>
            </article>
          </li>
        );
      })}
    </Rail>
  );
}

function StayTicket({ stay }: { stay: StayCard }) {
  const onRequest = stay.kind === "on-request";
  const message = onRequest
    ? enquiry(
        `I am looking for a 3-star or budget stay in ${stay.place}. My dates and budget are:`,
      )
    : enquiry(`I would like to stay at ${stay.name}. Could you share options for my dates?`);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-ink sm:gap-4 sm:px-4",
        onRequest
          ? "border-2 border-dashed border-white/40 bg-bone/85 backdrop-blur-sm"
          : "bg-bone shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Stars count={stay.stars} label={onRequest ? "Up to 3 stars" : `${stay.stars} stars`} />
          <span className="text-[0.6875rem] font-extrabold text-green-deep">
            {stay.tier}
          </span>
        </div>
        <p className="mt-0.5 text-[0.9375rem] leading-snug font-extrabold sm:text-[1rem]">
          {stay.name.replace(`, ${stay.place}`, "")}
        </p>
        <p className="mt-0.5 line-clamp-1 text-[0.75rem] leading-snug text-taupe">
          {stay.note}
        </p>
        <p className="mt-1 truncate text-[0.6875rem] text-taupe/85">
          {onRequest ? (
            stay.features.join(" · ")
          ) : (
            <>
              {stay.features.join(" · ")} ·{" "}
              <b className="text-ink">
                On {stay.journeys} {stay.journeys === 1 ? "journey" : "journeys"}
              </b>
            </>
          )}
        </p>
      </div>
      <WaCta
        message={message}
        location="b-hotels"
        subject={stay.id}
        className={cn(
          "inline-flex min-h-10 shrink-0 items-center rounded-full px-4 text-[0.8125rem] font-extrabold transition-transform duration-150 active:scale-[0.97]",
          onRequest ? "bg-ink text-bone" : "bg-green-deep text-white",
        )}
      >
        {onRequest ? "Ask" : "Book"}
        <span className="sr-only"> {onRequest ? `a budget stay in ${stay.place}` : stay.name}</span>
      </WaCta>
    </div>
  );
}

function EmptyTicket({ place, tier }: { place: string; tier: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-white/40 bg-bone/85 p-4 text-ink backdrop-blur-sm">
      <p className="min-w-0 flex-1 text-[0.8125rem] leading-snug">
        Our {place} journeys use no {tier} hotel yet. Tell us what you would
        like and we will suggest one.
      </p>
      <WaCta
        message={enquiry(`I am looking for a ${tier} stay in ${place}. My dates are:`)}
        location="b-hotels"
        subject={`${place}-${tier}`}
        className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-ink px-4 text-[0.8125rem] font-extrabold text-bone"
      >
        Ask
      </WaCta>
    </div>
  );
}

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn("size-3.5", i < count ? "text-green-deep" : "text-line-strong")}
        >
          <path d="m12 3 2.7 5.5 6 .9-4.35 4.25 1 6L12 16.8l-5.35 2.85 1-6L3.3 9.4l6-.9z" />
        </svg>
      ))}
    </span>
  );
}
