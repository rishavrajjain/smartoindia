import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Viewport } from "next";
import { Sora } from "next/font/google";

import { WaCta } from "@/components/ui/wa-cta";
import { FESTIVALS } from "@/data/festivals";
import { IMAGES } from "@/data/images";
import { PACKAGES } from "@/data/packages";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

/**
 * Concept F — "Sunline".
 *
 * Bright consumer-app energy: candy colour blocks, big rounded corners, a
 * friendly geometric sans, photo collage, scroll-snap trip rail. The opposite
 * of hushed — the Northeast as pure serotonin.
 */

const sora = Sora({
  variable: "--font-f-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata = pageMetadata({
  title: "Smarto F: Pack light, we drive",
  description:
    "Waterfalls, tea gardens, high passes, festival weekends. Northeast India trips and cabs, planned in one WhatsApp chat.",
  path: "/f",
});

export const viewport: Viewport = {
  themeColor: "#fffdf6",
  colorScheme: "light",
};

/* Palette. ink on cream 15.4:1 · ink on marigold 10.2:1 · ink on mint 11.7:1 ·
   ink on sky 10.9:1 · ink on coral 6.0:1 · cream on jungle 7.4:1. */
const PALETTE = {
  "--f-cream": "#fffdf6",
  "--f-ink": "#17251f",
  "--f-jungle": "#0e6e52",
  "--f-marigold": "#ffb01f",
  "--f-mint": "#b8e8c8",
  "--f-sky": "#a5d8f3",
  "--f-coral": "#ff8a70",
  "--f-lilac": "#d8c8f5",
} as CSSProperties;

const VIBES = [
  "waterfalls",
  "tea gardens",
  "high passes",
  "river islands",
  "night markets",
  "root bridges",
  "rhino country",
  "festival season",
];

const RAIL = PACKAGES.filter((p) =>
  [
    "meghalaya-waterfalls-and-caves",
    "kaziranga-and-the-brahmaputra",
    "tawang-high-passes",
    "north-sikkim-valleys",
    "upper-assam-tea-and-river-towns",
    "nagaland-hills-and-hornbill",
  ].includes(p.slug),
);

const BLOCKS = [
  {
    bg: "var(--f-marigold)",
    title: "Airport runs",
    line: "Tracked flights, met at arrivals, zero kerb-side haggling.",
    message: enquiry("I need an airport transfer."),
    cta: "Book one",
  },
  {
    bg: "var(--f-sky)",
    title: "Weekend trips",
    line: "Shillong by Saturday breakfast, back by Sunday dinner.",
    message: enquiry("I would like a quote for a weekend trip."),
    cta: "Plan one",
  },
  {
    bg: "var(--f-mint)",
    title: "EV cabs",
    line: "Electric for the city — quiet cars, clean hills.",
    message: enquiry("I would like to book an EV cab."),
    cta: "Ride one",
  },
  {
    bg: "var(--f-lilac)",
    title: "Team travel",
    line: "Offsites and office runs that actually leave on time.",
    message: enquiry("I would like to discuss corporate transport."),
    cta: "Sort it",
  },
] as const;

