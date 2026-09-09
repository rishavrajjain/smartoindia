import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Viewport } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";

import { WaCta } from "@/components/ui/wa-cta";
import { FESTIVALS } from "@/data/festivals";
import { IMAGES } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

/**
 * Concept D, "Grand Poster".
 *
 * A vintage travel-poster world: layered paper hills, a big benevolent sun,
 * postage-stamp destination cards, and ticket-stub festivals. Warm sunset
 * palette, chunky wonky serif, typewriter labels. Nostalgic, crafted, happy.
 */

const fraunces = Fraunces({
  variable: "--font-d-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "900"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-d-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = pageMetadata({
  title: "Smarto D: Greetings from the Northeast",
  description:
    "Road trips, festivals, and cabs across Northeast India, planned by people who live there. Send one WhatsApp message and start packing.",
  path: "/d",
});

export const viewport: Viewport = {
  themeColor: "#f7ecd9",
  colorScheme: "light",
};

/* Palette. Contrast on cream #f7ecd9: ink 13.9:1 · teal 6.6:1 · rust 4.6:1.
   On teal #175b5e: cream 6.3:1. On mustard #e8a13c: ink 8.3:1. */
const PALETTE = {
  "--p-cream": "#f7ecd9",
  "--p-paper": "#fffaf0",
  "--p-ink": "#2b2016",
  "--p-rust": "#c14e1f",
  "--p-orange": "#e07038",
  "--p-teal": "#175b5e",
  "--p-teal-deep": "#0f4245",
  "--p-mustard": "#e8a13c",
} as CSSProperties;

const STAMPS = [
  { place: "Shillong", meta: "3 HRS FROM GHY", image: IMAGES.meghalayaFamily, message: enquiry("I would like a cab fare for Guwahati to Shillong.") },
  { place: "Cherrapunji", meta: "4 HRS FROM GHY", image: IMAGES.meghalayaWaterfalls, message: enquiry("I would like a cab fare for a Cherrapunji trip.") },
  { place: "Kaziranga", meta: "4.5 HRS FROM GHY", image: IMAGES.assamKaziranga, message: enquiry("I would like a cab fare for a Kaziranga trip.") },
  { place: "Tawang", meta: "2 DAYS BY ROAD", image: IMAGES.arunachalTawang, message: enquiry("I would like to plan a Tawang trip by road.") },
] as const;

const TICKER = [
  "Shillong",
  "Cherrapunji",
  "Kaziranga",
  "Tawang",
  "Majuli",
  "Dawki",
  "Gangtok",
  "Kohima",
  "Ziro",
  "Dirang",
  "Sivasagar",
  "Khonoma",
];

const TICKETS = FESTIVALS.slice(0, 4);

/** Layered poster hills with a rising sun. Decorative. */
function PosterHills() {
  return (
    <svg
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-[46%] w-full"
    >
      <circle cx="880" cy="150" r="110" fill="var(--p-mustard)" />
      <path
        d="M0 260 C150 190 320 210 470 260 C620 310 760 300 900 250 C1020 208 1120 215 1200 245 L1200 420 L0 420 Z"
        fill="var(--p-orange)"
        opacity="0.55"
      />
      <path
        d="M0 310 C180 240 360 260 520 310 C680 358 840 350 990 300 C1080 272 1150 275 1200 295 L1200 420 L0 420 Z"
        fill="var(--p-rust)"
        opacity="0.75"
      />
      <path
        d="M0 360 C200 300 420 315 600 355 C780 393 960 388 1200 340 L1200 420 L0 420 Z"
        fill="var(--p-teal)"
      />
    </svg>
  );
}

