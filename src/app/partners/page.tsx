import Link from "next/link";

import { PartnerRegisterForm } from "@/components/sections/partner-register-form";
import { PartnerSplit } from "@/components/sections/partner-split";
import { Container } from "@/components/ui/container";
import {
  ArrowIcon,
  BoltIcon,
  CalendarIcon,
  ClockIcon,
  HeadsetIcon,
  HouseIcon,
  PeopleIcon,
  PhoneCheckIcon,
  PinIcon,
  SendIcon,
  ShieldIcon,
  SuitcaseIcon,
  TagIcon,
} from "@/components/ui/line-icons";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Partner programme: book for your guests, earn on every ride",
  description:
    "For travel agents, hotels and tour operators across the Northeast. Your guest pays the same flat fare; your commission comes out of Smarto's margin, up to 10% back on every ride you book.",
  path: "/partners",
});

/*
 * The partner page, built from Manav's mobile mockup
 * (smarto-partner-mobile.html), the third of the business set. His copy,
 * lightly edited. Two adaptations: there is no partner portal on this site
 * yet, so the mockup's "Log in" actions are omitted and registration runs
 * through the partner desk on WhatsApp; and the partner-logo placeholders
 * stay out until real names arrive with permission.
 */

const DESK_MESSAGE = enquiry(
  "I have a question about the partner programme for agents and hotels.",
);

const CHIPS = [
  { icon: ShieldIcon, label: <>Up to <b className="font-extrabold">10%</b> back</> },
  { icon: PeopleIcon, label: <>Dedicated desk</> },
  { icon: HeadsetIcon, label: <><b className="font-extrabold">24×7</b> support</> },
  { icon: ClockIcon, label: <>No delays</> },
  { icon: BoltIcon, label: <><b className="font-extrabold">100%</b> electric</> },
];

const GETS = [
  {
    icon: PhoneCheckIcon,
    title: "Book it yourself, see the rate as you go",
    body: "Enter the trip and the fare appears before you confirm. No waiting on a quote, no calling to check.",
  },
  {
    icon: PinIcon,
    title: "Track every ride you've booked",
    body: "Watch the car reach your guest without phoning anyone. You'll know before they do if something moves.",
  },
  {
    icon: PeopleIcon,
    title: "A dedicated partner desk",
    body: "One team who knows your account, on a direct number, 24×7. Not the same queue as the public.",
  },
  {
    icon: ClockIcon,
    title: "No delays, no hassle",
    body: "We own the cars. A booking is assigned to a driver, not offered to whoever feels like accepting it.",
  },
  {
    icon: TagIcon,
    title: "A fare your guest can't be surprised by",
    body: "No surge, no bargaining at the door, no meter conversation. The complaint you never get is the one worth most to you.",
  },
  {
    icon: BoltIcon,
    title: "An all-electric fleet",
    body: "Quiet, clean cars. If you market yourself as a green property or operator, this is a line you can use.",
  },
  {
    icon: ShieldIcon,
    title: "The whole Northeast, one operator",
    body: "Guwahati city, railway, airport, Shillong, Kaziranga, Tezpur. One account, one contact, one invoice.",
  },
];

const STEPS = [
  {
    title: "Register your agency",
    body: "Name, GST and a phone number. We verify and open your account, usually the same day.",
  },
  {
    title: "Book through the desk",
    body: "Send the trip and the fare comes back before you confirm, along with what you'll earn on it.",
  },
  {
    title: "Your guest rides",
    body: "They pay the flat fare. You're told where the car is without asking. Nobody haggles with anybody.",
  },
  {
    title: "Commission credited",
    body: "Settled monthly against your booking statement, with every ride itemised.",
  },
];

const WHO = [
  {
    icon: SuitcaseIcon,
    title: "Travel agents",
    body: "Transfers and day trips for your own clients.",
  },
  {
    icon: HouseIcon,
    title: "Hotels and resorts",
    body: "Guest pickups and sightseeing, booked at the desk.",
  },
  {
    icon: SendIcon,
    title: "Tour operators",
    body: "Multi-day Northeast itineraries with one fleet behind them.",
  },
  {
    icon: CalendarIcon,
    title: "Event planners",
    body: "Guest transport at volume, on a date that can't move.",
  },
];

