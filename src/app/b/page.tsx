import Image from "next/image";
import Link from "next/link";
import type { Viewport } from "next";

import { Eyebrow } from "@/components/ui/deco";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { FESTIVALS } from "@/data/festivals";
import { IMAGES } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { enquiry } from "@/lib/whatsapp";

import { JourneyShell, type JourneyStop } from "./journey-shell";
import { UseCaseCarousel, type UseCaseSlide } from "./use-case-carousel";

export const metadata = pageMetadata({
  title: "Smarto B: Our cabs, for every kind of journey",
  description:
    "Cabs, outstation trips, corporate travel, and festival journeys across Northeast India. One WhatsApp message plans the whole road.",
  path: "/b",
});

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  colorScheme: "light",
};

/**
 * Concept homepage B, built from Manav's wireframe: cab-services-led, with the
 * page presented as one road trip. The bottom route bar (see JourneyShell) is
 * the wow feature, a Smarto cab drives Guwahati → Tawang as the visitor
 * scrolls, and each destination dot is also section navigation.
 */

const STOPS: JourneyStop[] = [
  { id: "b-guwahati", label: "Guwahati" },
  { id: "b-shillong", label: "Shillong" },
  { id: "b-cherrapunji", label: "Cherrapunji" },
  { id: "b-kaziranga", label: "Kaziranga" },
  { id: "b-tawang", label: "Tawang" },
];

const SLIDES: UseCaseSlide[] = [
  {
    phrase: "airport mornings",
    copy: "Pickups timed to the flight rather than the booking, a driver who knows which exit you will actually come out of, and no negotiation at the kerb.",
    image: IMAGES.cabsAirport,
    ctaLabel: "Book an airport transfer",
    ctaMessage: enquiry("I need an airport transfer in Guwahati."),
  },
  {
    phrase: "outstation weekends",
    copy: "Shillong, Cherrapunji, Kaziranga and beyond. One car, one driver who knows the road, and a fare agreed before you leave town.",
    image: IMAGES.cabsOutstation,
    ctaLabel: "Plan an outstation trip",
    ctaMessage: enquiry("I would like a quote for an outstation trip."),
  },
  {
    phrase: "festival season",
    copy: "Hornbill, Bihu, Ziro. The best of the Northeast happens on specific days in specific places. We handle the roads so you are there for them.",
    image: IMAGES.festivalDrums,
    ctaLabel: "Plan a festival run",
    ctaMessage: enquiry("I would like to plan travel around a festival."),
  },
  {
    phrase: "office runs",
    copy: "Employee transport, client visits, and offsites that leave on time. Clean cars, sober billing, and one person on WhatsApp who sorts everything.",
    image: IMAGES.corporateHero,
    ctaLabel: "Set up corporate travel",
    ctaMessage: enquiry("I would like to discuss corporate transport for my team."),
  },
];

const OUTSTATION = [
  {
    place: "Shillong",
    drive: "About 3 hours from Guwahati",
    note: "The everyday hill run: offices, weekends, and the lake on the way up.",
    image: IMAGES.meghalayaFamily,
    message: enquiry("I would like a cab fare for Guwahati to Shillong."),
  },
  {
    place: "Cherrapunji",
    drive: "About 4 hours from Guwahati",
    note: "Waterfalls, the gorge viewpoints, and the wettest sky in India.",
    image: IMAGES.meghalayaWaterfalls,
    message: enquiry("I would like a cab fare for a Cherrapunji trip."),
  },
  {
    place: "Kaziranga",
    drive: "About 4½ hours from Guwahati",
    note: "Dawn safaris in elephant grass. Go for two nights, not one.",
    image: IMAGES.assamKaziranga,
    message: enquiry("I would like a cab fare for a Kaziranga trip."),
  },
  {
    place: "Tawang",
    drive: "Two days on the road, done properly",
    note: "High passes, prayer flags, and a route that deserves its rest day.",
    image: IMAGES.arunachalTawang,
    message: enquiry("I would like to plan a Tawang trip by road."),
  },
] as const;

const SERVICES = [
  {
    name: "Airport transfers",
    line: "Met at arrivals, tracked to your flight.",
    message: enquiry("I need an airport transfer."),
  },
  {
    name: "Railway station",
    line: "Pickups and drops that respect train time.",
    message: enquiry("I need a railway station pickup."),
  },
  {
    name: "Hourly rental",
    line: "A car and driver on your clock, half day or full.",
    message: enquiry("I would like an hourly cab rental."),
  },
  {
    name: "Outstation",
    line: "Fixed fares to the hills, agreed up front.",
    message: enquiry("I would like an outstation cab quote."),
  },
  {
    name: "City trips",
    line: "Errands, dinners, and days that need a car.",
    message: enquiry("I need a cab for local city trips."),
  },
  {
    name: "EV fleet",
    line: "Electric cars for city work and short hops.",
    message: enquiry("I would like to book an EV cab."),
  },
] as const;

