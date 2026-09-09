"use client";

import { useActionState, useMemo, useState } from "react";

import { Fare } from "@/components/ui/fare";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { submitBooking } from "@/app/flights/book/actions";
import { cn } from "@/lib/cn";
import {
  flightBookingMessage,
  offerSubject,
  PAX_LABEL,
  PAX_TITLES,
  paxSlots,
} from "@/lib/flights";
import type {
  BookingFormState,
  FlightOffer,
  FlightSearchQuery,
  OfferSelection,
  PaxType,
} from "@/types/flights";

/*
 * The last step. By default it is a WhatsApp handoff: names are optional, the
 * message is rebuilt as the visitor types, and the confirm button is a real
 * link into a chat with Smarto, no payment is taken on the website. Only when
 * the deployment has live ticketing switched on does the full validated form
 * with a Server Action render instead.
 */

export interface PassengerFormProps {
  query: FlightSearchQuery;
  offers: FlightOffer[];
  totalFare: number;
  quotedAt: string;
  liveBooking: boolean;
  selection: {
    onward: OfferSelection;
    returnLeg: OfferSelection | null;
    bookingSignature: string;
  };
}

const INPUT =
  "h-12 w-full rounded-xl bg-sand px-4 text-[0.9375rem] text-ink placeholder:text-taupe/60 focus:bg-bone focus:ring-2 focus:ring-clay focus:outline-none";

export function PassengerForm(props: PassengerFormProps) {
  return props.liveBooking ? <LiveForm {...props} /> : <WhatsAppForm {...props} />;
}

/* --- Default path: confirm on WhatsApp. */

