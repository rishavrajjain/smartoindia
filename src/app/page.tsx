import Image from "next/image";
import Link from "next/link";
import type { Viewport } from "next";

import { ReviewCarousel } from "@/components/sections/review-carousel";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { IMAGES } from "@/data/images";
import { FEATURED_PACKAGES } from "@/data/packages";
import { REVIEWS } from "@/data/reviews";
import { pageMetadata } from "@/lib/seo";
import { NAV, SITE } from "@/lib/site";
import { WHATSAPP_DISPLAY, enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Smarto: Northeast India, travelled well",
  description:
    "Road trips, festival journeys, and everyday transport across Assam, Meghalaya, Arunachal Pradesh, Sikkim, and Nagaland. Plan yours on WhatsApp.",
  path: "/",
});

export const viewport: Viewport = {
  themeColor: "#1e2422",
  colorScheme: "light",
};

/**
 * Ultra-minimal homepage, phone-first everywhere.
 *
 * One column at phone width on every screen — on desktop it sits centred on a
 * dark backdrop. It opens on the valley photograph with nothing written over
 * it; every class in this file is non-responsive so the layout cannot drift
 * between breakpoints. Global site chrome steps aside (data-page-theme); the
 * fixed WhatsApp bar at the bottom is the one persistent action.
 */

const FEATURED = FEATURED_PACKAGES.slice(0, 3);

export default function HomePage() {
  return (
    <div data-page-theme="mobile-frame">
      <div className="relative mx-auto min-h-svh max-w-[26.5rem] bg-bone text-ink shadow-[0_0_60px_rgba(0,0,0,0.55)]">
        {/* ——— The picture. Nothing on it but the wordmark. */}
        <section aria-label={IMAGES.homeHeroValley.alt} className="relative h-svh">
          <Image
            src={IMAGES.homeHeroValley.src}
            alt={IMAGES.homeHeroValley.alt}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 424px) 424px, 100vw"
            className="object-cover"
          />
          {/* Cloud pouring over the pass — see .cloudfall-veil in globals. */}
          <div aria-hidden="true" className="cloudfall-veil">
            <div className="cloudfall" />
            <div className="cloudfall cloudfall-b" />
            <div className="clouddrift" />
          </div>
          <header className="absolute inset-x-0 top-0 flex justify-center pt-6">
            <Link href="/" aria-label={`${SITE.name} home`}>
              <Image
                src="/brand/smarto-wordmark-light.webp"
                alt={SITE.name}
                width={720}
                height={160}
                priority
                className="h-5 w-auto opacity-90"
              />
            </Link>
          </header>
        </section>

        {/* ——— One quiet line, one action. */}
        <section aria-labelledby="home-title" className="px-6 pt-12 pb-4 text-center">
          <h1 id="home-title" className="text-[1.75rem] leading-snug">
            Northeast India,
            <br />
            <span className="accent">travelled well</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-[17rem] text-[0.9375rem] leading-relaxed text-taupe">
            Road trips, festivals and everyday cabs. One message plans all of
            it.
          </p>
          <div className="mt-7 flex flex-col items-center gap-4">
            <WhatsAppLink
              message={enquiry(
                "I would like to plan a trip in the Northeast. Here is what I have in mind:",
              )}
              location="home-hero"
              size="md"
            >
              Plan on WhatsApp
            </WhatsAppLink>
          </div>
        </section>

        {/* ——— The site, as an index. */}
        <nav aria-label="Explore" className="px-6 pt-10">
          <ul className="border-t border-line">
            {NAV.map((item, index) => (
              <li key={item.href} className="border-b border-line">
                <Link href={item.href} className="flex items-baseline gap-4 py-4">
                  <span aria-hidden="true" className="text-label font-medium text-taupe tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.25rem] text-ink">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-taupe">
                      {item.blurb}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-clay">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ——— Three trips, plainly. */}
        <section aria-labelledby="home-trips" className="px-6 pt-14">
          <h2 id="home-trips" className="text-label font-medium text-taupe uppercase">
            Often planned
          </h2>
          <ul className="mt-5 space-y-10">
            {FEATURED.map((pkg) => (
              <li key={pkg.slug}>
                <Link href={`/packages/${pkg.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <Image
                      src={pkg.hero.src}
                      alt={pkg.hero.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 424px) 376px, 92vw"
                      className="zoom-slow object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-[1.25rem] leading-snug">{pkg.title}</h3>
                  <p className="mt-1 text-label font-medium text-taupe uppercase">
                    {pkg.durationLabel} · {pkg.priceLabel}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/packages" className="link-rule text-[0.9375rem] font-medium text-ink">
              All nine trips
            </Link>
          </p>
        </section>

        {/* ——— Quiet proof. */}
        <section aria-labelledby="home-reviews" className="pt-14">
          <h2 id="home-reviews" className="px-6 text-label font-medium text-taupe uppercase">
            From past trips
          </h2>
          <div className="mt-5 px-6">
            <ReviewCarousel reviews={REVIEWS} />
          </div>
        </section>

        {/* ——— Footer. */}
        <footer className="mt-16 border-t border-line px-6 pt-8 pb-32 text-center">
          <p className="text-label font-medium text-taupe uppercase">
            Assam · Meghalaya · Arunachal
            <br />
            Sikkim · Nagaland
          </p>
          <p className="mt-4 text-[0.8125rem] text-taupe">
            {WHATSAPP_DISPLAY} · Based in {SITE.base}
          </p>
          <p className="mt-6 text-[0.75rem] text-taupe/80">
            © {new Date().getFullYear()} {SITE.legalName}. Trip details are
            confirmed on WhatsApp before travel.
          </p>
          <ul className="mt-4 flex justify-center gap-4 text-[0.75rem] text-taupe/80">
            {["a", "b", "c", "d", "e", "f"].map((concept) => (
              <li key={concept}>
                <Link href={`/${concept}`} className="underline underline-offset-4 hover:text-ink">
                  {concept.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </footer>

        {/* ——— The one persistent action, kept inside the frame. */}
        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[26.5rem]">
          <div
            className="border-t border-line bg-bone/93 px-4 pt-3 backdrop-blur-lg"
            style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
          >
            <WhatsAppLink
              message={enquiry("I would like to plan a trip in the Northeast.")}
              location="sticky"
              size="md"
              fullWidth
            >
              Plan my trip on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </div>
  );
}
