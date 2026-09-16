import Image from "next/image";
import Link from "next/link";

import { EventBrief } from "@/components/sections/event-brief";
import { EventPlan } from "@/components/sections/event-plan";
import { PhotoHero } from "@/components/sections/photo-hero";
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
      "Hotel rooms blocked and allocated across your guest list",
      "Check-in coordinated so nobody queues at a desk with luggage",
      "Flights arranged for guests travelling in, as part of the event",
      "Welcome and hospitality desk at the hotel or venue",
      "Outstation stays for destination events across the Northeast",
    ],
  },
  {
    icon: CarIcon,
    title: "Guest transport",
    items: [
      "Airport and railway pickups against real arrival times, not guesses",
      "Hotel-to-venue shuttle loops running to a published schedule",
      "Dedicated cars for family, VIPs and the couple or the keynote",
      "Vendor and crew movement, which everyone forgets to plan",
      "Departure waves managed against flight and train times",
    ],
  },
];

const RUN_SHEET = [
  {
    time: "05:30",
    title: "Fleet check",
    body: "Every car charged, cleaned and assigned before the first driver leaves.",
  },
  {
    time: "06:15",
    title: "First airport wave",
    body: "Cars positioned before the flight lands. Guests walk out to a name board, not a phone call.",
  },
  {
    time: "09:00",
    title: "Railway arrivals",
    body: "Held against the live arrival board. A late train moves the car, not the guest.",
  },
  {
    time: "11:00",
    title: "Hotel to venue, loop one",
    body: "Published shuttle times in every room, running every twenty minutes.",
  },
  {
    time: "16:00",
    title: "Family and VIP cars",
    body: "Held on site, not dispatched. They leave when your people are ready.",
  },
  {
    time: "23:30",
    title: "Last loop home",
    body: "Nobody stranded at the venue. The desk stays open until the last guest is back.",
  },
];

const EVENT_KINDS = [
  {
    image: {
      src: "/images/biz-events.webp",
      alt: "White sedans queuing through a marigold-decorated wedding gate at dusk",
    },
    title: "Weddings",
    body: "Multi-day, multi-venue, with families arriving from everywhere at once.",
  },
  {
    image: {
      src: "/images/biz-corporate.webp",
      alt: "Electric sedans waiting at the glass porch of a modern office",
    },
    title: "Corporate events",
    body: "Offsites, launches, client visits and annual days, on one invoice.",
  },
  {
    image: {
      src: "/images/svc-events-conference.webp",
      alt: "A line of white sedans on the lit drive of a convention centre at dusk",
    },
    title: "Conferences",
    body: "Hundreds of delegates arriving in one morning and leaving in one evening.",
  },
  {
    image: {
      src: "/images/svc-events-festival.webp",
      alt: "Fairy lights over bamboo pavilions at a festival ground at blue hour",
    },
    title: "Collaborative events",
    body: "Festivals, exhibitions and anything run with partners and sponsors.",
  },
];

const WHY = [
  {
    icon: PeopleIcon,
    title: "One coordinator, one number",
    body: "The same person from the first call to the last departure. You never explain your event twice.",
  },
  {
    icon: HeadsetIcon,
    title: "A control desk, 24×7",
    body: "From the day before to the day after. A 2 AM arrival reaches a person, not a voicemail.",
  },
  {
    icon: ClockIcon,
    title: "No delays, no hassle",
    body: "Cars are assigned to your event, not accepted by whoever is nearby. Nothing is subcontracted out of our sight.",
  },
  {
    icon: PhoneCheckIcon,
    title: "Your guests book and track their own rides",
    body: "Give them a link instead of a WhatsApp group. They see the car coming; you stop being the dispatcher.",
  },
  {
    icon: TagIcon,
    title: "A price agreed up front, in writing",
    body: "No surge on the wedding date, no extras discovered on the last day. What we quote is what you are invoiced.",
  },
  {
    icon: BoltIcon,
    title: "An all-electric fleet",
    body: "Quiet cars, no fumes at the porch, and a sustainability line your company or your venue can use.",
  },
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
    a: "Yes, as part of the event. We do not sell rooms on their own; they are arranged inside a complete event, which is how we can hold the price and the timing together.",
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
        sub="Weddings, corporate events and conferences, handled end to end: rooms, arrivals, shuttles, departures. One coordinator, one number, one invoice."
        image={{
          src: "/images/biz-events.webp",
          alt: "A line of white sedans arriving through a marigold-decorated wedding gate at dusk",
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
            Most people underestimate guest movement by half. Here is what an
            event your size actually involves.
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
          You can hand us the whole guest experience, or only the moving parts.
          Most people start with transport and give us the rest by the second
          event.
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
          <ul className="mt-6 lg:grid lg:grid-cols-2 lg:gap-x-14">
            {WHY.map((item) => (
              <li
                key={item.title}
                className="reveal flex items-start gap-3.5 border-b border-line py-5 last:border-b-0"
              >
                <item.icon className="mt-0.5 size-6 shrink-0 text-ink" />
                <div>
                  <h3 className="text-[1.03125rem] font-extrabold">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-taupe">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* ——— The practical questions. */}
      <Container width="narrow" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          What planners ask first
        </p>
        <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          The practical <span className="accent">questions.</span>
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