export default function ConceptDPage() {
  return (
    <div
      data-page-theme="grand-poster"
      style={PALETTE}
      className={`${fraunces.variable} ${plexMono.variable} bg-[var(--p-cream)] font-[family-name:var(--font-d-mono)] text-[var(--p-ink)]`}
    >
      {/* --- Header */}
      <header className="border-b-2 border-[var(--p-ink)]">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/d"
            className="font-[family-name:var(--font-d-display)] text-2xl font-black tracking-tight"
            aria-label="Smarto concept D home"
          >
            Smarto<span className="text-[var(--p-rust)]">.</span>
          </Link>
          <nav aria-label="Site">
            <ul className="flex items-center gap-5 text-[0.75rem] tracking-[0.08em] uppercase">
              <li className="hidden sm:block">
                <Link href="/packages" className="hover:text-[var(--p-rust)]">Trips</Link>
              </li>
              <li className="hidden sm:block">
                <Link href="/festivals" className="hover:text-[var(--p-rust)]">Festivals</Link>
              </li>
              <li>
                <Link href="/" className="text-[var(--p-teal)] underline underline-offset-4 hover:text-[var(--p-teal-deep)]">
                  Classic site
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* --- Hero poster */}
      <section aria-labelledby="d-hero" className="px-4 pt-6 sm:px-8 sm:pt-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-2 border-[var(--p-ink)] bg-[var(--p-paper)]">
          {/* Inner poster frame */}
          <div className="pointer-events-none absolute inset-2.5 border border-[var(--p-ink)]/50 sm:inset-4" />
          <PosterHills />

          <div className="relative px-6 pt-14 pb-[34%] text-center sm:px-10 sm:pt-20 sm:pb-[30%]">
            <p className="text-[0.6875rem] tracking-[0.4em] text-[var(--p-teal)] uppercase">
              ★ Assam · Meghalaya · Arunachal · Sikkim · Nagaland ★
            </p>
            <h1
              id="d-hero"
              className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-d-display)] text-[clamp(2rem,10.5vw,4.75rem)] leading-[0.95] font-black tracking-tight uppercase lg:text-[5.5rem]"
            >
              Greetings
              <span className="block text-[0.42em] font-bold tracking-[0.18em] text-[var(--p-rust)] italic">
                from the
              </span>
              Northeast
            </h1>
            <p className="mx-auto mt-6 max-w-md text-[0.875rem] leading-relaxed">
              Road trips, festival seasons, and honest cabs, planned on
              WhatsApp by people who actually live here.
            </p>
            <div className="mt-8">
              <WaCta
                message={enquiry("I would like to plan a Northeast trip.")}
                location="concept-d"
                className="inline-flex min-h-13 rotate-[-1.5deg] items-center gap-3 border-2 border-[var(--p-ink)] bg-[var(--p-mustard)] px-8 text-[0.8125rem] font-medium tracking-[0.18em] uppercase shadow-[4px_4px_0_var(--p-ink)] transition-transform duration-200 hover:rotate-0 hover:shadow-[2px_2px_0_var(--p-ink)]"
              >
                Plan my trip →
              </WaCta>
            </div>
          </div>
        </div>
      </section>

      {/* --- Ticker */}
      <div aria-hidden="true" className="mt-10 overflow-hidden border-y-2 border-[var(--p-ink)] bg-[var(--p-ink)] py-2.5">
        <div className="flex w-max animate-marquee gap-0">
          {[0, 1].map((copy) => (
            <p key={copy} className="flex shrink-0 items-center text-[0.75rem] tracking-[0.3em] text-[var(--p-cream)] uppercase">
              {TICKER.map((stop) => (
                <span key={stop} className="flex items-center">
                  <span className="px-4">{stop}</span>
                  <span className="text-[var(--p-mustard)]">✦</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* --- Stamps: destinations */}
      <section aria-labelledby="d-stamps" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-[0.6875rem] tracking-[0.4em] text-[var(--p-rust)] uppercase">Collect all four</p>
          <h2
            id="d-stamps"
            className="mt-3 font-[family-name:var(--font-d-display)] text-[2.25rem] leading-tight font-black sm:text-[3rem]"
          >
            Postcards, pending.
          </h2>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STAMPS.map((stamp, index) => (
            <li
              key={stamp.place}
              className={`border-2 border-dashed border-[var(--p-ink)] bg-[var(--p-paper)] p-3 ${
                index % 2 === 0 ? "rotate-[-1.2deg]" : "rotate-[1.2deg]"
              } transition-transform duration-300 hover:rotate-0`}
            >
              <div className="relative aspect-square overflow-hidden border border-[var(--p-ink)]/40">
                <Image
                  src={stamp.image.src}
                  alt={stamp.image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-baseline justify-between gap-2 pt-3">
                <h3 className="font-[family-name:var(--font-d-display)] text-[1.375rem] font-bold">
                  {stamp.place}
                </h3>
                <p className="text-[0.625rem] tracking-[0.14em] text-[var(--p-teal)]">{stamp.meta}</p>
              </div>
              <div className="pt-2 pb-1">
                <WaCta
                  message={stamp.message}
                  location="concept-d"
                  subject={stamp.place}
                  className="inline-flex min-h-11 items-center text-[0.75rem] font-medium tracking-[0.16em] text-[var(--p-rust)] uppercase underline decoration-dashed underline-offset-4 hover:text-[var(--p-ink)]"
                >
                  Get a fare →
                </WaCta>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Festival tickets on teal */}
      <section aria-labelledby="d-tickets" className="border-y-2 border-[var(--p-ink)] bg-[var(--p-teal)] text-[var(--p-cream)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              id="d-tickets"
              className="font-[family-name:var(--font-d-display)] text-[2.25rem] leading-tight font-black sm:text-[3rem]"
            >
              Admit one,
              <br />
              to festival season.
            </h2>
            <p className="max-w-xs text-[0.8125rem] leading-relaxed text-[var(--p-cream)]/80">
              Dates drift with the moon and the harvest. We check the current
              year before you book anything.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {TICKETS.map((festival) => (
              <li
                key={festival.id}
                className="relative border-2 border-dashed border-[var(--p-cream)]/60 bg-[var(--p-teal-deep)] p-6 pl-10"
              >
                {/* Ticket punch holes */}
                <span aria-hidden="true" className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full border-2 border-dashed border-[var(--p-cream)]/60 bg-[var(--p-teal)]" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-[family-name:var(--font-d-display)] text-[1.5rem] font-bold">
                    {festival.name}
                  </h3>
                  <p className="text-[0.6875rem] tracking-[0.2em] text-[var(--p-mustard)] uppercase">
                    {festival.monthLabel}
                  </p>
                </div>
                <p className="mt-1 text-[0.6875rem] tracking-[0.2em] text-[var(--p-cream)]/70 uppercase">
                  {festival.state}
                </p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--p-cream)]/90">
                  {festival.summary}
                </p>
                <div className="mt-4">
                  <WaCta
                    message={festival.enquiry}
                    location="concept-d"
                    subject={festival.id}
                    className="inline-flex min-h-11 items-center text-[0.75rem] font-medium tracking-[0.16em] text-[var(--p-mustard)] uppercase underline decoration-dashed underline-offset-4 hover:text-[var(--p-cream)]"
                  >
                    Plan around it →
                  </WaCta>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center">
            <Link
              href="/festivals"
              className="text-[0.75rem] tracking-[0.2em] text-[var(--p-cream)] uppercase underline underline-offset-4 hover:text-[var(--p-mustard)]"
            >
              The full calendar →
            </Link>
          </p>
        </div>
      </section>

      {/* --- Services on mustard */}
      <section aria-labelledby="d-services" className="border-b-2 border-[var(--p-ink)] bg-[var(--p-mustard)]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
          <h2 id="d-services" className="font-[family-name:var(--font-d-display)] text-[2rem] leading-tight font-black sm:text-[2.5rem]">
            And for everything else, a cab.
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-3 text-[0.875rem] tracking-[0.06em] uppercase sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Airport transfers",
              "Railway station runs",
              "Hourly rentals",
              "Outstation fares",
              "City trips",
              "EV fleet",
            ].map((service) => (
              <li key={service} className="flex items-center gap-3 border-b border-[var(--p-ink)]/30 py-2.5">
                <span aria-hidden="true" className="text-[var(--p-rust)]">✦</span>
                {service}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <WaCta
              message={enquiry("I would like to book a cab.")}
              location="concept-d"
              className="inline-flex min-h-13 items-center gap-3 border-2 border-[var(--p-ink)] bg-[var(--p-paper)] px-8 text-[0.8125rem] font-medium tracking-[0.18em] uppercase shadow-[4px_4px_0_var(--p-ink)] transition-shadow hover:shadow-[2px_2px_0_var(--p-ink)]"
            >
              Book a cab on WhatsApp
            </WaCta>
          </div>
        </div>
      </section>

      {/* --- Footer */}
      <footer className="bg-[var(--p-cream)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-10 sm:px-8">
          <p className="text-[0.75rem] tracking-[0.1em] uppercase">
            © {new Date().getFullYear()} Smarto India · Concept D
          </p>
          <ul className="flex items-center gap-5 text-[0.75rem] tracking-[0.1em] uppercase">
            <li><Link href="/" className="underline underline-offset-4 hover:text-[var(--p-rust)]">Classic</Link></li>
            <li><Link href="/a" className="underline underline-offset-4 hover:text-[var(--p-rust)]">A</Link></li>
            <li><Link href="/b" className="underline underline-offset-4 hover:text-[var(--p-rust)]">B</Link></li>
            <li><Link href="/c" className="underline underline-offset-4 hover:text-[var(--p-rust)]">C</Link></li>
          </ul>
        </div>
      </footer>

      {/* --- Floating CTA */}
      <div className="fixed right-5 bottom-5 z-40">
        <WaCta
          message={enquiry("I would like to plan a Northeast trip.")}
          location="concept-d"
          className="inline-flex min-h-12 items-center gap-2 border-2 border-[var(--p-ink)] bg-[var(--p-rust)] px-5 text-[0.75rem] font-medium tracking-[0.14em] text-[var(--p-paper)] uppercase shadow-[4px_4px_0_var(--p-ink)] transition-shadow hover:shadow-[2px_2px_0_var(--p-ink)]"
        >
          WhatsApp us
        </WaCta>
      </div>
    </div>
  );
}
