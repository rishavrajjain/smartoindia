import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { PassengerForm } from "@/components/sections/passenger-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/deco";
import { Fare } from "@/components/ui/fare";
import { PlaneIcon } from "@/components/ui/flight-icons";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { findAirport } from "@/data/airports";
import { isTestFares, liveBookingEnabled, repriceFlights } from "@/lib/agentbazar";
import {
  airlineName,
  flightEnquiryMessage,
  formatDayLong,
  formatDuration,
  formatStops,
  nowIST,
  offerFlightCode,
  offerTimes,
  parseOnwardSelection,
  parseReturnSelection,
  parseSearchQuery,
  paxSummary,
  searchHref,
  todayIST,
} from "@/lib/flights";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";
import type { FlightOffer, FlightSearchQuery } from "@/types/flights";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const maxDuration = 30;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Confirm your flight",
    description: "Review the fare and confirm your flight booking with Smarto on WhatsApp.",
    path: "/flights/book",
  }),
  // Every booking page is a personal, token-bearing URL.
  robots: { index: false, follow: false },
};

/**
 * Step two. Re-checks the chosen fare with the airline system, lays out the
 * itinerary and the fare breakdown, and hands over to the passenger form.
 */
export default async function BookFlightPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const parsed = parseSearchQuery(params, todayIST());
  const onward = parseOnwardSelection(params);
  const returnLeg = parsed.ok && parsed.query.returnDate ? parseReturnSelection(params) : null;

  if (!parsed.ok || !onward || (parsed.query.returnDate && !returnLeg)) {
    return (
      <Notice
        eyebrow="Link incomplete"
        title="This booking link is missing its flight."
        lead="It may have been cut short when it was copied. Start the search again — it only takes a moment."
        href="/flights"
        action="Search flights"
      />
    );
  }

  const query = parsed.query;
  const reprice = await repriceFlights(onward, returnLeg);

  if (!reprice.ok) {
    return (
      <Notice
        eyebrow="Fare expired"
        title="That fare is no longer on hold."
        lead={`${reprice.message} Fares are re-checked live, so a fresh search will show what is available now.`}
        href={`${searchHref(query)}#results`}
        action="See current fares"
      >
        <WhatsAppLink
          message={flightEnquiryMessage(query)}
          location="flights-error"
          subject={`${query.from}-${query.to}-${query.date}`}
          tone="quiet"
          size="md"
        >
          Ask us to find it
        </WhatsAppLink>
      </Notice>
    );
  }

  const { totalFare, bookingSignature, offers } = reprice.value;
  const seen = onward.seenPrice + (returnLeg?.seenPrice ?? 0);
  const fareChanged = Math.round(totalFare) !== Math.round(seen);
  const liveBooking = liveBookingEnabled();
  const testFares = isTestFares();

  return (
    <Container width="default" className="pt-10 pb-28 lg:pt-14 lg:pb-32">
      <Link
        href={`${searchHref(query)}#results`}
        className="link-rule text-[0.875rem] font-extrabold text-clay"
      >
        <span aria-hidden="true">←</span> Back to fares
      </Link>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Step 2 of 2</Eyebrow>
          <h1 className="mt-5 text-[2.25rem] leading-[1.04] sm:text-[2.75rem]">
            {liveBooking ? (
              <>
                Passenger <span className="accent">details.</span>
              </>
            ) : (
              <>
                Almost there. <span className="accent">Confirm on WhatsApp.</span>
              </>
            )}
          </h1>
        </div>
        {testFares && (
          <span className="rounded-md border border-line-strong px-2 py-0.5 text-[0.6875rem] font-extrabold tracking-[0.12em] text-taupe uppercase">
            Test fares
          </span>
        )}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 space-y-4 lg:col-span-7">
          {offers.map((offer, i) => (
            <LegCard
              key={offer.fareSignature}
              offer={offer}
              label={offers.length > 1 ? (i === 0 ? "Onward" : "Return") : "Your flight"}
              index={i}
            />
          ))}

          <FareBreakdown
            query={query}
            offers={offers}
            totalFare={totalFare}
            seen={seen}
            fareChanged={fareChanged}
          />
        </div>

        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <PassengerForm
              query={query}
              offers={offers}
              totalFare={totalFare}
              quotedAt={nowIST()}
              liveBooking={liveBooking}
              selection={{ onward, returnLeg, bookingSignature }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

/* ——— Pieces. */

function LegCard({ offer, label, index }: { offer: FlightOffer; label: string; index: number }) {
  const t = offerTimes(offer);
  const from = findAirport(offer.origin);
  const to = findAirport(offer.destination);
  const date = offer.segments[0]?.departureDate;

  return (
    <article
      className="animate-rise rounded-2xl bg-sand p-5 sm:p-6"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-label font-extrabold text-clay uppercase">{label}</p>
        {date && <p className="text-[0.8125rem] text-taupe">{formatDayLong(date)}</p>}
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div>
          <p className="text-[1.75rem] leading-none font-extrabold text-ink tabular-nums">{t.dep}</p>
          <p className="mt-1.5 text-[0.8125rem] font-extrabold tracking-[0.1em] text-taupe">
            {offer.origin}
          </p>
          <p className="text-[0.75rem] text-taupe">{from?.city ?? ""}</p>
        </div>
        <div className="relative pt-1">
          <p className="text-center text-[0.75rem] text-taupe">
            {formatDuration(offer.durationMinutes)} · {formatStops(offer.stops)}
          </p>
          <div className="relative mt-1.5 h-px bg-line-strong">
            <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
            <PlaneIcon className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 bg-sand px-px text-ink" />
            <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[1.75rem] leading-none font-extrabold text-ink tabular-nums">
            {t.arr}
            {t.nextDay && <sup className="ml-0.5 text-[0.625rem] font-extrabold text-taupe">+1</sup>}
          </p>
          <p className="mt-1.5 text-[0.8125rem] font-extrabold tracking-[0.1em] text-taupe">
            {offer.destination}
          </p>
          <p className="text-[0.75rem] text-taupe">{to?.city ?? ""}</p>
        </div>
      </div>

      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-bone pt-4 text-[0.8125rem] text-taupe">
        <div className="flex gap-1.5">
          <dt className="sr-only">Airline</dt>
          <dd>
            <span className="font-extrabold text-ink">{airlineName(offer.carrier)}</span>{" "}
            {offerFlightCode(offer)}
          </dd>
        </div>
        {offer.checkinBaggage && (
          <div className="flex gap-1.5">
            <dt>Check-in</dt>
            <dd className="font-extrabold text-ink">{offer.checkinBaggage}</dd>
          </div>
        )}
        {offer.cabinBaggage && (
          <div className="flex gap-1.5">
            <dt>Cabin</dt>
            <dd className="font-extrabold text-ink">{offer.cabinBaggage}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

function FareBreakdown({
  query,
  offers,
  totalFare,
  seen,
  fareChanged,
}: {
  query: FlightSearchQuery;
  offers: FlightOffer[];
  totalFare: number;
  seen: number;
  fareChanged: boolean;
}) {
  const sum = (pick: (o: FlightOffer) => number) => offers.reduce((acc, o) => acc + pick(o), 0);
  const rows = [
    { label: query.adults === 1 ? "1 adult" : `${query.adults} adults`, count: query.adults, unit: sum((o) => o.adultPrice) },
    { label: query.children === 1 ? "1 child" : `${query.children} children`, count: query.children, unit: sum((o) => o.childPrice) },
    { label: query.infants === 1 ? "1 infant" : `${query.infants} infants`, count: query.infants, unit: sum((o) => o.infantPrice) },
  ].filter((r) => r.count > 0);

  return (
    <div className="rounded-2xl bg-bone p-5 ring-1 ring-line sm:p-6">
      <p className="text-label font-extrabold text-clay uppercase">Fare</p>
      <dl className="mt-4 space-y-2.5 text-[0.9375rem]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-taupe">
              {row.label}
              <span className="text-taupe/70"> × ₹{Math.round(row.unit).toLocaleString("en-IN")}</span>
            </dt>
            <dd className="font-extrabold text-ink tabular-nums">
              ₹{Math.round(row.unit * row.count).toLocaleString("en-IN")}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-end justify-between gap-4 border-t border-line pt-4">
        <div>
          <p className="text-[0.8125rem] text-taupe">
            Total for {paxSummary(query.adults, query.children, query.infants)}
          </p>
          {fareChanged && (
            <p className="mt-1 flex items-baseline gap-2 text-[0.8125rem] text-taupe">
              <Fare amount={seen} tone="struck" size="sm" />
              re-checked just now
            </p>
          )}
        </div>
        <Fare amount={totalFare} tone="locked" size="xl" />
      </div>
      <p className="mt-4 text-[0.75rem] leading-relaxed text-taupe">
        Confirmed by the airline system a moment ago, taxes included. It is held only briefly, so we
        re-check it once more before ticketing.
      </p>
    </div>
  );
}

function Notice({
  eyebrow,
  title,
  lead,
  href,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  href: string;
  action: string;
  children?: ReactNode;
}) {
  return (
    <Container width="narrow" className="py-20 lg:py-28">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-5 text-[2.25rem] leading-[1.04] sm:text-[2.75rem]">{title}</h1>
      <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-taupe">{lead}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={href}
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-ink px-6 text-[0.9375rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
        >
          {action}
        </Link>
        {children ?? (
          <WhatsAppLink
            message={enquiry("I was trying to book a flight on your site and the link did not work.")}
            location="flights-error"
            tone="quiet"
            size="md"
          >
            Ask us directly
          </WhatsAppLink>
        )}
      </div>
    </Container>
  );
}
