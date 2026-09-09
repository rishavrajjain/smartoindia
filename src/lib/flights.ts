/**
 * Shared, isomorphic helpers for the flight flow: URL state in and out, IST
 * date handling, display formatting, and the WhatsApp handoff message.
 *
 * Nothing here touches the network or the API key, that lives in
 * `agentbazar.ts`, which imports from this file, never the other way round.
 */
import { AIRPORTS, findAirport } from "@/data/airports";
import type {
  FlightOffer,
  FlightSearchQuery,
  OfferSelection,
  PaxType,
} from "@/types/flights";

import { enquiry } from "./whatsapp";

type Params = Record<string, string | string[] | undefined>;

/** First value only: repeated params are never meaningful here. */
export function firstParam(params: Params, key: string): string | null {
  const value = params[key];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

/* --- Dates. The API speaks IST calendar days; so does every visitor. */

const IST_DAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today's date in IST as YYYY-MM-DD. Same answer on a UTC server and a phone. */
export function todayIST(): string {
  return IST_DAY.format(new Date());
}

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/** True when the string is a real calendar day in YYYY-MM-DD form. */
export function isCalendarDay(value: string): boolean {
  if (!ISO_DAY.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
}

export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

/** Airlines sell about eleven months ahead; anything beyond is a typo. */
export const MAX_DAYS_AHEAD = 330;

function utcDate(day: string): Date {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

// Three-letter forms throughout: CLDR's en-IN/en-GB abbreviate September as
// "Sept", which breaks the tiles' rhythm.
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "Tue, 23 Sep" */
export function formatDayShort(day: string): string {
  const p = dateParts(day);
  return `${p.weekday}, ${p.day} ${p.month}`;
}

/** "Tuesday, 23 September 2026" */
export function formatDayLong(day: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(utcDate(day));
}

/** Pieces for the date tile: { day: "23", month: "Sep", weekday: "Tue", year: "2026" } */
export function dateParts(day: string) {
  const date = utcDate(day);
  return {
    day: String(date.getUTCDate()),
    month: MONTHS_SHORT[date.getUTCMonth()],
    weekday: WEEKDAYS_SHORT[date.getUTCDay()],
    year: String(date.getUTCFullYear()),
  };
}

/** Current IST clock time, "14:32", for stamping quoted fares. */
export function nowIST(): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

/* --- Money and durations. */

const INR = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** "2,452", the rupee sign is set separately by the fare lockup. */
export function formatAmount(amount: number): string {
  return INR.format(Math.round(amount));
}

/** "₹2,452" for plain text such as WhatsApp messages. */
export function formatINR(amount: number): string {
  return `₹${formatAmount(amount)}`;
}

/** 125 → "2h 05m" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

export function formatStops(stops: number): string {
  if (stops === 0) return "Non-stop";
  return stops === 1 ? "1 stop" : `${stops} stops`;
}

/* --- Airlines. Codes we do not know fall back to the code itself. */

const AIRLINES: Record<string, string> = {
  "6E": "IndiGo",
  SG: "SpiceJet",
  AI: "Air India",
  IX: "Air India Express",
  I5: "Air India Express",
  UK: "Vistara",
  QP: "Akasa Air",
  "9I": "Alliance Air",
  S5: "Star Air",
  IC: "FLY91",
  TG: "Thai Airways",
  FD: "Thai AirAsia",
  BG: "Biman Bangladesh",
  RA: "Nepal Airlines",
  SQ: "Singapore Airlines",
  DD: "Nok Air",
};

export function airlineName(code: string): string {
  return AIRLINES[code.toUpperCase()] ?? code.toUpperCase();
}

/* --- Passengers. */

export function paxSummary(adults: number, children: number, infants: number): string {
  const parts = [`${adults} ${adults === 1 ? "adult" : "adults"}`];
  if (children) parts.push(`${children} ${children === 1 ? "child" : "children"}`);
  if (infants) parts.push(`${infants} ${infants === 1 ? "infant" : "infants"}`);
  return parts.join(", ");
}

export function paxCount(q: Pick<FlightSearchQuery, "adults" | "children" | "infants">): number {
  return q.adults + q.children + q.infants;
}

export const PAX_TITLES: Record<PaxType, readonly string[]> = {
  ADT: ["Mr", "Mrs", "Ms"],
  CHD: ["Master", "Miss"],
  INF: ["Master", "Miss"],
};

export const PAX_LABEL: Record<PaxType, string> = {
  ADT: "Adult",
  CHD: "Child",
  INF: "Infant",
};

/** Expands passenger counts into the ordered list of seats to name. */
export function paxSlots(q: Pick<FlightSearchQuery, "adults" | "children" | "infants">): PaxType[] {
  return [
    ...Array.from({ length: q.adults }, () => "ADT" as const),
    ...Array.from({ length: q.children }, () => "CHD" as const),
    ...Array.from({ length: q.infants }, () => "INF" as const),
  ];
}

/* --- Search query: URL ⇄ typed object. */

export type ParsedSearch =
  | { ok: true; query: FlightSearchQuery }
  | { ok: false; errors: string[] }
  /** Nothing to search yet, the visitor has not asked for anything. */
  | { ok: false; empty: true; errors: [] }
  /** A route arrived without a date (a homepage quick pick); nothing wrong yet. */
  | { ok: false; pickDate: true; from: string; to: string; errors: [] };

const MAX_ADULTS = 9;
const MAX_CHILDREN = 8;
const MAX_SEATS = 9;

function toInt(value: string | null, fallback: number): number | null {
  if (value === null || value === "") return fallback;
  if (!/^\d{1,2}$/.test(value)) return null;
  return Number(value);
}

/**
 * Reads a search from the URL and validates it against what the API accepts.
 *
 * Errors are written for the visitor, not the developer, they render in the
 * results column when a shared or hand-edited link is wrong.
 */
export function parseSearchQuery(params: Params, today = todayIST()): ParsedSearch {
  const from = firstParam(params, "from")?.toUpperCase() ?? "";
  const to = firstParam(params, "to")?.toUpperCase() ?? "";
  const date = firstParam(params, "date") ?? "";
  const ret = firstParam(params, "ret") ?? "";

  if (!from && !to && !date) return { ok: false, empty: true, errors: [] };
  if (!date && !ret && findAirport(from) && findAirport(to) && from !== to) {
    return { ok: false, pickDate: true, from, to, errors: [] };
  }

  const errors: string[] = [];
  if (!findAirport(from)) errors.push("Choose a departure airport.");
  if (!findAirport(to)) errors.push("Choose an arrival airport.");
  if (from && to && from === to) errors.push("Departure and arrival cannot be the same airport.");

  if (!isCalendarDay(date)) errors.push("Pick a departure date.");
  else if (date < today) errors.push("Departure date has passed. Pick a date from today.");
  else if (date > addDays(today, MAX_DAYS_AHEAD))
    errors.push("Airlines only sell about eleven months ahead. Pick an earlier date.");

  let returnDate: string | null = null;
  if (ret) {
    if (!isCalendarDay(ret)) errors.push("Return date is not valid.");
    else if (ret < date) errors.push("Return date must be on or after departure.");
    else returnDate = ret;
  }

  const adults = toInt(firstParam(params, "adults"), 1);
  const children = toInt(firstParam(params, "children"), 0);
  const infants = toInt(firstParam(params, "infants"), 0);
  if (adults === null || adults < 1 || adults > MAX_ADULTS)
    errors.push(`Adults must be between 1 and ${MAX_ADULTS}.`);
  if (children === null || children < 0 || children > MAX_CHILDREN)
    errors.push(`Children must be between 0 and ${MAX_CHILDREN}.`);
  if (infants === null || infants < 0 || (adults !== null && infants > adults))
    errors.push("Each infant needs an adult to travel with.");
  if (adults !== null && children !== null && adults + children > MAX_SEATS)
    errors.push(`Up to ${MAX_SEATS} seats per booking. For larger groups, ask us on WhatsApp.`);

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    query: {
      from,
      to,
      date,
      returnDate,
      adults: adults as number,
      children: children as number,
      infants: infants as number,
    },
  };
}

export function searchParamsFor(q: FlightSearchQuery): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set("from", q.from);
  sp.set("to", q.to);
  sp.set("date", q.date);
  if (q.returnDate) sp.set("ret", q.returnDate);
  if (q.adults !== 1) sp.set("adults", String(q.adults));
  if (q.children) sp.set("children", String(q.children));
  if (q.infants) sp.set("infants", String(q.infants));
  return sp;
}

export function searchHref(q: FlightSearchQuery): string {
  return `/flights?${searchParamsFor(q)}`;
}

/* --- Offer selection carried in the URL between search, results and booking.
   Signatures are opaque, non-secret tokens for this visitor's own search. */

const MAX_SIGNATURE = 300;

function readSelection(params: Params, prefix: "o" | "r"): OfferSelection | null {
  const flightSignature = firstParam(params, `${prefix}sig`) ?? "";
  const fareSignature = firstParam(params, `${prefix}fare`) ?? "";
  const price = firstParam(params, `${prefix}p`) ?? "";
  if (!flightSignature || !fareSignature) return null;
  if (flightSignature.length > MAX_SIGNATURE || fareSignature.length > MAX_SIGNATURE) return null;
  if (!/^\d{1,7}$/.test(price)) return null;
  return { flightSignature, fareSignature, seenPrice: Number(price) };
}

export function parseOnwardSelection(params: Params): OfferSelection | null {
  return readSelection(params, "o");
}

export function parseReturnSelection(params: Params): OfferSelection | null {
  return readSelection(params, "r");
}

function writeSelection(sp: URLSearchParams, prefix: "o" | "r", offer: FlightOffer) {
  sp.set(`${prefix}sig`, offer.flightSignature);
  sp.set(`${prefix}fare`, offer.fareSignature);
  sp.set(`${prefix}p`, String(Math.round(offer.totalPrice)));
}

/** Where "Select" on an onward card goes: the return list, or straight to booking. */
export function selectOnwardHref(q: FlightSearchQuery, offer: FlightOffer): string {
  const sp = searchParamsFor(q);
  writeSelection(sp, "o", offer);
  return q.returnDate ? `/flights?${sp}#results` : `/flights/book?${sp}`;
}

export function selectReturnHref(
  q: FlightSearchQuery,
  onward: OfferSelection,
  offer: FlightOffer,
): string {
  const sp = searchParamsFor(q);
  sp.set("osig", onward.flightSignature);
  sp.set("ofare", onward.fareSignature);
  sp.set("op", String(onward.seenPrice));
  writeSelection(sp, "r", offer);
  return `/flights/book?${sp}`;
}

/** Continue with the onward flight only when the return leg has no fares. */
export function onwardOnlyHref(q: FlightSearchQuery, onward: OfferSelection): string {
  const sp = searchParamsFor({ ...q, returnDate: null });
  sp.set("osig", onward.flightSignature);
  sp.set("ofare", onward.fareSignature);
  sp.set("op", String(onward.seenPrice));
  return `/flights/book?${sp}`;
}

/* --- Display helpers for an offer. */

export function offerRoute(offer: FlightOffer): string {
  const from = findAirport(offer.origin);
  const to = findAirport(offer.destination);
  return `${from?.city ?? offer.origin} to ${to?.city ?? offer.destination}`;
}

export function offerFlightCode(offer: FlightOffer): string {
  return `${offer.carrier} ${offer.flightNumber}`;
}

/** First departure and last arrival across the segments. */
export function offerTimes(offer: FlightOffer): { dep: string; arr: string; nextDay: boolean } {
  const first = offer.segments[0];
  const last = offer.segments[offer.segments.length - 1];
  return {
    dep: first?.departureTime ?? "",
    arr: last?.arrivalTime ?? "",
    nextDay: Boolean(first && last && last.arrivalDate > first.departureDate),
  };
}

/** Compact analytics subject, e.g. "SG158-DEL-GAU-2026-09-23". */
export function offerSubject(offer: FlightOffer): string {
  const date = offer.segments[0]?.departureDate ?? "";
  return `${offer.carrier}${offer.flightNumber}-${offer.origin}-${offer.destination}-${date}`;
}

/* --- The WhatsApp handoff. */

export interface BookingMessageInput {
  query: FlightSearchQuery;
  offers: FlightOffer[];
  totalFare: number;
  quotedAt: string;
  names: string[];
  contact: string;
}

function describeOffer(offer: FlightOffer): string {
  const t = offerTimes(offer);
  const date = offer.segments[0]?.departureDate;
  return [
    `${offerRoute(offer)} · ${date ? formatDayShort(date) : ""}`.trim(),
    `${airlineName(offer.carrier)} ${offerFlightCode(offer)} · ${t.dep} → ${t.arr}${
      t.nextDay ? " (+1 day)" : ""
    } · ${formatDuration(offer.durationMinutes)}, ${formatStops(offer.stops).toLowerCase()}`,
  ].join("\n");
}

/**
 * The message a visitor sends to book. Everything Smarto's team needs to issue
 * the ticket in the AgentBazar portal, and nothing they do not (no tokens, no
 * long links).
 */
export function flightBookingMessage(input: BookingMessageInput): string {
  const { query, offers, totalFare, quotedAt, names, contact } = input;
  const lines = [
    enquiry("I would like to book this flight:"),
    "",
    ...offers.map(describeOffer).join("\n\n").split("\n"),
    "",
    `Travellers: ${paxSummary(query.adults, query.children, query.infants)}`,
    `Fare shown: ${formatINR(totalFare)} (quoted ${quotedAt} IST)`,
  ];
  const namedPax = names.map((n) => n.trim()).filter(Boolean);
  if (namedPax.length) lines.push(`Names: ${namedPax.join(", ")}`);
  if (contact.trim()) lines.push(`Contact: ${contact.trim()}`);
  lines.push("", "Please confirm the fare and issue the tickets.");
  return lines.join("\n");
}

/** Fallback enquiry when a search returns nothing or the API is unavailable. */
export function flightEnquiryMessage(q: FlightSearchQuery): string {
  const from = findAirport(q.from)?.city ?? q.from;
  const to = findAirport(q.to)?.city ?? q.to;
  const when = q.returnDate
    ? `${formatDayShort(q.date)} returning ${formatDayShort(q.returnDate)}`
    : formatDayShort(q.date);
  return enquiry(
    `I am looking for flights from ${from} to ${to} on ${when} for ${paxSummary(
      q.adults,
      q.children,
      q.infants,
    )}. Can you find me a fare?`,
  );
}

/** Airports grouped for a native select's optgroups. */
export function airportGroups() {
  return [
    { label: "Northeast", airports: AIRPORTS.filter((a) => a.region === "northeast") },
    { label: "Rest of India", airports: AIRPORTS.filter((a) => a.region === "india") },
  ];
}
