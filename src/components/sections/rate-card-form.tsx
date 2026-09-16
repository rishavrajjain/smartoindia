"use client";

import { useState } from "react";

import { trackCtaClick } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

/*
 * The rate-card request, from Manav's business mockup. No backend: the
 * fields compose a WhatsApp message with what the account team needs to
 * build a rate card, then open the chat. Every field is optional.
 */

const VOLUMES = ["Under 100", "100–300", "300–800", "800+"];

const FIELD_CLASSES =
  "w-full rounded-[10px] bg-white/8 px-4 py-4 text-[0.9375rem] text-bone placeholder:text-bone/45 outline-none focus-visible:outline-2 focus-visible:outline-emerald";

export function RateCardForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [volume, setVolume] = useState("");
  const [routes, setRoutes] = useState("");

  const submit = () => {
    const lines = [
      "Hi Smarto, I would like a rate card for employee transport.",
      company && `Company: ${company}`,
      volume && `Rides a month: ${volume}`,
      routes && `Main routes: ${routes}`,
      name && `My name: ${name}`,
    ].filter(Boolean);
    trackCtaClick({ location: "corporate-rate-card", subject: volume || "rate-card" });
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
      <label className="sr-only" htmlFor="rate-name">
        Your name
      </label>
      <input
        id="rate-name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={FIELD_CLASSES}
      />

      <label className="sr-only" htmlFor="rate-company">
        Company
      </label>
      <input
        id="rate-company"
        type="text"
        autoComplete="organization"
        placeholder="Company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        className={FIELD_CLASSES}
      />

      <label className="sr-only" htmlFor="rate-volume">
        Approximate rides a month
      </label>
      <select
        id="rate-volume"
        value={volume}
        onChange={(event) => setVolume(event.target.value)}
        className={`${FIELD_CLASSES} appearance-none ${volume ? "" : "text-bone/45"}`}
      >
        <option value="" className="text-ink">
          Approximate rides a month
        </option>
        {VOLUMES.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="rate-routes">
        Main routes or areas
      </label>
      <input
        id="rate-routes"
        type="text"
        placeholder="Main routes or areas (optional)"
        value={routes}
        onChange={(event) => setRoutes(event.target.value)}
        className={FIELD_CLASSES}
      />

      <button
        type="submit"
        className="mt-1.5 flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[10px] bg-green-deep text-[0.9375rem] font-extrabold text-white transition-transform duration-[180ms] active:scale-[0.985]"
      >
        Request a rate card on WhatsApp
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </button>
      <p className="text-center text-[0.6875rem] leading-relaxed text-bone/35">
        Opens WhatsApp with your request filled in. Nothing is stored here.
      </p>
    </form>
  );
}
