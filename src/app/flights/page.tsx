import type { Metadata } from "next";
import { Suspense } from "react";

import { FlightResults, ResultsSkeleton } from "@/components/sections/flight-results";
import { FlightSearchPanel } from "@/components/sections/flight-search-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/deco";
import { addDays, firstParam, MAX_DAYS_AHEAD, todayIST } from "@/lib/flights";
import { pageMetadata } from "@/lib/seo";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// A slow upstream search should not be cut off by the platform's default.
export const maxDuration = 30;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const base = pageMetadata({
    title: "Flights to and from the Northeast",
    description:
      "Search fixed-departure fares into Guwahati, Bagdogra and across the Northeast, then confirm your booking on WhatsApp with a Smarto cab waiting on arrival.",
    path: "/flights",
  });
  // Every search is its own URL; only the plain page should be indexed.
  const hasQuery = Boolean(firstParam(params, "from") || firstParam(params, "date"));
  return hasQuery ? { ...base, robots: { index: false, follow: true } } : base;
}

/*
 * The search screen. Heading, form and results all belong to this one page
 * segment: the router scrolls a navigation to the first element of the page,
 * so the heading must be that element, or a phone would land on the results
 * box below the form. The results sit in their own Suspense boundary, which
 * keeps the form on screen while the airline system answers.
 */
export default async function FlightsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const today = todayIST();

  return (
    <>
      <Container width="default" className="pt-8 lg:pt-12">
        <Eyebrow>Flights</Eyebrow>
        <h1 className="mt-3 text-[1.75rem] leading-tight sm:text-[2rem]">
          Search <span className="accent">flights</span>
        </h1>
      </Container>

      <Container width="default" className="pt-6 pb-24 lg:pt-8 lg:pb-32">
        {/* min-w-0: the chip rail inside the form is a scroll container whose
            intrinsic width would otherwise stretch the column past the phone. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Suspense fallback={<FormSkeleton />}>
                <FlightSearchPanel
                  today={today}
                  maxDate={addDays(today, MAX_DAYS_AHEAD)}
                  defaultDate={addDays(today, 7)}
                />
              </Suspense>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7">
            {/* Keyed on the query so a new search always shows the skeleton
                rather than yesterday's fares while the next answer streams. */}
            <Suspense key={JSON.stringify(params)} fallback={<ResultsSkeleton />}>
              <FlightResults params={params} today={today} />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}

/** Same heights as the real form so nothing shifts when it hydrates. */
function FormSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3">
      <div className="h-[3.25rem] rounded-2xl bg-sand" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-[5.75rem] rounded-2xl bg-sand" />
        <div className="h-[5.75rem] rounded-2xl bg-sand" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-[5.75rem] rounded-2xl bg-sand" />
        <div className="h-[5.75rem] rounded-2xl border border-dashed border-line-strong" />
      </div>
      <div className="h-[5.75rem] rounded-2xl bg-sand" />
      <div className="mt-1 h-14 rounded-2xl bg-sand" />
    </div>
  );
}
