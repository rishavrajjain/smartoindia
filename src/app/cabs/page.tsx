import Image from "next/image";
import Link from "next/link";

import { CabQuickServices } from "@/components/sections/cab-quick-services";
import { FareLock } from "@/components/sections/fare-lock";
import { PhotoHero } from "@/components/sections/photo-hero";
import { TrustAndFaqs } from "@/components/sections/trust-and-faqs";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { Container } from "@/components/ui/container";
import {
  ArrowIcon,
  BoltIcon,
  HeadsetIcon,
  SurgeOffIcon,
  TagIcon,
} from "@/components/ui/line-icons";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { CAB_FAQS } from "@/data/faqs";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Cabs in Guwahati: the price you're quoted is the price you pay",
  description:
    "Flat fares, no surge, no bargaining. All-electric cabs across Guwahati, 24×7: city rides, ₹399 railway station drops, airport rides and hourly rentals, booked on WhatsApp.",
  path: "/cabs",
});

/*
 * The cabs page, built from Manav's mobile mockup (smarto-cabs-mobile.html)
 * and laid out properly for desktop: booking card beside the headline, the
 * fare lock in two columns, services and numbers in grids. His copy,
 * lightly edited. The mockup's placeholder stat cells (rides completed,
 * CO2 avoided) stay out until real figures arrive; the reviews are real,
 * from Smarto's Google profile (src/data/reviews.ts).
 */

const CHIPS = [
  { icon: BoltIcon, label: <><b className="font-extrabold">100%</b> electric</> },
  { icon: SurgeOffIcon, label: <><b className="font-extrabold">Zero</b> surge, ever</> },
  { icon: HeadsetIcon, label: <><b className="font-extrabold">24×7</b> support</> },
  { icon: TagIcon, label: <>First with flat pricing</> },
];

const SERVICES = [
  {
    image: {
      src: "/images/fleet-cabs-city.webp",
      alt: "A white Smarto electric cab on a leafy Guwahati avenue in the early morning",
    },
    title: "City rides",
    fare: null,
    unit: null,
    body: "Anywhere in town. Rain or rush, one price.",
    message: enquiry("I need a cab in Guwahati and would like the flat fare."),
  },
  {
    image: {
      src: "/images/fleet-cabs-railway.webp",
      alt: "A Smarto electric cab waiting with its boot open at a railway station forecourt at golden hour",
    },
    title: "Railway station drops",
    fare: "₹399",
    unit: null,
    body: "Early train, late train, same ₹399.",
    message: enquiry("I need a railway station drop."),
  },
  {
    image: {
      src: "/images/fleet-cabs-airport.webp",
      alt: "A Smarto electric cab at the airport departures kerb at dawn, a suitcase beside it",
    },
    title: "Airport rides",
    fare: null,
    unit: null,
    body: "A 4 AM flight, priced like noon.",
    message: enquiry("I need an airport ride."),
  },
  {
    image: {
      src: "/images/fleet-cabs-hourly.webp",
      alt: "A Smarto electric cab parked at a tea-garden viewpoint in Assam",
    },
    title: "Hourly rentals",
    fare: "₹349",
    unit: "/hr",
    body: "Car and driver, on your clock.",
    message: enquiry("I would like an hourly cab rental."),
  },
] as const;

const NUMBERS = [
  { n: "100%", l: "Electric fleet" },
  { n: "₹0", l: "Surge, ever" },
  { n: "1st", l: "With flat pricing in Guwahati" },
  { n: "24×7", l: "On a real phone" },
];

const STEPS = [
  {
    title: "Tell us where you're going",
    body: "WhatsApp or the site. No app.",
  },
  {
    title: "See your flat fare",
    body: "Before you commit to anything.",
  },
  {
    title: "Ride. Pay exactly what you saw",
    body: "No meter, no rounding up.",
  },
];