const FESTIVAL_PICKS = FESTIVALS.slice(0, 3);

export default function ConceptBPage() {
  return (
    <JourneyShell stops={STOPS}>
      <div data-page-theme="route-manifest" className="bg-bone text-ink">
        {/* --- Header: quiet, not sticky; the route bar is the persistent nav. */}
        <header className="border-b border-line">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
            <Link href="/b" aria-label={`${SITE.name} concept B home`}>
              <Image
                src="/brand/smarto-wordmark.webp"
                alt={SITE.name}
                width={720}
                height={160}
                priority
                className="h-6 w-auto"
              />
            </Link>
            <nav aria-label="Site">
              <ul className="flex items-center gap-6 text-[0.9375rem]">
                <li className="hidden sm:block">
                  <Link href="/packages" className="text-taupe transition-colors hover:text-ink">
                    Packages
                  </Link>
                </li>
                <li className="hidden sm:block">
                  <Link href="/cabs" className="text-taupe transition-colors hover:text-ink">
                    Cabs
                  </Link>
                </li>
                <li>
                  <Link href="/" className="link-rule text-clay hover:text-clay-deep">
                    Classic site
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* --- Stop 1 · Guwahati: the hero carousel from the wireframe. */}
        <section id="b-guwahati" aria-labelledby="b-hero-heading" className="relative">
          <h2 id="b-hero-heading" className="sr-only">
            What our cabs are for
          </h2>
          <div className="mx-auto w-full max-w-7xl px-5 pt-12 pb-16 sm:px-8 lg:pt-20 lg:pb-24">
            <Eyebrow className="mb-8">
              Guwahati → the whole Northeast
            </Eyebrow>
            <UseCaseCarousel slides={SLIDES} />
          </div>
        </section>

        {/* --- Stop 2 · Shillong: outstation, the four-card row. */}
        <section
          id="b-shillong"
          aria-labelledby="b-outstation-heading"
          className="border-t border-line bg-sand"
        >
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>01 · Outstation</Eyebrow>
                <h2
                  id="b-outstation-heading"
                  className="mt-5 max-w-md text-[2rem] leading-[1.06] sm:text-[2.75rem]"
                >
                  Four roads out of town.
                </h2>
              </div>
              <p className="max-w-xs text-[0.9375rem] leading-relaxed text-taupe">
                Fares are fixed before you leave, and every drive-time below is
                honest rather than optimistic.
              </p>
            </div>

            <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {OUTSTATION.map((route, index) => (
                <li key={route.place} className="group flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={route.image.src}
                      alt={route.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 left-3 bg-bone/92 px-2.5 py-1 text-label font-medium text-ink uppercase backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.375rem]">{route.place}</h3>
                  <p className="mt-1 text-label font-medium text-clay uppercase">
                    {route.drive}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-taupe">
                    {route.note}
                  </p>
                  <div className="mt-4">
                    <WhatsAppLink
                      message={route.message}
                      location="home-b-outstation"
                      subject={route.place}
                      tone="link"
                    >
                      Get a fare
                    </WhatsAppLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- Stop 3 · Cherrapunji: the services board. */}
        <section
          id="b-cherrapunji"
          aria-labelledby="b-services-heading"
          className="border-t border-line"
        >
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>02 · Cabs</Eyebrow>
                <h2
                  id="b-services-heading"
                  className="mt-5 text-[2rem] leading-[1.06] sm:text-[2.75rem]"
                >
                  Six ways we drive.
                </h2>
                <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-taupe">
                  Every service below is one WhatsApp message away. Say where
                  and when, and we confirm the car and the fare.
                </p>
                {/* Figure from Manav's wireframe (Aug 2026). Verify with him
                    before treating it as a published business fact. */}
                <p className="mt-10 border-t border-line pt-6">
                  <span className="font-display text-[3.25rem] leading-none text-clay">
                    5,000+
                  </span>
                  <span className="mt-2 block text-label font-medium text-taupe uppercase">
                    Customers driven so far
                  </span>
                </p>
              </div>

              <ul className="lg:col-span-8 lg:grid lg:grid-cols-2 lg:gap-x-10">
                {SERVICES.map((service, index) => (
                  <li
                    key={service.name}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-5"
                  >
                    <div className="flex min-w-0 items-baseline gap-4">
                      <span
                        aria-hidden="true"
                        className="text-label font-medium text-taupe tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[1.125rem]">{service.name}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-taupe">
                          {service.line}
                        </p>
                      </div>
                    </div>
                    <WhatsAppLink
                      message={service.message}
                      location="home-b-service"
                      subject={service.name}
                      tone="link"
                      className="shrink-0"
                    >
                      Book
                    </WhatsAppLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Stop 4 · Kaziranga: corporate, as a quiet dark band. */}
        <section
          id="b-kaziranga"
          aria-labelledby="b-corporate-heading"
          className="bg-ink text-bone"
        >
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow tone="dark">03 · Corporate</Eyebrow>
                <h2
                  id="b-corporate-heading"
                  className="mt-5 max-w-lg text-[2rem] leading-[1.06] sm:text-[2.75rem]"
                >
                  Teams that leave on time, arrive on time.
                </h2>
                <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-bone/70">
                  Daily employee transport, visitor movement, and offsites across
                  the Northeast, with one point of contact and billing your
                  finance team will not argue with.
                </p>
              </div>
              <div className="lg:col-span-5 lg:pb-2">
                <ul className="space-y-2 text-[0.9375rem] text-bone/85">
                  <li className="border-b border-bone/15 pb-2">Employee transport, monthly</li>
                  <li className="border-b border-bone/15 pb-2">Airport desks for visiting teams</li>
                  <li className="border-b border-bone/15 pb-2">Offsites and group movement</li>
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <WhatsAppLink
                    message={enquiry(
                      "I would like to discuss corporate transport for my team.",
                    )}
                    location="home-b-corporate"
                    tone="onDark"
                  >
                    Talk to us about your team
                  </WhatsAppLink>
                  <Link
                    href="/corporate"
                    className="link-rule link-rule-on-dark text-bone/80 hover:text-bone"
                  >
                    Corporate details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Stop 5 · Tawang: festivals, then the sign-off. */}
        <section
          id="b-tawang"
          aria-labelledby="b-festivals-heading"
          className="relative overflow-hidden"
        >
          {/* Parallax bed: the image is taller than the frame and eases upward
              as the journey completes. Decorative only. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ transform: "translateY(calc(var(--trip, 0) * -52px))" }}
          >
            <Image
              src={IMAGES.festivalsHero.src}
              alt=""
              fill
              loading="lazy"
              sizes="100vw"
              className="scale-[1.12] object-cover"
            />
            <div className="absolute inset-0 bg-ink/55" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <Eyebrow tone="dark">04 · Festivals</Eyebrow>
            <h2
              id="b-festivals-heading"
              className="mt-5 max-w-lg text-[2rem] leading-[1.06] text-bone sm:text-[2.75rem]"
            >
              The Northeast keeps a calendar. Travel by it.
            </h2>

            <ul className="mt-10 grid gap-px overflow-hidden bg-bone/20 sm:grid-cols-3">
              {FESTIVAL_PICKS.map((festival) => (
                <li key={festival.id} className="bg-ink/60 p-6 backdrop-blur-sm">
                  <h3 className="text-[1.25rem] text-bone">{festival.name}</h3>
                  <p className="mt-1 text-label font-medium text-bone/70 uppercase">
                    {festival.monthLabel} · {festival.state}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-bone/80">
                    {festival.summary}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <WhatsAppLink
                message={enquiry("I would like to plan a trip around a festival.")}
                location="home-b-festivals"
                tone="onDark"
              >
                Plan a festival trip
              </WhatsAppLink>
              <Link href="/festivals" className="link-rule link-rule-on-dark text-bone/80 hover:text-bone">
                The full calendar
              </Link>
            </div>
            <p className="mt-6 max-w-md text-[0.8125rem] leading-relaxed text-bone/60">
              Festival timings shift year to year. We confirm current dates on
              WhatsApp before you book anything.
            </p>
          </div>
        </section>

        {/* --- Sign-off and footer strip. */}
        <section aria-labelledby="b-final-heading" className="border-t border-line bg-sand">
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow>End of the line</Eyebrow>
                <h2
                  id="b-final-heading"
                  className="mt-5 max-w-2xl text-[2.25rem] leading-[1.04] sm:text-[3.25rem]"
                >
                  Wherever the cab on the road below has reached, we can take
                  you there.
                </h2>
              </div>
              <div className="lg:col-span-4 lg:pb-2">
                <WhatsAppLink
                  message={enquiry("I would like to plan a trip in the Northeast.")}
                  location="home-b-final"
                  size="lg"
                >
                  Plan on WhatsApp
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </section>

        <footer className="pb-24 lg:pb-28">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
            <p className="text-[0.8125rem] text-taupe">
              © {new Date().getFullYear()} {SITE.legalName} · Concept B
            </p>
            <ul className="flex items-center gap-5 text-[0.8125rem]">
              <li>
                <Link href="/" className="text-taupe transition-colors hover:text-ink">
                  Classic site
                </Link>
              </li>
              <li>
                <Link href="/a" className="text-taupe transition-colors hover:text-ink">
                  Concept A
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-taupe transition-colors hover:text-ink">
                  Impact
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </JourneyShell>
  );
}
