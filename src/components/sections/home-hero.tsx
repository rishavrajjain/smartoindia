import Image from "next/image";
import Link from "next/link";

import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { IMAGES } from "@/data/images";
import { enquiry } from "@/lib/whatsapp";

/** Regions, indexed up the right edge of the frame. */
const REGIONS = [
  "Assam",
  "Meghalaya",
  "Arunachal",
  "Sikkim",
  "Nagaland",
];

/**
 * The opening frame.
 *
 * One photograph, full bleed and full height, with the headline wiping up from
 * its own baseline line by line. Every moving part is CSS — no JavaScript runs
 * to produce any of it, and all of it stops under `prefers-reduced-motion`.
 *
 * The image is the LCP element, so it is `priority` with `sizes="100vw"` and
 * nothing above it blocks paint.
 */
export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      {/* Photograph */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={IMAGES.homeHero.src}
          alt={IMAGES.homeHero.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="animate-kenburns object-cover object-[58%_center] motion-reduce:animate-none sm:object-center"
        />
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />
      </div>

      {/* Region index, up the right edge */}
      <ul
        aria-hidden="true"
        className="animate-fade-up pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex"
        style={{ animationDelay: "1.15s" }}
      >
        {REGIONS.map((region, index) => (
          <li
            key={region}
            className="flex items-center gap-3 text-label font-medium text-bone/55 uppercase"
          >
            {region}
            <span className="tabular-nums text-bone/35">
              {String(index + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>

      {/* Headline block, pinned to the base of the frame.
          The extra bottom padding below `lg` clears the fixed WhatsApp bar. */}
      <div className="mt-auto w-full">
        <div className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 lg:pb-20">
          <p
            className="animate-fade-up flex items-center gap-3 text-label font-medium text-bone/70 uppercase"
            style={{ animationDelay: "0.15s" }}
          >
            <span aria-hidden="true" className="h-px w-8 bg-bone/40" />
            {/* The full list cannot fit on one line at 375px, and wrapping it
                next to the rule reads as a mistake. */}
            <span className="sm:hidden">Northeast India</span>
            <span className="hidden sm:inline">
              Assam · Meghalaya · Arunachal · Sikkim · Nagaland
            </span>
          </p>

          <h1 className="mt-6 max-w-5xl text-[3rem] leading-[0.94] text-bone sm:text-[4.5rem] lg:text-[6.5rem]">
            {/* Each line clips independently, so the reveal reads as three
                separate movements rather than one block fading in. */}
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="animate-unveil block"
                style={{ animationDelay: "0.3s" }}
              >
                Travelled slowly.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="animate-unveil block italic text-bone/85"
                style={{ animationDelay: "0.46s" }}
              >
                Planned properly.
              </span>
            </span>
          </h1>

          <div
            aria-hidden="true"
            className="rule-draw mt-10 h-px w-full bg-bone/20"
            style={{ animationDelay: "0.85s" }}
          />

          <div
            className="animate-fade-up mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
            style={{ animationDelay: "0.95s" }}
          >
            <p className="max-w-md text-[1.0625rem] leading-relaxed text-bone/80">
              Road trips, festivals and everyday cabs across the Northeast,
              driven by people who know the roads. Tell us the idea; we build
              the rest around it.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <WhatsAppLink
                message={enquiry(
                  "I would like to plan a trip in the Northeast. Here is what I have in mind:",
                )}
                location="home-hero"
                tone="onDark"
                size="lg"
              >
                Plan a trip
              </WhatsAppLink>
              <Link
                href="/packages"
                className="link-rule text-[0.9375rem] font-medium text-bone"
              >
                See the trips
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="animate-fade-up absolute right-6 bottom-6 hidden items-center gap-3 lg:flex"
        style={{ animationDelay: "1.3s" }}
      >
        <span className="text-label font-medium text-bone/45 uppercase">
          Scroll
        </span>
        <svg
          viewBox="0 0 12 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="animate-cue size-4 text-bone/60 motion-reduce:animate-none"
        >
          <path d="M6 2v15M2 13l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
