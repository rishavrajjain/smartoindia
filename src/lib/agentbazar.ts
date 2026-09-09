import "server-only";

import type {
  ApiResult,
  BookingConfirmation,
  FlightOffer,
  FlightSearchQuery,
  FlightSearchResult,
  FlightSegment,
  OfferSelection,
  Passenger,
  PaxType,
  RepriceResult,
} from "@/types/flights";

/**
 * Server-only client for AgentBazar's Fixed Departure API (Tripforu Holidays).
 *
 * One endpoint; the operation is chosen by the `api-action` header. The HTTP
 * status is always 200 — success and failure both live in the body's
 * `statuscode` — and the body arrives with leading blank lines in ISO-8859-1,
 * so every response is read as text, trimmed, then parsed. Nothing the API
 * returns is trusted: offers are rebuilt field by field and malformed ones are
 * dropped rather than rendered.
 *
 * The API key never leaves this module. `AirBook` issues a real ticket and
 * debits Smarto's agency wallet, so it is additionally gated by
 * AGENTBAZAR_LIVE_BOOKING and must never be reachable by a public visitor
 * unless Manav has switched that on deliberately.
 */

type Action = "AirSearch" | "AirReprice" | "AirBook" | "AirTicketDetail";

type Json = Record<string, unknown>;

const TIMEOUT_MS = 15_000;

/** Body statuscodes the API uses. HTTP is always 200. */
const STATUS_OK = 200;

function config(): ApiResult<{ url: string; key: string }> {
  const url = process.env.AGENTBAZAR_API_URL;
  const key = process.env.AGENTBAZAR_API_KEY;
  if (!url || !key) {
    return { ok: false, code: "config", message: "Flight search is not configured." };
  }
  // Staging inventory is test data; it must never be shown as a real fare.
  if (process.env.VERCEL_ENV === "production" && /staging/i.test(url)) {
    return {
      ok: false,
      code: "config",
      message: "Flight search is pointed at a test system.",
    };
  }
  return { ok: true, value: { url, key } };
}

/** True when the configured endpoint is the vendor's staging system. */
export function isTestFares(): boolean {
  return /staging/i.test(process.env.AGENTBAZAR_API_URL ?? "");
}

export function liveBookingEnabled(): boolean {
  return process.env.AGENTBAZAR_LIVE_BOOKING === "true";
}

/* ——— Transport. */

async function call(action: Action, data: Json): Promise<ApiResult<Json>> {
  const cfg = config();
  if (!cfg.ok) return cfg;

  let text: string;
  try {
    const res = await fetch(cfg.value.url, {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
        "api-key": cfg.value.key,
        "api-action": action,
      },
      body: JSON.stringify({ data }),
    });
    text = await res.text();
  } catch {
    return {
      ok: false,
      code: "network",
      message: "The airline system did not respond. Try again in a moment.",
    };
  }

  let body: unknown;
  try {
    body = JSON.parse(text.trim());
  } catch {
    return { ok: false, code: "upstream", message: "The airline system sent an unreadable reply." };
  }
  if (!isRecord(body)) {
    return { ok: false, code: "upstream", message: "The airline system sent an unexpected reply." };
  }

  const statuscode = asNumber(body.statuscode);
  if (statuscode !== STATUS_OK) {
    const message = asString(body.message) || "The airline system rejected the request.";
    // 300 is the API's validation bucket; 500 covers exceptions, which for
    // reprice/book almost always means the signatures have gone stale.
    const code = statuscode === 300 ? "validation" : statuscode === 500 ? "expired" : "upstream";
    return { ok: false, code, message };
  }
  return { ok: true, value: body };
}

/* ——— Boundary guards. */

