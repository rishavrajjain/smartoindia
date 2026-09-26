"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/cn";
import type { JourneyLength } from "@/types";

import type { TrailJourney } from "./data";

/*
 * Journeys by length, as a photographic bento: the tall centre tile carries
 * the tier's lead journey, the rest tuck around it. On phones it folds into
 * a two-up grid with the lead tile across the top.
 */

/* Desktop placement on a 6-column, 2-row grid (PickYourTrail's rhythm). */
const PLACEMENT = [
  "lg:col-start-3 lg:col-span-2 lg:row-span-2 lg:row-start-1",
  "lg:col-start-1 lg:col-span-2 lg:row-start-1",
  "lg:col-start-5 lg:col-span-2 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-5 lg:col-span-2 lg:row-start-2",
];

export function LengthBento({
  tiers,
  journeys,
  counts,
}: {
  tiers: { id: JourneyLength; label: string; nights: string }[];
  journeys: Record<JourneyLength, TrailJourney[]>;
  counts: Record<JourneyLength, number>;
}) {
  const [tier, setTier] = useState<JourneyLength>(tiers[0].id);
  const current = tiers.find((t) => t.id === tier) ?? tiers[0];

  return (
    <div>
      <div
        role="group"
        aria-label="Journey length"
        className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      >
        {tiers.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tier === t.id}
            onClick={() => setTier(t.id)}
            className={cn(
              "flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.8125rem] transition-colors",
              tier === t.id
                ? "bg-ink font-extrabold text-bone"
                : "bg-bone text-taupe ring-1 ring-line-strong hover:text-ink",
            )}
          >
            {t.label}
            <span
              className={cn(
                "text-[0.6875rem]",
                tier === t.id ? "text-bone/70" : "text-taupe/70",
              )}
            >
              {t.nights}
            </span>
          </button>
        ))}
      </div>

      <ul
        key={tier}
        aria-label={`${current.label}, ${current.nights}`}
        className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6 lg:grid-rows-[16rem_16rem] lg:gap-5"
      >
        {journeys[tier].map((j, i) => (
          <li
            key={j.slug}
            className={cn(
              "motion-safe:animate-rise",
              i === 0 ? "col-span-2 aspect-[16/10] lg:aspect-auto" : "aspect-[4/5] lg:aspect-auto",
              PLACEMENT[i],
            )}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Link
              href={`/packages/${j.slug}`}
              className="group relative block h-full overflow-hidden rounded-2xl bg-sand"
            >
              <Image
                src={j.hero.src}
                alt=""
                fill
                sizes={
                  i === 0
                    ? "(min-width: 1024px) 34vw, 100vw"
                    : "(min-width: 1024px) 34vw, 50vw"
                }
                className="zoom-slow object-cover"
              />
              <span aria-hidden="true" className="photo-scrim absolute inset-0" />
              <span className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                <span
                  className={cn(
                    "block leading-tight font-extrabold text-bone",
                    i === 0 ? "text-[1.375rem] lg:text-[1.75rem]" : "text-[1rem] lg:text-[1.1875rem]",
                  )}
                >
                  {j.title}
                </span>
                <span className="mt-1 block text-[0.75rem] text-bone/80">
                  {j.nights} nights · {j.days} days
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={`/packages?length=${encodeURIComponent(tier)}#journeys`}
        className="link-rule mt-7 text-[0.875rem] font-extrabold text-ink"
      >
        See all {counts[tier]} journeys of {current.nights}
      </Link>
    </div>
  );
}
