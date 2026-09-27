import Image from "next/image";
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
 * for full-width pages: a photographic panel with the routes beside a
 * punched-out ticket.
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
      <section id={id} className="scroll-mt-24 px-5 pt-14 sm:px-8 lg:pt-20">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-clay-deep text-bone">
          <Image
            src="/images/svc-flights-hero.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="-z-10 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(28,26,69,0.97)] via-[rgba(28,26,69,0.78)] via-55% to-[rgba(28,26,69,0.25)] lg:bg-gradient-to-r lg:from-[rgba(28,26,69,0.95)] lg:via-[rgba(28,26,69,0.72)] lg:via-45% lg:to-[rgba(28,26,69,0.15)]"
          />
          <div aria-hidden="true" className="spark-glow absolute -bottom-32 -left-24 -z-10 size-96 opacity-70" />

          <div className="grid grid-cols-1 gap-9 px-6 pt-44 pb-7 sm:px-10 sm:pt-56 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center lg:gap-12 lg:p-14">
            <div>
              <p className="text-label font-extrabold text-green uppercase">Flights</p>
              <h2 className="mt-3 text-[1.875rem] leading-[1.08] text-bone lg:text-[2.625rem]">
                Fly in, <span className="accent">we take it from the kerb</span>
              </h2>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-bone/75">
                Fixed-departure fares into Guwahati and across the Northeast,
                confirmed on WhatsApp, with a Smarto cab waiting when you land.
              </p>
              <div className="-mx-6 mt-6 overflow-hidden sm:-mx-10 lg:mx-0">
                <RouteChips
                  tone="dark"
                  className="px-6 sm:px-10 lg:flex-wrap lg:overflow-visible lg:px-0"
                />
              </div>
              <div className="mt-6">
                <AskForFare location={location} tone="dark" />
              </div>
            </div>

            <Ticket />
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
function BoardingPass() {
  const from = findAirport("DEL")!;
  const to = findAirport("GAU")!;
  const code = "mt-1 text-[2rem] leading-none font-extrabold tracking-[-0.02em] text-ink";

  return (
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
  );
}

/* --- The wide layout's pass: a white ticket with real notches punched at
   the perforation (see .ticket-mask), tilted slightly until hovered. */
function Ticket() {
  const from = findAirport("DEL")!;
  const to = findAirport("GAU")!;

  return (
    <div className="transition-transform duration-500 ease-out [filter:drop-shadow(0_26px_38px_rgba(0,0,0,0.4))_drop-shadow(0_0_22px_rgba(117,184,132,0.45))] lg:-rotate-2 lg:hover:rotate-0">
      <Link
        href="/flights"
        aria-label="Book flights"
        className="group ticket-mask block rounded-[1.5rem] bg-bone text-ink"
      >
        <div className="flex h-[8.75rem] flex-col justify-center px-6 sm:h-[10rem] sm:px-8">
          <div className="flex items-center justify-between text-[0.625rem] font-extrabold tracking-[0.2em] text-taupe uppercase">
            <span>Boarding pass</span>
            <span className="text-green-deep">Smarto flights</span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[2.25rem] leading-none font-extrabold tracking-[-0.02em] sm:text-[3rem]">
                {from.code}
              </p>
              <p className="mt-1 truncate text-[0.75rem] text-taupe">{from.city}</p>
            </div>
            <div className="spark-fill relative mb-5 h-px flex-1">
              <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
              <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bone px-1 text-ink motion-safe:animate-plane-taxi"
              >
                <PlaneIcon className="size-5" />
              </span>
            </div>
            <div className="min-w-0 text-right">
              <p className="text-[2.25rem] leading-none font-extrabold tracking-[-0.02em] sm:text-[3rem]">
                {to.code}
              </p>
              <p className="mt-1 truncate text-[0.75rem] text-taupe">{to.city}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t-2 border-dashed border-line-strong px-6 py-5 sm:px-8">
          <div className="min-w-0">
            <p className="text-[0.625rem] font-extrabold tracking-[0.2em] text-taupe uppercase">
              Boarding
            </p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-ink">
              Search live fares, confirm in one WhatsApp chat.
            </p>
          </div>
          <span className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-green-deep px-5 text-[0.875rem] font-extrabold text-white transition-transform duration-300 group-hover:scale-[1.03]">
            Book flights
            <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}

/* --- Popular routes, each pre-setting the search on /flights. */
function RouteChips({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
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
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[0.8125rem] whitespace-nowrap transition-colors duration-200",
                tone === "dark"
                  ? "border-white/20 bg-white/[0.06] text-bone/85 backdrop-blur-sm hover:border-white/50 hover:text-bone"
                  : "border-line-strong text-taupe hover:border-ink/40 hover:text-ink",
              )}
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

function AskForFare({
  location,
  tone = "light",
}: {
  location: CtaLocation;
  tone?: "light" | "dark";
}) {
  return (
    <WaCta
      message={enquiry(
        "I am looking for a flight. Here is my route, date, and number of travellers:",
      )}
      location={location}
      className={cn(
        "link-rule inline-flex items-center gap-2 text-[0.9375rem] font-extrabold",
        tone === "dark" ? "text-bone" : "text-ink",
      )}
    >
      <WhatsAppIcon className="size-[1em]" />
      Or ask us to find a fare
    </WaCta>
  );
}
