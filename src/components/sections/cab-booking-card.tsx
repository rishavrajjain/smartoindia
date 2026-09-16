"use client";

import { useState } from "react";

import { ArrowIcon, CalendarIcon, PinIcon } from "@/components/ui/line-icons";
import { trackCtaClick } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

/*
 * The booking card from Manav's cabs mockup. No fare engine on the site:
 * the trip goes to WhatsApp and the flat fare comes back in the chat,
 * before anything is committed. Every field is optional.
 */

export function CabBookingCard() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [when, setWhen] = useState("");

  const submit = () => {
    const lines = [
      "Hi Smarto, I need a cab and would like the flat fare.",
      pickup && `Pickup: ${pickup}`,
      drop && `Drop: ${drop}`,
      `When: ${when || "Now"}`,
    ].filter(Boolean);
    trackCtaClick({ location: "cabs-book", subject: drop || "cab" });
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      className="rounded-2xl bg-paper p-3.5 text-left shadow-[0_24px_60px_-24px_rgba(14,11,42,0.55)]"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <label
        htmlFor="cab-pickup"
        className="mb-2 flex items-center gap-2.5 rounded-[10px] bg-sand px-3.5 py-3.5 focus-within:outline-2 focus-within:outline-ink"
      >
        <PinIcon className="size-[17px] shrink-0 text-taupe/75" />
        <span className="sr-only">Pickup point</span>
        <input
          id="cab-pickup"
          type="text"
          placeholder="Pickup (e.g. Zoo Road)"
          value={pickup}
          onChange={(event) => setPickup(event.target.value)}
          className="w-full bg-transparent text-[0.90625rem] font-extrabold text-ink outline-none placeholder:font-light placeholder:text-taupe/80"
        />
      </label>
      <label
        htmlFor="cab-drop"
        className="mb-2 flex items-center gap-2.5 rounded-[10px] bg-sand px-3.5 py-3.5 focus-within:outline-2 focus-within:outline-ink"
      >
        <PinIcon className="size-[17px] shrink-0 text-taupe/75" />
        <span className="sr-only">Destination</span>
        <input
          id="cab-drop"
          type="text"
          placeholder="Where to?"
          value={drop}
          onChange={(event) => setDrop(event.target.value)}
          className="w-full bg-transparent text-[0.90625rem] font-extrabold text-ink outline-none placeholder:font-light placeholder:text-taupe/80"
        />
      </label>
      <label
        htmlFor="cab-when"
        className="mb-2 flex items-center gap-2.5 rounded-[10px] bg-sand px-3.5 py-3.5 focus-within:outline-2 focus-within:outline-ink"
      >
        <CalendarIcon className="size-[17px] shrink-0 text-taupe/75" />
        <span className="sr-only">When</span>
        <input
          id="cab-when"
          type="text"
          placeholder="Now"
          value={when}
          onChange={(event) => setWhen(event.target.value)}
          className="w-full bg-transparent text-[0.90625rem] font-extrabold text-ink outline-none placeholder:font-light placeholder:text-taupe/80"
        />
      </label>
      <button
        type="submit"
        className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-[10px] bg-green-deep text-[0.96875rem] font-extrabold text-white transition-transform duration-[180ms] active:scale-[0.985]"
      >
        See your flat fare on WhatsApp
        <ArrowIcon className="size-4" />
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </button>
      <p className="pt-3 pb-1 text-center text-[0.78125rem] text-taupe">
        Railway station drop: <b className="font-extrabold text-ink">flat ₹399</b>
      </p>
    </form>
  );
}
