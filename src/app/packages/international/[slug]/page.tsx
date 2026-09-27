import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { IntlTripCard } from "@/components/ui/intl-trip-card";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { INTL_TRIPS, findTrip, tripNights } from "@/data/international-trips";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export function generateStaticParams() {
  return INTL_TRIPS.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/packages/international/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = findTrip(slug);
  if (!trip) return {};
  const nights = tripNights(trip);
  return pageMetadata({
    title: `${trip.country}: ${trip.title}, ${nights} nights`,
    description: `${trip.subtitle} ${trip.stops.map((s) => s.place).join(" · ")}. A sample itinerary, tailored and quoted all-in on WhatsApp.`,
    path: `/packages/international/${trip.slug}`,
  });
}

/*
 * One international sample itinerary. The route strip shows the promise
 * the data enforces: fly in, stay in each place once, fly home.
 */
export default async function IntlTripPage({
  params,
}: PageProps<"/packages/international/[slug]">) {
  const { slug } = await params;
  const trip = findTrip(slug);
  if (!trip) notFound();

  const nights = tripNights(trip);
  const message = enquiry(
    `I would like to plan the ${trip.country} trip (${trip.title}, ${nights} nights). My dates and number of travellers are:`,
  );
  const related = INTL_TRIPS.filter(
    (t) => t.region === trip.region && t.slug !== trip.slug,
  ).slice(0, 3);

  // The day number each stop starts on, counted across the whole trip.
  const firstDay = trip.stops.map(
    (_, i) => 1 + trip.stops.slice(0, i).reduce((sum, s) => sum + s.nights, 0),
  );

  return (
    <>
      {/* --- Hero. */}
      <div className="relative">
        <div className="relative aspect-[3/2] max-h-[34rem] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src={trip.image.src}
            alt={trip.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <span aria-hidden="true" className="photo-scrim absolute inset-0" />
        </div>
        <Container width="wide" className="relative -mt-24 sm:-mt-28">
          <p className="text-label font-extrabold text-bone uppercase [text-shadow:0_1px_18px_rgba(14,11,42,0.5)]">
            <Link href="/packages/international" className="hover:underline">International</Link>
            {" · "}
            {trip.country}
          </p>
          <h1 className="mt-3 max-w-3xl text-[2.25rem] leading-[1.05] font-extrabold text-bone [text-shadow:0_1px_24px_rgba(14,11,42,0.55)] sm:text-[3rem]">
            {trip.title}
          </h1>
        </Container>
      </div>

      <Container width="wide" className="pt-8 lg:pt-10">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
          <p className="max-w-2xl text-[1.25rem] leading-relaxed text-taupe sm:text-[1.375rem]">
            {trip.subtitle}
          </p>
          <WaCta
            message={message}
            location="packages-international"
            subject={trip.slug}
            className="inline-flex min-h-[3.25rem] shrink-0 items-center gap-2.5 rounded-full bg-green-deep px-7 text-[0.9375rem] font-extrabold text-white shadow-[0_14px_30px_rgba(57,151,114,0.3)] transition-transform duration-150 active:scale-[0.98]"
          >
            <WhatsAppIcon />
            Plan this trip
          </WaCta>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-y border-line py-8 sm:grid-cols-4">
          <Fact label="Duration">
            {nights} nights / {nights + 1} days
          </Fact>
          <Fact label="Pace">{trip.pace}</Fact>
          <Fact label="Best months">{trip.bestMonths}</Fact>
          <Fact label="Ideal for">{trip.idealFor}</Fact>
        </dl>

        {/* --- The route: every place once. */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-label font-extrabold text-taupe uppercase">The route</p>
            <p className="inline-flex items-center gap-2 rounded-full bg-green/15 px-3.5 py-1.5 text-[0.75rem] font-extrabold text-green-deep">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              Every place once, no doubling back
            </p>
          </div>
          <ol className="no-scrollbar -mx-5 mt-5 flex items-stretch gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            <RouteEnd label="Fly in" place={trip.flyIn} />
            {trip.stops.map((stop, i) => (
              <li key={stop.place} className="flex shrink-0 items-center gap-2">
                <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
                <span className="rounded-2xl bg-sand px-4 py-2.5">
                  <span className="block text-[0.6875rem] font-extrabold text-taupe tabular-nums">
                    Stop {i + 1} · {stop.nights} {stop.nights === 1 ? "night" : "nights"}
                  </span>
                  <span className="block text-[0.9375rem] font-extrabold whitespace-nowrap text-ink">
                    {stop.place}
                  </span>
                </span>
              </li>
            ))}
            <li className="flex shrink-0 items-center gap-2">
              <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
              <RouteEnd label="Fly home" place={trip.flyOut} as="span" />
            </li>
          </ol>
          {trip.flyOutNote && (
            <p className="mt-2 text-[0.8125rem] text-taupe">{trip.flyOutNote}</p>
          )}
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {trip.highlights.map((h) => (
            <li key={h} className="rounded-full bg-clay-soft px-3.5 py-1.5 text-[0.8125rem] font-extrabold text-ink">
              {h}
            </li>
          ))}
        </ul>
      </Container>

      {/* --- Day by day, grouped by stop. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <h2 className="text-[1.75rem] leading-tight sm:text-[2rem]">
          Day <span className="accent">by day</span>
        </h2>
        <p className="mt-2 max-w-xl text-[0.875rem] text-taupe">
          A sample plan. We move days around, swap in what you love and quote
          it all-in.
        </p>
        <div className="mt-8 max-w-3xl">
          {trip.stops.map((stop, stopIndex) => (
            <section key={stop.place} aria-label={stop.place} className="border-t border-line pt-6 pb-2">
              <p className="text-[0.75rem] font-extrabold tracking-[0.14em] text-green-deep uppercase">
                {stop.place} · {stop.nights} {stop.nights === 1 ? "night" : "nights"}
              </p>
              <ol className="mt-3">
                {stop.days.map((line, dayIndex) => {
                  const day = firstDay[stopIndex] + dayIndex;
                  return (
                    <li key={day} className="grid grid-cols-[4.5rem_1fr] gap-x-4 py-2.5 sm:grid-cols-[6rem_1fr]">
                      <span className="text-label font-extrabold text-clay uppercase">Day {day}</span>
                      <span className="text-[0.9375rem] leading-relaxed text-ink">{line}</span>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
          <section aria-label="Going home" className="border-t border-line pt-6">
            <ol>
              <li className="grid grid-cols-[4.5rem_1fr] gap-x-4 py-2.5 sm:grid-cols-[6rem_1fr]">
                <span className="text-label font-extrabold text-clay uppercase">Day {nights + 1}</span>
                <span className="text-[0.9375rem] leading-relaxed text-ink">
                  Fly home from {trip.flyOut}.
                </span>
              </li>
            </ol>
          </section>
        </div>
      </Container>

      {/* --- The way in. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <div className="rounded-[2rem] bg-ink px-6 py-12 sm:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-label font-extrabold text-bone/60 uppercase">Tailored to you</p>
              <p className="mt-4 text-[1.5rem] leading-snug text-bone sm:text-[1.75rem]">
                Your dates, your pace, stays you choose.{" "}
                <span className="accent">One all-in quote on WhatsApp.</span>
              </p>
            </div>
            <WaCta
              message={message}
              location="packages-international"
              subject={trip.slug}
              className="inline-flex min-h-[3.25rem] shrink-0 items-center gap-2.5 self-start rounded-full bg-bone px-7 text-[0.9375rem] font-extrabold text-ink transition-colors hover:bg-sand lg:self-auto"
            >
              <WhatsAppIcon />
              Plan this trip
            </WaCta>
          </div>
        </div>
      </Container>

      {/* --- More in the region. */}
      {related.length > 0 && (
        <Container width="wide" className="pt-20 pb-4 lg:pt-24">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[1.75rem] leading-tight">
              More in <span className="accent">{trip.region}</span>
            </h2>
            <Link
              href={`/packages/international?region=${encodeURIComponent(trip.region)}#destinations`}
              className="link-rule shrink-0 text-[0.875rem] font-extrabold text-ink"
            >
              See all
            </Link>
          </div>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {related.map((t) => (
              <li key={t.slug}>
                <IntlTripCard trip={t} />
              </li>
            ))}
          </ul>
        </Container>
      )}
    </>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-label font-extrabold text-taupe uppercase">{label}</dt>
      <dd className="mt-2 text-[0.9375rem] leading-snug text-ink">{children}</dd>
    </div>
  );
}

function RouteEnd({
  label,
  place,
  as = "li",
}: {
  label: string;
  place: string;
  as?: "li" | "span";
}) {
  const Tag = as;
  return (
    <Tag className="flex shrink-0 items-center gap-2.5 rounded-2xl bg-ink px-4 py-2.5 text-bone">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-green">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
      </svg>
      <span>
        <span className="block text-[0.6875rem] font-extrabold text-bone/60">{label}</span>
        <span className="block text-[0.9375rem] font-extrabold whitespace-nowrap">{place}</span>
      </span>
    </Tag>
  );
}
