import Link from "next/link";

import { WaCta } from "@/components/ui/wa-cta";
import { ArrowRightIcon, PlaneIcon } from "@/components/ui/flight-icons";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { POPULAR_SECTORS, findAirport } from "@/data/airports";
import { enquiry } from "@/lib/whatsapp";

/*
 * The homepage's flights section: a boarding pass for the route Smarto sells
 * most (into Guwahati), torn along a perforation, with the plane taxiing across
 * the route line. The whole pass is the link to /flights; the chips beneath
 * pre-set a route there without a date, so nothing fires until the visitor
 * picks one. No fares are shown here, those come live from the airline system
 * on the search page.
 */
export function FlightsTeaser() {
  const from = findAirport("DEL")!;
  const to = findAirport("GAU")!;

  return (
    <section id="home-flights" className="scroll-mt-6 px-6 pt-16">
      <p className="text-label font-extrabold text-clay uppercase">Flights</p>
      <h2 className="mt-3 text-[1.75rem] leading-tight">
        Fly in, <span className="accent">we take it from the kerb</span>
      </h2>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-taupe">
        Fixed-departure fares into Guwahati and across the Northeast, confirmed on WhatsApp, with
        a Smarto cab waiting when you land.
      </p>

      {/* --- The boarding pass. */}
      <Link
        href="/flights"
        className="group mt-6 block rounded-2xl bg-sand transition-colors duration-300 hover:bg-[#e6e9ef]"
        aria-label="Book flights"
      >
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.625rem] font-extrabold tracking-[0.2em] text-taupe uppercase">
                From
              </p>
              <p className="mt-1 text-[2rem] leading-none font-extrabold tracking-[-0.02em] text-ink">
                {from.code}
              </p>
              <p className="mt-1 truncate text-[0.75rem] text-taupe">{from.city}</p>
            </div>

            {/* The route, drawn in the spark, with the plane crossing it. */}
            <div className="spark-fill relative mb-3 h-px flex-1">
              <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
              <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sand px-1 text-ink transition-colors duration-300 group-hover:bg-[#e6e9ef] motion-safe:animate-plane-taxi"
              >
                <PlaneIcon className="size-4" />
              </span>
            </div>

            <div className="min-w-0 text-right">
              <p className="text-[0.625rem] font-extrabold tracking-[0.2em] text-taupe uppercase">
                To
              </p>
              <p className="mt-1 text-[2rem] leading-none font-extrabold tracking-[-0.02em] text-ink">
                {to.code}
              </p>
              <p className="mt-1 truncate text-[0.75rem] text-taupe">{to.city}</p>
            </div>
          </div>
        </div>

        {/* The perforation: a dashed rule with a notch bitten out of each edge. */}
        <div className="relative mx-5 border-t border-dashed border-line-strong">
          <span
            aria-hidden="true"
            className="absolute top-1/2 -left-7 size-4 -translate-y-1/2 rounded-full bg-bone"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 -right-7 size-4 -translate-y-1/2 rounded-full bg-bone"
          />
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[0.625rem] font-extrabold tracking-[0.2em] text-taupe uppercase">
              Boarding
            </p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-ink">
              Search live fares, confirm in one WhatsApp chat.
            </p>
          </div>
          <span className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 text-[0.875rem] font-extrabold text-bone transition-colors duration-300 group-hover:bg-clay-deep">
            Book flights
            <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      {/* --- Popular routes, as real links. The clipping wrapper matters:
          WebKit lets inline SVGs inside a horizontal scroller widen the whole
          page on iPhones without it. */}
      <div className="-mx-6 mt-4 overflow-hidden">
        <ul className="no-scrollbar flex gap-2 overflow-x-auto px-6 pb-1">
          {POPULAR_SECTORS.map(([a, b]) => {
            const fromA = findAirport(a);
            const toB = findAirport(b);
            if (!fromA || !toB) return null;
            return (
              <li key={`${a}-${b}`} className="shrink-0">
                <Link
                  href={`/flights?from=${a}&to=${b}`}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.8125rem] whitespace-nowrap text-taupe transition-colors duration-200 hover:border-ink/40 hover:text-ink"
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

      <div className="mt-5">
        <WaCta
          message={enquiry(
            "I am looking for a flight. Here is my route, date, and number of travellers:",
          )}
          location="home-flights"
          className="link-rule inline-flex items-center gap-2 text-[0.9375rem] font-extrabold text-ink"
        >
          <WhatsAppIcon className="size-[1em]" />
          Or ask us to find a fare
        </WaCta>
      </div>
    </section>
  );
}
