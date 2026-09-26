"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/cn";

import type { TrailJourney, Traveller } from "./data";
import { Rail } from "./rail";

/*
 * "Who's coming along": pick a kind of trip and the rail beneath re-deals
 * the catalog's journeys for it. Tapping the picked circle again returns to
 * the catalog's own popular five.
 */
export function TravellerPicker({
  travellers,
  popular,
}: {
  travellers: Traveller[];
  popular: TrailJourney[];
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const current = travellers.find((t) => t.id === picked);
  const journeys = current?.journeys ?? popular;
  const seeAll = current
    ? `/packages?style=${encodeURIComponent(current.styles[0])}#journeys`
    : "/packages";

  return (
    <div>
      <h2 className="mx-auto flex max-w-3xl items-center gap-4 px-5 text-label font-extrabold text-bone/80 uppercase">
        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
        Who&rsquo;s coming along?
        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
      </h2>

      <div
        role="group"
        aria-label="Who's coming along"
        className="no-scrollbar mt-7 flex snap-x scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 sm:justify-center sm:gap-8 lg:gap-12"
      >
        {travellers.map((t) => {
          const on = t.id === picked;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={on}
              onClick={() => setPicked(on ? null : t.id)}
              className="group flex shrink-0 snap-start flex-col items-center gap-3 rounded-2xl p-1"
            >
              <span
                className={cn(
                  "relative block size-[5.5rem] overflow-hidden rounded-full ring-offset-4 ring-offset-clay-deep transition-[box-shadow,transform] duration-300 ease-out sm:size-24 lg:size-[7.5rem]",
                  on
                    ? "scale-105 ring-[3px] ring-green"
                    : "ring-2 ring-white/20 group-hover:ring-white/45",
                )}
              >
                <Image
                  src={t.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 120px, 96px"
                  style={{ objectPosition: t.focus }}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span
                className={cn(
                  "text-[0.875rem] transition-colors",
                  on ? "font-extrabold text-green" : "text-bone/85",
                )}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      <div aria-hidden="true" className="mx-auto mt-8 flex w-24 items-center gap-1.5">
        <span className="h-px flex-1 bg-white/20" />
        <span className="size-1 rounded-full bg-green" />
        <span className="h-px flex-1 bg-white/20" />
      </div>

      <Rail
        label="suggested journeys"
        tone="dark"
        resetKey={picked ?? "popular"}
        className="mt-8"
        header={
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p
              aria-live="polite"
              className="text-[1.375rem] leading-tight text-bone lg:text-[1.625rem]"
            >
              {current ? (
                <>
                  {current.heading}{" "}
                  <span className="accent">
                    · {current.journeys.length} journeys
                  </span>
                </>
              ) : (
                <>
                  Where first trips <span className="accent">usually start</span>
                </>
              )}
            </p>
            <Link
              href={seeAll}
              className="link-rule shrink-0 text-[0.8125rem] font-extrabold text-green"
            >
              See all
            </Link>
          </div>
        }
      >
        {journeys.map((j, i) => (
          <li
            key={`${picked ?? "popular"}-${j.slug}`}
            className="w-[18.5rem] shrink-0 snap-start motion-safe:animate-rise sm:w-[21rem]"
            style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}
          >
            <Link
              href={`/packages/${j.slug}`}
              className="group flex h-full gap-3.5 rounded-2xl bg-white/[0.06] p-2.5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
            >
              <span className="relative block h-[6.5rem] w-[6.75rem] shrink-0 overflow-hidden rounded-xl sm:w-[7.75rem]">
                <Image
                  src={j.hero.src}
                  alt=""
                  fill
                  sizes="124px"
                  className="zoom-slow object-cover"
                />
              </span>
              <span className="flex min-w-0 flex-col justify-center py-1 pr-1">
                <span className="line-clamp-2 text-[0.9375rem] leading-snug font-extrabold text-bone">
                  {j.title}
                </span>
                <span className="mt-1 truncate text-[0.75rem] text-bone/60">
                  {j.stops.slice(0, 3).join(" · ")}
                </span>
                <span className="mt-2.5 flex items-center gap-2 text-[0.75rem] whitespace-nowrap">
                  <span className="rounded-full bg-green/15 px-2 py-0.5 font-extrabold text-green">
                    {j.nights}N · {j.days}D
                  </span>
                  <span className="truncate text-bone/55">Get a quote</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
        <li className="w-[12rem] shrink-0 snap-start">
          <Link
            href={seeAll}
            className="flex h-full min-h-[7.5rem] flex-col items-start justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-5 text-bone transition-colors hover:border-green hover:text-green"
          >
            <span className="text-[0.9375rem] font-extrabold">See them all</span>
            <span className="text-[0.75rem] text-bone/60">
              {current ? "In the full catalog" : "All 50 journeys"}
            </span>
          </Link>
        </li>
      </Rail>
    </div>
  );
}
