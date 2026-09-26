import Link from "next/link";

import { PartnerRegisterForm } from "@/components/sections/partner-register-form";
import { PartnerSplit } from "@/components/sections/partner-split";
import { PhotoHero } from "@/components/sections/photo-hero";
import { FactTiles } from "@/components/ui/fact-tiles";
import { MarqueeBand } from "@/components/ui/marquee-band";
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
  { icon: PhoneCheckIcon, label: "See the fare before you confirm" },
  { icon: PinIcon, label: "Track every ride you book" },
  { icon: PeopleIcon, label: "A dedicated partner desk, 24×7" },
  { icon: ClockIcon, label: "Cars assigned, never auctioned" },
  { icon: TagIcon, label: "No surprises for your guest" },
  { icon: BoltIcon, label: "An all-electric fleet" },
  { icon: ShieldIcon, label: "The whole Northeast, one account" },
];

const STEPS = [
  {
    title: "Register your agency",
    body: "Name, GST, phone. Verified same day.",
  },
  {
    title: "Book through the desk",
    body: "Send the trip, see the fare and your cut.",
  },
  {
    title: "Your guest rides",
    body: "Flat fare, tracked car, zero haggling.",
  },
  {
    title: "Commission credited",
    body: "Monthly, every ride itemised.",
  },
];

const WHO = [
  {
    icon: SuitcaseIcon,
    title: "Travel agents",
    body: "Transfers and day trips for clients.",
  },
  {
    icon: HouseIcon,
    title: "Hotels and resorts",
    body: "Pickups booked at the desk.",
  },
  {
    icon: SendIcon,
    title: "Tour operators",
    body: "Itineraries with one fleet behind them.",
  },
  {
    icon: CalendarIcon,
    title: "Event planners",
    body: "Volume, on a date that can't move.",
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
      {/* ——— Hero: the car under the portico, and the promise beside it. */}
      <PhotoHero
        eyebrow="Partner programme · Agents &amp; hotels"
        title={
          <>
            Book for your guests.{" "}
            <span className="accent block">Earn on every ride.</span>
          </>
        }
        sub="Your guest pays the flat fare. Your cut comes out of our margin, not their pocket."
        image={{
          src: "/images/biz-partners.webp",
          alt: "A Smarto electric cab and a brass luggage cart under the portico of a hillside heritage hotel",
        }}
        float={{
          icon: ShieldIcon,
          title: "Up to 10% back",
          line: "On every ride you book",
        }}
        chips={CHIPS}
      >
        <div className="flex max-w-md flex-col gap-2.5 sm:max-w-none sm:flex-row">
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
            className="flex min-h-[3.25rem] items-center justify-center rounded-[10px] border border-line-strong px-6 text-[0.9375rem] font-extrabold text-ink transition-colors hover:bg-sand"
          >
            Ask the partner desk
          </WaCta>
        </div>
      </PhotoHero>

      <MarqueeBand
        items={[
          "Up to 10% back",
          "Same-day onboarding",
          "No deposit",
          "No minimum",
          "Your guest pays the flat fare",
          "24×7 partner desk",
        ]}
      />

      {/* ——— The open split: the mockup's signature. */}
      <section className="bg-clay-deep pb-14 text-bone lg:pb-20">
        <Container width="wide" className="pt-14">
          <p className="text-label font-extrabold text-green uppercase">
            Where the money goes
          </p>
          <h2 className="mt-4 text-[1.8125rem] leading-[1.09] text-bone">
            We&rsquo;ll show you{" "}
            <span className="accent block">the whole split.</span>
          </h2>
          <p className="mt-4 max-w-md text-[0.90625rem] leading-relaxed text-bone/65">
            Most operators hide what they keep. Here&rsquo;s ours, on a ₹399
            railway drop.
          </p>
          <PartnerSplit />
          <p className="mt-5 max-w-2xl text-[0.65625rem] leading-relaxed text-bone/35">
            Illustrative, based on a ₹399 railway station drop. Airport,
            rental and outstation rides carry higher fares, so your actual
            figure will be higher. Tier thresholds shown in brackets are
            provisional and confirmed in your partner agreement.
          </p>
        </Container>
      </section>

      {/* ——— What you get besides the commission. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          What you get besides the commission
        </p>
        <h2 className="mt-4 text-[1.8125rem] leading-[1.09] sm:text-[2.25rem]">
          Your name is on the ride.{" "}
          <span className="accent">We treat it that way.</span>
        </h2>
        <FactTiles items={GETS} />
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
