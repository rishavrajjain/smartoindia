import type { Metadata } from "next";

import { FlightResults } from "@/components/sections/flight-results";
import { firstParam, todayIST } from "@/lib/flights";
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

export default async function FlightsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return <FlightResults params={params} today={todayIST()} />;
}