export default function ConceptFPage() {
  return (
    <div
      data-page-theme="sunline"
      style={PALETTE}
      className={`${sora.variable} bg-[var(--f-cream)] font-[family-name:var(--font-f-sans)] text-[var(--f-ink)] [&_:is(h1,h2,h3)]:font-[family-name:var(--font-f-sans)]`}
    >
      {/* ——— Header */}
      <header className="sticky top-0 z-30 bg-[var(--f-cream)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/f" className="text-[1.375rem] font-extrabold tracking-tight" aria-label="Smarto concept F home">
            smarto<span className="text-[var(--f-coral)]">*</span>
          </Link>
          <nav aria-label="Site">
            <ul className="flex items-center gap-2 text-[0.875rem] font-semibold">
              <li className="hidden sm:block">
                <Link href="/packages" className="rounded-full px-4 py-2 transition-colors hover:bg-[var(--f-mint)]">
                  Trips
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link href="/cabs" className="rounded-full px-4 py-2 transition-colors hover:bg-[var(--f-sky)]">
                  Cabs
                </Link>
              </li>
              <li>
                <Link href="/" className="rounded-full bg-[var(--f-ink)] px-4 py-2 text-[var(--f-cream)] transition-colors hover:bg-[var(--f-jungle)]">
                  Classic site
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ——— Hero: type + collage */}
      <section aria-labelledby="f-hero" className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 lg:pt-16 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="inline-flex rounded-full bg-[var(--f-mint)] px-4 py-1.5 text-[0.8125rem] font-bold">
              Northeast India, all of it 🌤
            </p>
            <h1
              id="f-hero"
              className="mt-5 text-[3rem] leading-[1.0] font-extrabold tracking-[-0.03em] sm:text-[4rem] lg:text-[4.5rem]"
            >
              Pack light.
              <br />
              <span className="text-[var(--f-jungle)]">We&rsquo;ll drive.</span>
            </h1>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed">
              Trips, cabs and festival weekends across five states — planned in
              one WhatsApp chat, priced before you pack.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <WaCta
                message={enquiry("I would like to plan a Northeast trip.")}
                location="concept-f"
                className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[var(--f-ink)] px-8 text-[1rem] font-bold text-[var(--f-cream)] transition-transform duration-200 hover:scale-[1.03] hover:bg-[var(--f-jungle)]"
              >
                Start planning →
              </WaCta>
              <Link
                href="/packages"
                className="inline-flex min-h-14 items-center rounded-full border-2 border-[var(--f-ink)] px-7 text-[1rem] font-bold transition-colors hover:bg-[var(--f-marigold)]"
              >
                See the trips
              </Link>
            </div>
          </div>

          {/* Collage */}
          <div aria-hidden="true" className="relative mx-auto h-[24rem] w-full max-w-md lg:col-span-6 lg:h-[30rem]">
            <div className="absolute top-0 left-[6%] w-[58%] rotate-[-4deg] rounded-3xl bg-[var(--f-marigold)] p-2 shadow-lg">
              <Image
                src={IMAGES.meghalayaWaterfalls.src}
                alt=""
                width={IMAGES.meghalayaWaterfalls.width}
                height={IMAGES.meghalayaWaterfalls.height}
                priority
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="aspect-[4/5] rounded-2xl object-cover"
              />
            </div>
            <div className="absolute top-[16%] right-0 w-[46%] rotate-[5deg] rounded-3xl bg-[var(--f-sky)] p-2 shadow-lg">
              <Image
                src={IMAGES.arunachalTawang.src}
                alt=""
                width={IMAGES.arunachalTawang.width}
                height={IMAGES.arunachalTawang.height}
                priority
                sizes="(min-width: 1024px) 24vw, 46vw"
                className="aspect-square rounded-2xl object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-[24%] w-[52%] rotate-[2deg] rounded-3xl bg-[var(--f-coral)] p-2 shadow-lg">
              <Image
                src={IMAGES.festivalsHero.src}
                alt=""
                width={IMAGES.festivalsHero.width}
                height={IMAGES.festivalsHero.height}
                priority
                sizes="(min-width: 1024px) 27vw, 52vw"
                className="aspect-[5/4] rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Vibe chips */}
        <ul aria-label="Things to chase" className="mt-12 flex flex-wrap gap-2.5">
          {VIBES.map((vibe, index) => (
            <li
              key={vibe}
              className={`rounded-full px-4 py-2 text-[0.8125rem] font-semibold ${
                ["bg-[var(--f-mint)]", "bg-[var(--f-sky)]", "bg-[var(--f-lilac)]", "bg-[var(--f-marigold)]"][index % 4]
              }`}
            >
              {vibe}
            </li>
          ))}
        </ul>
      </section>

      {/* ——— Candy service blocks */}
      <section aria-labelledby="f-services" className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 id="f-services" className="text-[2rem] leading-tight font-extrabold tracking-[-0.02em] sm:text-[2.5rem]">
          Whatever moves you.
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {BLOCKS.map((block) => (
            <li key={block.title} className="rounded-[2rem] p-7 sm:p-9" style={{ background: block.bg }}>
              <h3 className="text-[1.5rem] font-extrabold tracking-[-0.01em]">{block.title}</h3>
              <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed">{block.line}</p>
              <div className="mt-6">
                <WaCta
                  message={block.message}
                  location="concept-f"
                  subject={block.title}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--f-ink)] px-6 text-[0.875rem] font-bold text-[var(--f-cream)] transition-transform duration-200 hover:scale-[1.04]"
                >
                  {block.cta} →
                </WaCta>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ——— Trip rail */}
      <section aria-labelledby="f-trips" className="py-16 lg:py-24">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-5 sm:px-8">
          <h2 id="f-trips" className="text-[2rem] leading-tight font-extrabold tracking-[-0.02em] sm:text-[2.5rem]">
            Trips people text home about.
          </h2>
          <Link href="/packages" className="hidden shrink-0 text-[0.9375rem] font-bold text-[var(--f-jungle)] underline underline-offset-4 hover:text-[var(--f-ink)] sm:block">
            All nine →
          </Link>
        </div>

        <ul className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          {RAIL.map((pkg) => (
            <li key={pkg.slug} className="w-[78vw] max-w-[20rem] shrink-0 snap-start">
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_2px_20px_rgba(23,37,31,0.08)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={pkg.hero.src}
                    alt={pkg.hero.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 640px) 20rem, 78vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[var(--f-cream)]/95 px-3 py-1 text-[0.75rem] font-bold">
                    {pkg.durationLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[1.125rem] leading-snug font-bold">{pkg.title}</h3>
                  <p className="mt-1 text-[0.8125rem] font-semibold text-[var(--f-jungle)]">
                    {pkg.state} · {pkg.priceLabel}
                  </p>
                  <p className="mt-2.5 line-clamp-3 text-[0.875rem] leading-relaxed">
                    {pkg.summary}
                  </p>
                  <div className="mt-auto flex items-center gap-4 pt-5">
                    <WaCta
                      message={pkg.enquiry}
                      location="concept-f"
                      subject={pkg.slug}
                      className="inline-flex min-h-11 items-center rounded-full bg-[var(--f-marigold)] px-5 text-[0.8125rem] font-bold transition-transform duration-200 hover:scale-[1.04]"
                    >
                      Get a quote
                    </WaCta>
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="text-[0.8125rem] font-bold underline underline-offset-4 hover:text-[var(--f-jungle)]"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* ——— Festival months */}
      <section aria-labelledby="f-festivals" className="bg-[var(--f-jungle)] py-16 text-[var(--f-cream)] lg:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="f-festivals" className="max-w-lg text-[2rem] leading-tight font-extrabold tracking-[-0.02em] sm:text-[2.5rem]">
            There&rsquo;s always a festival somewhere.
          </h2>
          <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[var(--f-cream)]/85">
            Twelve big ones across the year. Dates shift — we confirm the
            current calendar before you book.
          </p>
          <ul className="mt-9 flex flex-wrap gap-3">
            {FESTIVALS.slice(0, 8).map((festival, index) => (
              <li key={festival.id}>
                <WaCta
                  message={festival.enquiry}
                  location="concept-f"
                  subject={festival.id}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.875rem] font-bold text-[var(--f-ink)] transition-transform duration-200 hover:scale-[1.04] ${
                    ["bg-[var(--f-marigold)]", "bg-[var(--f-mint)]", "bg-[var(--f-sky)]", "bg-[var(--f-coral)]"][index % 4]
                  }`}
                >
                  {festival.name}
                  <span className="font-semibold opacity-70">· {festival.month}</span>
                </WaCta>
              </li>
            ))}
          </ul>
          <p className="mt-7">
            <Link href="/festivals" className="text-[0.9375rem] font-bold underline underline-offset-4 hover:text-[var(--f-marigold)]">
              The full calendar →
            </Link>
          </p>
        </div>
      </section>

      {/* ——— Big CTA */}
      <section aria-labelledby="f-cta" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="rounded-[2.5rem] bg-[var(--f-marigold)] px-7 py-12 text-center sm:px-12 lg:py-16">
          <h2 id="f-cta" className="mx-auto max-w-xl text-[2rem] leading-[1.05] font-extrabold tracking-[-0.02em] sm:text-[2.75rem]">
            One text. Whole trip. Zero tabs open.
          </h2>
          <div className="mt-8">
            <WaCta
              message={enquiry("I would like to plan a Northeast trip.")}
              location="concept-f"
              className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[var(--f-ink)] px-9 text-[1rem] font-bold text-[var(--f-cream)] transition-transform duration-200 hover:scale-[1.03]"
            >
              WhatsApp Smarto →
            </WaCta>
          </div>
          <p className="mt-5 text-[0.8125rem] font-semibold">
            Usually replies the same day
          </p>
        </div>
      </section>

      {/* ——— Footer */}
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 pb-24 sm:px-8 lg:pb-12">
        <p className="text-[0.8125rem] font-semibold">
          © {new Date().getFullYear()} Smarto India · Concept F
        </p>
        <ul className="flex items-center gap-4 text-[0.8125rem] font-bold">
          {[
            ["/", "Classic"],
            ["/a", "A"],
            ["/b", "B"],
            ["/c", "C"],
            ["/d", "D"],
            ["/e", "E"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="underline underline-offset-4 hover:text-[var(--f-jungle)]">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </footer>

      {/* ——— Floating CTA (mobile keeps a thumb-reach action) */}
      <div className="fixed right-4 bottom-4 z-40 lg:hidden">
        <WaCta
          message={enquiry("I would like to plan a Northeast trip.")}
          location="concept-f"
          className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[var(--f-jungle)] px-6 text-[0.875rem] font-bold text-[var(--f-cream)] shadow-[0_8px_24px_rgba(14,110,82,0.4)]"
        >
          Chat with us
        </WaCta>
      </div>
    </div>
  );
}
