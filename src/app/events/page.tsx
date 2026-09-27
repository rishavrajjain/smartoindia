import Image from "next/image";
import Link from "next/link";

import { EventBrief } from "@/components/sections/event-brief";
import { EventPlan } from "@/components/sections/event-plan";
import { PhotoHero } from "@/components/sections/photo-hero";
import { TrustAndFaqs } from "@/components/sections/trust-and-faqs";
import { FactTiles } from "@/components/ui/fact-tiles";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
  ArrowIcon,
  BoltIcon,
  CarIcon,
  CheckIcon,
  ClockIcon,
  HeadsetIcon,
  HouseIcon,
  PeopleIcon,
  PhoneCheckIcon,
  PhoneIcon,
  ShieldIcon,
  TagIcon,
} from "@/components/ui/line-icons";
import { pageMetadata } from "@/lib/seo";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, enquiry, whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Events: weddings, conferences and corporate, moved end to end",
  description:
    "Guest rooms, arrivals, shuttle loops and departures for weddings, conferences and corporate events across Northeast India. One coordinator, one number, one invoice.",
  path: "/events",
});

/*
 * The events page, built from Manav's mobile mockup (smarto-events-mobile.html).
 * Call-first by his design: events are settled on the phone, so the hero and
 * the dock lead with the number, and the brief form opens WhatsApp. The copy
 * is his, lightly edited. The client/venue proof section from the mockup is
 * deliberately left out until real names and photos arrive with permission.
 */

const TEL_HREF = `tel:+${WHATSAPP_NUMBER}`;

const CHIPS = [
  { icon: ShieldIcon, label: <>End to end</> },
  { icon: PeopleIcon, label: <>On-site coordinator</> },
  { icon: HeadsetIcon, label: <><b className="font-extrabold">24×7</b> control desk</> },
  { icon: ClockIcon, label: <>No delays</> },
  { icon: BoltIcon, label: <><b className="font-extrabold">100%</b> electric</> },
];

const PLAN_INCLUSIONS = [
  "One named coordinator, on site for the whole event",
  "A control desk running from the day before to the day after",
  "A written run sheet you approve before anyone moves",
  "One consolidated GST invoice at the end",
];

const SCOPE = [
  {
    icon: HouseIcon,
    title: "Hospitality",
    items: [
      "Rooms blocked across your guest list",
      "Check-in without the queue",
      "Flights folded into the event",
      "A welcome desk at the venue",
      "Destination stays across the Northeast",
    ],
  },
  {
    icon: CarIcon,
    title: "Guest transport",
    items: [
      "Pickups against real arrival times",
      "Venue shuttles on a published loop",
      "Dedicated cars for family and VIPs",
      "Vendor and crew movement, planned",
      "Departure waves against flight times",
    ],
  },
];

const RUN_SHEET = [
  {
    time: "05:30",
    title: "Fleet check",
    body: "Charged, cleaned, assigned. Before sunrise.",
  },
  {
    time: "06:15",
    title: "First airport wave",
    body: "Cars in place before the flight lands.",
  },
  {
    time: "09:00",
    title: "Railway arrivals",
    body: "A late train moves the car, not the guest.",
  },
  {
    time: "11:00",
    title: "Hotel to venue, loop one",
    body: "Every twenty minutes, times in every room.",
  },
  {
    time: "16:00",
    title: "Family and VIP cars",
    body: "Held on site. They leave when you're ready.",
  },
  {
    time: "23:30",
    title: "Last loop home",
    body: "Nobody stranded. The desk waits for the last guest.",
  },
];

const EVENT_KINDS = [
  {
    image: {
      src: "/images/fleet-events-wedding.webp",
      alt: "Smarto electric cabs lined up beneath a marigold-decorated wedding gate at dusk",
    },
    title: "Weddings",
    body: "Multi-day, multi-venue, everyone at once.",
  },
  {
    image: {
      src: "/images/fleet-corporate-porch.webp",
      alt: "Smarto electric cabs waiting at the glass porch of a modern office",
    },
    title: "Corporate events",
    body: "Offsites and launches, one invoice.",
  },
  {
    image: {
      src: "/images/fleet-events-conference.webp",
      alt: "A line of Smarto electric cabs on the lit drive of a convention centre at dusk",
    },
    title: "Conferences",
    body: "Hundreds in by morning, out by evening.",
  },
  {
    image: {
      src: "/images/svc-events-festival.webp",
      alt: "Fairy lights over bamboo pavilions at a festival ground at blue hour",
    },
    title: "Collaborative events",
    body: "Festivals and exhibitions, with partners.",
  },
];

const WHY = [
  { icon: PeopleIcon, label: "One coordinator, one number" },
  { icon: HeadsetIcon, label: "A control desk, 24×7" },
  { icon: ClockIcon, label: "Cars assigned, never auctioned" },
  { icon: PhoneCheckIcon, label: "Guests track their own rides" },
  { icon: TagIcon, label: "Price agreed up front, in writing" },
  { icon: BoltIcon, label: "An all-electric fleet" },
];

