import Link from "next/link";

import { CabBookingCard } from "@/components/sections/cab-booking-card";
import { FareLock } from "@/components/sections/fare-lock";
import { Container } from "@/components/ui/container";
import {
  ArrowIcon,
  BoltIcon,
  CarIcon,
  ClockIcon,
  HeadsetIcon,
  SendIcon,
  SurgeOffIcon,
  TagIcon,
  TrainIcon,
} from "@/components/ui/line-icons";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { REVIEWS } from "@/data/reviews";
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
 * CO2 avoided) and placeholder reviews stay out or run as labelled
 * illustrative content until real figures arrive.
 */

const CHIPS = [
  { icon: BoltIcon, label: <><b className="font-extrabold">100%</b> electric</> },
  { icon: SurgeOffIcon, label: <><b className="font-extrabold">Zero</b> surge, ever</> },
  { icon: HeadsetIcon, label: <><b className="font-extrabold">24×7</b> support</> },
  { icon: TagIcon, label: <>First with flat pricing</> },
];

const SERVICES = [
  {
    icon: CarIcon,
    title: "City rides",
    fare: null,
    body: "Anywhere in Guwahati at a flat fare. The quoted price is final: in traffic, in rain, at 2 AM.",
    message: enquiry("I need a cab in Guwahati and would like the flat fare."),
  },
  {
    icon: TrainIcon,
    title: "Railway station drops",
    fare: "₹399",
    body: "Early train, late train, same price. We watch the arrival board so you don't have to.",
    message: enquiry("I need a railway station drop."),
  },
  {
    icon: SendIcon,
    title: "Airport rides",
    fare: null,
    body: "Fixed airport fares, 24×7. Booked at midnight for a 4 AM flight and priced the same as noon.",
    message: enquiry("I need an airport ride."),
  },
  {
    icon: ClockIcon,
    title: "Hourly rentals",
    fare: null,
    body: "Keep the car and the driver for the day. Flat hourly pricing, premium electric cars.",
    message: enquiry("I would like an hourly cab rental."),
  },
];

/* The mockup's two placeholder cells (rides completed, CO2 avoided) are
   left out until Manav supplies real figures. */
const NUMBERS = [
  { n: "100%", l: "Electric fleet. No tailpipe, no noise." },
  { n: "₹0", l: "Surge charged. Not once, not ever." },
  { n: "1st", l: "To bring flat pricing to Guwahati." },
  { n: "24×7", l: "Booking and support, on a real phone." },
];

const STEPS = [
  {
    title: "Tell us where you're going",
    body: "On WhatsApp or on the site. No app to download.",
  },
  {
    title: "See your flat fare",
    body: "Before you commit to anything.",
  },
  {
    title: "Ride. Pay exactly what you saw",
    body: "No meter, no rounding up, no conversation about it.",
  },
];

