import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PackageStickyCta } from "@/components/sections/package-sticky-cta";
import { Container } from "@/components/ui/container";
import { JourneyCard } from "@/components/ui/journey-card";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { JOURNEYS } from "@/data/journeys";
import { pageMetadata } from "@/lib/seo";
import type { Journey } from "@/types";

export function generateStaticParams() {
  return JOURNEYS.map((journey) => ({ slug: journey.slug }));
}

function getJourney(slug: string): Journey | undefined {
  return JOURNEYS.find((journey) => journey.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) return {};
  return pageMetadata({
    title: `${journey.title}: ${journey.nights} nights across ${journey.states.join(" and ")}`,
    description: `${journey.subtitle} ${journey.route.join(" · ")}. All-in price on request, no hidden costs.`,
    path: `/packages/${journey.slug}`,
  });
}

export default async function JourneyPage({
  params,
}: PageProps<"/packages/[slug]">) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) notFound();

  const related = JOURNEYS.filter(
    (other) =>
      other.slug !== journey.slug &&
      other.states.some((state) => journey.states.includes(state)),
  ).slice(0, 3);

  return (
    <>
      {/* --- Hero: the destination photograph under the journey's identity. */}
      <div className="relative">
        <div className="relative aspect-[3/2] max-h-[34rem] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src={journey.hero.src}
            alt={journey.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <span aria-hidden="true" className="photo-scrim absolute inset-0" />
        </div>
        <Container width="wide" className="relative -mt-24 sm:-mt-28">
          <p className="text-label font-extrabold text-bone uppercase [text-shadow:0_1px_18px_rgba(14,11,42,0.5)]">
            Journey {journey.num} · {journey.states.join(" & ")}
          </p>
          <h1 className="mt-3 max-w-3xl text-[2.25rem] leading-[1.05] font-extrabold text-bone [text-shadow:0_1px_24px_rgba(14,11,42,0.55)] sm:text-[3rem]">
            {journey.title}
          </h1>
        </Container>
      </div>

      <Container width="wide" className="pt-8 lg:pt-10">
        <p className="max-w-2xl text-[1.25rem] leading-relaxed font-light text-taupe sm:text-[1.375rem]">
          {journey.subtitle}
        </p>

        {/* --- The facts, as printed in the catalog. */}
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-y border-line py-8 sm:grid-cols-3 lg:grid-cols-6">
          <Fact label="Duration">
            {journey.nights} nights / {journey.days} days
          </Fact>
          <Fact label="States">{journey.states.join(", ")}</Fact>
          <Fact label="Pace">{journey.pace}</Fact>
          <Fact label="Vehicle">{journey.vehicle}</Fact>
          <Fact label="Best months">{journey.bestMonths}</Fact>
          <Fact label="Ideal for">{journey.idealFor}</Fact>
        </dl>

        {/* --- The route, stop by stop. */}
        <div className="mt-10">
          <p className="text-label font-extrabold text-taupe uppercase">Route</p>
          <p className="mt-3 max-w-3xl text-[1.1875rem] leading-relaxed">
            {journey.route.map((stop, index) => (
              <span key={`${stop}-${index}`}>
                {index > 0 && (
                  // Real spaces around the arrow so the chain can wrap.
                  <span aria-hidden="true" className="text-taupe/60">
                    {" "}
                    →{" "}
                  </span>
                )}
                <span className="font-extrabold text-ink whitespace-nowrap">
                  {stop}
                </span>
              </span>
            ))}
          </p>
          {journey.routeNote && (
            <p className="mt-2.5 text-[0.875rem] text-taupe">
              {journey.routeNote}
            </p>
          )}
        </div>

        {/* --- Permits, altitude, group notes, the catalog's callouts. */}
        {(journey.permit || journey.altitude || journey.groupNote) && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {journey.permit && <Callout label="Permits">{journey.permit}</Callout>}
            {journey.altitude && (
              <Callout label="Altitude">{journey.altitude}</Callout>
            )}
            {journey.groupNote && (
              <Callout label="Group departure">{journey.groupNote}</Callout>
            )}
          </div>
        )}
      </Container>

      {/* --- Day by day. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <h2 className="text-[1.75rem] leading-tight sm:text-[2rem]">
          Day <span className="accent">by day</span>
        </h2>
        <ol className="mt-8 max-w-3xl">
          {journey.itinerary.map((day) => (
            <li
              key={day.day}
              className="grid gap-x-6 gap-y-2 border-t border-line py-7 sm:grid-cols-[6rem_1fr]"
            >
              <p className="text-label font-extrabold text-clay uppercase">
                Day {day.day}
              </p>
              <div>
                <h3 className="text-[1.1875rem] leading-snug font-extrabold text-ink">
                  {day.title}
                </h3>
                {(day.route || day.drive) && (
                  <p className="mt-1.5 text-[0.75rem] font-extrabold tracking-[0.12em] text-taupe uppercase">
                    {day.route}
                    {day.route && day.drive && " · "}
                    {day.drive && `Drive: ${day.drive}`}
                  </p>
                )}
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-taupe">
                  {day.body}
                </p>
                {day.overnight && (
                  <p className="mt-2.5 text-[0.75rem] font-extrabold tracking-[0.12em] text-green-deep uppercase">
                    Overnight in {day.overnight}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>

      {/* --- Where you stay + what the all-in bundle covers. */}
      <Container width="wide" className="pt-14 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[1.75rem] leading-tight">
              Where <span className="accent">you stay</span>
            </h2>
            <ul className="mt-5 space-y-3.5">
              {journey.stay.map((line) => (
                <li
                  key={line}
                  className="border-l-2 border-terracotta pl-4 text-[0.9375rem] leading-relaxed text-taupe"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h2 className="text-[1.75rem] leading-tight">
                What&rsquo;s <span className="accent">included</span>
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-taupe">
                {journey.included}
              </p>
            </div>
            <div>
              <h3 className="text-[1.25rem] leading-tight">Not included</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-taupe">
                {journey.notIncluded}
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* --- The price promise, as printed, and the way in. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <div className="bg-ink px-6 py-14 sm:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-label font-extrabold text-bone/60 uppercase">
                All-in pricing
              </p>
              <p className="mt-4 text-[1.5rem] leading-snug text-bone sm:text-[1.75rem]">
                Pricing quoted on enquiry, tailored to your dates and group
                size. <span className="accent">No hidden costs.</span>
              </p>
            </div>
            <WhatsAppLink
              message={journey.enquiry}
              location="package-detail"
              subject={journey.slug}
              tone="accent"
              size="lg"
              className="shrink-0"
            >
              Request a quote
            </WhatsAppLink>
          </div>
        </div>
      </Container>

      {/* --- More roads in the same direction. */}
      {related.length > 0 && (
        <Container width="wide" className="pt-20 lg:pt-24">
          <h2 className="text-[1.75rem] leading-tight">
            More journeys <span className="accent">nearby</span>
          </h2>
          <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <li key={other.slug}>
                <JourneyCard journey={other} />
              </li>
            ))}
          </ul>
        </Container>
      )}

      <div className="pt-8" />
      <PackageStickyCta
        title={journey.title}
        message={journey.enquiry}
        slug={journey.slug}
      />
    </>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-label font-extrabold text-taupe uppercase">{label}</dt>
      <dd className="mt-2 text-[0.9375rem] leading-snug font-extrabold text-ink">
        {children}
      </dd>
    </div>
  );
}

function Callout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-sand px-5 py-4">
      <p className="text-label font-extrabold text-clay-deep uppercase">
        {label}
      </p>
      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-taupe">
        {children}
      </p>
    </div>
  );
}