function isRecord(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : typeof value === "number" ? String(value) : "";
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toSegment(raw: unknown): FlightSegment | null {
  if (!isRecord(raw)) return null;
  const origin = asString(raw.origin).toUpperCase();
  const destination = asString(raw.destination).toUpperCase();
  const departureTime = asString(raw.deptime);
  const arrivalTime = asString(raw.arrtime);
  if (!origin || !destination || !departureTime || !arrivalTime) return null;
  return {
    origin,
    destination,
    carrier: asString(raw.carrier).toUpperCase(),
    flightNumber: asString(raw.flightnumber),
    departureTime,
    arrivalTime,
    departureDate: asString(raw.depdate),
    arrivalDate: asString(raw.arrdate),
    durationMinutes: asNumber(raw.duration) ?? 0,
  };
}

function toOffer(raw: unknown): FlightOffer | null {
  if (!isRecord(raw)) return null;
  const flightSignature = asString(raw.flightsignature);
  const fareSignature = asString(raw.faresignature);
  const adultPrice = asNumber(raw.adult_price);
  const totalPrice = asNumber(raw.total_price);
  const segments = asArray(raw.segments).map(toSegment).filter((s): s is FlightSegment => s !== null);
  if (!flightSignature || !fareSignature || adultPrice === null || totalPrice === null) return null;
  if (segments.length === 0) return null;
  return {
    origin: asString(raw.origin).toUpperCase(),
    destination: asString(raw.destination).toUpperCase(),
    carrier: asString(raw.carrier).toUpperCase(),
    flightNumber: asString(raw.flightnumber),
    stops: asNumber(raw.numstops) ?? Math.max(0, segments.length - 1),
    durationMinutes:
      asNumber(raw.totalduration) ?? segments.reduce((sum, s) => sum + s.durationMinutes, 0),
    flightSignature,
    fareSignature,
    adultPrice,
    childPrice: asNumber(raw.child_price) ?? 0,
    infantPrice: asNumber(raw.infant_price) ?? 0,
    totalPrice,
    seatsAvailable: asNumber(raw.seats_available) ?? 0,
    checkinBaggage: asString(raw.checkin_baggage),
    cabinBaggage: asString(raw.cabin_baggage),
    segments,
  };
}

function offersOf(raw: unknown): FlightOffer[] {
  if (!isRecord(raw)) return [];
  return asArray(raw.flightoffers)
    .map(toOffer)
    .filter((o): o is FlightOffer => o !== null);
}

/* ——— Operations. */

export async function searchFlights(q: FlightSearchQuery): Promise<ApiResult<FlightSearchResult>> {
  const result = await call("AirSearch", {
    origin: q.from,
    destination: q.to,
    onwarddate: q.date,
    returndate: q.returnDate ?? "",
    adults: q.adults,
    children: q.children,
    infants: q.infants,
    triptype: q.returnDate ? 2 : 1,
    carrier: "all",
  });
  if (!result.ok) return result;

  const trips = asArray(result.value.trips);
  return {
    ok: true,
    value: {
      requestId: asString(result.value.searchrequestid),
      onward: offersOf(trips[0]),
      returnLeg: q.returnDate ? offersOf(trips[1]) : [],
    },
  };
}

/** Re-validates the chosen leg(s) and returns the token the booking needs. */
export async function repriceFlights(
  onward: OfferSelection,
  returnLeg: OfferSelection | null,
): Promise<ApiResult<RepriceResult>> {
  const legs = returnLeg ? [onward, returnLeg] : [onward];
  const result = await call("AirReprice", {
    triptype: returnLeg ? 2 : 1,
    flightsignatures: legs.map((l) => l.flightSignature),
    faresignatures: legs.map((l) => l.fareSignature),
  });
  if (!result.ok) return result;

  const totalFare = asNumber(result.value.totalfare);
  const bookingSignature = asString(result.value.bookingsignature);
  const offers = asArray(result.value.flightoffers)
    .map(toOffer)
    .filter((o): o is FlightOffer => o !== null);
  if (totalFare === null || !bookingSignature || offers.length === 0) {
    return {
      ok: false,
      code: "expired",
      message: "This fare is no longer available. Search again for current fares.",
    };
  }
  return { ok: true, value: { totalFare, bookingSignature, offers } };
}

export interface BookingRequest {
  onward: OfferSelection;
  returnLeg: OfferSelection | null;
  bookingSignature: string;
  passengers: Passenger[];
  contactEmail: string;
  contactMobile: string;
}

/**
 * Issues tickets. Debits the agency wallet on the vendor's side — guarded by
 * AGENTBAZAR_LIVE_BOOKING here and again by every caller.
 */
export async function bookFlights(req: BookingRequest): Promise<ApiResult<{ bookingId: string; status: string; amount: number }>> {
  if (!liveBookingEnabled()) {
    return { ok: false, code: "disabled", message: "Online ticketing is not switched on." };
  }
  const legs = req.returnLeg ? [req.onward, req.returnLeg] : [req.onward];
  const count = (type: PaxType) => req.passengers.filter((p) => p.type === type).length;

  const result = await call("AirBook", {
    flightsignatures: legs.map((l) => l.flightSignature),
    faresignatures: legs.map((l) => l.fareSignature),
    bookingsignature: req.bookingSignature,
    passengers: req.passengers.map((p) => ({
      paxtype: p.type,
      firstname: p.firstName,
      lastname: p.lastName,
      title: p.title,
      dob: p.dob,
    })),
    adults: count("ADT"),
    children: count("CHD"),
    infants: count("INF"),
    contact_email: req.contactEmail,
    contact_mobile: req.contactMobile,
  });
  if (!result.ok) return result;

  const bookingId = asString(result.value.bookingid);
  if (!bookingId) {
    return {
      ok: false,
      code: "upstream",
      message: asString(result.value.error) || "The booking did not return a reference.",
    };
  }
  return {
    ok: true,
    value: {
      bookingId,
      status: asString(result.value.bookingstatus),
      amount: asNumber(result.value.amount) ?? asNumber(result.value.totalinvoice) ?? 0,
    },
  };
}

export async function getTicket(bookingId: string): Promise<ApiResult<BookingConfirmation>> {
  const result = await call("AirTicketDetail", { transactionid: bookingId });
  if (!result.ok) return result;

  const info = isRecord(result.value.eticketinfo) ? result.value.eticketinfo : null;
  const id = asString(info?.transactionid);
  // An unknown id comes back as statuscode 200 with an empty record.
  if (!info || !id) {
    return { ok: false, code: "upstream", message: "No ticket found for that reference." };
  }

  const passengers: BookingConfirmation["passengers"] = [];
  for (const line of asArray(info.triplines)) {
    if (!isRecord(line)) continue;
    for (const pax of asArray(line.paxinfos)) {
      if (!isRecord(pax)) continue;
      const fare = isRecord(pax.paxfareticket) ? pax.paxfareticket : {};
      const type = asString(pax.paxtype).toUpperCase();
      passengers.push({
        name: `${asString(pax.title)} ${asString(pax.firstname)} ${asString(pax.lastname)}`.trim(),
        type: type === "CHD" || type === "INF" ? type : "ADT",
        status: asString(pax.status),
        airlinePnr: asString(fare.airline_pnr),
        ticketNumber: asString(fare.flight_ticket_number),
      });
    }
  }

  return {
    ok: true,
    value: {
      bookingId: id,
      status: asString(info.bookingstatus),
      amount: asNumber(info.totalamount) ?? 0,
      passengers,
    },
  };
}
