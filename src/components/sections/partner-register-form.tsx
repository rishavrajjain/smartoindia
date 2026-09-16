"use client";

import { useState } from "react";

import { trackCtaClick } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

/*
 * Partner registration, from Manav's mockup. There is no partner portal on
 * the site yet, so registration opens a WhatsApp message to the partner
 * desk with the account details; verification and onboarding continue in
 * that thread. Every field is optional.
 */

const VOLUMES = ["Under 50", "50–150", "150–400", "400+"];

const FIELD_CLASSES =
  "w-full rounded-[10px] bg-white/8 px-4 py-4 text-[0.9375rem] text-bone placeholder:text-bone/45 outline-none focus-visible:outline-2 focus-visible:outline-emerald";

export function PartnerRegisterForm() {
  const [business, setBusiness] = useState("");
  const [contact, setContact] = useState("");
  const [gst, setGst] = useState("");
  const [volume, setVolume] = useState("");

  const submit = () => {
    const lines = [
      "Hi Smarto, I would like to open a partner account.",
      business && `Agency or hotel: ${business}`,
      contact && `Contact person: ${contact}`,
      gst && `GST number: ${gst}`,
      volume && `Rides a month: about ${volume}`,
    ].filter(Boolean);
    trackCtaClick({
      location: "partner-register",
      subject: volume || "partner-account",
    });
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      className="mt-7 flex flex-col gap-2.5 text-left"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <label className="sr-only" htmlFor="partner-business">
        Agency or hotel name
      </label>
      <input
        id="partner-business"
        type="text"
        autoComplete="organization"
        placeholder="Agency or hotel name"
        value={business}
        onChange={(event) => setBusiness(event.target.value)}
        className={FIELD_CLASSES}
      />

      <label className="sr-only" htmlFor="partner-contact">
        Contact person
      </label>
      <input
        id="partner-contact"
        type="text"
        autoComplete="name"
        placeholder="Contact person"
        value={contact}
        onChange={(event) => setContact(event.target.value)}
        className={FIELD_CLASSES}
      />

      <label className="sr-only" htmlFor="partner-gst">
        GST number, optional
      </label>
      <input
        id="partner-gst"
        type="text"
        placeholder="GST number (optional)"
        value={gst}
        onChange={(event) => setGst(event.target.value)}
        className={FIELD_CLASSES}
      />

      <label className="sr-only" htmlFor="partner-volume">
        Approximate rides a month
      </label>
      <select
        id="partner-volume"
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

      <button
        type="submit"
        className="mt-1.5 flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[10px] bg-green-deep text-[0.9375rem] font-extrabold text-white transition-transform duration-[180ms] active:scale-[0.985]"
      >
        Create a partner account on WhatsApp
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </button>
      <p className="text-center text-[0.6875rem] leading-relaxed text-bone/35">
        Opens WhatsApp with your details filled in. Verification is usually
        same-day; nothing is stored here.
      </p>
    </form>
  );
}
