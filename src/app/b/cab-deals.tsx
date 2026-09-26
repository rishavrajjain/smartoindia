"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { WaCta } from "@/components/ui/wa-cta";
import { cn } from "@/lib/cn";
import { enquiry } from "@/lib/whatsapp";

import { Rail } from "./rail";

/*
 * Flat-fare rides as bookable cards, filtered by kind. Fares are the
 * owner-published "starting from" rates already live on the homepage; the
 * railway-station fare stays off this page until Manav reconciles the two
 * figures in circulation.
 */

type Kind = "city" | "outstation" | "teams";

interface Deal {
  id: string;
  kind: Kind;
  strip: string;
  title: string;
  line: string;
  image: string;
  fare: string | null;
  /** WhatsApp message for rides; a page link for the business services. */
  message?: string;
  href?: "/corporate" | "/events";
}

const DEALS: Deal[] = [
  {
    id: "airport",
    kind: "city",
    strip: "Airport · Guwahati",
    title: "Airport rides",
    line: "Met at arrivals, tracked to your flight.",
    image: "/images/svc-cabs-airport.webp",
    fare: "₹399",
    message: enquiry("I need an airport ride in Guwahati."),
  },
  {
    id: "shillong",
    kind: "outstation",
    strip: "Guwahati → Shillong",
    title: "Shillong drop",
    line: "Up into the hills on one flat fare.",
    image: "/images/svc-cabs-hero.webp",
    fare: "₹2,799",
    message: enquiry("I would like to book a Shillong drop."),
  },
  {
    id: "sonapur",
    kind: "city",
    strip: "City edge",
    title: "Sonapur drop",
    line: "The city-edge run at a fixed price.",
    image: "/images/svc-cabs-city.webp",
    fare: "₹1,599",
    message: enquiry("I would like to book a Sonapur drop."),
  },
  {
    id: "outstation",
    kind: "outstation",
    strip: "Anywhere in the Northeast",
    title: "Outstation rides",
    line: "Fixed fares to the hills, agreed up front.",
    image: "/images/cabs-outstation.webp",
    fare: "₹3,499",
    message: enquiry("I would like an outstation cab quote."),
  },
  {
    id: "hourly",
    kind: "city",
    strip: "Your clock",
    title: "Hourly rental",
    line: "A car and driver for as long as you need.",
    image: "/images/svc-cabs-hourly.webp",
    fare: null,
    message: enquiry("I would like an hourly cab rental."),
  },
  {
    id: "corporate",
    kind: "teams",
    strip: "For companies",
    title: "Employee transport",
    line: "Daily office runs on a fixed rate card.",
    image: "/images/svc-corporate-fleet.webp",
    fare: null,
    href: "/corporate",
  },
  {
    id: "events",
    kind: "teams",
    strip: "Weddings & conferences",
    title: "Event movement",
    line: "Every guest moved, one coordinator.",
    image: "/images/svc-events-conference.webp",
    fare: null,
    href: "/events",
  },
];

const FILTERS: { id: Kind | "all"; label: string }[] = [
  { id: "all", label: "All rides" },
  { id: "city", label: "In the city" },
  { id: "outstation", label: "Outstation" },
  { id: "teams", label: "Teams & events" },
];

export function CabDeals({ className }: { className?: string }) {
  const [filter, setFilter] = useState<Kind | "all">("all");
  const deals = DEALS.filter((d) => filter === "all" || d.kind === filter);

  return (
    <Rail
      label="cab rides"
      resetKey={filter}
      className={className}
      header={
        <div
          role="group"
          aria-label="Filter rides"
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "min-h-10 shrink-0 rounded-full px-4 text-[0.8125rem] transition-colors",
                filter === f.id
                  ? "bg-ink font-extrabold text-bone"
                  : "bg-sand text-taupe hover:bg-clay-soft hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      }
    >
      {deals.map((deal, i) => (
        <li
          key={`${filter}-${deal.id}`}
          className="w-[16.5rem] shrink-0 snap-start motion-safe:animate-rise sm:w-[17.5rem]"
          style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}
        >
          <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-bone ring-1 ring-line shadow-[0_10px_30px_rgba(40,37,96,0.07)]">
            <p className="flex items-center gap-2 bg-clay-deep px-3.5 py-2.5 text-[0.75rem] text-bone/85">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-green" />
              {deal.strip}
            </p>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={deal.image}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
              <h3 className="text-[1.0625rem] font-extrabold text-ink">
                {deal.title}
              </h3>
              <p className="mt-1 mb-4 text-[0.8125rem] leading-relaxed text-taupe">
                {deal.line}
              </p>
              <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-3.5">
                {deal.fare ? (
                  <p className="leading-tight">
                    <span className="block text-[0.625rem] font-extrabold tracking-[0.14em] text-taupe/80 uppercase">
                      Starting
                    </span>
                    <span className="text-[1.375rem] font-extrabold text-green-deep tabular-nums">
                      {deal.fare}
                    </span>
                    <span className="ml-1 text-[0.6875rem] text-taupe">all-in</span>
                  </p>
                ) : (
                  <p className="text-[0.8125rem] leading-tight text-taupe">
                    {deal.href ? "Fixed rate card" : "Quote on WhatsApp"}
                  </p>
                )}
                {deal.href ? (
                  <Link
                    href={deal.href}
                    className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-[0.8125rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
                  >
                    See how
                    <span className="sr-only">: {deal.title}</span>
                  </Link>
                ) : (
                  <WaCta
                    message={deal.message ?? enquiry("I would like to book a cab.")}
                    location="b-cabs"
                    subject={deal.id}
                    className="inline-flex min-h-10 items-center rounded-full bg-green-deep px-4 text-[0.8125rem] font-extrabold text-white transition-transform duration-150 active:scale-[0.97]"
                  >
                    Book
                    <span className="sr-only"> {deal.title.toLowerCase()}</span>
                  </WaCta>
                )}
              </div>
            </div>
          </article>
        </li>
      ))}
    </Rail>
  );
}