export default function CabsPage() {

  return (
    <>
      {/* ——— Hero: the promise, the booking card, and the road it buys. */}
      <PhotoHero
        eyebrow="Cabs · Guwahati"
        title={
          <>
            The price you&rsquo;re quoted{" "}
            <span className="accent block">is the price you pay.</span>
          </>
        }
        sub="Flat fares. No surge. No bargaining. All-electric cabs across Guwahati, 24×7."
        image={{
          src: "/images/fleet-cabs-hero.webp",
          alt: "A Smarto electric cab at a misty hill-road viewpoint, rear door open and travel bags beside it",
        }}
        float={{
          icon: TagIcon,
          title: "Flat ₹399",
          line: "Railway station drop",
        }}
        chips={CHIPS}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#book"
            className="inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-full bg-green-deep px-6 text-[0.9375rem] font-extrabold text-white shadow-[0_14px_30px_rgba(57,151,114,0.3)] transition-transform duration-150 active:scale-[0.985]"
          >
            Book a ride
            <ArrowIcon className="size-4 rotate-90" />
          </a>
          <WaCta
            message={enquiry("I need a cab in Guwahati.")}
            location="cabs-hero"
            className="inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-extrabold text-ink ring-1 ring-line-strong transition-colors hover:bg-sand"
          >
            <WhatsAppIcon />
            Book on WhatsApp
          </WaCta>
        </div>
      </PhotoHero>

      {/* ——— Quick services: every kind of ride, each with its own booking card. */}
      <CabQuickServices />

      <MarqueeBand
        items={[
          "Flat ₹399 railway drop",
          "No surge",
          "No meter drama",
          "100% electric",
          "24×7",
          "Book on WhatsApp",
        ]}
      />

      {/* ——— The fare lock: the mockup's signature. */}
      <section className="bg-clay-deep py-14 text-bone lg:py-20">
        <Container width="wide">
          <div className="max-w-xl">
            <p className="text-label font-extrabold text-green uppercase">
              The fare lock
            </p>
            <h2 className="mt-4 text-[1.875rem] leading-[1.08] text-bone sm:text-[2.25rem]">
              Go on. Try to make it <span className="accent">go up.</span>
            </h2>
            <p className="mt-4 text-[0.90625rem] leading-relaxed text-bone/65">
              Zoo Road to the railway station. Tap what usually makes prices
              jump.
            </p>
          </div>
          <FareLock />
        </Container>
      </section>

      {/* ——— Four ways to ride, each one bookable. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          Four ways to ride
        </p>
        <h2 className="mt-4 text-[1.875rem] leading-[1.08] sm:text-[2.25rem]">
          Every one of them <span className="accent">a flat fare.</span>
        </h2>
        <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <li key={service.title} className="reveal">
              <WaCta
                message={service.message}
                location="cabs-service"
                subject={service.title}
                className="group block"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, calc(100vw - 2.5rem)"
                    className="zoom-slow object-cover"
                  />
                  {service.fare && (
                    <span className="absolute top-3 left-3 rounded-full bg-green-deep px-3 py-1.5 text-[0.6875rem] font-extrabold tracking-[0.1em] text-white uppercase">
                      {service.unit ? `From ${service.fare}${service.unit}` : `Flat ${service.fare}`}
                    </span>
                  )}
                </span>
                <span className="mt-3.5 flex items-center gap-2 text-[1.03125rem] font-extrabold text-ink">
                  {service.title}
                  <span
                    aria-hidden="true"
                    className="text-clay opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    →
                  </span>
                </span>
                <span className="mt-1 block text-[0.8125rem] leading-relaxed text-taupe">
                  {service.body}
                </span>
              </WaCta>
            </li>
          ))}
        </ul>
      </Container>

      {/* ——— The numbers we're willing to print. */}
      <div className="mt-16 bg-sand py-14 lg:mt-20">
        <Container width="wide">
          <p className="text-label font-extrabold text-clay uppercase">
            Since 2023
          </p>
          <h2 className="mt-4 text-[1.875rem] leading-[1.08] sm:text-[2.25rem]">
            The numbers we&rsquo;re{" "}
            <span className="accent">willing to print.</span>
          </h2>
          <dl className="reveal mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {NUMBERS.map((item, index) => (
              <div
                key={item.n}
                className={`rounded-2xl px-5 py-7 transition-transform duration-[260ms] hover:-translate-y-1 ${
                  ["bg-clay-soft", "bg-green-deep/10", "bg-sand", "bg-clay-soft"][index]
                }`}
              >
                <dd
                  className={`text-[2.375rem] leading-none font-extrabold tracking-[-0.035em] ${
                    index === 1 ? "text-green-deep" : "text-ink"
                  }`}
                >
                  {item.n}
                </dd>
                <dt className="mt-2.5 text-[0.78125rem] leading-snug font-extrabold text-taupe">
                  {item.l}
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* ——— Booking, start to finish. */}
      <Container width="narrow" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          Booking, start to finish
        </p>
        <h2 className="mt-4 text-[1.875rem] leading-[1.08] sm:text-[2.25rem]">
          Three steps.{" "}
          <span className="accent">No surprises in any of them.</span>
        </h2>
        <ol className="relative mt-9">
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-4 left-[0.875rem] border-l-2 border-dashed border-line-strong"
          />
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="reveal relative grid grid-cols-[1.75rem_1fr] gap-x-4 pb-8 last:pb-0 sm:gap-x-5"
            >
              <span
                className={`z-10 inline-flex size-7 items-center justify-center self-start rounded-full text-[0.75rem] font-extrabold text-bone tabular-nums ${
                  index === STEPS.length - 1 ? "bg-green-deep" : "bg-ink"
                }`}
              >
                {index + 1}
              </span>
              <div className="pt-0.5">
                <h3 className="text-[1.03125rem] leading-snug font-extrabold">
                  {step.title}
                </h3>
                <p className="mt-1 max-w-[26rem] text-[0.875rem] leading-relaxed text-taupe">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      {/* --- Why Smarto, the Google reviews, and this page's questions. */}
      <TrustAndFaqs faqs={CAB_FAQS} location="cabs-faq" className="pt-16 lg:pt-24" />

      {/* ——— Beyond the city. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <div className="bg-ink px-6 py-14 text-bone sm:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-label font-extrabold text-green uppercase">
                Beyond the city
              </p>
              <h2 className="mt-4 text-[1.875rem] leading-[1.08] text-bone sm:text-[2.25rem]">
                Going further than Guwahati?{" "}
                <span className="accent block">Shillong, in a quiet car.</span>
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-bone/70">
                Cars, hotels and flights together, all-in. Nothing added at
                the end.
              </p>
            </div>
            <Link
              href="/packages"
              className="inline-flex min-h-[3.25rem] shrink-0 items-center gap-2.5 self-start rounded-full border border-white/40 px-6 text-[0.875rem] font-extrabold text-bone transition-colors hover:bg-white/8 lg:self-center"
            >
              See outstation packages
              <ArrowIcon className="size-4" />
            </Link>
          </div>
        </div>
      </Container>

      {/* ——— The cabs dock, on phones. */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div
          className="flex items-center justify-between gap-3 bg-ink px-4 pt-3.5"
          style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))" }}
        >
          <p className="text-[0.6875rem] leading-snug text-bone/60">
            <span className="block text-[0.90625rem] font-extrabold text-bone">
              Flat ₹399
            </span>
            Railway station drop
          </p>
          <WaCta
            message={enquiry("I need a cab in Guwahati.")}
            location="cabs-dock"
            className="flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-green-deep px-5 text-[0.875rem] font-extrabold text-white"
          >
            <WhatsAppIcon />
            Book on WhatsApp
          </WaCta>
        </div>
        <div aria-hidden="true" className="spark-band" />
      </div>
      {/* Clears the fixed dock so the footer's last line is never hidden. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  );
}
