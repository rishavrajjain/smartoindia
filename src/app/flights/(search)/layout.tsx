import { Suspense, type ReactNode } from "react";

import { FlightSearchPanel } from "@/components/sections/flight-search-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/deco";
import { addDays, MAX_DAYS_AHEAD, todayIST } from "@/lib/flights";

/*
 * The search screen's frame. Living in a layout, the heading and the form stay
 * mounted while each new search streams its results into `children`, the
 * visitor never watches their own form disappear and come back.
 */
export default function FlightsSearchLayout({ children }: { children: ReactNode }) {
  const today = todayIST();

  return (
    <>
      {/* Straight to the search: an eyebrow and a compact title, no preamble. */}
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
          <div className="min-w-0 lg:col-span-7">{children}</div>
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
