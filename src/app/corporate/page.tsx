import Image from "next/image";
import Link from "next/link";

import { EsgLine } from "@/components/sections/esg-line";
import { PhotoHero } from "@/components/sections/photo-hero";
import { FactTiles } from "@/components/ui/fact-tiles";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { RateCardForm } from "@/components/sections/rate-card-form";
import { Container } from "@/components/ui/container";
import {
  ArrowIcon,
  BoltIcon,
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  CrossIcon,
  HeadsetIcon,
  HouseIcon,
  InvoiceIcon,
  PeopleIcon,
  PhoneCheckIcon,
  TagIcon,
} from "@/components/ui/line-icons";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { CLIENT_LOGOS } from "@/data/clients";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "For business: employee transport, off your desk",
  description:
    "A fixed rate card, one named contact, one monthly GST invoice, and an all-electric fleet for employee transport in Guwahati and across the Northeast. Start with a free trial week.",
  path: "/corporate",
});

/*
 * The business page, built from Manav's mobile mockup
 * (smarto-corporate-mobile.html), as the sibling of /events: same dark hero
 * grammar, same chip rail, and its own signature, the ESG line. His copy,
 * lightly edited. Unlike /events, the client-proof section ships with real
 * logos: the five Manav already publishes on smartocabs.com.
 */

const CHIPS = [
  { icon: PeopleIcon, label: <>Dedicated team</> },
  { icon: HeadsetIcon, label: <><b className="font-extrabold">24×7</b> support</> },
  { icon: ClockIcon, label: <>No delays</> },
  { icon: BoltIcon, label: <><b className="font-extrabold">100%</b> electric</> },
];

const INCLUDES = [
  { icon: PeopleIcon, label: "A named contact, direct number" },
  { icon: HeadsetIcon, label: "24×7, a person answers" },
  { icon: ClockIcon, label: "Cars assigned, never auctioned" },
  { icon: PhoneCheckIcon, label: "Self-serve booking and tracking" },
  { icon: TagIcon, label: "Fixed rate card, in writing" },
  { icon: InvoiceIcon, label: "One monthly GST invoice" },
  { icon: BoltIcon, label: "A 100% electric fleet" },
];

const STEPS = [
  {
    title: "A 15-minute call",
    body: "Routes, volumes, timings. Honest fit-check included.",
  },
  {
    title: "Your rate card",
    body: "Your routes, priced in writing, two days.",
  },
  {
    title: "A free trial week",
    body: "Real rides, our cars. No card, no invoice.",
  },
  {
    title: "Account live",
    body: "Team onboarded, contact assigned, invoicing begins.",
  },
];

const WHO = [
  {
    icon: BuildingIcon,
    title: "Offices, IT and BPO",
    body: "Shifts, client pickups, airport runs.",
  },
  {
    icon: HouseIcon,
    title: "Hotels and resorts",
    body: "Guest transfers and day hires.",
  },
  {
    icon: CrossIcon,
    title: "Hospitals and clinics",
    body: "Predictable, off-peak, gentle.",
  },
  {
    icon: CalendarIcon,
    title: "Event and wedding planners",
    body: "Volume, on a date that can't move.",
  },
];

const FAQ = [
  {
    q: "Is there a minimum monthly commitment?",
    a: "No. Start with the volume you actually have. The rate card is set by route, not by a threshold you have to hit.",
  },
  {
    q: "What happens if a car is late?",
    a: "Your account contact is told before you are, and a replacement is dispatched. We own the fleet, so there is no third-party operator to chase.",
  },
  {
    q: "Can employees book their own rides?",
    a: "Yes. Each employee books and tracks their own ride within the limits you set. Admin sees every trip, route and fare in one place.",
  },
  {
    q: "How does billing work?",
    a: "One consolidated GST invoice each month, with a full ride-level breakdown attached. Payment terms are agreed at account setup.",
  },
  {
    q: "Do you cover outstation travel?",
    a: "Yes: Shillong, Kaziranga, Tezpur and across the Northeast, on the same account and the same invoice.",
  },
];

