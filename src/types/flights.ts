/**
 * Domain types for the flight search and booking flow.
 *
 * The upstream is AgentBazar's (Tripforu Holidays) Fixed Departure API, series
 * and block-seat inventory, not a live GDS. Everything the API returns is
 * normalised into these shapes at the boundary in `src/lib/agentbazar.ts`;
 * nothing else on the site sees the raw envelope.
 */

export type AirportRegion = "northeast" | "india";

export interface Airport {
  /** IATA code, upper case. */
  code: string;
  city: string;
  name: string;
  state: string;
  region: AirportRegion;
}

export type TripType = "oneway" | "round";

export interface FlightSearchQuery {
  from: string;
  to: string;
  /** Outbound date, YYYY-MM-DD in IST. */
  date: string;
  /** Return date for a round trip, otherwise null. */
  returnDate: string | null;
  adults: number;
  children: number;
  infants: number;
}

export interface FlightSegment {
  origin: string;
  destination: string;
  carrier: string;
  flightNumber: string;
  /** Local times as the API gives them, HH:MM. */
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  arrivalDate: string;
  durationMinutes: number;
}

export interface FlightOffer {
  origin: string;
  destination: string;
  carrier: string;
  flightNumber: string;
  stops: number;
  durationMinutes: number;
  /** Opaque tokens the API needs back for repricing and booking. */
  flightSignature: string;
  fareSignature: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  /** Total for the searched passenger mix. */
  totalPrice: number;
  seatsAvailable: number;
  checkinBaggage: string;
  cabinBaggage: string;
  segments: FlightSegment[];
}

export interface FlightSearchResult {
  requestId: string;
  onward: FlightOffer[];
  /** Empty for a one-way search. */
  returnLeg: FlightOffer[];
}

/** One leg the visitor has chosen: the two tokens plus the fare they saw. */
export interface OfferSelection {
  flightSignature: string;
  fareSignature: string;
  /** Total price shown at search time, for the "fare changed" comparison. */
  seenPrice: number;
}

export interface RepriceResult {
  totalFare: number;
  bookingSignature: string;
  /** Onward offer, then the return offer when one was selected. */
  offers: FlightOffer[];
}

export type PaxType = "ADT" | "CHD" | "INF";

export interface Passenger {
  type: PaxType;
  title: string;
  firstName: string;
  lastName: string;
  /** YYYY-MM-DD, required for children and infants; empty for adults. */
  dob: string;
}

export interface TicketedPassenger {
  name: string;
  type: PaxType;
  status: string;
  airlinePnr: string;
  ticketNumber: string;
}

export interface BookingConfirmation {
  bookingId: string;
  status: string;
  amount: number;
  passengers: TicketedPassenger[];
}

export type ApiErrorCode =
  /** Missing key or URL, or staging credentials in production. */
  | "config"
  /** Could not reach the API or it timed out. */
  | "network"
  /** API answered with a failure envelope we could not map more precisely. */
  | "upstream"
  /** API rejected the request as invalid. */
  | "validation"
  /** Signatures no longer valid, the visitor must search again. */
  | "expired"
  /** Live ticketing is switched off on this deployment. */
  | "disabled";

export type ApiResult<T> =
  | { ok: true; value: T }
  | { ok: false; code: ApiErrorCode; message: string };

/** Server-action state for the live (ticket-issuing) passenger form. */
export interface BookingFormState {
  status: "idle" | "error" | "fare-changed" | "confirmed";
  message?: string;
  /** Field-level validation errors keyed by input name. */
  errors?: Record<string, string>;
  fareWas?: number;
  fareNow?: number;
  confirmation?: BookingConfirmation;
}
