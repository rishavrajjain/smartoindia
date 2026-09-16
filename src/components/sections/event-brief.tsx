"use client";

import { useState } from "react";

import { trackCtaClick } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

/*
 * The event brief, from Manav's mockup. There is no backend: the fields
 * compose a WhatsApp message with everything the events desk needs for a
 * useful first reply, then open the chat. Every field is optional; whatever
 * is filled in travels with the message.
 */

const EVENT_TYPES = [
  "Wedding",
  "Corporate event",
  "Conference",
  "Something else",
];

const FIELD_CLASSES =
  "w-full rounded-[10px] bg-white/8 px-4 py-4 text-[0.9375rem] text-bone placeholder:text-bone/45 outline-none focus-visible:outline-2 focus-visible:outline-emerald";

export function EventBrief() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [venue, setVenue] = useState("");

  const submit = () => {
    const lines = [
      `Hi Smarto, I am planning ${type ? `a ${type.toLowerCase()}` : "an event"} and would like to talk it through.`,
      date && `Date: ${date}`,
      guests && `Guests: about ${guests}`,
      venue && `City or venue: ${venue}`,
      name && `My name: ${name}`,
    ].filter(Boolean);
    trackCtaClick({ location: "events-brief", subject: type || "event" });
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      className="mx-auto mt-7 flex w-full max-w-md flex-col gap-2.5 text-left"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <label className="sr-only" htmlFor="brief-name">
        Your name
      </label>
      <input
        id="brief-name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={FIELD_CLASSES}
      />

      <label className="sr-only" htmlFor="brief-type">
        Type of event
      </label>
      <select
        id="brief-type"
        value={type}
        onChange={(event) => setType(event.target.value)}
        className={`${FIELD_CLASSES} appearance-none ${type ? "" : "text-bone/45"}`}
      >
        <option value="" className="text-ink">
          Type of event
        </option>
        {EVENT_TYPES.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="brief-date">
        Event date or month
      </label>
      <input
        id="brief-date"
        type="text"
        placeholder="Event date (or month)"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        className={FIELD_CLASSES}
      />

      <label className="sr-only" htmlFor="brief-guests">
        Approximate guest count
      </label>
      <input
        id="brief-guests"
        type="text"
        inputMode="numeric"
        placeholder="Approximate guest count"
        value={guests}
        onChange={(event) => setGuests(event.target.value)}
        className={FIELD_CLASSES}
      />

      <label className="sr-only" htmlFor="brief-venue">
        City or venue
      </label>
      <input
        id="brief-venue"
        type="text"
        placeholder="City or venue"
        value={venue}
        onChange={(event) => setVenue(event.target.value)}
        className={FIELD_CLASSES}
      />

      <button
        type="submit"
        className="mt-1.5 flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[10px] bg-green-deep text-[0.9375rem] font-extrabold text-white transition-transform duration-[180ms] active:scale-[0.985]"
      >
        Send the brief on WhatsApp
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </button>
      <p className="text-center text-[0.6875rem] leading-relaxed text-bone/35">
        Opens WhatsApp with your brief filled in. Nothing is stored here.
      </p>
    </form>
  );
}
