import { Suspense } from "react";

import { PackageBrowser } from "@/components/sections/package-browser";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/deco";
import { PageHero } from "@/components/ui/page-hero";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { IMAGES } from "@/data/images";
import { PACKAGES } from "@/data/packages";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Travel packages across Northeast India",
  description:
    "Planned routes through Meghalaya, Assam, Arunachal Pradesh, Sikkim, and Nagaland. Filter by state, trip length, and travel style. Every trip is reshaped around your dates.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <PageHero
        image={IMAGES.northeastCircuit}
        eyebrow={`${PACKAGES.length} routes to start from`}
        title={
          <>
            Pick a trip.{" "}
            <span className="accent">We&rsquo;ll bend it</span> to fit.
          </>
        }
        lead="Filter by state, length or pace. Nothing here is fixed."
        priority
        stickers={
          <>
            <Label>
              6 regions
            </Label>
            <Label>
              Custom welcome
            </Label>
          </>
        }
      />

      <Container width="wide" className="pt-14 lg:pt-20">
        {/* useSearchParams needs a Suspense boundary so the rest of the route
            can still be prerendered as static HTML. */}
        <Suspense fallback={<BrowserSkeleton />}>
          <PackageBrowser packages={PACKAGES} />
        </Suspense>
      </Container>

      <Container width="wide" className="pt-20 lg:pt-28">
        <div className="bg-ink px-6 py-16 sm:px-12 lg:py-20">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[2rem] leading-[1.06] text-bone sm:text-[2.75rem]">
                None of these quite right?
              </h2>
              <p className="mt-4 text-lg text-bone/80">
                Most of what we run is custom. Send your dates and we will come
                back with a route.
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
      <div className="h-[19rem] border-y border-line sm:h-[16rem]" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-[26rem] bg-sand" />
        ))}
      </div>
    </div>
  );
}
