import Image from "next/image";
import Link from "next/link";
import type { Viewport } from "next";
import { Fraunces, Source_Serif_4 } from "next/font/google";

import {
  HeroCaptions,
  type HeroCaption,
} from "@/components/sections/hero-captions";
import { HeroVideo } from "@/components/sections/hero-video";
import { HomeMenu } from "@/components/sections/home-menu";
import { RouteNav, type RouteStop } from "@/components/sections/route-nav";
import { WaCta } from "@/components/ui/wa-cta";
import { FESTIVALS } from "@/data/festivals";
import { IMAGES } from "@/data/images";
import { REVIEWS } from "@/data/reviews";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Smarto: Northeast India, travelled well",
  description:
    "EV airport transfers, flat-fare outstation rides, and road trips across Assam, Meghalaya and the Northeast. No surge, zero cancellation. Plan yours on WhatsApp.",
  path: "/",
});

export const viewport: Viewport = {
  themeColor: "#1d6b98",
  colorScheme: "light",
};

/**
 * Ultra-minimal homepage, phone-first everywhere.
 *
 * One column at phone width on every screen — on desktop it sits centred on a
 * dark backdrop. It opens on the valley photograph with nothing written over
 * it; every class in this file is non-responsive so the layout cannot drift
 * between breakpoints. Global site chrome steps aside (data-page-theme); the
 * fixed WhatsApp bar at the bottom is the one persistent action.
 */

/* Hero title faces: a refined serif for "Explore" and a characterful,
   optically-soft Fraunces for "North East" — funky curves, still premium. */
