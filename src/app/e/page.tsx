import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Viewport } from "next";
import { Space_Grotesk } from "next/font/google";

import { WaCta } from "@/components/ui/wa-cta";
import { FESTIVALS } from "@/data/festivals";
import { IMAGES } from "@/data/images";
import { PACKAGES } from "@/data/packages";
import { pageMetadata } from "@/lib/seo";
import { enquiry, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

/**
 * Concept E, "Index".
 *
 * Swiss-brutalist: the whole company presented as a typographic index. Paper
 * white, hard black rules, one shot of international orange, tabular data,
 * system mono for the metadata. The packages ARE the design.
 */

const spaceGrotesk = Space_Grotesk({
  variable: "--font-e-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata = pageMetadata({
  title: "Smarto E: Northeast India, indexed",
  description:
    "Nine routes, six cab services, twelve festivals, five states. The entire Smarto catalogue as one page. Enquiries by WhatsApp.",
  path: "/e",
});

export const viewport: Viewport = {
  themeColor: "#f4f4ef",
  colorScheme: "light",
};

/* Palette. black on paper 17.9:1 · signal #e04400 on paper 3.8:1 (large/UI
   only, never body text) · paper on black 17.9:1. */
const PALETTE = {
  "--e-paper": "#f4f4ef",
  "--e-black": "#101010",
  "--e-grey": "#585852",
  "--e-signal": "#e04400",
} as CSSProperties;

const MONTH_ORDER = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

const SERVICES = [
  ["A", "Airport transfers", "GAU · IXS · DIB · IMF"],
  ["B", "Railway station", "Guwahati · Dimapur"],
  ["C", "Hourly rental", "4 / 8 / 12 hr blocks"],
  ["D", "Outstation", "Fixed fare, agreed first"],
  ["E", "Corporate", "Monthly billing"],
  ["F", "EV fleet", "City and short-haul"],
] as const;

export default function ConceptEPage() {
  return (
    <div
      data-page-theme="index-sheet"
      style={PALETTE}
      className={`${spaceGrotesk.variable} bg-[var(--e-paper)] font-[family-name:var(--font-e-sans)] text-[var(--e-black)] [&_:is(h1,h2,h3)]:font-[family-name:var(--font-e-sans)]`}
    >
      {/* --- Masthead */}
      <header className="border-b-2 border-[var(--e-black)]">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <Link href="/e" className="text-[0.9375rem] font-bold tracking-[0.02em] uppercase" aria-label="Smarto concept E home">
            Smarto<sup aria-hidden="true">®</sup>
          </Link>
          <p className="hidden font-mono text-[0.6875rem] tracking-[0.06em] text-[var(--e-grey)] uppercase md:block">
            Northeast India: Travel index, sheet 01
          </p>
          <nav aria-label="Site">
            <ul className="flex items-center gap-5 font-mono text-[0.6875rem] tracking-[0.06em] uppercase">
              <li><a href="#e-routes" className="hover:text-[var(--e-signal)]">Routes</a></li>
              <li><a href="#e-services" className="hover:text-[var(--e-signal)]">Cabs</a></li>
              <li><a href="#e-festivals" className="hover:text-[var(--e-signal)]">Festivals</a></li>
              <li>
                <Link href="/" className="text-[var(--e-signal)] underline underline-offset-4 hover:text-[var(--e-black)]">
                  Classic
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* --- Headline block */}
      <section aria-labelledby="e-hero" className="border-b-2 border-[var(--e-black)]">
        <div className="px-4 py-14 sm:px-6 lg:py-20">
          <h1
            id="e-hero"
            className="text-[13.5vw] leading-[0.88] font-bold tracking-[-0.03em] uppercase sm:text-[11vw] lg:text-[9.5vw]"
          >
            Every road
            <br />
            in the{" "}
            <span className="text-[var(--e-signal)]">north-</span>
            <br />
            east.
          </h1>
          <div className="mt-10 grid gap-6 border-t border-[var(--e-black)] pt-5 sm:grid-cols-3">
            <p className="font-mono text-[0.75rem] leading-relaxed tracking-[0.04em] text-[var(--e-grey)] uppercase">
              09 routes / 05 states
              <br />
              06 cab services / 12 festivals
            </p>
            <p className="text-[0.9375rem] leading-relaxed sm:max-w-xs">
              Trips and transport across Assam, Meghalaya, Arunachal, Sikkim
              and Nagaland, planned over WhatsApp, priced on request.
            </p>
            <div className="sm:justify-self-end">
              <WaCta
                message={enquiry("I would like to plan a Northeast trip.")}
                location="concept-e"
                className="inline-flex min-h-12 items-center gap-3 bg-[var(--e-black)] px-6 text-[0.8125rem] font-medium tracking-[0.08em] text-[var(--e-paper)] uppercase transition-colors hover:bg-[var(--e-signal)]"
              >
                Enquire → WhatsApp
              </WaCta>
            </div>
          </div>
        </div>
      </section>

      {/* --- Routes index */}
      <section id="e-routes" aria-labelledby="e-routes-heading" className="border-b-2 border-[var(--e-black)]">
        <div className="flex items-baseline justify-between px-4 pt-10 pb-4 sm:px-6">
          <h2 id="e-routes-heading" className="text-[1.5rem] font-bold tracking-[-0.01em] uppercase">
            01 · Routes
          </h2>
          <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-[var(--e-grey)] uppercase">
            Price: on request
          </p>
        </div>

        <ul>
          {PACKAGES.map((pkg, index) => (
            <li key={pkg.slug} className="group border-t border-[var(--e-black)] last:border-b-0">
              <Link
                href={`/packages/${pkg.slug}`}
                className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 px-4 py-4 transition-colors group-hover:bg-[var(--e-black)] group-hover:text-[var(--e-paper)] sm:grid-cols-[4rem_1fr_10rem_8rem_4rem] sm:px-6"
              >
                <span className="font-mono text-[0.75rem] tracking-[0.04em] text-[var(--e-grey)] group-hover:text-[var(--e-paper)]/60">
                  N°{String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[1.0625rem] font-medium sm:text-[1.25rem]">
                  {pkg.title}
                </span>
                <span className="hidden font-mono text-[0.75rem] tracking-[0.04em] text-[var(--e-grey)] uppercase group-hover:text-[var(--e-paper)]/60 sm:block">
                  {pkg.state}
                </span>
                <span className="hidden font-mono text-[0.75rem] tracking-[0.04em] text-[var(--e-grey)] uppercase group-hover:text-[var(--e-paper)]/60 sm:block">
                  {pkg.durationDays} days
                </span>
                <span aria-hidden="true" className="justify-self-end text-[var(--e-signal)]">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Evidence strip */}
      <section aria-label="From the road" className="grid grid-cols-3 border-b-2 border-[var(--e-black)]">
        {[IMAGES.arunachalTawang, IMAGES.assamKaziranga, IMAGES.meghalayaRootBridge].map((img) => (
          <div key={img.src} className="relative aspect-[4/5] border-r border-[var(--e-black)] last:border-r-0 sm:aspect-[3/2]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading="lazy"
              sizes="33vw"
              className="object-cover grayscale-[0.35]"
            />
          </div>
        ))}
      </section>

      {/* --- Services, inverted */}
      <section id="e-services" aria-labelledby="e-services-heading" className="border-b-2 border-[var(--e-black)] bg-[var(--e-black)] text-[var(--e-paper)]">
        <div className="px-4 py-12 sm:px-6 lg:py-16">
          <h2 id="e-services-heading" className="text-[1.5rem] font-bold tracking-[-0.01em] uppercase">
            02 · Cabs
          </h2>
          <ul className="mt-8 grid gap-px bg-[var(--e-paper)]/25 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(([code, name, meta]) => (
              <li key={code} className="bg-[var(--e-black)] py-5 pr-4 sm:px-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.75rem] text-[var(--e-signal)]">{code}/</span>
                  <h3 className="text-[1.125rem] font-medium">{name}</h3>
                </div>
                <p className="mt-1.5 pl-7 font-mono text-[0.6875rem] tracking-[0.06em] text-[var(--e-paper)]/55 uppercase sm:pl-8">
                  {meta}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <WaCta
              message={enquiry("I would like to book a cab.")}
              location="concept-e"
              className="inline-flex min-h-12 items-center gap-3 bg-[var(--e-paper)] px-6 text-[0.8125rem] font-medium tracking-[0.08em] text-[var(--e-black)] uppercase transition-colors hover:bg-[var(--e-signal)] hover:text-[var(--e-paper)]"
            >
              Book → WhatsApp
            </WaCta>
          </div>
        </div>
      </section>

      {/* --- Festival grid */}
      <section id="e-festivals" aria-labelledby="e-festivals-heading" className="border-b-2 border-[var(--e-black)]">
        <div className="px-4 py-12 sm:px-6 lg:py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="e-festivals-heading" className="text-[1.5rem] font-bold tracking-[-0.01em] uppercase">
              03 · Festival calendar
            </h2>
            <p className="max-w-sm font-mono text-[0.6875rem] leading-relaxed tracking-[0.04em] text-[var(--e-grey)] uppercase">
              Months indicative: dates move with lunar and harvest calendars.
              Confirmed on WhatsApp before booking.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-px border border-[var(--e-black)] bg-[var(--e-black)] sm:grid-cols-3 lg:grid-cols-4">
            {[...FESTIVALS]
              .sort((a, b) => MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month))
              .map((festival) => (
                <li key={festival.id} className="bg-[var(--e-paper)] p-4">
                  <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-[var(--e-signal)] uppercase">
                    {festival.month}
                  </p>
                  <h3 className="mt-1.5 text-[0.9375rem] leading-snug font-medium">
                    {festival.name}
                  </h3>
                  <p className="mt-1 font-mono text-[0.625rem] tracking-[0.06em] text-[var(--e-grey)] uppercase">
                    {festival.state}
                  </p>
                </li>
              ))}
          </ul>
          <p className="mt-6">
            <Link
              href="/festivals"
              className="font-mono text-[0.75rem] tracking-[0.06em] uppercase underline underline-offset-4 hover:text-[var(--e-signal)]"
            >
              Full calendar with notes →
            </Link>
          </p>
        </div>
      </section>

      {/* --- Footer */}
      <footer aria-label="Footer">
        <div className="flex flex-wrap items-baseline justify-between gap-4 px-4 pt-10 sm:px-6">
          <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-[var(--e-grey)] uppercase">
            © {new Date().getFullYear()} Smarto India · Concept E · {WHATSAPP_DISPLAY}
          </p>
          <ul className="flex items-center gap-4 font-mono text-[0.6875rem] tracking-[0.06em] uppercase">
            <li><Link href="/" className="underline underline-offset-4 hover:text-[var(--e-signal)]">Classic</Link></li>
            <li><Link href="/a" className="underline underline-offset-4 hover:text-[var(--e-signal)]">A</Link></li>
            <li><Link href="/b" className="underline underline-offset-4 hover:text-[var(--e-signal)]">B</Link></li>
            <li><Link href="/c" className="underline underline-offset-4 hover:text-[var(--e-signal)]">C</Link></li>
            <li><Link href="/d" className="underline underline-offset-4 hover:text-[var(--e-signal)]">D</Link></li>
          </ul>
        </div>
        <p
          aria-hidden="true"
          className="mt-4 overflow-hidden text-[18.5vw] leading-[0.78] font-bold tracking-[-0.04em] uppercase select-none"
        >
          Smarto
        </p>
      </footer>

      {/* --- Floating CTA */}
      <div className="fixed right-4 bottom-4 z-40">
        <WaCta
          message={enquiry("I would like to plan a Northeast trip.")}
          location="concept-e"
          className="inline-flex min-h-12 items-center gap-2 bg-[var(--e-signal)] px-5 text-[0.75rem] font-bold tracking-[0.08em] text-[var(--e-paper)] uppercase transition-colors hover:bg-[var(--e-black)]"
        >
          WhatsApp ↗
        </WaCta>
      </div>
    </div>
  );
}
