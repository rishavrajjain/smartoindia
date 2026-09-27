import Image from "next/image";
import Link from "next/link";

import { PackagesSwitch } from "@/components/sections/packages-switch";
import { Container } from "@/components/ui/container";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { INTL_REGIONS } from "@/data/international";
import { JOURNEYS } from "@/data/journeys";
import { pageMetadata } from "@/lib/seo";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "International trips, planned the Smarto way",
  description:
    "Bhutan and Nepal, Southeast Asia, Dubai, Europe and beyond: tell Smarto where and when, and get one plan and one all-in quote on WhatsApp.",
  path: "/packages/international",
});

/*
 * The international half of Smarto's packages. There is no printed
 * international catalog yet, so this page is built around enquiry: pick a
 * region (or name any place) and the conversation starts on WhatsApp.
 */

const STEPS = [
  { title: "Tell us where and when", body: "Where you would like to go, your dates, and who is travelling." },
  { title: "Get one plan and one quote", body: "A day-by-day plan with stays, and a single all-in price." },
  { title: "Say yes, and travel", body: "We book it and stay on WhatsApp for the whole trip." },
];

export default function InternationalPackagesPage() {
  return (
    <>
      <Container width="wide" className="pt-6 lg:pt-10">
        <PackagesSwitch active="international" northeastCount={JOURNEYS.length} />
      </Container>

      {/* --- Hero. */}
      <Container width="wide" className="pt-10 lg:pt-16">
        <p className="text-label font-extrabold text-clay uppercase">
          International · Planned on request
        </p>
        <h1 className="mt-5 max-w-3xl text-[2.5rem] leading-[1.04] sm:text-[3.25rem] lg:text-[4rem]">
          The world, <span className="accent">planned the Smarto way.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-taupe">
          Tell us where and when. We plan the route, the stays and the days in
          between, and send one all-in quote on WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <WaCta
            message={enquiry("I would like to plan an international trip. My destination, dates and number of travellers are:")}
            location="packages-international"
            className="inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-full bg-green-deep px-7 text-[0.9375rem] font-extrabold text-white shadow-[0_14px_30px_rgba(57,151,114,0.3)] transition-transform duration-150 active:scale-[0.98]"
          >
            <WhatsAppIcon />
            Plan an international trip
          </WaCta>
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-[0.875rem] text-taupe hover:text-ink">
            or call {WHATSAPP_DISPLAY}
          </a>
        </div>
      </Container>

      {/* --- Regions. */}
      <Container width="wide" className="pt-14 lg:pt-20">
        <h2 className="text-[1.75rem] leading-tight lg:text-[2.25rem]">
          Pick a region <span className="accent">to start</span>
        </h2>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {INTL_REGIONS.map((region) => (
            <li key={region.id}>
              <article className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-clay-deep text-bone">
                <Image
                  src={region.image}
                  alt={region.alt}
                  fill
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[rgba(28,26,69,0.35)] via-40% to-[rgba(28,26,69,0.95)]"
                />
                <div className="p-5">
                  <h3 className="text-[1.625rem] leading-tight font-extrabold">{region.name}</h3>
                  <p className="mt-1 text-[0.8125rem] text-bone/80">{region.line}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {region.places.map((place) => (
                      <li
                        key={place}
                        className="rounded-full bg-white/12 px-2.5 py-1 text-[0.6875rem] font-extrabold text-bone ring-1 ring-white/20 backdrop-blur-sm"
                      >
                        {place}
                      </li>
                    ))}
                  </ul>
                  <WaCta
                    message={enquiry(`I would like to plan a trip to ${region.name}. My dates and number of travellers are:`)}
                    location="packages-international"
                    subject={region.id}
                    className="mt-4 flex min-h-12 items-center justify-between gap-3 rounded-2xl bg-bone py-2 pr-2 pl-4 text-ink transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <span className="text-[0.875rem] font-extrabold">Plan this trip</span>
                    <span aria-hidden="true" className="grid size-8 place-items-center rounded-xl bg-green-deep text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <span className="sr-only"> to {region.name}</span>
                  </WaCta>
                </div>
              </article>
            </li>
          ))}
          <li className="sm:col-span-2 lg:col-span-2">
            <article className="flex h-full min-h-[14rem] flex-col justify-center rounded-[1.75rem] border-2 border-dashed border-line-strong bg-sand p-6 sm:p-8">
              <p className="text-label font-extrabold text-clay uppercase">Anywhere else</p>
              <h3 className="mt-3 max-w-md text-[1.625rem] leading-tight">
                Somewhere <span className="accent">not on this list?</span>
              </h3>
              <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-taupe">
                Name the place. If it is on the map, we will plan it.
              </p>
              <WaCta
                message={enquiry("I would like to plan an international trip to a place not listed. The destination and dates are:")}
                location="packages-international"
                subject="anywhere"
                className="mt-5 inline-flex min-h-12 items-center gap-2.5 self-start rounded-full bg-ink px-6 text-[0.875rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
              >
                <WhatsAppIcon />
                Tell us where
              </WaCta>
            </article>
          </li>
        </ul>
      </Container>

      {/* --- How it works. */}
      <Container width="wide" className="pt-16 lg:pt-24">
        <h2 className="text-[1.75rem] leading-tight lg:text-[2.25rem]">
          How it <span className="accent">works</span>
        </h2>
        <ol className="mt-7 grid gap-3 sm:grid-cols-3 lg:gap-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-[1.5rem] bg-sand p-5 lg:p-6">
              <span className="grid size-9 place-items-center rounded-full bg-ink text-[0.8125rem] font-extrabold text-bone tabular-nums">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[1.0625rem] font-extrabold text-ink">{step.title}</h3>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-taupe">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      {/* --- Back to the Northeast. */}
      <Container width="wide" className="pt-16 pb-4 lg:pt-20">
        <Link
          href="/packages"
          className="group flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] bg-ink px-6 py-6 text-bone sm:px-8"
        >
          <span>
            <span className="block text-label font-extrabold text-green uppercase">Closer to home</span>
            <span className="mt-2 block text-[1.375rem] leading-tight lg:text-[1.625rem]">
              Or explore <span className="accent">{JOURNEYS.length} Northeast journeys</span>
            </span>
          </span>
          <span className="inline-flex min-h-12 items-center gap-2 rounded-full bg-bone px-5 text-[0.875rem] font-extrabold text-ink transition-transform duration-200 group-hover:translate-x-0.5">
            See the journeys
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </Container>
    </>
  );
}
