import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/site";

import { JOURNEY_COUNT, type TrailJourney } from "./data";
import { Rail } from "@/components/ui/rail";

/*
 * The catalog's popular packages as compact dark cards, under the service
 * doors. Its own lockup (the Smarto wordmark with a Packages pill) and a
 * label on every card make it read as the packages list, not more tiles.
 */
export function PopularRail({ journeys }: { journeys: TrailJourney[] }) {
  return (
    <>
      <div aria-hidden="true" className="mx-auto mt-10 flex w-24 items-center gap-1.5 lg:mt-12">
        <span className="h-px flex-1 bg-white/20" />
        <span className="size-1 rounded-full bg-green" />
        <span className="h-px flex-1 bg-white/20" />
      </div>
      <Rail
        label="popular packages"
        tone="dark"
        className="mt-8 lg:mt-10"
        header={
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2">
                <Image
                  src="/brand/smarto-wordmark-light.webp"
                  alt={SITE.name}
                  width={720}
                  height={160}
                  className="h-4 w-auto lg:h-[1.125rem]"
                />
                <span className="rounded-full bg-green px-2.5 py-0.5 text-[0.6875rem] font-extrabold tracking-[0.12em] text-clay-deep uppercase">
                  Packages
                </span>
              </p>
              {/* Phones get their own way to the full list; wider screens
                  have "See all" and the arrows beside the heading. */}
              <Link
                href="/packages"
                className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-white/10 pr-3 pl-4 text-[0.8125rem] font-extrabold text-bone ring-1 ring-white/20 transition-colors hover:bg-white/15 sm:hidden"
              >
                Explore all
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4 text-green">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 className="text-[1.375rem] leading-tight text-bone lg:text-[1.75rem]">
                Popular packages, <span className="accent">where first trips start</span>
              </h2>
              <span className="hidden sm:inline-flex">
                <Link
                  href="/packages"
                  className="link-rule shrink-0 text-[0.8125rem] font-extrabold text-green"
                >
                  Explore all
                </Link>
              </span>
            </div>
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
                <span className="text-[0.625rem] font-extrabold tracking-[0.16em] text-green uppercase">
                  Smarto package
                </span>
                <span className="mt-0.5 line-clamp-2 text-[0.9375rem] leading-snug font-extrabold text-bone">
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
            <span className="text-[0.9375rem] font-extrabold">See every package</span>
            <span className="text-[0.75rem] text-bone/60">All {JOURNEY_COUNT} packages</span>
          </Link>
        </li>
      </Rail>
    </>
  );
}
