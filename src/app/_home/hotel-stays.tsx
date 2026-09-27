"use client";

import Image from "next/image";
import { useState } from "react";

import { WaCta } from "@/components/ui/wa-cta";
import type { StayTier } from "@/data/hotels";
import { cn } from "@/lib/cn";
import { enquiry } from "@/lib/whatsapp";

import type { StayCard } from "./data";

/*
 * The catalog's stays, town by town: a photograph of each town with its
 * hotels as tickets laid over it, filtered by star rating. The photographs
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

export function HotelStays({ stays }: { stays: StayCard[] }) {
  const [filter, setFilter] = useState<StayTier | "all">("all");

  return (
    <div>
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

      <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {TOWNS.map((town) => {
          const all = stays.filter((s) => s.place === town.place);
          const shown = all.filter((s) => filter === "all" || s.tier === filter);
          const named = all.filter((s) => s.kind === "named").length;
          return (
            <article
              key={town.place}
              className="relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-clay-deep text-bone lg:min-h-[40rem]"
            >
              <Image
                src={town.image}
                alt={town.alt}
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="-z-10 object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(28,26,69,0.3)] via-[rgba(28,26,69,0.5)] via-35% to-[rgba(28,26,69,0.96)]"
              />

              <div className="px-5 pt-40 pb-5 sm:px-6 sm:pb-6 lg:pt-6">
                <p className="text-[0.6875rem] font-extrabold tracking-[0.2em] text-bone/85 uppercase [text-shadow:0_1px_12px_rgba(28,26,69,0.6)]">
                  {town.line} · {named} {named === 1 ? "hotel" : "hotels"} on our journeys
                </p>
                <h3 className="mt-1 text-[2.25rem] leading-none font-extrabold [text-shadow:0_2px_24px_rgba(28,26,69,0.55)] lg:text-[2.75rem]">
                  {town.place}
                </h3>

                <ul key={filter} className="mt-5 space-y-2.5">
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
          );
        })}
      </div>
    </div>
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
        "flex items-center gap-3 rounded-2xl p-3.5 text-ink sm:gap-4 sm:p-4",
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
        <p className="mt-1 text-[0.9375rem] leading-snug font-extrabold sm:text-[1rem]">
          {stay.name.replace(`, ${stay.place}`, "")}
        </p>
        <p className="mt-0.5 line-clamp-2 text-[0.75rem] leading-snug text-taupe">
          {stay.note}
        </p>
        <p className="mt-1.5 text-[0.6875rem] text-taupe/85">
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