function WhatsAppForm({ query, offers, totalFare, quotedAt }: PassengerFormProps) {
  const slots = paxSlots(query);
  const [names, setNames] = useState<string[]>(() => slots.map(() => ""));
  const [pickup, setPickup] = useState(false);

  const message = useMemo(() => {
    const base = flightBookingMessage({ query, offers, totalFare, quotedAt, names, contact: "" });
    return pickup
      ? `${base}\n\nPlease also arrange a Smarto cab at the airport when I land.`
      : base;
  }, [query, offers, totalFare, quotedAt, names, pickup]);

  const subject = offers[0] ? offerSubject(offers[0]) : `${query.from}-${query.to}`;

  return (
    <div className="rounded-2xl bg-bone ring-1 ring-line">
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <p className="text-label font-extrabold text-clay uppercase">Who is flying</p>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-taupe">
          Names as printed on the ID, if you have them handy. Optional now. We will ask for
          anything missing before the tickets are issued.
        </p>
      </div>

      <div className="mt-4 space-y-3 px-5 sm:px-6">
        {slots.map((type, i) => (
          <label key={i} className="block">
            <span className="text-[0.75rem] font-extrabold tracking-[0.1em] text-taupe uppercase">
              {paxLabel(type, slots, i)}
            </span>
            <input
              type="text"
              value={names[i]}
              onChange={(e) => setNames((prev) => prev.map((n, j) => (j === i ? e.target.value : n)))}
              placeholder="Full name"
              autoComplete={i === 0 ? "name" : "off"}
              className={cn(INPUT, "mt-1.5")}
            />
          </label>
        ))}

        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-sand px-4 py-3.5">
          <input
            type="checkbox"
            checked={pickup}
            onChange={(e) => setPickup(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-[var(--color-ink)]"
          />
          <span>
            <span className="block text-[0.9375rem] font-extrabold text-ink">
              Add a Smarto cab at the airport
            </span>
            <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-taupe">
              Met at arrivals, tracked to your flight, one flat fare.
            </span>
          </span>
        </label>
      </div>

      {/* Desktop: the action lives in the panel. Phones get the sticky bar below. */}
      <div className="mt-5 hidden border-t border-line px-5 py-5 sm:px-6 lg:block">
        <div className="mb-4 flex items-baseline justify-between">
          <span className="text-[0.8125rem] text-taupe">Total for {slots.length}</span>
          <Fare amount={totalFare} tone="locked" size="md" />
        </div>
        <WhatsAppLink
          message={message}
          location="flights-book"
          subject={subject}
          size="lg"
          fullWidth
        >
          Confirm on WhatsApp
        </WhatsAppLink>
        <Reassurance />
      </div>
      <div className="px-5 pb-5 sm:px-6 lg:hidden">
        <Reassurance />
      </div>

      {/* Phones: total and the one action, always within reach. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bone/93 px-4 pt-3 backdrop-blur-lg lg:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <div className="shrink-0">
            <p className="text-[0.6875rem] text-taupe">Total for {slots.length}</p>
            <Fare amount={totalFare} tone="locked" size="sm" />
          </div>
          <div className="flex-1">
            <WhatsAppLink
              message={message}
              location="flights-book"
              subject={subject}
              size="md"
              fullWidth
            >
              Confirm on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reassurance() {
  return (
    <p className="mt-4 text-[0.75rem] leading-relaxed text-taupe">
      No payment on the website. We confirm the fare with you on WhatsApp, take payment there, and
      send the e-ticket back in the same chat.
    </p>
  );
}

function paxLabel(type: PaxType, slots: PaxType[], i: number): string {
  const nth = slots.slice(0, i + 1).filter((t) => t === type).length;
  const total = slots.filter((t) => t === type).length;
  return total > 1 ? `${PAX_LABEL[type]} ${nth}` : PAX_LABEL[type];
}

/* --- Live path: issue tickets through the airline system. */

const initialState: BookingFormState = { status: "idle" };

function LiveForm({ query, totalFare, liveBooking, selection }: PassengerFormProps) {
  const [state, action, pending] = useActionState(submitBooking, initialState);
  const slots = paxSlots(query);
  const accept = state.status === "fare-changed" && state.fareNow ? state.fareNow : totalFare;

  if (state.status === "confirmed" && state.confirmation) {
    const c = state.confirmation;
    return (
      <div className="rounded-2xl bg-bone p-5 ring-1 ring-line sm:p-6">
        <p className="text-label font-extrabold text-green-deep uppercase">Booked</p>
        <h2 className="mt-2 text-[1.5rem] leading-tight text-ink">
          Your tickets are <span className="accent">issued.</span>
        </h2>
        <dl className="mt-5 space-y-2 text-[0.9375rem]">
          <div className="flex justify-between gap-4">
            <dt className="text-taupe">Booking reference</dt>
            <dd className="font-extrabold text-ink">{c.bookingId}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-taupe">Status</dt>
            <dd className="font-extrabold text-ink">{c.status || "Confirmed"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-taupe">Amount</dt>
            <dd>
              <Fare amount={c.amount || accept} tone="locked" size="sm" />
            </dd>
          </div>
        </dl>
        {c.passengers.length > 0 && (
          <ul className="mt-5 divide-y divide-line border-t border-line">
            {c.passengers.map((p, i) => (
              <li key={i} className="flex items-center justify-between gap-4 py-3 text-[0.9375rem]">
                <span className="text-ink">{p.name}</span>
                <span className="font-extrabold text-ink tabular-nums">PNR {p.airlinePnr || "pending"}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <WhatsAppLink
            message={`Hi Smarto, my flight booking ${c.bookingId} is confirmed. Please send my e-ticket here.`}
            location="flights-confirmed"
            subject={c.bookingId}
            size="md"
            fullWidth
          >
            Send my e-ticket on WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    );
  }

  const err = (key: string) => state.errors?.[key];

  return (
    <form action={action} className="rounded-2xl bg-bone ring-1 ring-line" noValidate={false}>
      {/* The search and selection, exactly as the URL carried them. */}
      <input type="hidden" name="from" value={query.from} />
      <input type="hidden" name="to" value={query.to} />
      <input type="hidden" name="date" value={query.date} />
      {query.returnDate && <input type="hidden" name="ret" value={query.returnDate} />}
      <input type="hidden" name="adults" value={query.adults} />
      <input type="hidden" name="children" value={query.children} />
      <input type="hidden" name="infants" value={query.infants} />
      <input type="hidden" name="osig" value={selection.onward.flightSignature} />
      <input type="hidden" name="ofare" value={selection.onward.fareSignature} />
      <input type="hidden" name="op" value={selection.onward.seenPrice} />
      {selection.returnLeg && (
        <>
          <input type="hidden" name="rsig" value={selection.returnLeg.flightSignature} />
          <input type="hidden" name="rfare" value={selection.returnLeg.fareSignature} />
          <input type="hidden" name="rp" value={selection.returnLeg.seenPrice} />
        </>
      )}
      <input type="hidden" name="bsig" value={selection.bookingSignature} />
      <input type="hidden" name="accept" value={Math.round(accept)} />

      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <p className="text-label font-extrabold text-clay uppercase">Passenger details</p>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-taupe">
          Exactly as printed on the ID each traveller will carry.
        </p>
      </div>

      <div className="mt-4 space-y-5 px-5 sm:px-6">
        {slots.map((type, i) => (
          <fieldset key={i}>
            <legend className="text-[0.75rem] font-extrabold tracking-[0.1em] text-taupe uppercase">
              {paxLabel(type, slots, i)}
            </legend>
            <div className="mt-1.5 grid grid-cols-[6rem_1fr] gap-2">
              <select
                name={`title-${i}`}
                required
                defaultValue={PAX_TITLES[type][0]}
                aria-label="Title"
                aria-invalid={Boolean(err(`title-${i}`)) || undefined}
                className={INPUT}
              >
                {PAX_TITLES[type].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                name={`first-${i}`}
                required
                placeholder="First name"
                autoComplete="given-name"
                pattern="[A-Za-z][A-Za-z' \-]{0,39}"
                aria-label="First name"
                aria-invalid={Boolean(err(`first-${i}`)) || undefined}
                className={INPUT}
              />
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <input
                name={`last-${i}`}
                required
                placeholder="Last name"
                autoComplete="family-name"
                pattern="[A-Za-z][A-Za-z' \-]{0,39}"
                aria-label="Last name"
                aria-invalid={Boolean(err(`last-${i}`)) || undefined}
                className={INPUT}
              />
              {type !== "ADT" && (
                <input
                  type="date"
                  name={`dob-${i}`}
                  required
                  max={query.date}
                  aria-label="Date of birth"
                  aria-invalid={Boolean(err(`dob-${i}`)) || undefined}
                  className={INPUT}
                />
              )}
            </div>
            {[`title-${i}`, `first-${i}`, `last-${i}`, `dob-${i}`].map(
              (key) =>
                err(key) && (
                  <p key={key} role="alert" className="mt-1.5 text-[0.8125rem] font-extrabold text-error">
                    {err(key)}
                  </p>
                ),
            )}
          </fieldset>
        ))}

        <fieldset>
          <legend className="text-[0.75rem] font-extrabold tracking-[0.1em] text-taupe uppercase">
            Contact for the e-ticket
          </legend>
          <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              autoComplete="email"
              aria-label="Email"
              aria-invalid={Boolean(err("email")) || undefined}
              className={INPUT}
            />
            <input
              type="tel"
              name="mobile"
              required
              placeholder="Mobile"
              autoComplete="tel"
              inputMode="tel"
              aria-label="Mobile number"
              aria-invalid={Boolean(err("mobile")) || undefined}
              className={INPUT}
            />
          </div>
          {(err("email") || err("mobile")) && (
            <p role="alert" className="mt-1.5 text-[0.8125rem] font-extrabold text-error">
              {err("email") ?? err("mobile")}
            </p>
          )}
        </fieldset>
      </div>

      <div className="mt-5 border-t border-line px-5 py-5 sm:px-6">
        {state.status === "fare-changed" && state.fareWas && state.fareNow && (
          <div className="mb-4 rounded-xl bg-sand px-4 py-3 text-[0.875rem] text-taupe">
            <p className="font-extrabold text-ink">The fare moved while you were typing.</p>
            <p className="mt-1 flex items-baseline gap-3">
              <Fare amount={state.fareWas} tone="struck" size="sm" />
              <Fare amount={state.fareNow} tone="locked" size="md" />
            </p>
            <p className="mt-1">Confirm again to issue at the new fare.</p>
          </div>
        )}
        {state.status === "error" && state.message && (
          <p role="alert" className="mb-4 text-[0.875rem] font-extrabold text-error">
            {state.message}
          </p>
        )}
        <div className="mb-4 flex items-baseline justify-between">
          <span className="text-[0.8125rem] text-taupe">Total for {slots.length}</span>
          <Fare amount={accept} tone="locked" size="md" />
        </div>
        <button
          type="submit"
          disabled={pending || !liveBooking}
          className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-ink px-6 text-[1rem] font-extrabold text-bone transition-colors duration-300 hover:bg-clay-deep disabled:opacity-60"
        >
          {pending ? "Issuing tickets…" : state.status === "fare-changed" ? "Confirm new fare" : "Issue tickets"}
        </button>
        <p className="mt-4 text-[0.75rem] leading-relaxed text-taupe">
          Tickets are issued immediately through our airline partner. Fare rules and refunds follow
          the airline&rsquo;s policy for this fare.
        </p>
      </div>
    </form>
  );
}
