import { Suspense } from "react";

import { JourneyBrowser } from "@/components/sections/journey-browser";
import { PackagesSwitch } from "@/components/sections/packages-switch";
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

export default function PackagesPage() {
  return (
    <>
      {/* --- Northeast or international, then the catalog's own cover line. */}
      <Container width="wide" className="pt-6 lg:pt-10">
        <PackagesSwitch active="northeast" northeastCount={JOURNEYS.length} />
      </Container>
      <Container width="wide" className="pt-10 lg:pt-16">
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

      {/* --- The full catalog with filters. */}
      <Container width="wide" className="pt-12 lg:pt-16">
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
      <div className="h-[52rem] rounded-[2rem] bg-sand sm:h-[46rem] lg:h-[44rem]" />
      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[3/2] rounded-2xl bg-sand" />
        ))}
      </div>
    </div>
  );
}
