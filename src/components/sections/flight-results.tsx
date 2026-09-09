import Link from "next/link";
import type { ReactNode } from "react";

import { FlightOfferCard } from "@/components/sections/flight-offer-card";
import { ScrollToResults } from "@/components/sections/scroll-to-results";
import { ArrowRightIcon, PlaneIcon } from "@/components/ui/flight-icons";
import { Fare } from "@/components/ui/fare";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { findAirport } from "@/data/airports";
import { isTestFares, searchFlights } from "@/lib/agentbazar";
import {
  addDays,
  airlineName,
  flightEnquiryMessage,
  formatDayShort,
  offerFlightCode,
  offerTimes,
  onwardOnlyHref,
  parseOnwardSelection,
  parseSearchQuery,
  paxSummary,
  searchHref,
  selectOnwardHref,
  selectReturnHref,
} from "@/lib/flights";
import type { FlightOffer, FlightSearchQuery, OfferSelection } from "@/types/flights";

type Params = Record<string, string | string[] | undefined>;

/**
 * The results column. Reads the search from the URL, asks the airline system,
 * and renders one of: nothing yet, a validation problem, an API problem, no
 * fares, the onward list, or (round trips, second step) the return list under
 * the onward flight already chosen. Every dead end offers WhatsApp, because a
 * fixed-departure inventory is empty far more often than a live GDS would be.
 */
