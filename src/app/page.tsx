import Image from "next/image";
import Link from "next/link";
import type { Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";

import { HomeMenu } from "@/components/sections/home-menu";
import { RouteNav, type RouteStop } from "@/components/sections/route-nav";
import { TripCoverflow } from "@/components/sections/trip-coverflow";
import { WaCta } from "@/components/ui/wa-cta";
import { FESTIVALS } from "@/data/festivals";
import { IMAGES } from "@/data/images";
import { FEATURED_PACKAGES } from "@/data/packages";
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

/* Hero title face — a transitional serif in the register of the reference
   ("Find your piece."). One weight, loaded only on this route. */
const sourceSerif = Source_Serif_4({
  variable: "--font-hero-title",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const FEATURED = FEATURED_PACKAGES;

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
    message: enquiry("I need an airport transfer."),
  },
  {
    name: "Shillong drop",
    line: "Guwahati to Shillong, one flat fare.",
    fare: "₹2,799",
    message: enquiry("I would like to book a Shillong drop."),
  },
  {
    name: "Railway station",
    line: "To Guwahati station, on train time.",
    fare: "₹399",
    message: enquiry("I need a railway station drop."),
  },
  {
    name: "Sonapur drop",
    line: "City-edge run at a fixed price.",
    fare: "₹1,599",
    message: enquiry("I would like to book a Sonapur drop."),
  },
  {
    name: "Hourly rental",
    line: "A car and driver on your clock.",
    fare: null,
    message: enquiry("I would like an hourly cab rental."),
  },
  {
    name: "Outstation",
    line: "Fixed fares to the hills, agreed up front.",
    fare: null,
    message: enquiry("I would like an outstation cab quote."),
  },
] as const;

/* Verified differentiators from smartocabs.com. */
const CAB_FEATURES = ["EV fleet", "No surge pricing", "Zero cancellation"];

/* Sectors Smarto moves for corporate clients. Stands in for the logo row in
   the wireframe — real client logos are Manav's to supply and must not be
   invented. */
const CORPORATE_SECTORS = [
  "Hotels",
  "Restaurants",
  "Offices",
  "Events",
  "Airlines",
];

const FESTIVAL_PICKS = FESTIVALS.slice(0, 4);

export default function HomePage() {
  return (
    <div data-page-theme="mobile-frame">
      <div className="relative mx-auto min-h-svh max-w-[26.5rem] bg-bone text-ink shadow-[0_0_60px_rgba(0,0,0,0.55)]">
        {/* ——— The picture. Nothing on it but the wordmark. */}
        <section
          id="home-top"
          aria-label={IMAGES.heroDawnRidges.alt}
          className={`${sourceSerif.variable} relative h-svh`}
        >
          <Image
            src={IMAGES.heroDawnRidges.src}
            alt={IMAGES.heroDawnRidges.alt}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 424px) 424px, 100vw"
            className="object-cover"
          />
          {/* The title arrives a beat after the scene does. */}
          <p className="hero-title-reveal absolute inset-x-0 top-[13%] px-6 text-center font-[family-name:var(--font-hero-title)] text-[2.375rem] leading-[1.1] text-bone [text-shadow:0_1px_28px_rgba(12,8,5,0.55)]">
            Explore
            <br />
            North East
          </p>
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

          {/* ——— The go-to trips, floating on the water. */}
          <div className="absolute inset-x-0 bottom-[5.75rem]">
            <h2
              id="home-trips"
              className="px-6 text-center text-[0.6875rem] font-medium tracking-[0.18em] text-bone/90 uppercase [text-shadow:0_1px_14px_rgba(12,8,5,0.5)]"
            >
              Our go-to trips
            </h2>
            <TripCoverflow trips={FEATURED} />
          </div>
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
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <span className="min-w-0">
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

        {/* ——— Corporate: a quiet dark band. */}
        <section
          id="home-corporate"
          className="mt-16 scroll-mt-6 bg-ink px-6 py-14 text-bone"
        >
          <p className="text-label font-medium text-marigold-bright uppercase">
            Corporate
          </p>
          <h2 className="mt-3 font-display text-[1.75rem] leading-tight text-bone">
            Teams that arrive on time
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone/70">
            Employee transport, offsites, and hospitality partners across the
            Northeast — one point of contact, billing your finance team will not
            argue with.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {CORPORATE_SECTORS.map((sector) => (
              <li
                key={sector}
                className="rounded-full border border-bone/25 px-3.5 py-1.5 text-[0.8125rem] text-bone/85"
              >
                {sector}
              </li>
            ))}
          </ul>
          <div className="mt-7">
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

        {/* ——— Festivals. */}
        <section id="home-festivals" className="scroll-mt-6 px-6 pt-16">
          <p className="text-label font-medium text-clay uppercase">Festivals</p>
          <h2 className="mt-3 font-display text-[1.75rem] leading-tight">
            Travel by the calendar
          </h2>
          <ul className="mt-6 border-t border-line">
            {FESTIVAL_PICKS.map((festival) => (
              <li key={festival.id} className="border-b border-line">
                <Link
                  href="/festivals"
                  className="flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-[1.125rem] text-ink">
                      {festival.name}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] text-taupe">
                      {festival.state}
                    </span>
                  </span>
                  <span className="shrink-0 text-label font-medium text-clay uppercase">
                    {festival.month}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4">
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
