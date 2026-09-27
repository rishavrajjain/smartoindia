import Image from "next/image";
import Link from "next/link";

import { JOURNEY_COUNT, type TrailJourney } from "./data";
import { Rail } from "./rail";

/* The catalog's popular journeys as compact dark cards, under the service doors. */
export function PopularRail({ journeys }: { journeys: TrailJourney[] }) {
  return (
    <Rail
      label="popular journeys"
      tone="dark"
      className="mt-12 lg:mt-14"
      header={
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-[1.375rem] leading-tight text-bone lg:text-[1.625rem]">
            Where first trips <span className="accent">usually start</span>
          </p>
          <span className="hidden sm:inline-flex">
            <Link
              href="/packages"
              className="link-rule shrink-0 text-[0.8125rem] font-extrabold text-green"
            >
              See all
            </Link>
          </span>
        </div>
      }
    >
      {journeys.map((j) => (
        <li key={j.slug} className="w-[18.5rem] shrink-0 snap-start sm:w-[21rem]">
          <Link
            href={`/packages/${j.slug}`}
            className="group flex h-full gap-3.5 rounded-2xl bg-white/[0.06] p-2.5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
          >
            <span className="relative block h-[6.5rem] w-[6.75rem] shrink-0 overflow-hidden rounded-xl sm:w-[7.75rem]">
              <Image src={j.hero.src} alt="" fill sizes="124px" className="zoom-slow object-cover" />
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
          href="/packages"
          className="flex h-full min-h-[7.5rem] flex-col items-start justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-5 text-bone transition-colors hover:border-green hover:text-green"
        >
          <span className="text-[0.9375rem] font-extrabold">See them all</span>
          <span className="text-[0.75rem] text-bone/60">All {JOURNEY_COUNT} journeys</span>
        </Link>
      </li>
    </Rail>
  );
}
