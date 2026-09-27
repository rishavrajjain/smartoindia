import Image from "next/image";
import type { Metadata, Viewport } from "next";

import { pageMetadata } from "@/lib/seo";

import { LoginPanel } from "./login-panel";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Log in",
    description:
      "Sign in to Smarto as an admin, corporate client, travel agent or partner.",
    path: "/login",
  }),
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1c1a45",
  colorScheme: "light",
};

/*
 * The sign-in page: an overview of everything Smarto runs, drifting in two
 * photo columns behind a navy wash, beside the sign-in card. Site chrome
 * steps aside (data-page-theme) so the page reads as its own place.
 */

const SERVICES = [
  { label: "Cabs", src: "/images/fleet-cabs-hero.webp" },
  { label: "Flights", src: "/images/svc-flights-hero.webp" },
  { label: "Hotels", src: "/images/dest-shillong.webp" },
  { label: "Corporate", src: "/images/fleet-corporate-porch.webp" },
  { label: "Events", src: "/images/fleet-events-wedding.webp" },
  { label: "Packages", src: "/images/pkg-meghalaya-waterfalls.webp" },
  { label: "Airport rides", src: "/images/fleet-cabs-airport.webp" },
  { label: "Partners", src: "/images/fleet-partners-hotel.webp" },
];

const COLUMNS = [SERVICES.slice(0, 4), SERVICES.slice(4)];

export default function LoginPage() {
  return (
    <div
      data-page-theme="login"
      className="grid min-h-svh bg-bone lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
    >
      {/* --- The overview: Smarto's services, drifting. */}
      <section
        aria-label="What Smarto runs"
        className="relative isolate h-[19rem] overflow-hidden bg-clay-deep text-bone sm:h-96 lg:h-auto"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 grid grid-cols-2 gap-3 p-3 lg:gap-4 lg:p-4">
          {COLUMNS.map((column, c) => (
            <div key={c} className="overflow-hidden">
              <ul
                className={
                  c === 0
                    ? "flex flex-col gap-3 motion-safe:animate-drift lg:gap-4"
                    : "flex -translate-y-1/4 flex-col gap-3 motion-safe:animate-drift-reverse lg:gap-4"
                }
              >
                {[0, 1].map((copy) =>
                  column.map((item) => (
                    <li
                      key={`${copy}-${item.label}`}
                      className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]"
                    >
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 26vw, 50vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-3 left-3 hidden rounded-full bg-clay-deep/70 px-3 py-1 text-[0.6875rem] font-extrabold tracking-[0.12em] text-bone uppercase backdrop-blur-sm sm:inline-block">
                        {item.label}
                      </span>
                    </li>
                  )),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(28,26,69,0.96)] via-[rgba(28,26,69,0.55)] to-[rgba(28,26,69,0.35)] lg:bg-gradient-to-tr lg:from-[rgba(28,26,69,0.97)] lg:via-[rgba(28,26,69,0.7)] lg:to-[rgba(28,26,69,0.3)]"
        />
        <div aria-hidden="true" className="spark-glow absolute -bottom-24 -left-20 -z-10 size-96" />

        <div className="flex h-full flex-col justify-end px-6 pt-6 pb-14 sm:px-10 sm:pb-16 lg:p-14">
          <p className="text-label font-extrabold text-green uppercase">
            One login, all of Smarto
          </p>
          <p className="mt-3 max-w-md text-[1.5rem] leading-[1.12] sm:text-[2.25rem] lg:text-[2.75rem]">
            Cabs, flights, hotels and journeys,{" "}
            <span className="accent">run from one place.</span>
          </p>
          <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
            {["Cabs", "Flights", "Packages", "Hotels", "Corporate", "Partners"].map((s) => (
              <li
                key={s}
                className="rounded-full bg-white/10 px-3.5 py-1.5 text-[0.75rem] font-extrabold text-bone/85 ring-1 ring-white/15 backdrop-blur-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- The sign-in card. */}
      <section className="relative -mt-8 flex justify-center rounded-t-[2rem] bg-bone px-5 pt-10 pb-12 sm:px-8 lg:mt-0 lg:items-center lg:rounded-none lg:py-16">
        <LoginPanel />
      </section>
    </div>
  );
}