export default function CabsPage() {
  const reviews = REVIEWS.slice(0, 3);

  return (
    <>
      {/* ——— Hero: the promise, with the booking card riding beside it. */}
      <section className="relative overflow-hidden bg-clay-deep text-bone">
        <div
          aria-hidden="true"
          className="spark-glow absolute -top-40 -right-32 size-[24rem] rounded-full"
        />
        <Container width="wide" className="relative pt-16 pb-4 lg:pt-24 lg:pb-10">
          <div className="lg:grid lg:grid-cols-[1fr_25rem] lg:items-center lg:gap-16">
            <div>
              <p className="text-label font-extrabold text-green uppercase">
                Cabs · Guwahati
              </p>
              <h1 className="mt-6 max-w-2xl text-[2.5rem] leading-[1.02] tracking-[-0.02em] sm:text-[3.25rem]">
                The price you&rsquo;re quoted{" "}
                <span className="accent block">is the price you pay.</span>
              </h1>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-bone/70">
                Flat fares. No surge. No bargaining. All-electric cabs across
                Guwahati, 24×7.
              </p>
              {/* On desktop the chips sit under the headline; on phones they
                  ride their own scrolling rail below the card. */}
              <div className="mt-7 hidden flex-wrap gap-2 lg:flex">
                {CHIPS.map((chip, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-white/7 px-4 py-2.5 text-[0.78125rem] whitespace-nowrap"
                  >
                    <chip.icon className="size-[15px] shrink-0 text-green" />
                    <span>{chip.label}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-7 lg:mt-0">
              <CabBookingCard />
            </div>
          </div>
        </Container>
        <div className="no-scrollbar relative flex gap-2 overflow-x-auto px-5 pt-4 pb-7 sm:px-8 lg:hidden">
          {CHIPS.map((chip, index) => (
            <span
              key={index}
              className="flex shrink-0 items-center gap-2 rounded-full bg-white/7 px-4 py-2.5 text-[0.78125rem] whitespace-nowrap"
            >
              <chip.icon className="size-[15px] shrink-0 text-green" />
              <span>{chip.label}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ——— The fare lock: the mockup's signature. */}
      <section className="bg-clay-deep pb-14 text-bone lg:pb-20">
        <Container width="wide" className="border-t border-white/10 pt-14">
          <div className="max-w-xl">
            <p className="text-label font-extrabold text-green uppercase">
              The fare lock
            </p>
            <h2 className="mt-4 text-[1.875rem] leading-[1.08] text-bone sm:text-[2.25rem]">
              Go on. Try to make it <span className="accent">go up.</span>
            </h2>
            <p className="mt-4 text-[0.90625rem] leading-relaxed text-bone/65">
              Zoo Road to Guwahati railway station. Tap anything that would
              normally cost you more.
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
        <ul className="mt-6 lg:grid lg:grid-cols-2 lg:gap-x-14">
          {SERVICES.map((service) => (
            <li
              key={service.title}
              className="reveal border-b border-line py-5 last:border-b-0 lg:nth-3:border-b-0"
            >
              <WaCta
                message={service.message}
                location="cabs-service"
                subject={service.title}
                className="group flex items-start gap-3.5"
              >
                <service.icon className="mt-0.5 size-6 shrink-0 text-ink" />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2.5 text-[1.09375rem] font-extrabold text-ink">
                    {service.title}
                    {service.fare && (
                      <span className="rounded-[4px] bg-green-deep/10 px-2 py-1 text-[0.625rem] font-extrabold tracking-[0.2em] text-green-deep">
                        {service.fare}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block max-w-[26em] text-[0.875rem] leading-relaxed text-taupe">
                    {service.body}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-clay opacity-0 transition-opacity group-hover:opacity-100"
                >
                  →
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
          <dl className="reveal mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line lg:grid-cols-4">
            {NUMBERS.map((item) => (
              <div key={item.n} className="bg-paper px-4 py-6">
                <dd className="text-[2rem] leading-none font-extrabold tracking-[-0.035em] text-ink">
                  {item.n}
                </dd>
                <dt className="mt-2 text-[0.75rem] leading-relaxed text-taupe">
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

      {/* ——— What people say after the ride. */}
      <div className="mt-16 bg-sand py-14 lg:mt-20">
        <Container width="wide">
          <p className="text-label font-extrabold text-clay uppercase">
            From Guwahati
          </p>
          <h2 className="mt-4 text-[1.875rem] leading-[1.08] sm:text-[2.25rem]">
            What people say <span className="accent">after the ride.</span>
          </h2>
          <ul className="no-scrollbar -mx-5 mt-7 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="w-[17rem] shrink-0 snap-start lg:w-auto"
              >
                <figure className="flex h-full flex-col rounded-2xl bg-paper p-5">
                  <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-ink">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-2.5 border-t border-line pt-3.5 text-[0.8125rem]">
                    <span
                      aria-hidden="true"
                      className="grid size-[34px] place-items-center rounded-full bg-[linear-gradient(135deg,#b5c07a_0%,#3eb391_100%)] text-[0.875rem] font-extrabold text-white"
                    >
                      {review.author[0]}
                    </span>
                    <span>
                      <b className="block font-extrabold text-ink">
                        {review.author}
                      </b>
                      <span className="text-taupe">{review.context}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.6875rem] text-taupe/70">
            Illustrative feedback shown while we gather permission to publish
            real reviews.
          </p>
        </Container>
      </div>

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
                Complete outstation packages: cars, hotels and flights
                together, all-in. No hidden costs, and nothing added at the
                end.
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
