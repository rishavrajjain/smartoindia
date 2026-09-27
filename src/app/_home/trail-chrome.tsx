"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { SiteMenu } from "@/components/site-menu";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import { enquiry } from "@/lib/whatsapp";

import type { SearchEntry } from "./data";
import { TrailSearch } from "./trail-search";

/*
 * The page's own chrome. Over the hero the header is transparent with the
 * main links; once the hero scrolls away it turns into a solid navy bar
 * carrying the search (PickYourTrail's sticky search bar), and a floating
 * WhatsApp pill appears bottom right.
 */

const HEADER_LINKS = [
  { href: "/packages", label: "Journeys" },
  { href: "/cabs", label: "Cabs" },
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/festivals", label: "Festivals" },
  { href: "/corporate", label: "Corporate" },
] as const;

const PLAN = enquiry("I would like to plan a trip in the Northeast.");

export function TrailChrome({
  index,
  sentinelId,
}: {
  index: SearchEntry[];
  /** Element at the hero's foot; once it leaves the viewport the bar goes solid. */
  sentinelId: string;
}) {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const closeMenu = useCallback(() => setMenu(false), []);

  // Measured on scroll and resize rather than observed: an observer can miss
  // the change when the viewport resizes mid-scroll (rotation, window drag).
  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setSolid(sentinel.getBoundingClientRect().top < 72);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sentinelId]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
          solid
            ? "bg-clay-deep/95 shadow-[0_8px_30px_rgba(10,9,30,0.35)] backdrop-blur-md"
            : "bg-gradient-to-b from-[rgba(28,26,69,0.55)] to-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-5 sm:px-8 lg:h-[4.5rem] lg:gap-8">
          <Link
            href="/"
            aria-label={`${SITE.name} home`}
            className={cn("shrink-0", solid && "hidden sm:block")}
          >
            <Image
              src="/brand/smarto-wordmark-light.webp"
              alt={SITE.name}
              width={720}
              height={160}
              priority
              className="h-6 w-auto lg:h-7"
            />
          </Link>

          {solid ? (
            <TrailSearch
              index={index}
              variant="bar"
              className="min-w-0 flex-1 sm:max-w-md lg:mx-auto"
            />
          ) : (
            <nav aria-label="Main" className="ml-auto hidden lg:block">
              <ul className="flex items-center gap-7 xl:gap-9">
                {HEADER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex h-11 items-center text-[0.9375rem] text-bone/85 transition-colors hover:text-bone"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <WaCta
            message={PLAN}
            location="b-header"
            className={cn(
              "hidden min-h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[0.875rem] font-extrabold transition-colors lg:inline-flex",
              solid
                ? "bg-green-deep text-white hover:bg-[#2f8563]"
                : "bg-bone text-ink hover:bg-sand",
            )}
          >
            <WhatsAppIcon />
            Plan a trip
          </WaCta>

          <Link
            href="/login"
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full text-bone ring-1 ring-white/25 transition-colors hover:bg-white/10",
              !solid && "ml-auto lg:ml-0",
            )}
          >
            <span className="sr-only">Log in</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setMenu(true)}
            aria-expanded={menu}
            aria-controls="trail-menu"
            className="grid size-11 shrink-0 place-items-center rounded-full text-bone ring-1 ring-white/25 transition-colors hover:bg-white/10"
          >
            <span className="sr-only">Open menu</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="size-5">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </header>

      {menu && <SiteMenu id="trail-menu" onClose={closeMenu} location="b-header" />}

      {/* Mounted only once the hero is gone, so it never sits in the tab
          order while invisible. */}
      {solid && !menu && (
        <WaCta
          message={PLAN}
          location="b-float"
          className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-full bg-green-deep pr-5 pl-4 text-[0.875rem] font-extrabold text-white shadow-[0_14px_36px_rgba(28,26,69,0.35)] ring-4 ring-white/70 motion-safe:animate-rise sm:right-6 sm:bottom-6"
        >
          <WhatsAppIcon className="size-5" />
          Plan on WhatsApp
        </WaCta>
      )}
    </>
  );
}
