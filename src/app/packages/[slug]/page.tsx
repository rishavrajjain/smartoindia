import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PackageStickyCta } from "@/components/sections/package-sticky-cta";
import { Label } from "@/components/ui/deco";
import { Container } from "@/components/ui/container";
import { PackageCard } from "@/components/ui/package-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { PACKAGES, getPackage } from "@/data/packages";
import { pageMetadata } from "@/lib/seo";

/** Every package is known at build time, so all detail pages prerender. */
export function generateStaticParams() {
  return PACKAGES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  props: PageProps<"/packages/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getPackage(slug);

  if (!item) {
    return pageMetadata({
      title: "Trip not found",
      description: "This trip is no longer listed.",
      path: `/packages/${slug}`,
    });
  }

  // No `image` here on purpose: the branded card from `opengraph-image.tsx` in
  // this segment is used instead. Setting one explicitly would override it.
  return pageMetadata({
    title: `${item.title}: ${item.durationLabel}`,
    description: item.summary,
    path: `/packages/${item.slug}`,
  });
}

export default async function PackageDetailPage(
  props: PageProps<"/packages/[slug]">,
) {
  const { slug } = await props.params;
  const item = getPackage(slug);

  if (!item) notFound();

  const related = PACKAGES.filter(
    (other) =>
      other.slug !== item.slug &&
      (other.state === item.state ||
        other.tags.some((tag) => item.tags.includes(tag))),
  ).slice(0, 3);

  return (
    <>
      <PageHero
        image={item.hero}
        eyebrow={`${item.state} · ${item.durationLabel}`}
        title={item.title}
        lead={item.summary}
        priority
        stickers={
          <>
            <Label>
              {item.durationLabel}
            </Label>
            <Label>
              {item.idealFor[0]}
            </Label>
          </>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <WhatsAppLink
            message={item.enquiry}
            location="package-detail"
            subject={item.slug}
            size="lg"
          >
            Request a quote
          </WhatsAppLink>
          <Link
            href="/packages"
            className="link-rule text-[0.9375rem] font-extrabold text-ink"
          >
            All trips
          </Link>
        </div>
      </PageHero>

      {/* Trip facts */}
      <section className="mt-14 bg-sand/60">
        <Container width="wide" className="py-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
            <Fact label="Duration" value={item.durationLabel} />
            <Fact label="Best season" value={item.bestSeasonLabel} />
            <Fact label="Ideal for" value={item.idealFor.join(", ")} />
            <Fact label="Price" value={item.priceLabel} />
          </dl>
        </Container>
      </section>

      <Container width="wide" className="pt-14 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="min-w-0">
            {/* Route */}
            <section aria-labelledby="route-heading">
              <h2
                id="route-heading"
                className="text-[1.75rem] leading-tight text-ink sm:text-[2.25rem]"
              >
                The route
              </h2>
              <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
                {item.destinations.map((stop, index) => (
                  <li key={stop} className="flex items-center gap-2">
                    <span className="border border-line-strong px-3 py-1.5 text-sm text-ink">
                      {stop}
                    </span>
                    {index < item.destinations.length - 1 && (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        aria-hidden="true"
                        className="size-3.5 text-terracotta"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            {/* Highlights */}
            <section aria-labelledby="highlights-heading" className="mt-12">
              <h2
                id="highlights-heading"
                className="text-[1.75rem] leading-tight text-ink sm:text-[2.25rem]"
              >
                What makes this one worth doing
              </h2>
              <ul className="mt-5 space-y-3.5">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3.5">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-clay-deep"
                    >
                      <path d="m4 10.5 4 4 8-9" />
                    </svg>
                    <span className="text-[1.0625rem] leading-relaxed text-ink">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section aria-labelledby="itinerary-heading" className="mt-14">
              <h2
                id="itinerary-heading"
                className="text-[1.75rem] leading-tight text-ink sm:text-[2.25rem]"
              >
                Day by day
              </h2>
              <ol className="mt-7 space-y-0">
                {item.itinerary.map((day, index) => (
                  <li key={day.day} className="relative flex gap-5 pb-9 last:pb-0">
                    {/* Timeline rail */}
                    {index < item.itinerary.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-12 bottom-0 left-[1.375rem] w-0.5 bg-line"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-clay font-display text-base font-extrabold text-bone tabular-nums"
                    >
                      {day.day}
                    </span>
                    <div className="min-w-0 pt-1.5">
                      <h3 className="font-sans text-[1.0625rem] font-extrabold text-ink">
                        <span className="sr-only">Day {day.day}: </span>
                        {day.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-taupe">
                        {day.description}
                      </p>
                      <p className="mt-2.5 text-sm text-taupe">
                        <span className="font-extrabold text-ink">
                          {day.stay ? "Overnight: " : "Departure day"}
                        </span>
                        {day.stay}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Inclusions */}
            <section aria-labelledby="inclusions-heading" className="mt-14">
              <h2
                id="inclusions-heading"
                className="text-[1.75rem] leading-tight text-ink sm:text-[2.25rem]"
              >
                What is and is not included
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <ListCard
                  title="Included"
                  items={item.inclusions}
                  variant="included"
                />
                <ListCard
                  title="Not included"
                  items={item.exclusions}
                  variant="excluded"
                />
              </div>
            </section>

            {/* Notes */}
            <section aria-labelledby="notes-heading" className="mt-14">
              <h2
                id="notes-heading"
                className="text-[1.75rem] leading-tight text-ink sm:text-[2.25rem]"
              >
                Before you decide
              </h2>
              <div className="mt-6 space-y-5">
                <NoteBlock title="Where you stay" body={item.stayNotes} />
                <NoteBlock
                  title="Getting around"
                  body={item.transportNotes}
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-sm bg-ink p-6 lg:p-7">
              <p className="text-label font-extrabold text-ochre uppercase">
                {item.durationLabel}
              </p>
              <h2 className="mt-3 text-[1.75rem] leading-tight text-bone">
                {item.priceLabel}
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone/80">
                Cost depends on your dates, group size, and where you want to
                stay. Send a message and we will come back with a figure and a
                route you can change.
              </p>
              <div className="mt-6">
                <WhatsAppLink
                  message={item.enquiry}
                  location="package-detail"
                  subject={item.slug}
                  tone="onDark"
                  size="md"
                  fullWidth
                >
                  Request a quote
                </WhatsAppLink>
              </div>
              <dl className="mt-7 space-y-4 border-t border-bone/20 pt-6 text-sm">
                <div>
                  <dt className="font-extrabold text-bone/60">Best season</dt>
                  <dd className="mt-1 font-extrabold text-bone">{item.bestSeasonLabel}</dd>
                </div>
                <div>
                  <dt className="font-extrabold text-bone/60">Ideal for</dt>
                  <dd className="mt-1 font-extrabold text-bone">{item.idealFor.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-extrabold text-bone/60">Style</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-bone/30 px-2.5 py-1 text-label font-extrabold text-bone/85 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <p className="mt-4 px-1 text-xs leading-relaxed text-taupe">
              Itinerary details are indicative and confirmed on WhatsApp before
              travel. Road and weather conditions in the region change at short
              notice.
            </p>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <Container width="wide" className="pt-20 lg:pt-28">
          <SectionHeading
            eyebrow="Related"
            title="Other trips you might prefer"
          />
          <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <li key={other.slug} className="reveal">
                <PackageCard
                  item={other}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2.5rem)"
                />
              </li>
            ))}
          </ul>
        </Container>
      )}

      <PackageStickyCta
        title={item.title}
        message={item.enquiry}
        slug={item.slug}
      />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-label font-extrabold text-clay-deep uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-[0.9375rem] text-ink">
        {value}
      </dd>
    </div>
  );
}

function ListCard({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "included" | "excluded";
}) {
  const included = variant === "included";

  return (
    <div className="border-t border-line pt-5">
      <h3 className="font-sans text-base font-extrabold text-ink">{title}</h3>
      <ul className="mt-3.5 space-y-2.5">
        {items.map((entry) => (
          <li key={entry} className="flex gap-3 text-[0.9375rem] leading-relaxed">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={
                included
                  ? "mt-1 size-4 shrink-0 text-clay-deep"
                  : "mt-1 size-4 shrink-0 text-taupe/55"
              }
            >
              {included ? <path d="m4 10.5 4 4 8-9" /> : <path d="M5 5l10 10M15 5 5 15" />}
            </svg>
            <span className="text-taupe">{entry}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NoteBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-sm bg-sand p-5">
      <h3 className="font-sans text-base font-extrabold text-ink">{title}</h3>
      <p className="mt-2 leading-relaxed text-taupe">{body}</p>
    </div>
  );
}
