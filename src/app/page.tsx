import Image from "next/image";
import Link from "next/link";

import { DestinationMarquee } from "@/components/sections/destination-marquee";
import { HomeHero } from "@/components/sections/home-hero";
import { ReviewCarousel } from "@/components/sections/review-carousel";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/deco";
import { PackageCard } from "@/components/ui/package-card";
import { IMAGES } from "@/data/images";
import { FEATURED_PACKAGES } from "@/data/packages";
import { REVIEWS } from "@/data/reviews";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Smarto — Northeast India, travelled well",
  description:
    "Road trips, festival journeys, and everyday transport across Assam, Meghalaya, Arunachal Pradesh, Sikkim, and Nagaland. Plan yours on WhatsApp.",
  path: "/",
});

const STEPS = [
  {
    title: "Send a message",
    body: "Your dates, and roughly where you have in mind.",
  },
  {
    title: "We plan the route",
    body: "Built around weather, road conditions, and your pace.",
  },
  {
    title: "One car, one driver",
    body: "The same vehicle throughout, and someone at the end of the phone.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <DestinationMarquee />

      {/* Featured trips */}
      <Container width="wide" className="pt-20 lg:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <Eyebrow>Selected journeys</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-[1.08] sm:text-[2.75rem]">
              Trips we run <span className="accent">often</span>
            </h2>
          </div>
          <Link
            href="/packages"
            className="link-rule text-[0.9375rem] font-medium text-ink"
          >
            All nine trips
          </Link>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PACKAGES.slice(0, 3).map((item, index) => (
            <li key={item.slug} className="reveal">
              <PackageCard
                item={item}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2.5rem)"
                priority={index === 0}
              />
            </li>
          ))}
        </ul>
      </Container>

      {/* How it works */}
      <section className="mt-24 bg-ink py-20 text-bone lg:mt-32 lg:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow tone="dark">How it works</Eyebrow>
              <h2 className="mt-6 text-[2rem] leading-[1.08] text-bone sm:text-[2.5rem]">
                Three steps, and no forms.
              </h2>
            </div>
            <ol className="lg:col-span-8 lg:pt-2">
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="reveal grid grid-cols-[3rem_1fr] gap-x-6 border-t border-bone/15 py-7 last:border-b sm:grid-cols-[4rem_1fr]"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl text-bone/40 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.5rem] text-bone">
                      <span className="sr-only">Step {index + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md leading-relaxed text-bone/70">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Services */}
      <Container width="wide" className="pt-20 lg:pt-28">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <ServiceTile
            href="/cabs"
            eyebrow="Cabs & EV"
            title="Airport transfers and everyday cabs"
            image={IMAGES.cabsHero}
          />
          <ServiceTile
            href="/corporate"
            eyebrow="Corporate"
            title="Staff transport and offsites"
            image={IMAGES.corporateHero}
          />
        </div>
      </Container>

      {/* Local knowledge */}
      <Container width="wide" className="pt-24 lg:pt-32">
        <div className="reveal grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative aspect-4/5 overflow-hidden bg-sand lg:col-span-5">
            <Image
              src={IMAGES.homeFood.src}
              alt={IMAGES.homeFood.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 40vw, calc(100vw - 2.5rem)"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Local knowledge</Eyebrow>
            <h2 className="mt-6 text-[2rem] leading-[1.08] sm:text-[2.5rem]">
              Which morning, and <span className="accent">which road</span>
            </h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-taupe">
              Bihu is better in a neighbourhood ground than on a stage. A gorge
              viewpoint is worth an hour before the cloud arrives, and nothing
              after.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/festivals"
                className="link-rule text-[0.9375rem] font-medium text-ink"
              >
                Festivals by month
              </Link>
              <Link
                href="/impact"
                className="link-rule text-[0.9375rem] font-medium text-ink"
              >
                How we travel
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Reviews */}
      <section className="mt-24 bg-ink py-20 lg:mt-32 lg:py-28">
        <Container width="wide">
          <Eyebrow tone="dark">Travellers</Eyebrow>
          <h2 className="mt-6 max-w-xl text-[2rem] leading-[1.08] text-bone sm:text-[2.5rem]">
            What people say afterwards
          </h2>
          <p className="mt-4 max-w-md text-[0.9375rem] text-bone/60">
            Illustrative feedback while we gather published reviews.
          </p>
          <div className="mt-12">
            <ReviewCarousel reviews={REVIEWS} />
          </div>
        </Container>
      </section>
    </>
  );
}

function ServiceTile({
  href,
  eyebrow,
  title,
  image,
}: {
  href: string;
  eyebrow: string;
  title: string;
  image: (typeof IMAGES)[keyof typeof IMAGES];
}) {
  return (
    <article className="group reveal relative">
      <div className="relative aspect-[3/2] overflow-hidden bg-sand">
        <Image
          src={image.src}
          alt=""
          fill
          loading="lazy"
          sizes="(min-width: 768px) 46vw, calc(100vw - 2.5rem)"
          className="zoom-slow object-cover"
        />
      </div>
      <div className="mt-5 border-t border-line pt-4">
        <p className="text-label font-medium text-taupe uppercase">{eyebrow}</p>
        <h3 className="mt-3 max-w-sm text-[1.625rem] leading-[1.12] text-ink">
          <Link
            href={href}
            className="transition-colors after:absolute after:inset-0 group-hover:text-clay"
          >
            {title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