const FAQ = [
  {
    q: "How far ahead should we book?",
    a: "For a wedding, six to eight weeks gives us room to plan properly. We have turned events around in a week, but the run sheet is better when it is not rushed.",
  },
  {
    q: "Can you handle guests arriving on different days?",
    a: "That is the normal case, not the exception. Send us the guest list with arrival details and we build the waves around it.",
  },
  {
    q: "Do you arrange the hotel rooms too?",
    a: "Yes. We book your guests' rooms alongside their transport, which is how we hold the price and the timing together.",
  },
  {
    q: "Do you cover events outside Guwahati?",
    a: "Yes. Shillong, Kaziranga, Tezpur and across the Northeast. We operate our own fleet, so a destination event does not mean handing you to a local subcontractor.",
  },
  {
    q: "What happens when the timeline slips on the day?",
    a: "It always does. That is why there is a coordinator on site with the fleet in view: cars are re-timed against what is actually happening, and you are told before you have to ask.",
  },
  {
    q: "How is it priced?",
    a: "A written quote against your run sheet, agreed before anything moves. One consolidated GST invoice at the end. No surge on your date, whatever the date is.",
  },
];

export default function EventsPage() {
  return (
    <>
      {/* ——— Hero: the convoy at the gate, and the promise beside it. */}
      <PhotoHero
        eyebrow="Events · Weddings · Conferences"
        title={
          <>
            Nobody at your event{" "}
            <span className="accent block">should be waiting for a car.</span>
          </>
        }
        sub="Rooms, arrivals, shuttles, departures. One coordinator, one number, one invoice."
        image={{
          src: "/images/fleet-events-wedding.webp",
          alt: "Smarto electric cabs lined up beneath a marigold-decorated wedding gate at dusk",
        }}
        float={{
          icon: PeopleIcon,
          title: "One coordinator",
          line: "One number, one invoice",
        }}
        chips={CHIPS}
      >
        <div className="flex max-w-md flex-col gap-2.5 sm:max-w-none sm:flex-row">
          <a
            href={TEL_HREF}
            className="flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[10px] bg-green-deep px-6 text-[0.9375rem] font-extrabold text-white transition-transform duration-[180ms] active:scale-[0.985]"
          >
            <PhoneIcon className="size-4" />
            Call {WHATSAPP_DISPLAY}
          </a>
          <a
            href="#brief"
            className="flex min-h-[3.25rem] items-center justify-center rounded-[10px] border border-line-strong px-6 text-[0.9375rem] font-extrabold text-ink transition-colors hover:bg-sand"
          >
            Send your event brief
          </a>
        </div>
      </PhotoHero>

      <MarqueeBand
        items={[
          "Weddings",
          "Conferences",
          "Offsites",
          "500 guests, one number",
          "24×7 control desk",
          "One GST invoice",
        ]}
      />

      {/* ——— The movement plan: the mockup's signature. */}
      <section className="bg-clay-deep pb-14 text-bone lg:pb-20">
        <Container width="wide" className="pt-14">
          <p className="text-label font-extrabold text-green uppercase">
            The shape of your event
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] text-bone">
            Tell us the size.{" "}
            <span className="accent block">We&rsquo;ll show you the shape.</span>
          </h2>
          <p className="mt-4 max-w-md text-[0.90625rem] leading-relaxed text-bone/65">
            Most people underestimate guest movement by half. See yours.
          </p>

          <EventPlan />

          <ul className="mt-5 grid gap-px overflow-hidden rounded-xl bg-white/10 lg:grid-cols-2">
            {PLAN_INCLUSIONS.map((line) => (
              <li
                key={line}
                className="flex items-center gap-3 bg-clay-deep px-4 py-3.5 text-[0.8125rem] text-bone/80"
              >
                <CheckIcon className="size-[15px] shrink-0 text-green" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-[0.65625rem] leading-relaxed text-bone/35">
            An estimate to start the conversation, not a quote. It assumes
            roughly three guests per car and that most guests need transport at
            both ends. Your real plan is built against your actual arrival
            times, venues and hotels.
          </p>
        </Container>
      </section>

      {/* ——— Scope: hospitality and transport. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          What we handle
        </p>
        <h2 className="mt-4 max-w-xl text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          From the first arrival{" "}
          <span className="accent">to the last departure.</span>
        </h2>
        <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-taupe">
          Hand us everything, or just the moving parts.
        </p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {SCOPE.map((card) => (
            <div key={card.title} className="reveal rounded-2xl bg-sand p-6 sm:p-7">
              <h3 className="flex items-center gap-2.5 text-[1.125rem] font-extrabold">
                <card.icon className="size-5 text-green-deep" />
                {card.title}
              </h3>
              <ul className="mt-4">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="relative py-2 pl-5 text-[0.875rem] leading-relaxed text-taupe before:absolute before:top-[15px] before:left-0 before:size-[7px] before:rounded-full before:bg-green-deep"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* ——— The run sheet: a Saturday, as we would run it. */}
      <div className="mt-16 bg-sand py-14 lg:mt-20">
        <Container width="narrow">
          <p className="text-label font-extrabold text-clay uppercase">
            A Saturday, as we&rsquo;d run it
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
            The part <span className="accent">nobody sees.</span>
          </h2>
          {/* The day drawn the way Smarto draws every journey: a route.
              Time chips are the stops, threaded on a dashed route line that
              runs behind them and closes on green when the day is done. */}
          <ol className="relative mt-9">
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-1 left-[1.875rem] border-l-2 border-dashed border-line-strong"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[1.875rem] size-[9px] -translate-x-[calc(50%-1px)] rounded-full bg-green-deep"
            />
            {RUN_SHEET.map((slot) => (
              <li
                key={slot.time}
                className="reveal relative grid grid-cols-[3.75rem_1fr] gap-x-4 pb-8 last:pb-5 sm:gap-x-6"
              >
                <span className="z-10 inline-flex h-7 items-center justify-center self-start rounded-md bg-ink text-[0.75rem] font-extrabold tracking-[0.02em] text-bone tabular-nums">
                  {slot.time}
                </span>
                <div className="pt-0.5">
                  <h3 className="text-[0.9375rem] leading-snug font-extrabold">
                    {slot.title}
                  </h3>
                  <p className="mt-1 max-w-[26rem] text-[0.8125rem] leading-relaxed text-taupe">
                    {slot.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </div>

      {/* ——— Event types. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          What we run
        </p>
        <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          Different events, <span className="accent">the same discipline.</span>
        </h2>
        <ul className="reveal mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {EVENT_KINDS.map((kind) => (
            <li key={kind.title} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
                <Image
                  src={kind.image.src}
                  alt={kind.image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="zoom-slow object-cover"
                />
              </div>
              <h3 className="mt-3.5 text-[0.96875rem] font-extrabold">
                {kind.title}
              </h3>
              <p className="mt-1 text-[0.78125rem] leading-relaxed text-taupe">
                {kind.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      {/* ——— Why hand it over: the ownership argument. */}
      <div className="mt-16 bg-sand py-14 lg:mt-20">
        <Container width="wide">
          <p className="text-label font-extrabold text-clay uppercase">
            Why people hand us the whole thing
          </p>
          <h2 className="mt-4 max-w-xl text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
            We own the cars.{" "}
            <span className="accent">That changes everything.</span>
          </h2>
          <FactTiles items={WHY} />
        </Container>
      </div>

      {/* ——— Enquiry: the phone first, the brief second. */}
      <div id="brief" className="mt-16 scroll-mt-20 bg-ink py-14 text-bone lg:mt-20">
        <Container width="narrow" className="text-center">
          <p className="text-label font-extrabold text-green uppercase">
            Enquiries
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] text-bone sm:text-[2.25rem]">
            Tell us the date.{" "}
            <span className="accent block">
              We&rsquo;ll tell you if we can do it justice.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.90625rem] leading-relaxed text-bone/70">
            Events move fast and a phone call settles more in five minutes than
            a form does in a week.
          </p>
          <a
            href={TEL_HREF}
            className="mt-7 block text-[2.0625rem] font-extrabold tracking-[-0.03em] text-green tabular-nums"
          >
            {WHATSAPP_DISPLAY}
          </a>
          <p className="mt-2 text-[0.75rem] text-bone/55">
            24×7, and a person answers.
          </p>
          <p className="mt-7 text-label font-extrabold text-bone/35 uppercase">
            Or send the brief
          </p>
          <EventBrief />
          <a
            href={whatsappUrl(
              enquiry("I am planning an event and would like to talk it through."),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[0.875rem] font-extrabold text-bone/80 transition-colors hover:text-bone"
          >
            <WhatsAppIcon />
            Or just say hello on WhatsApp
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </a>
        </Container>
      </div>

      {/* --- Why Smarto, the Google reviews, and this page's questions. */}
      <TrustAndFaqs faqs={FAQ} location="events-faq" className="pt-16 lg:pt-24" />

      {/* ——— The corporate cross-link, straight from the mockup. */}
      <div className="bg-sand px-5 py-9 text-center">
        <p className="text-[0.875rem] leading-relaxed text-taupe">
          Booking day-to-day staff travel rather than an event?
        </p>
        <Link
          href="/corporate"
          className="link-rule mt-3 inline-flex items-center gap-2 text-[0.875rem] font-extrabold text-ink"
        >
          See corporate accounts
          <ArrowIcon className="size-[15px]" />
        </Link>
      </div>

      {/* ——— The events dock: call-first, on phones, above the footer. */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div
          className="flex items-center justify-between gap-3 bg-ink px-4 pt-3.5"
          style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))" }}
        >
          <p className="text-[0.6875rem] leading-snug text-bone/60">
            <span className="block text-[0.90625rem] font-extrabold text-bone">
              Events desk
            </span>
            24×7, a person answers
          </p>
          <a
            href={TEL_HREF}
            className="flex shrink-0 items-center gap-2 rounded-full bg-green-deep px-5 py-3.5 text-[0.875rem] font-extrabold text-white"
          >
            <PhoneIcon className="size-4" />
            Call us
          </a>
        </div>
        <div aria-hidden="true" className="spark-band" />
      </div>
      {/* Clears the fixed dock so the footer's last line is never hidden. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  );
}