const FAQ = [
  {
    q: "When is commission paid?",
    a: "Monthly, against a statement listing every ride you booked, the fare and the commission on each. Nothing to reconcile by hand.",
  },
  {
    q: "Do I have to prepay or hold a deposit?",
    a: "No deposit to open an account. Settlement terms are set out in your partner agreement when you register.",
  },
  {
    q: "Can I charge my client more than your fare?",
    a: "What you invoice your own client is between you and them. What we charge is fixed, and no driver will ever ask your guest for more than the quoted fare.",
  },
  {
    q: "What happens if my guest cancels?",
    a: "Tell the desk. Cancellation is free up to the cutoff stated on your booking; after that a partial charge applies, and it's stated before you confirm.",
  },
  {
    q: "Who does my guest call if something goes wrong?",
    a: "Either of you can call the partner desk, 24×7. If we move a car or a time, you hear it before your guest does.",
  },
  {
    q: "Does this cover outstation trips?",
    a: "Yes: Shillong, Kaziranga, Tezpur and across the Northeast, on the same account and the same commission structure.",
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* ——— Hero: dark, register-first, with the spark glow in the corner. */}
      <section className="relative overflow-hidden bg-clay-deep text-bone">
        <div
          aria-hidden="true"
          className="spark-glow absolute -top-40 -right-32 size-[24rem] rounded-full"
        />
        <Container width="wide" className="relative pt-16 pb-10 lg:pt-24">
          <p className="text-label font-extrabold text-green uppercase">
            Partner programme · Agents &amp; hotels
          </p>
          <h1 className="mt-6 max-w-2xl text-[2.375rem] leading-[1.03] tracking-[-0.02em] sm:text-[3.25rem]">
            Book for your guests.{" "}
            <span className="accent block">Earn on every ride.</span>
          </h1>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-bone/70">
            Your guest pays the same flat fare anyone else pays. Your
            commission comes out of our margin, not their pocket. Up to 10%
            back on every ride you book.
          </p>
          <div className="mt-7 flex max-w-md flex-col gap-2.5 sm:max-w-none sm:flex-row">
            <a
              href="#register"
              className="flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[10px] bg-green-deep px-6 text-[0.9375rem] font-extrabold text-white transition-transform duration-[180ms] active:scale-[0.985]"
            >
              Create a partner account
              <ArrowIcon className="size-4" />
            </a>
            <WaCta
              message={DESK_MESSAGE}
              location="partner-desk"
              className="flex min-h-[3.25rem] items-center justify-center rounded-[10px] border border-white/35 px-6 text-[0.9375rem] font-extrabold text-bone transition-colors hover:bg-white/8"
            >
              Ask the partner desk
            </WaCta>
          </div>
        </Container>
        <div className="no-scrollbar relative flex gap-2 overflow-x-auto px-5 pb-7 sm:px-8">
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

      {/* ——— The open split: the mockup's signature. */}
      <section className="bg-clay-deep pb-14 text-bone">
        <Container width="narrow" className="border-t border-white/10 pt-14">
          <p className="text-label font-extrabold text-green uppercase">
            Where the money goes
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] text-bone">
            We&rsquo;ll show you{" "}
            <span className="accent block">the whole split.</span>
          </h2>
          <p className="mt-4 max-w-md text-[0.90625rem] leading-relaxed text-bone/65">
            Most operators won&rsquo;t tell a partner what they keep.
            Here&rsquo;s ours, on a ₹399 railway station drop.
          </p>
          <PartnerSplit />
          <p className="mt-5 text-[0.65625rem] leading-relaxed text-bone/35">
            Illustrative, based on a ₹399 railway station drop. Airport,
            rental and outstation rides carry higher fares, so your actual
            figure will be higher. Tier thresholds shown in brackets are
            provisional and confirmed in your partner agreement.
          </p>
        </Container>
      </section>

      {/* ——— What you get besides the commission. */}
      <Container width="narrow" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          What you get besides the commission
        </p>
        <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          Your name is on the ride.{" "}
          <span className="accent">We treat it that way.</span>
        </h2>
        <ul className="mt-6">
          {GETS.map((item) => (
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

      {/* ——— How it works: the route to the first booking. */}
      <div className="mt-16 bg-sand py-14 lg:mt-20">
        <Container width="narrow">
          <p className="text-label font-extrabold text-clay uppercase">
            How it works
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
            Register today, <span className="accent">book tonight.</span>
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
      </div>

      {/* ——— Who partners with us. */}
      <Container width="narrow" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          Who partners with us
        </p>
        <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          If you book cars{" "}
          <span className="accent">on someone else&rsquo;s behalf.</span>
        </h2>
        <ul className="reveal mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line">
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

      {/* ——— The questions agents actually ask. */}
      <Container width="narrow" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          Before you register
        </p>
        <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          The questions <span className="accent">agents actually ask.</span>
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

      {/* ——— Register. */}
      <div
        id="register"
        className="mt-16 scroll-mt-20 bg-ink py-14 text-bone lg:mt-20"
      >
        <Container width="narrow" className="text-center">
          <p className="text-label font-extrabold text-green uppercase">
            Register
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] text-bone sm:text-[2.25rem]">
            Open a partner account.{" "}
            <span className="accent block">Book your first ride today.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.90625rem] leading-relaxed text-bone/70">
            Verification is usually same-day. There&rsquo;s no fee and no
            minimum volume to start.
          </p>
          <PartnerRegisterForm />
        </Container>
      </div>

      {/* ——— The corporate cross-link, straight from the mockup. */}
      <div className="bg-sand px-5 py-9 text-center">
        <p className="text-[0.875rem] leading-relaxed text-taupe">
          Running employee transport for your own staff
          <br />
          rather than booking for guests?
        </p>
        <Link
          href="/corporate"
          className="link-rule mt-3 inline-flex items-center gap-2 text-[0.875rem] font-extrabold text-ink"
        >
          See corporate accounts
          <ArrowIcon className="size-[15px]" />
        </Link>
      </div>

      {/* ——— The partner dock, on phones. */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div
          className="flex items-center justify-between gap-3 bg-ink px-4 pt-3.5"
          style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))" }}
        >
          <p className="text-[0.6875rem] leading-snug text-bone/60">
            <span className="block text-[0.90625rem] font-extrabold text-bone">
              Up to 10% back
            </span>
            No fee, no minimum
          </p>
          <WaCta
            message={enquiry("I would like to open a partner account.")}
            location="partner-dock"
            className="flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-green-deep px-5 text-[0.875rem] font-extrabold text-white"
          >
            <WhatsAppIcon />
            Register
          </WaCta>
        </div>
        <div aria-hidden="true" className="spark-band" />
      </div>
      {/* Clears the fixed dock so the footer's last line is never hidden. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  );
}
