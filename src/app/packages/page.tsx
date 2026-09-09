import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { JourneyBrowser } from "@/components/sections/journey-browser";
import { Container } from "@/components/ui/container";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { JOURNEYS } from "@/data/journeys";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: `${JOURNEYS.length} journeys across Northeast India, on one honest price`,
  description:
    "Curated outstation journeys across Assam, Meghalaya and Arunachal Pradesh: hotels, cars and permits planned end to end, quoted all-in. Filter by state, length and travel style.",
  path: "/packages",
});

/* The four doors into the catalog. Counts are computed from the data. */
const REGIONS = [
  {
    state: "Meghalaya",
    line: "Waterfalls, caves and living root bridges",
    image: "/images/pkg-meghalaya-waterfalls.webp",
    alt: "A waterfall plunging off the Cherrapunjee plateau into a green gorge",
  },
  {
    state: "Arunachal Pradesh",
    line: "Monasteries and high passes",
    image: "/images/dest-sela.webp",
    alt: "Prayer flags over a turquoise lake at a high Himalayan pass",
  },
  {
    state: "Assam",
    line: "Rhinos, tea and the big river",
    image: "/images/pkg-assam-kaziranga.webp",
    alt: "A one-horned rhinoceros grazing in the tall grass of Kaziranga",
  },
  {
    state: "Multi-state",
    line: "The long way round, in one arc",
    image: "/images/dest-majuli.webp",
    alt: "The braided sandbars of the Brahmaputra at golden hour",
  },
] as const;

function regionCount(state: string) {
  if (state === "Multi-state") return JOURNEYS.filter((j) => j.multiState).length;
  return JOURNEYS.filter((j) =>
    j.states.includes(state as (typeof JOURNEYS)[number]["states"][number]),
  ).length;
}

export default function PackagesPage() {
  return (
    <>
      {/* --- The catalog's own cover line, as the page hero. */}
      <Container width="wide" className="pt-14 lg:pt-24">
        <p className="text-label font-extrabold text-clay uppercase">
          {JOURNEYS.length} journeys · Assam, Meghalaya &amp; Arunachal Pradesh
        </p>
        <h1 className="mt-5 max-w-3xl text-[2.5rem] leading-[1.04] sm:text-[3.25rem] lg:text-[4rem]">
          Northeast India, <span className="accent">on one honest price.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-taupe">
          Curated outstation journeys with hotels, cars and permits planned end
          to end, by the people who drive these roads. Every price is quoted
          all-in. No surge, no bargaining, nothing added at the end.
        </p>
      </Container>

      {/* --- Four doors in. Each tile pre-sets the state filter below. */}
      <Container width="wide" className="pt-12 lg:pt-16">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {REGIONS.map((region) => (
            <li key={region.state}>
              <Link
                href={`/packages?state=${encodeURIComponent(region.state)}#journeys`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand sm:aspect-[3/2] lg:aspect-[4/5]">
                  <Image
                    src={region.image}
                    alt={region.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, 46vw"
                    className="zoom-slow object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="photo-scrim absolute inset-0"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                    <span className="block text-[0.6875rem] font-extrabold tracking-[0.16em] text-bone/75 uppercase">
                      {regionCount(region.state)} journeys
                    </span>
                    <span className="mt-1 block text-[1.25rem] leading-tight font-extrabold text-bone">
                      {region.state}
                    </span>
                    <span className="mt-1 hidden text-[0.8125rem] leading-snug text-bone/80 sm:block">
                      {region.line}
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* --- The full catalog with filters. */}
      <Container width="wide" className="pt-14 lg:pt-20">
        {/* useSearchParams needs a Suspense boundary so the rest of the route
            can still be prerendered as static HTML. */}
        <Suspense fallback={<BrowserSkeleton />}>
          <JourneyBrowser journeys={[...JOURNEYS]} />
        </Suspense>
      </Container>

      {/* --- The custom-trip door, for everyone the filters don't fit. */}
      <Container width="wide" className="pt-20 lg:pt-28">
        <div className="bg-ink px-6 py-16 sm:px-12 lg:py-20">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[2rem] leading-[1.06] text-bone sm:text-[2.75rem]">
                None of these{" "}
                <span className="accent">quite right?</span>
              </h2>
              <p className="mt-4 text-lg text-bone/80">
                Every journey here can be reshaped: dates, pace, hotels, route.
                Send what you have in mind and we will come back with a plan.
              </p>
            </div>
            <WhatsAppLink
              message={enquiry(
                "I would like a custom trip. Here are my dates and what I have in mind:",
              )}
              location="packages-index"
              tone="accent"
              size="lg"
              className="shrink-0"
            >
              Plan a custom trip
            </WhatsAppLink>
          </div>
        </div>
      </Container>
    </>
  );
}

/** Reserves the browser's height so the results below do not jump on hydration. */
function BrowserSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-[24rem] border-y border-line" />
      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[3/2] rounded-2xl bg-sand" />
        ))}
      </div>
    </div>
  );
}