const sourceSerif = Source_Serif_4({
  variable: "--font-hero-title",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const fraunces = Fraunces({
  variable: "--font-hero-funky",
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

/* Manav's hero copy, timed to the film's beats (video seconds). Fares are
   owner-supplied. */
/* Boundaries sit ~0.15s before the film's hard cuts (ffmpeg scene detection:
   3.92 / 5.67 / 15.67), so each line clears with its scene and the next rises
   as the new scene lands. */
const HERO_CAPTIONS: HeroCaption[] = [
  { at: 0, small: "Airport rides", pre: "starting", big: "₹399" },
  { at: 3.8, small: "Drive to Shillong", pre: "starting", big: "₹2,799" },
  { at: 5.55, small: "Outstation rides", pre: "starting", big: "₹3,499" },
  {
    at: 11,
    small: "Explore",
    big: "North East",
    sub: "with personally curated packages",
  },
  { at: 15.55, small: "Railway station rides", pre: "starting", big: "₹199" },
];

/* The route bar's flags. Each id is a section on this page, in scroll order. */
const ROUTE_STOPS: RouteStop[] = [
  { id: "home-top", label: "Trips" },
  { id: "home-cabs", label: "Cabs" },
  { id: "home-corporate", label: "Corporate" },
  { id: "home-festivals", label: "Festivals" },
];

/* Outstation destinations — the four-card row from Manav's wireframe. */
const OUTSTATION = [
  {
    place: "Shillong",
    drive: "3 hrs from Guwahati",
    image: IMAGES.meghalayaFamily,
    message: enquiry("I would like a cab fare for Guwahati to Shillong."),
  },
  {
    place: "Cherrapunji",
    drive: "4 hrs from Guwahati",
    image: IMAGES.meghalayaWaterfalls,
    message: enquiry("I would like a cab fare for a Cherrapunji trip."),
  },
  {
    place: "Kaziranga",
    drive: "4.5 hrs from Guwahati",
    image: IMAGES.assamKaziranga,
    message: enquiry("I would like a cab fare for a Kaziranga trip."),
  },
  {
    place: "Tawang",
    drive: "2 days by road",
    image: IMAGES.arunachalTawang,
    message: enquiry("I would like to plan a Tawang trip by road."),
  },
] as const;

/*
 * Cab services and flat fares from smartocabs.com. Fares are the published
 * "starting from" rates — confirm current pricing with Manav before launch.
 */
const SERVICES = [
  {
    name: "Airport transfers",
    line: "Met at arrivals, tracked to your flight.",
    fare: null,
    icon: "/icons/ic-airport.webp",
    message: enquiry("I need an airport transfer."),
  },
  {
    name: "Shillong drop",
    line: "Guwahati to Shillong, one flat fare.",
    fare: "₹2,799",
    icon: "/icons/ic-hills.webp",
    message: enquiry("I would like to book a Shillong drop."),
  },
  {
    name: "Railway station",
    line: "To Guwahati station, on train time.",
    fare: "₹399",
    icon: "/icons/ic-train.webp",
    message: enquiry("I need a railway station drop."),
  },
  {
    name: "Sonapur drop",
    line: "City-edge run at a fixed price.",
    fare: "₹1,599",
    icon: "/icons/ic-milestone.webp",
    message: enquiry("I would like to book a Sonapur drop."),
  },
  {
    name: "Hourly rental",
    line: "A car and driver on your clock.",
    fare: null,
    icon: "/icons/ic-clock.webp",
    message: enquiry("I would like an hourly cab rental."),
  },
  {
    name: "Outstation",
    line: "Fixed fares to the hills, agreed up front.",
    fare: null,
    icon: "/icons/ic-road.webp",
    message: enquiry("I would like an outstation cab quote."),
  },
] as const;

/* Verified differentiators from smartocabs.com. */
const CAB_FEATURES = ["EV fleet", "No surge pricing", "Zero cancellation"];

/* Real client logos, mirrored from smartocabs.com's own "Clients" section. */
const CLIENT_LOGOS = [
  { src: "/logos/airtel.webp", name: "Airtel", w: 128, h: 128 },
  { src: "/logos/apollo-clinic.webp", name: "Apollo Clinic", w: 246, h: 128 },
  { src: "/logos/asian-paints.webp", name: "Asian Paints", w: 148, h: 128 },
  { src: "/logos/bharat-petroleum.webp", name: "Bharat Petroleum", w: 103, h: 128 },
  { src: "/logos/godrej.webp", name: "Godrej", w: 264, h: 128 },
];

/* Festival cards pair the catalog entry with its generated scene image. */
const FESTIVAL_IMAGE: Record<string, (typeof IMAGES)[keyof typeof IMAGES]> = {
  "bihu-spring": IMAGES.festBihu,
  hornbill: IMAGES.festHornbill,
  wangala: IMAGES.festWangala,
  losar: IMAGES.festLosar,
};
const FESTIVAL_PICKS = FESTIVALS.filter((f) => FESTIVAL_IMAGE[f.id]);

export default function HomePage() {
  return (
    <div data-page-theme="mobile-frame">
      <div className="relative mx-auto min-h-svh max-w-[26.5rem] bg-bone text-ink shadow-[0_0_60px_rgba(0,0,0,0.55)]">
        {/* ——— The film. One journey, airport to platform, on loop. */}
        <section
          id="home-top"
          aria-label="A short film of a Smarto journey: landing at Guwahati airport, taking a Smarto cab through the hills, and arriving at the railway station"
          className={`${sourceSerif.variable} ${fraunces.variable} relative h-svh overflow-hidden`}
        >
          <HeroVideo
            src="/video/hero-reel.mp4"
            poster="/images/hero-video-poster.webp"
            alt="A young traveller with a backpack walking across the tarmac at Guwahati airport, a plane behind her"
          />
          {/* Gentle grades so the title and cards stay legible over motion. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[36%] bg-gradient-to-b from-[rgba(12,8,5,0.55)] via-[rgba(12,8,5,0.24)] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[rgba(12,8,5,0.6)] via-[rgba(12,8,5,0.28)] to-transparent"
          />
          {/* Manav's caption choreography, synced to the film's own clock —
              each line rides its scene and loops with the video. */}
          <HeroCaptions videoSelector="#home-top video" captions={HERO_CAPTIONS} />
          <header className="absolute inset-x-0 top-0 flex items-center px-4 pt-5">
            <span aria-hidden="true" className="size-11 shrink-0" />
            <Link
              href="/"
              aria-label={`${SITE.name} home`}
              className="flex flex-1 justify-center"
            >
              <Image
                src="/brand/smarto-wordmark-light.webp"
                alt={SITE.name}
                width={720}
                height={160}
                priority
                className="h-5 w-auto opacity-90"
              />
            </Link>
            <HomeMenu />
          </header>
        </section>

        {/* ——— Outstation: the four destination cards. */}
        <section id="home-outstation" className="scroll-mt-6 px-6 pt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-label font-medium text-clay uppercase">
                Outstation
              </p>
              <h2 className="mt-3 font-display text-[1.75rem] leading-tight">
                Roads out of town
              </h2>
            </div>
            <Link
              href="/packages"
              className="link-rule shrink-0 text-[0.8125rem] font-medium text-ink"
            >
              All trips
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3.5">
            {OUTSTATION.map((card) => (
              <li key={card.place}>
                <WaCta
                  message={card.message}
                  location="home-cabs"
                  subject={card.place}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-sand ring-1 ring-ink/10"
                >
                  <span className="absolute inset-0">
                    <Image
                      src={card.image.src}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="200px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="photo-scrim absolute inset-0"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-3.5">
                    <span className="block font-display text-[1.1875rem] text-bone">
                      {card.place}
                    </span>
                    <span className="mt-0.5 block text-[0.6875rem] font-medium tracking-[0.1em] text-bone/75 uppercase">
                      {card.drive}
                    </span>
                  </span>
                </WaCta>
              </li>
            ))}
          </ul>
        </section>

        {/* ——— Cabs: the stat, the differentiators, and the fare list. */}
        <section id="home-cabs" className="scroll-mt-6 px-6 pt-16">
          <p className="text-label font-medium text-clay uppercase">Cabs</p>
          <h2 className="mt-3 font-display text-[1.75rem] leading-tight">
            Flat fares, no surprises
          </h2>

          {/* Figure from Manav's wireframe. Owner-supplied — confirm before
              treating as a published business fact. */}
          <div className="mt-6 flex items-baseline gap-3 border-t border-line pt-5">
            <span className="font-display text-[2.75rem] leading-none text-clay">
              50,000+
            </span>
            <span className="text-label font-medium text-taupe uppercase">
              customers
              <br />
              driven so far
            </span>
          </div>

          {/* Verified differentiators from smartocabs.com. */}
          <ul className="mt-4 flex flex-wrap gap-2 border-b border-line pb-5">
            {CAB_FEATURES.map((feature) => (
              <li
                key={feature}
                className="rounded-full bg-clay-soft px-3 py-1.5 text-[0.75rem] font-medium text-clay-deep"
              >
                {feature}
              </li>
            ))}
          </ul>

          <ul className="mt-2">
            {SERVICES.map((service) => (
              <li key={service.name} className="border-b border-line">
                <WaCta
                  message={service.message}
                  location="home-cabs"
                  subject={service.name}
                  className="flex items-center gap-3.5 py-3.5"
                >
                  <Image
                    src={service.icon}
                    alt=""
                    width={240}
                    height={240}
                    loading="lazy"
                    className="size-11 shrink-0 object-contain [filter:drop-shadow(0_4px_6px_rgba(12,8,5,0.14))]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.125rem] text-ink">
                      {service.name}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-taupe">
                      {service.line}
                    </span>
                  </span>
                  {service.fare ? (
                    <span className="shrink-0 text-right">
                      <span className="block text-[0.625rem] font-medium tracking-[0.1em] text-taupe uppercase">
                        from
                      </span>
                      <span className="block font-display text-[1.125rem] text-clay">
                        {service.fare}
                      </span>
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-clay"
                    >
                      →
                    </span>
                  )}
                </WaCta>
              </li>
            ))}
          </ul>
        </section>

        {/* ——— Corporate: a quiet dark band with a revolving client wall. */}
        <section
          id="home-corporate"
          className="mt-16 scroll-mt-6 bg-ink py-14 text-bone"
        >
          <div className="px-6">
            <p className="text-label font-medium text-clay-bright uppercase">
              Corporate
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] leading-tight text-bone">
              Teams that arrive on time
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone/70">
              Employee transport, offsites, and everyday movement — one point of
              contact, billing your finance team will not argue with.
            </p>
            <p className="mt-8 text-label font-medium text-bone/55 uppercase">
              Trusted by teams at
            </p>
          </div>

          {/* Revolving client logos — two copies for a seamless loop. */}
          <div className="marquee-mask mt-4 overflow-hidden">
            <ul className="flex w-max animate-marquee items-center gap-3">
              {[0, 1].map((copy) =>
                CLIENT_LOGOS.map((logo) => (
                  <li
                    key={`${copy}-${logo.name}`}
                    aria-hidden={copy === 1 ? true : undefined}
                    className="flex h-16 shrink-0 items-center justify-center rounded-2xl bg-bone px-6"
                  >
                    <Image
                      src={logo.src}
                      alt={copy === 0 ? logo.name : ""}
                      width={logo.w}
                      height={logo.h}
                      loading="lazy"
                      className="h-8 w-auto object-contain"
                    />
                  </li>
                )),
              )}
            </ul>
          </div>

          <div className="px-6 pt-10">
            <WaCta
              message={enquiry(
                "I would like to discuss corporate transport for my team.",
              )}
              location="home-corporate"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-bone px-6 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-white"
            >
              Talk to us about your team
            </WaCta>
          </div>
        </section>

        {/* ——— Festivals: a visual grid of the region's big gatherings. */}
        <section id="home-festivals" className="scroll-mt-6 px-6 pt-16">
          <p className="text-label font-medium text-clay uppercase">Festivals</p>
          <h2 className="mt-3 font-display text-[1.75rem] leading-tight">
            Travel by the calendar
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3.5">
            {FESTIVAL_PICKS.map((festival) => (
              <li key={festival.id}>
                <Link
                  href="/festivals"
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-sand ring-1 ring-ink/10"
                >
                  <Image
                    src={FESTIVAL_IMAGE[festival.id].src}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden="true"
                    className="photo-scrim absolute inset-0"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-bone/90 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.1em] text-ink uppercase backdrop-blur-sm">
                    {festival.month}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-3.5">
                    <span className="block font-display text-[1.1875rem] leading-tight text-bone">
                      {festival.name}
                    </span>
                    <span className="mt-0.5 block text-[0.6875rem] font-medium tracking-[0.1em] text-bone/75 uppercase">
                      {festival.state}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/festivals"
              className="link-rule text-[0.9375rem] font-medium text-ink"
            >
              The full calendar
            </Link>
          </div>
          <p className="mt-4 text-[0.75rem] leading-relaxed text-taupe/80">
            Festival dates shift year to year. We confirm the current calendar on
            WhatsApp before you book.
          </p>
        </section>

        {/* ——— Quiet proof. A simple swipeable rail — fixed-width cards that
            cannot overflow the phone frame. */}
        <section aria-labelledby="home-reviews" className="pt-16">
          <h2
            id="home-reviews"
            className="px-6 text-label font-medium text-taupe uppercase"
          >
            From past trips
          </h2>
          <ul className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-6 pb-2">
            {REVIEWS.slice(0, 4).map((review) => (
              <li key={review.id} className="w-[17rem] shrink-0 snap-start">
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper p-5">
                  <blockquote className="flex-1 font-display text-[1.0625rem] leading-relaxed text-ink">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 border-t border-line pt-3 text-[0.8125rem]">
                    <span className="font-medium text-ink">{review.author}</span>
                    <span className="mt-0.5 block text-taupe">
                      {review.context}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-3 px-6 text-[0.6875rem] text-taupe/70">
            Illustrative feedback shown while we gather permission to publish
            real reviews.
          </p>
        </section>

        {/* ——— Footer: real contact details from smartocabs.com. */}
        <footer
          id="home-footer"
          className="mt-16 scroll-mt-6 border-t border-line px-6 pt-10 pb-36 text-center"
        >
          <p className="font-display text-[1.5rem] leading-tight">
            Smart People, <span className="accent">Smart Choice</span>.
          </p>

          <dl className="mx-auto mt-7 max-w-xs space-y-4 text-[0.875rem]">
            <div>
              <dt className="text-label font-medium text-taupe uppercase">
                WhatsApp &amp; calls
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="text-ink transition-colors hover:text-clay"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-label font-medium text-taupe uppercase">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ink transition-colors hover:text-clay"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-label font-medium text-taupe uppercase">
                Office
              </dt>
              <dd className="mt-1 leading-relaxed text-taupe">{SITE.address}</dd>
            </div>
          </dl>

          <p className="mt-8 text-[0.75rem] leading-relaxed text-taupe/80">
            © {new Date().getFullYear()} {SITE.legalName}. Fares and trip
            details are confirmed on WhatsApp before travel.
          </p>
        </footer>

        {/* ——— The route bar: section navigation and the persistent CTA. */}
        <RouteNav stops={ROUTE_STOPS} />
      </div>
    </div>
  );
}
