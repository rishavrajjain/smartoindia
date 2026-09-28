"use client";

import Link from "next/link";

import { requestScrollToResults } from "@/components/sections/scroll-to-results";
import { Eyebrow } from "@/components/ui/deco";
import { PlaneIcon } from "@/components/ui/flight-icons";
import { ArrowIcon } from "@/components/ui/line-icons";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { POPULAR_SECTORS, findAirport } from "@/data/airports";
import { enquiry } from "@/lib/whatsapp";

/*
 * The popular routes as boarding passes. Each one is a real link to that
 * search a week out, so it works before hydration and can be shared; the
 * page then scrolls to the results. A swipe rail on phones, a grid above.
 */
export function PopularRoutes({ date, className }: { date: string; className?: string }) {
  return (
    <section aria-labelledby="routes-title" className={className}>
      <Eyebrow>Popular routes</Eyebrow>
      <h2 id="routes-title" className="mt-3 text-[1.875rem] leading-[1.08] sm:text-[2.25rem] lg:text-[2.5rem]">
        Fly from Guwahati <span className="accent">across India</span>
      </h2>
      <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-taupe">
        Tap a route to see the fares, then confirm your booking on WhatsApp.
        Land back in Guwahati and a Smarto cab is waiting.
      </p>

      <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-4">
        {POPULAR_SECTORS.map(([a, b]) => {
          const from = findAirport(a);
          const to = findAirport(b);
          if (!from || !to) return null;
          return (
            <li key={`${a}-${b}`} className="relative w-[17.5rem] shrink-0 snap-start sm:w-auto">
              <Link
                href={`/flights?from=${a}&to=${b}&date=${date}`}
                onClick={requestScrollToResults}
                className="group relative block overflow-hidden rounded-[1.5rem] bg-sand text-ink transition-colors duration-300 hover:bg-ink hover:text-bone"
              >
                <span aria-hidden="true" className="spark-fill absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex items-center gap-3 px-5 pt-6 pb-5">
                  <span className="min-w-0">
                    <span className="block text-[2rem] leading-none font-extrabold tracking-[-0.02em]">{from.code}</span>
                    <span className="mt-1.5 block truncate text-[0.75rem] text-taupe transition-colors group-hover:text-bone/65">
                      {from.city}
                    </span>
                  </span>
                  <span aria-hidden="true" className="relative flex flex-1 items-center justify-center self-start pt-3.5">
                    <span className="absolute inset-x-0 top-[1.4rem] border-t-2 border-dashed border-line-strong transition-colors group-hover:border-white/25" />
                    <span className="relative grid size-8 place-items-center rounded-full bg-bone text-green-deep ring-1 ring-line transition-colors group-hover:bg-green group-hover:text-clay-deep group-hover:ring-green">
                      <PlaneIcon className="size-4 rotate-45" />
                    </span>
                  </span>
                  <span className="min-w-0 text-right">
                    <span className="block text-[2rem] leading-none font-extrabold tracking-[-0.02em]">{to.code}</span>
                    <span className="mt-1.5 block truncate text-[0.75rem] text-taupe transition-colors group-hover:text-bone/65">
                      {to.city}
                    </span>
                  </span>
                </span>

                {/* The tear line, with a notch cut into each side. */}
                <span aria-hidden="true" className="relative block">
                  <span className="absolute top-1/2 -left-2.5 size-5 -translate-y-1/2 rounded-full bg-bone" />
                  <span className="absolute top-1/2 -right-2.5 size-5 -translate-y-1/2 rounded-full bg-bone" />
                  <span className="mx-5 block border-t border-dashed border-line-strong transition-colors group-hover:border-white/20" />
                </span>

                <span className="flex items-center justify-between gap-3 px-5 py-4">
                  <span className="text-[0.875rem] font-extrabold">
                    {from.city} to {to.city}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.8125rem] font-extrabold text-green-deep transition-colors group-hover:text-green">
                    See fares
                    <ArrowIcon className="size-3.5" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.875rem] text-taupe">
        Flying somewhere else?
        <WaCta
          message={enquiry("I would like a flight fare. My route and date are:")}
          location="flights-routes"
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-extrabold text-ink ring-1 ring-line-strong transition-colors hover:bg-sand"
        >
          <WhatsAppIcon />
          Ask for any route
        </WaCta>
      </p>
    </section>
  );
}