export async function FlightResults({ params, today }: { params: Params; today: string }) {
  const parsed = parseSearchQuery(params, today);

  if (!parsed.ok && "empty" in parsed) return <Idle />;
  if (!parsed.ok && "pickDate" in parsed) {
    return (
      <Idle
        route={`${findAirport(parsed.from)?.city ?? parsed.from} to ${findAirport(parsed.to)?.city ?? parsed.to}`}
      />
    );
  }

  if (!parsed.ok) {
    return (
      <Panel eyebrow="Check the search" title="Something in this search is not quite right.">
        <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-taupe">
          {parsed.errors.map((error) => (
            <li key={error} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-error" />
              {error}
            </li>
          ))}
        </ul>
      </Panel>
    );
  }

  const query = parsed.query;
  const result = await searchFlights(query);

  if (!result.ok) {
    return (
      <>
        <ScrollToResults />
        <Panel
          eyebrow="Fares unavailable"
          title={
            result.code === "config"
              ? "Live fares are switched off right now."
              : "We could not reach the airline system."
          }
          lead={
            result.code === "config"
              ? "We will find you a fare by hand. Send the route and we reply with options."
              : `${result.message} Or skip the wait and let us find it.`
          }
        >
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink
              message={flightEnquiryMessage(query)}
              location="flights-error"
              subject={`${query.from}-${query.to}-${query.date}`}
              size="md"
            >
              Ask us to find this flight
            </WhatsAppLink>
            {result.code !== "config" && (
              <Link
                href={searchHref(query)}
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-line-strong px-6 text-[0.9375rem] font-extrabold text-ink transition-colors hover:border-ink/40 hover:bg-sand"
              >
                Try again
              </Link>
            )}
          </div>
        </Panel>
      </>
    );
  }

  const onwardChoice = query.returnDate ? parseOnwardSelection(params) : null;
  const testFares = isTestFares();

  // --- Round trip, step two: the return leg beneath the chosen onward flight.
  if (onwardChoice) {
    const chosen = result.value.onward.find(
      (o) => signatureKey(o.flightSignature) === signatureKey(onwardChoice.flightSignature),
    );
    // Prefer this search's fresh tokens for the same flight; fall back to the
    // ones the visitor arrived with.
    const onward: OfferSelection = chosen
      ? {
          flightSignature: chosen.flightSignature,
          fareSignature: chosen.fareSignature,
          seenPrice: Math.round(chosen.totalPrice),
        }
      : onwardChoice;
    const returns = sortByPrice(result.value.returnLeg);

    return (
      <div id="results" className="scroll-mt-24">
        <ScrollToResults />
        <ChosenOnward query={query} offer={chosen ?? null} price={onward.seenPrice} />

        <ResultsHeading
          count={returns.length}
          label="return"
          query={{ ...query, from: query.to, to: query.from, date: query.returnDate ?? query.date }}
          testFares={testFares}
        />

        {returns.length > 0 ? (
          <ol className="mt-5 space-y-3.5">
            {returns.map((offer, i) => (
              <li key={offer.fareSignature}>
                <FlightOfferCard
                  offer={offer}
                  query={query}
                  href={selectReturnHref(query, onward, offer)}
                  action="Select return"
                  note={i === 0 && returns.length > 1 ? "Lowest fare" : undefined}
                  index={i}
                />
              </li>
            ))}
          </ol>
        ) : (
          <Panel
            className="mt-5"
            eyebrow="No return fares"
            title={`Nothing back on ${formatDayShort(query.returnDate ?? query.date)}.`}
            lead="Fixed-departure seats run on set days. Keep the onward flight and we will find the return for you, or try another date."
          >
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={onwardOnlyHref(query, onward)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-ink px-6 text-[0.9375rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
              >
                Continue with onward only
                <ArrowRightIcon />
              </Link>
              <WhatsAppLink
                message={flightEnquiryMessage(query)}
                location="flights-empty-state"
                subject={`${query.to}-${query.from}-${query.returnDate}`}
                tone="quiet"
                size="md"
              >
                Ask us for the return
              </WhatsAppLink>
            </div>
            <NearbyDates query={query} leg="ret" today={today} />
          </Panel>
        )}
      </div>
    );
  }

  // --- One way, or round trip step one.
  const offers = sortByPrice(result.value.onward);

  return (
    <div id="results" className="scroll-mt-24">
      <ScrollToResults />
      <ResultsHeading count={offers.length} label="onward" query={query} testFares={testFares} />

      {offers.length > 0 ? (
        <>
          <ol className="mt-5 space-y-3.5">
            {offers.map((offer, i) => (
              <li key={offer.fareSignature}>
                <FlightOfferCard
                  offer={offer}
                  query={query}
                  href={selectOnwardHref(query, offer)}
                  action="Select"
                  note={i === 0 && offers.length > 1 ? "Lowest fare" : undefined}
                  index={i}
                />
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[0.75rem] leading-relaxed text-taupe">
            Fares as quoted by the airline system for {paxSummary(query.adults, query.children, query.infants)},
            including taxes. We confirm the fare with you on WhatsApp before any ticket is issued.
          </p>
        </>
      ) : (
        <Panel
          className="mt-5"
          eyebrow="No fixed-departure fares"
          title={`Nothing on this route for ${formatDayShort(query.date)}.`}
          lead="Our partner's inventory is block seats on set days, so gaps are normal. Send us the search and we will quote a regular fare, usually within the hour."
        >
          <div className="mt-6">
            <WhatsAppLink
              message={flightEnquiryMessage(query)}
              location="flights-empty-state"
              subject={`${query.from}-${query.to}-${query.date}`}
              size="md"
            >
              Ask us to find this flight
            </WhatsAppLink>
          </div>
          <NearbyDates query={query} leg="date" today={today} />
        </Panel>
      )}
    </div>
  );
}

/* --- Pieces. */

function sortByPrice(offers: FlightOffer[]): FlightOffer[] {
  return [...offers].sort((a, b) => a.totalPrice - b.totalPrice);
}

/** Strips the per-search request id so the same flight matches across searches. */
function signatureKey(signature: string): string {
  return signature.split("_").slice(2).join("_");
}

function Idle({ route }: { route?: string }) {
  return (
    <div className="flex min-h-[18rem] flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong px-6 py-12 text-center">
      <div className="relative h-px w-40 bg-line-strong">
        <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
        <PlaneIcon className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 bg-bone px-0.5 text-clay" />
        <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full bg-ink" />
      </div>
      <p className="mt-6 text-[1.125rem] leading-snug text-ink">
        {route ? (
          <>
            {route}. Now pick a date, <span className="accent">then search.</span>
          </>
        ) : (
          <>
            Pick a route and a date, <span className="accent">then search.</span>
          </>
        )}
      </p>
      <p className="mt-2 max-w-xs text-[0.875rem] leading-relaxed text-taupe">
        Fares come from our airline partner&rsquo;s fixed-departure seats. We confirm on WhatsApp
        before anything is ticketed.
      </p>
    </div>
  );
}

function ResultsHeading({
  count,
  label,
  query,
  testFares,
}: {
  count: number;
  label: "onward" | "return";
  query: FlightSearchQuery;
  testFares: boolean;
}) {
  const from = findAirport(query.from);
  const to = findAirport(query.to);
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <div>
        <p className="text-label font-extrabold text-clay uppercase">
          {label === "return" ? "Choose your return" : "Choose your flight"}
        </p>
        <h2 className="mt-2 text-[1.5rem] leading-tight">
          {from?.city ?? query.from} <span className="text-taupe">to</span>{" "}
          <span className="accent">{to?.city ?? query.to}</span>
          <span className="block text-[0.9375rem] text-taupe">
            {formatDayShort(query.date)} · {paxSummary(query.adults, query.children, query.infants)}
          </span>
        </h2>
      </div>
      <p className="flex items-center gap-2 text-[0.8125rem] text-taupe">
        {testFares && (
          <span className="rounded-md border border-line-strong px-2 py-0.5 text-[0.6875rem] font-extrabold tracking-[0.12em] text-taupe uppercase">
            Test fares
          </span>
        )}
        <span aria-live="polite">
          {count === 0 ? "No fares" : count === 1 ? "1 fare" : `${count} fares`}
        </span>
      </p>
    </div>
  );
}

/** The onward flight pinned above the return list, with a way back. */
function ChosenOnward({
  query,
  offer,
  price,
}: {
  query: FlightSearchQuery;
  offer: FlightOffer | null;
  price: number;
}) {
  const t = offer ? offerTimes(offer) : null;
  return (
    <div className="mb-7 flex items-center justify-between gap-4 rounded-2xl bg-sand px-5 py-4">
      <div className="min-w-0">
        <p className="text-label font-extrabold text-green-deep uppercase">Onward selected</p>
        {offer && t ? (
          <p className="mt-1 truncate text-[0.9375rem] text-ink">
            <span className="font-extrabold">{airlineName(offer.carrier)}</span>{" "}
            {offerFlightCode(offer)} · {t.dep} → {t.arr} · {formatDayShort(query.date)}
          </p>
        ) : (
          <p className="mt-1 text-[0.9375rem] text-ink">
            {findAirport(query.from)?.city ?? query.from} to {findAirport(query.to)?.city ?? query.to} ·{" "}
            {formatDayShort(query.date)}
          </p>
        )}
        <p className="mt-0.5 text-[0.75rem] text-taupe">
          <Fare amount={price} size="sm" /> for the onward leg
        </p>
      </div>
      <Link
        href={`${searchHref(query)}#results`}
        className="link-rule shrink-0 text-[0.8125rem] font-extrabold text-clay"
      >
        Change
      </Link>
    </div>
  );
}

/** Same search, shifted a day or two either side. */
function NearbyDates({
  query,
  leg,
  today,
}: {
  query: FlightSearchQuery;
  leg: "date" | "ret";
  today: string;
}) {
  const base = leg === "ret" ? (query.returnDate ?? query.date) : query.date;
  const floor = leg === "ret" ? query.date : today;
  const options = [-2, -1, 1, 2, 3]
    .map((n) => addDays(base, n))
    .filter((d) => d >= floor);
  if (options.length === 0) return null;

  return (
    <div className="mt-7 border-t border-line pt-5">
      <p className="text-label font-extrabold text-taupe uppercase">Try a nearby date</p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {options.map((d) => {
          const next: FlightSearchQuery =
            leg === "ret" ? { ...query, returnDate: d } : { ...query, date: d, returnDate: query.returnDate && query.returnDate < d ? d : query.returnDate };
          return (
            <li key={d}>
              <Link
                href={`${searchHref(next)}#results`}
                className="inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-[0.8125rem] text-taupe transition-colors hover:border-ink/40 hover:text-ink"
              >
                {formatDayShort(d)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Panel({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-sand px-6 py-8 sm:px-8 ${className ?? ""}`}>
      <p className="text-label font-extrabold text-clay uppercase">{eyebrow}</p>
      <h3 className="mt-3 text-[1.5rem] leading-tight text-ink">{title}</h3>
      {lead && <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-taupe">{lead}</p>}
      {children}
    </div>
  );
}
