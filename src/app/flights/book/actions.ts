"use server";

import { bookFlights, getTicket, liveBookingEnabled, repriceFlights } from "@/lib/agentbazar";
import {
  isCalendarDay,
  parseOnwardSelection,
  parseReturnSelection,
  parseSearchQuery,
  PAX_TITLES,
  paxSlots,
  todayIST,
} from "@/lib/flights";
import type { BookingFormState, Passenger, PaxType } from "@/types/flights";

/*
 * Live ticketing. This is a public POST endpoint like every Server Action, so
 * nothing from the form is trusted: the search and the selected fares are
 * re-parsed with the same rules as the URL, the fare is re-checked with the
 * airline system, and a moved fare is bounced back for a second confirmation
 * before AirBook — which issues tickets and debits Smarto's agency wallet — is
 * ever called. The whole path is inert unless AGENTBAZAR_LIVE_BOOKING is "true".
 */

const NAME = /^[A-Za-z][A-Za-z' -]{0,39}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE = /^(?:\+?91[ -]?)?[6-9]\d{9}$/;

function field(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Whole years between a date of birth and the travel date. */
function ageOn(dob: string, day: string): number {
  const [by, bm, bd] = dob.split("-").map(Number);
  const [y, m, d] = day.split("-").map(Number);
  let age = y - by;
  if (m < bm || (m === bm && d < bd)) age -= 1;
  return age;
}

export async function submitBooking(
  _prev: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  if (!liveBookingEnabled()) {
    return {
      status: "error",
      message: "Online ticketing is not switched on. Confirm on WhatsApp instead.",
    };
  }

  // The search and selection travel as hidden fields; re-read them exactly as
  // the URL would be read.
  const params: Record<string, string> = {};
  for (const key of [
    "from",
    "to",
    "date",
    "ret",
    "adults",
    "children",
    "infants",
    "osig",
    "ofare",
    "op",
    "rsig",
    "rfare",
    "rp",
  ]) {
    const value = field(formData, key);
    if (value) params[key] = value;
  }

  const parsed = parseSearchQuery(params, todayIST());
  const onward = parseOnwardSelection(params);
  if (!parsed.ok || !onward) {
    return { status: "error", message: "This booking link is incomplete. Search again." };
  }
  const query = parsed.query;
  const returnLeg = query.returnDate ? parseReturnSelection(params) : null;
  if (query.returnDate && !returnLeg) {
    return { status: "error", message: "The return flight is missing. Search again." };
  }

  const bookingSignature = field(formData, "bsig");
  const accepted = Number(field(formData, "accept"));
  if (!bookingSignature || !Number.isFinite(accepted)) {
    return { status: "error", message: "This fare has expired. Search again." };
  }

  // ——— Passengers.
  const errors: Record<string, string> = {};
  const passengers: Passenger[] = [];
  paxSlots(query).forEach((type: PaxType, i) => {
    const title = field(formData, `title-${i}`);
    const firstName = field(formData, `first-${i}`);
    const lastName = field(formData, `last-${i}`);
    const dob = field(formData, `dob-${i}`);

    if (!PAX_TITLES[type].includes(title)) errors[`title-${i}`] = "Choose a title.";
    if (!NAME.test(firstName)) errors[`first-${i}`] = "Letters only, as printed on the ID.";
    if (!NAME.test(lastName)) errors[`last-${i}`] = "Letters only, as printed on the ID.";

    if (type !== "ADT") {
      if (!isCalendarDay(dob) || dob >= query.date) {
        errors[`dob-${i}`] = "Enter the date of birth.";
      } else {
        const age = ageOn(dob, query.date);
        if (type === "INF" && age >= 2) errors[`dob-${i}`] = "Infants must be under 2 on the travel date.";
        if (type === "CHD" && (age < 2 || age > 11))
          errors[`dob-${i}`] = "Children are 2 to 11 on the travel date.";
      }
    }

    passengers.push({ type, title, firstName, lastName, dob: type === "ADT" ? "" : dob });
  });

  const contactEmail = field(formData, "email");
  const contactMobile = field(formData, "mobile").replace(/[ -]/g, "");
  if (!EMAIL.test(contactEmail)) errors.email = "Enter an email for the e-ticket.";
  if (!MOBILE.test(contactMobile)) errors.mobile = "Enter a 10-digit Indian mobile number.";

  if (Object.keys(errors).length) {
    return { status: "error", errors, message: "Check the highlighted details." };
  }

  // ——— Fare check. A moved fare is shown, never silently charged.
  const reprice = await repriceFlights(onward, returnLeg);
  if (!reprice.ok) {
    return { status: "error", message: reprice.message };
  }
  const now = Math.round(reprice.value.totalFare);
  if (now !== Math.round(accepted)) {
    return {
      status: "fare-changed",
      message: "The fare has changed since you last saw it. Review it and confirm again.",
      fareWas: Math.round(accepted),
      fareNow: now,
    };
  }

  // ——— Ticket.
  const booked = await bookFlights({
    onward,
    returnLeg,
    bookingSignature: reprice.value.bookingSignature,
    passengers,
    contactEmail,
    contactMobile: contactMobile.replace(/^\+?91/, ""),
  });
  if (!booked.ok) {
    return { status: "error", message: booked.message };
  }

  const ticket = await getTicket(booked.value.bookingId);
  return {
    status: "confirmed",
    confirmation: ticket.ok
      ? ticket.value
      : {
          bookingId: booked.value.bookingId,
          status: booked.value.status,
          amount: booked.value.amount,
          passengers: [],
        },
  };
}
