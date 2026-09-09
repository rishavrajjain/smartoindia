import Link from "next/link";
import type { CSSProperties } from "react";

import { Fare } from "@/components/ui/fare";
import { ArrowRightIcon, PlaneIcon } from "@/components/ui/flight-icons";
import { findAirport } from "@/data/airports";
import { cn } from "@/lib/cn";
import {
  airlineName,
  formatDuration,
  formatStops,
  offerFlightCode,
  offerTimes,
  paxCount,
} from "@/lib/flights";
import type { FlightOffer, FlightSearchQuery } from "@/types/flights";

/*
 * One fare, laid out like a boarding pass row: the times carry the weight, the
 * route line between them holds the duration, and the fare sits on the right
 * beside the one action. Fares here are what the airline system quoted for the
 * search, so they stay navy, green is reserved for the repriced fare on the
 * booking step.
 */
export function FlightOfferCard({
  offer,
  query,
  href,
  action,
  note,
  index = 0,
}: {
  offer: FlightOffer;
  query: FlightSearchQuery;
  href: string;
  /** Button label, e.g. "Select" or "Select return". */
  action: string;
  /** Small factual tag such as "Lowest fare". */
  note?: string;
  index?: number;
}) {
  const t = offerTimes(offer);
  const from = findAirport(offer.origin);
  const to = findAirport(offer.destination);
  const seats = offer.seatsAvailable;
  const travellers = paxCount(query);

  return (
    <article
      className="animate-rise rounded-2xl bg-bone p-5 ring-1 ring-line motion-safe:[animation-delay:var(--delay)] sm:p-6"
      style={{ "--delay": `${Math.min(index, 8) * 70}ms` } as CSSProperties}
      aria-label={`${airlineName(offer.carrier)} ${offerFlightCode(offer)}, departs ${t.dep}, arrives ${t.arr}`}
    >
      {/* Airline line. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="flex items-center gap-2.5 text-[0.9375rem]">
          <span className="grid size-8 place-items-center rounded-lg bg-sand text-[0.6875rem] font-extrabold tracking-[0.08em] text-ink">
            {offer.carrier}
          </span>
          <span className="font-extrabold text-ink">{airlineName(offer.carrier)}</span>
          <span className="text-taupe">{offerFlightCode(offer)}</span>
        </p>
        <p className="flex items-center gap-2 text-[0.75rem] text-taupe">
          {note && (
            <span className="rounded-md bg-sand px-2 py-0.5 font-extrabold tracking-[0.08em] text-ink uppercase">
              {note}
            </span>
          )}
          <span>{formatStops(offer.stops)}</span>
        </p>
      </div>

      {/* The route strip. */}
      <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div>
          <p className="text-[1.75rem] leading-none font-extrabold text-ink tabular-nums">{t.dep}</p>
          <p className="mt-1.5 text-[0.8125rem] font-extrabold tracking-[0.1em] text-taupe">
            {offer.origin}
          </p>
          <p className="text-[0.75rem] text-taupe">{from?.city ?? ""}</p>
        </div>

        <div className="relative pt-1">
          <p className="text-center text-[0.75rem] text-taupe">
            {formatDuration(offer.durationMinutes)}
          </p>
          <div className="relative mt-1.5 h-px bg-line-strong">
            <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
            <PlaneIcon className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 bg-bone px-px text-ink" />
            <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
          </div>
        </div>

        <div className="text-right">
          <p className="text-[1.75rem] leading-none font-extrabold text-ink tabular-nums">
            {t.arr}
            {t.nextDay && (
              <sup className="ml-0.5 text-[0.625rem] font-extrabold text-taupe">+1</sup>
            )}
          </p>
          <p className="mt-1.5 text-[0.8125rem] font-extrabold tracking-[0.1em] text-taupe">
            {offer.destination}
          </p>
          <p className="text-[0.75rem] text-taupe">{to?.city ?? ""}</p>
        </div>
      </div>

      {/* Facts and the fare. */}
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-4">
        <dl className="flex flex-wrap gap-x-5 gap-y-1 text-[0.75rem] text-taupe">
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
          {seats > 0 && seats <= 6 && (
            <div className="flex gap-1.5">
              <dt className="sr-only">Seats</dt>
              <dd className="text-taupe">
                {seats} {seats === 1 ? "seat" : "seats"} at this fare
              </dd>
            </div>
          )}
        </dl>

        <div className="flex w-full items-end justify-between gap-4 sm:w-auto sm:justify-end sm:gap-6">
          <div className="text-left sm:text-right">
            <Fare amount={offer.adultPrice} size="lg" />
            <p className="mt-1 text-[0.75rem] text-taupe">
              per adult
              {travellers > 1 && (
                <>
                  {" · "}
                  <span className="font-extrabold text-ink">
                    ₹{Math.round(offer.totalPrice).toLocaleString("en-IN")}
                  </span>{" "}
                  for {travellers}
                </>
              )}
            </p>
          </div>
          <Link
            href={href}
            className={cn(
              "inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-ink px-5 text-[0.9375rem] font-extrabold text-bone transition-colors duration-300 hover:bg-clay-deep",
            )}
          >
            {action}
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