export default function CorporatePage() {
  return (
    <>
      {/* ——— Hero: the porch at nine sharp, and the promise beside it. */}
      <PhotoHero
        eyebrow="For business · Employee transport"
        title={
          <>
            Employee transport,{" "}
            <span className="accent block">off your desk.</span>
          </>
        }
        sub="A fixed rate card, one named contact, one monthly invoice. Run by the people who own the cars."
        image={{
          src: "/images/biz-corporate.webp",
          alt: "Smarto electric cabs arriving at the glass porch of a modern office on a bright morning",
        }}
        float={{
          icon: TagIcon,
          title: "Fixed rate card",
          line: "Agreed quarterly, in writing",
        }}
        chips={CHIPS}
      >
        <div className="flex max-w-md flex-col gap-2.5 sm:max-w-none sm:flex-row">
          <a
            href="#rate-card"
            className="flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[10px] bg-green-deep px-6 text-[0.9375rem] font-extrabold text-white transition-transform duration-[180ms] active:scale-[0.985]"
          >
            Request a rate card
            <ArrowIcon className="size-4" />
          </a>
          <WaCta
            message={enquiry(
              "I would like to start a free trial week of employee transport for my company.",
            )}
            location="corporate-trial"
            className="flex min-h-[3.25rem] items-center justify-center rounded-[10px] border border-line-strong px-6 text-[0.9375rem] font-extrabold text-ink transition-colors hover:bg-sand"
          >
            Start a free trial week
          </WaCta>
        </div>
      </PhotoHero>

      <MarqueeBand
        items={[
          "Fixed rate card",
          "Free trial week",
          "One GST invoice",
          "Zero surge",
          "CO₂ you can report",
          "24×7 on a real phone",
        ]}
      />

      {/* ——— The ESG line: the mockup's signature. */}
      <section className="bg-clay-deep pb-14 text-bone lg:pb-20">
        <Container width="wide" className="pt-14">
          <p className="text-label font-extrabold text-green uppercase">
            The line for your sustainability report
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] text-bone">
            Every ride your team takes{" "}
            <span className="accent block">is a number you can report.</span>
          </h2>
          <p className="mt-4 max-w-md text-[0.90625rem] leading-relaxed text-bone/65">
            A petrol fleet gives you a cost line. Ours gives you a carbon
            line too. Slide to your volume.
          </p>
          <EsgLine />
        </Container>
      </section>

      {/* ——— What an account includes. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          What an account includes
        </p>
        <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          Set it up once.{" "}
          <span className="accent">Then stop thinking about it.</span>
        </h2>
        <FactTiles items={INCLUDES} />
      </Container>

      {/* ——— From first call to first ride: the route to a live account. */}
      <div className="mt-16 bg-sand py-14 lg:mt-20">
        <Container width="narrow">
          <p className="text-label font-extrabold text-clay uppercase">
            From first call to first ride
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
            Four steps, <span className="accent">about a week.</span>
          </h2>
          {/* Drawn like every Smarto journey: numbered stops on a dashed
              route line, arriving at green when the account is live. */}
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
      </div>

      {/* ——— The fleet, ready before the shift. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <div className="reveal relative overflow-hidden rounded-[2rem]">
          <Image
            src="/images/svc-corporate-fleet.webp"
            alt="A row of Smarto electric cabs charging at an office campus at dusk"
            width={1536}
            height={1024}
            loading="lazy"
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="aspect-[21/9] w-full object-cover"
          />
          <span aria-hidden="true" className="photo-scrim absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
            <p className="max-w-md text-[1.25rem] leading-snug font-extrabold text-bone sm:text-[1.5rem]">
              Charged overnight, at the gate before your first shift.
            </p>
            <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-bone/75 uppercase">
              100% electric · zero tailpipe
            </p>
          </div>
        </div>
      </Container>

      {/* ——— Who it's for. */}
      <Container width="narrow" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          Who we run for
        </p>
        <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          Built for <span className="accent">scheduled, repeating travel.</span>
        </h2>
        <ul className="reveal mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line lg:grid-cols-4">
          {WHO.map((kind) => (
            <li key={kind.title} className="bg-paper p-5">
              <kind.icon className="size-[22px] text-ink" />
              <h3 className="mt-3 text-[0.90625rem] font-extrabold">
                {kind.title}
              </h3>
              <p className="mt-1.5 text-[0.75rem] leading-relaxed text-taupe">
                {kind.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      {/* ——— Proof: the clients Manav already publishes on smartocabs.com. */}
      <div className="mt-16 bg-sand py-14 lg:mt-20">
        <Container width="narrow">
          <p className="text-label font-extrabold text-clay uppercase">
            Already riding with us
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
            The companies{" "}
            <span className="accent">that stopped worrying about it.</span>
          </h2>
          <ul className="reveal mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {CLIENT_LOGOS.map((logo) => (
              <li
                key={logo.name}
                className="flex h-[4.625rem] items-center justify-center rounded-[10px] bg-paper px-5"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={logo.h}
                  loading="lazy"
                  className="h-8 w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* ——— The procurement questions. */}
      <Container width="narrow" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          Before you ask
        </p>
        <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          The questions{" "}
          <span className="accent">procurement always sends.</span>
        </h2>
        <div className="mt-6">
          {FAQ.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-4 text-[0.9375rem] font-extrabold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="text-[1.25rem] leading-none font-extrabold text-green-deep group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-[1.25rem] leading-none font-extrabold text-green-deep group-open:inline"
                >
                  &ndash;
                </span>
              </summary>
              <p className="pb-5 text-[0.875rem] leading-relaxed text-taupe">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>

      {/* ——— Start here: the rate card. */}
      <div
        id="rate-card"
        className="mt-16 scroll-mt-20 bg-ink py-14 text-bone lg:mt-20"
      >
        <Container width="narrow" className="text-center">
          <p className="text-label font-extrabold text-green uppercase">
            Start here
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] text-bone sm:text-[2.25rem]">
            Tell us your routes.{" "}
            <span className="accent block">We&rsquo;ll send a rate card.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.90625rem] leading-relaxed text-bone/70">
            Two working days, no obligation, and a real person on the other
            end.
          </p>
          <RateCardForm />
        </Container>
      </div>

      {/* ——— The other doors: events (one-off) and partners (booking for guests). */}
      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-sand px-5 py-9 text-center">
          <p className="text-[0.875rem] leading-relaxed text-taupe">
            Planning a wedding, conference or
            <br />
            one-off event rather than daily travel?
          </p>
          <Link
            href="/events"
            className="link-rule mt-3 inline-flex items-center gap-2 text-[0.875rem] font-extrabold text-ink"
          >
            See Smarto for events
            <ArrowIcon className="size-[15px]" />
          </Link>
        </div>
        <div className="bg-sand px-5 py-9 text-center">
          <p className="text-[0.875rem] leading-relaxed text-taupe">
            Travel agent, tour operator or hotel
            <br />
            booking on behalf of your own guests?
          </p>
          <Link
            href="/partners"
            className="link-rule mt-3 inline-flex items-center gap-2 text-[0.875rem] font-extrabold text-ink"
          >
            See the partner programme
            <ArrowIcon className="size-[15px]" />
          </Link>
        </div>
      </div>

      {/* ——— The business dock: the trial offer, on phones. */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div
          className="flex items-center justify-between gap-3 bg-ink px-4 pt-3.5"
          style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))" }}
        >
          <p className="text-[0.6875rem] leading-snug text-bone/60">
            <span className="block text-[0.90625rem] font-extrabold text-bone">
              Free trial week
            </span>
            No commitment, no card
          </p>
          <WaCta
            message={enquiry(
              "I would like to start a free trial week of employee transport for my company.",
            )}
            location="corporate-dock"
            className="flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-green-deep px-5 text-[0.875rem] font-extrabold text-white"
          >
            <WhatsAppIcon />
            Talk to us
          </WaCta>
        </div>
        <div aria-hidden="true" className="spark-band" />
      </div>
      {/* Clears the fixed dock so the footer's last line is never hidden. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  );
}
