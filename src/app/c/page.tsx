import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { HeroVideo } from "@/components/sections/hero-video";

import { CMenu } from "./c-menu";
import { WaCta } from "@/components/ui/wa-cta";
import { IMAGES } from "@/data/images";
import { PACKAGES } from "@/data/packages";
import { pageMetadata } from "@/lib/seo";
import { enquiry, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

/**
 * Concept C, "Night Drive".
 *
 * Dark cinematic luxury in the Black Tomato / Avenue H register: near-black
 * green, champagne gold, a whisper-thin serif, photography graded down to
 * embers. Confidence through restraint, short copy, vast space, slow reveals.
 */

const cormorant = Cormorant_Garamond({
  variable: "--font-c-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-c-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = pageMetadata({
  title: "Smarto C: The far Northeast, travelled quietly",
  description:
    "Private journeys across Assam, Meghalaya, Arunachal, Sikkim, and Nagaland. A car, a driver who knows the road, and one WhatsApp thread that plans everything.",
  path: "/c",
});

export const viewport: Viewport = {
  themeColor: "#0b0f0c",
  colorScheme: "dark",
};

/* Palette, kept in one place. Contrast on #0b0f0c:
   ivory 16.2:1 · mist 8.6:1 · gold 7.2:1. */
const PALETTE = {
  "--n-bg": "#0b0f0c",
  "--n-bg-lift": "#111712",
  "--n-ivory": "#ece7db",
  "--n-mist": "#a8ad9f",
  "--n-gold": "#c9a962",
  "--n-line": "rgba(236, 231, 219, 0.14)",
} as CSSProperties;

const JOURNEYS = [
  { numeral: "I", pkg: PACKAGES.find((p) => p.slug === "meghalaya-waterfalls-and-caves")! },
  { numeral: "II", pkg: PACKAGES.find((p) => p.slug === "tawang-high-passes")! },
  { numeral: "III", pkg: PACKAGES.find((p) => p.slug === "kaziranga-and-the-brahmaputra")! },
];

const TENETS = [
  {
    title: "One car, the whole way",
    line: "Your driver stays with you from airport to airport. Luggage moves once.",
  },
  {
    title: "Planned around weather",
    line: "In these hills the cloud decides the day. Itineraries bend instead of breaking.",
  },
  {
    title: "One thread on WhatsApp",
    line: "No portals, no forms. The person who plans your trip is the person who answers.",
  },
];

export default function ConceptCPage() {
  return (
    <div
      data-page-theme="night-drive"
      style={PALETTE}
      className={`${cormorant.variable} ${manrope.variable} bg-[var(--n-bg)] font-[family-name:var(--font-c-body)] text-[var(--n-ivory)]`}
    >
      <div className="relative mx-auto min-h-svh max-w-[26.5rem] ring-1 ring-[rgba(236,231,219,0.1)]">
      {/* --- Header: the wordmark top left, the menu top right. */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="flex h-20 items-center justify-between px-6">
          <Link href="/c" aria-label="Smarto concept C home">
            <Image
              src="/brand/smarto-wordmark-light.webp"
              alt="Smarto"
              width={720}
              height={160}
              priority
              className="h-6 w-auto"
            />
          </Link>
          <CMenu />
        </div>
      </header>

      {/* --- Hero: the journey film, one action, nothing else. */}
      <section
        aria-label="A short film of a Smarto journey across Northeast India"
        className="relative flex min-h-svh items-end overflow-hidden"
      >
        <h1 id="c-hero" className="sr-only">
          Smarto: private journeys across Northeast India
        </h1>
        <div className="absolute inset-0">
          <HeroVideo
            src="/video/hero-reel.mp4"
            poster="/images/hero-video-poster.webp"
            alt="A young traveller with a backpack walking across the tarmac at Guwahati airport, a plane behind her"
          />
          {/* Quiet grades: enough for the wordmark and the one action. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[rgba(11,15,12,0.6)] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-[rgba(11,15,12,0.75)] to-transparent" />
        </div>

      </section>

      {/* --- Manifesto line */}
      <section aria-label="How Smarto travels" className="border-y border-[var(--n-line)]">
        <div className="mx-auto max-w-[90rem] px-6 py-16 text-center">
          <p className="reveal mx-auto max-w-3xl font-[family-name:var(--font-c-display)] text-[1.75rem] leading-[1.35] font-light text-[var(--n-ivory)] italic">
            “We drive these roads every week. The itinerary is just the part we
            write down.”
          </p>
          <p className="mt-6 text-[0.6875rem] font-medium tracking-[0.32em] text-[var(--n-mist)] uppercase">
            Smarto · Guwahati
          </p>
        </div>
      </section>

      {/* --- Journeys: three editorial rows */}
      <section aria-labelledby="c-journeys" className="mx-auto max-w-[90rem] px-6 py-20">
        <div className="flex items-baseline justify-between gap-6">
          <h2
            id="c-journeys"
            className="font-[family-name:var(--font-c-display)] text-[2.5rem] leading-none font-light"
          >
            Journeys
          </h2>
          <Link
            href="/packages"
            className="text-[0.8125rem] tracking-[0.12em] text-[var(--n-gold)] uppercase underline decoration-[rgba(201,169,98,0.4)] underline-offset-4 hover:text-[#dcc084]"
          >
            All nine
          </Link>
        </div>

        <div className="mt-14 space-y-20">
          {JOURNEYS.map(({ numeral, pkg }, index) => (
            <article
              key={pkg.slug}
              className="reveal grid items-center gap-8"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={pkg.hero.src}
                  alt={pkg.hero.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 424px) 376px, 92vw"
                  className="object-cover brightness-[0.88] saturate-[0.9]"
                />
              </div>
              <div>
                <p className="font-[family-name:var(--font-c-display)] text-[1.5rem] text-[var(--n-gold)]">
                  {numeral}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-c-display)] text-[1.875rem] leading-[1.12] font-light">
                  {pkg.title}
                </h3>
                <p className="mt-2 text-[0.6875rem] font-medium tracking-[0.28em] text-[var(--n-mist)] uppercase">
                  {pkg.durationLabel} · {pkg.state}
                </p>
                <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-[var(--n-mist)]">
                  {pkg.summary}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <WaCta
                    message={pkg.enquiry}
                    location="concept-c"
                    subject={pkg.slug}
                    className="text-[0.8125rem] font-medium tracking-[0.22em] text-[var(--n-gold)] uppercase underline decoration-[rgba(201,169,98,0.4)] underline-offset-8 transition-colors hover:text-[#dcc084]"
                  >
                    Request a quote
                  </WaCta>
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="text-[0.8125rem] tracking-[0.12em] text-[var(--n-mist)] uppercase transition-colors hover:text-[var(--n-ivory)]"
                  >
                    The route
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- Tenets */}
      <section aria-labelledby="c-tenets" className="border-t border-[var(--n-line)] bg-[var(--n-bg-lift)]">
        <div className="mx-auto max-w-[90rem] px-6 py-20">
          <h2 id="c-tenets" className="sr-only">
            How the service works
          </h2>
          <div className="grid gap-12">
            {TENETS.map((tenet, index) => (
              <div key={tenet.title} className="reveal border-t border-[var(--n-line)] pt-6">
                <p className="text-[0.6875rem] font-medium tracking-[0.32em] text-[var(--n-gold)] uppercase">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-c-display)] text-[1.5rem] leading-snug font-normal">
                  {tenet.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--n-mist)]">
                  {tenet.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Festival nocturne */}
      <section aria-labelledby="c-festival" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src={IMAGES.festivalsHero.src}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover brightness-[0.5] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,15,12,0.85)] via-[rgba(11,15,12,0.45)] to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[90rem] px-6 py-24">
          <p className="text-[0.6875rem] font-medium tracking-[0.32em] text-[var(--n-gold)] uppercase">
            Festivals
          </p>
          <h2
            id="c-festival"
            className="mt-5 max-w-xl font-[family-name:var(--font-c-display)] text-[2.25rem] leading-[1.1] font-light"
          >
            Hornbill in December. Bihu in April. Ziro when the valley sings.
          </h2>
          <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-[var(--n-ivory)]/80">
            Dates drift with the lunar calendar; we confirm the current year
            before anything is booked.
          </p>
          <div className="mt-9">
            <WaCta
              message={enquiry("I would like to plan a trip around a festival.")}
              location="concept-c"
              className="inline-flex min-h-13 items-center border border-[var(--n-ivory)]/40 px-8 text-[0.8125rem] font-medium tracking-[0.22em] text-[var(--n-ivory)] uppercase transition-colors duration-500 hover:border-[var(--n-gold)] hover:text-[var(--n-gold)]"
            >
              Plan around a festival
            </WaCta>
          </div>
        </div>
      </section>

      {/* --- Footer */}
      <footer className="border-t border-[var(--n-line)]">
        <div className="mx-auto max-w-[90rem] px-6 py-14">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="font-[family-name:var(--font-c-display)] text-[1.875rem] font-light italic">
                One message. The rest is road.
              </p>
              <p className="mt-3 text-[0.8125rem] text-[var(--n-mist)]">
                {WHATSAPP_DISPLAY} · Guwahati, Assam
              </p>
            </div>
            <ul className="flex items-center gap-6 text-[0.8125rem] text-[var(--n-mist)]">
              <li><Link href="/" className="transition-colors hover:text-[var(--n-ivory)]">Classic</Link></li>
              <li><Link href="/a" className="transition-colors hover:text-[var(--n-ivory)]">A</Link></li>
              <li><Link href="/b" className="transition-colors hover:text-[var(--n-ivory)]">B</Link></li>
              <li><Link href="/impact" className="transition-colors hover:text-[var(--n-ivory)]">Impact</Link></li>
            </ul>
          </div>
          <p className="mt-10 border-t border-[var(--n-line)] pt-6 text-[0.75rem] text-[var(--n-mist)]/70">
            © {new Date().getFullYear()} Smarto India · Concept C. Itineraries
            and festival dates are confirmed on WhatsApp before travel.
          </p>
        </div>
      </footer>


      {/* --- Floating CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 mx-auto flex max-w-[26.5rem] justify-end px-5">
        <WaCta
          message={enquiry("I would like to plan a private Northeast journey.")}
          location="concept-c"
          className="pointer-events-auto inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[var(--n-gold)] px-6 text-[0.8125rem] font-semibold tracking-[0.1em] text-[var(--n-bg)] uppercase shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#dcc084]"
        >
          Plan a journey
        </WaCta>
      </div>
      </div>
    </div>
  );
}
