import Link from "next/link";

import { WaCta } from "@/components/ui/wa-cta";
import { ArrowRightIcon, PlaneIcon } from "@/components/ui/flight-icons";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { POPULAR_SECTORS, findAirport } from "@/data/airports";
import { cn } from "@/lib/cn";
import { type CtaLocation, enquiry } from "@/lib/whatsapp";

/*
 * The homepage's flights section: a boarding pass for the route Smarto sells
 * most (into Guwahati), torn along a perforation, with the plane taxiing across
 * the route line. The whole pass is the link to /flights; the chips beneath
 * pre-set a route there without a date, so nothing fires until the visitor
 * picks one. No fares are shown here, those come live from the airline system
 * on the search page.
 *
 * `column` is the phone-width homepage layout; `wide` is the same section
 * for full-width pages, with the copy and routes beside a larger pass.
 */
export function FlightsTeaser({
  layout = "column",
  id = "home-flights",
  location = "home-flights",
}: {
  layout?: "column" | "wide";
  id?: string;
  location?: CtaLocation;
}) {
  if (layout === "wide") {
    return (
      <section id={id} className="scroll-mt-24 pt-14 lg:pt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-x-14">
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="text-label font-extrabold text-clay uppercase">Flights</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight lg:text-[2.25rem]">
              Fly in, <span className="accent">we take it from the kerb</span>
            </h2>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-taupe">
              Fixed-departure fares into Guwahati and across the Northeast,
              confirmed on WhatsApp, with a Smarto cab waiting when you land.
            </p>
          </div>

          <div className="mt-6 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:self-center">
            <BoardingPass wide />
          </div>

          <div className="-mx-5 mt-4 overflow-hidden sm:-mx-8 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:mt-7">
            <RouteChips className="px-5 sm:px-8 lg:flex-wrap lg:overflow-visible lg:px-0" />
          </div>

          <div className="mt-5 lg:col-start-1 lg:row-start-3 lg:mt-7">
            <AskForFare location={location} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-6 px-6 pt-16">
      <p className="text-label font-extrabold text-clay uppercase">Flights</p>
      <h2 className="mt-3 text-[1.75rem] leading-tight">
        Fly in, <span className="accent">we take it from the kerb</span>
      </h2>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-taupe">
        Fixed-departure fares into Guwahati and across the Northeast, confirmed on WhatsApp, with
        a Smarto cab waiting when you land.
      </p>

      <BoardingPass />

      {/* --- Popular routes, as real links. The clipping wrapper matters:
          WebKit lets inline SVGs inside a horizontal scroller widen the whole
          page on iPhones without it. */}
      <div className="-mx-6 mt-4 overflow-hidden">
        <RouteChips className="px-6" />
      </div>

      <div className="mt-5">
        <AskForFare location={location} />
      </div>
    </section>
  );
}

/* --- The boarding pass: the whole card links to /flights. */
function BoardingPass({ wide = false }: { wide?: boolean }) {
  const from = findAirport("DEL")!;
  const to = findAirport("GAU")!;
  const code = wide
    ? "mt-1 text-[2rem] leading-none font-extrabold tracking-[-0.02em] text-ink sm:text-[2.75rem]"
    : "mt-1 text-[2rem] leading-none font-extrabold tracking-[-0.02em] text-ink";

  return (
    <Link
      href="/flights"
      className={cn(
        "group block rounded-2xl bg-sand transition-colors duration-300 hover:bg-[#e6e9ef]",
        !wide && "mt-6",
        wide && "shadow-[0_18px_40px_rgba(40,37,96,0.08)]",
      )}
      aria-label="Book flights"
    >
      <div className={wide ? "px-5 pt-5 pb-4 sm:px-7 sm:pt-7 sm:pb-6" : "px-5 pt-5 pb-4"}>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.625rem] font-extrabold tracking-[0.2em] text-taupe uppercase">
              From
            </p>
            <p className={code}>{from.code}</p>
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
            <p className={code}>{to.code}</p>
            <p className="mt-1 truncate text-[0.75rem] text-taupe">{to.city}</p>
          </div>
        </div>
      </div>

      {/* The perforation: a dashed rule with a notch bitten out of each edge. */}
      <div
        className={cn(
          "relative border-t border-dashed border-line-strong",
          wide ? "mx-5 sm:mx-7" : "mx-5",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-bone",
            wide ? "-left-7 sm:-left-9" : "-left-7",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-bone",
            wide ? "-right-7 sm:-right-9" : "-right-7",
          )}
        />
      </div>

      <div
        className={cn(
          "flex items-center justify-between gap-4",
          wide ? "px-5 py-4 sm:px-7 sm:py-5" : "px-5 py-4",
        )}
      >
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
  );
}

/* --- Popular routes, each pre-setting the search on /flights. */
function RouteChips({ className }: { className?: string }) {
  return (
    <ul className={cn("no-scrollbar flex gap-2 overflow-x-auto pb-1", className)}>
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
  );
}

function AskForFare({ location }: { location: CtaLocation }) {
  return (
    <WaCta
      message={enquiry(
        "I am looking for a flight. Here is my route, date, and number of travellers:",
      )}
      location={location}
      className="link-rule inline-flex items-center gap-2 text-[0.9375rem] font-extrabold text-ink"
    >
      <WhatsAppIcon className="size-[1em]" />
      Or ask us to find a fare
    </WaCta>
  );
}
