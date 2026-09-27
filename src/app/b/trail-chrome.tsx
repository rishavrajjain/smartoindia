"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/cn";
import { NAV, SITE } from "@/lib/site";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!menu) return;
    const button = menuButtonRef.current;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [menu]);

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
            href="/b"
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

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenu(true)}
            aria-expanded={menu}
            aria-controls="trail-menu"
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full text-bone ring-1 ring-white/25 transition-colors hover:bg-white/10",
              !solid && "ml-auto lg:ml-0",
            )}
          >
            <span className="sr-only">Open menu</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="size-5">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </header>

      {menu && (
        <div
          id="trail-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] overflow-y-auto bg-clay-deep text-bone motion-safe:animate-rise"
        >
          <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-5 pt-4 pb-10 sm:px-8">
            <div className="flex h-12 items-center justify-between">
              <Image
                src="/brand/smarto-wordmark-light.webp"
                alt={SITE.name}
                width={720}
                height={160}
                className="h-6 w-auto"
              />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setMenu(false)}
                className="grid size-11 place-items-center rounded-full ring-1 ring-white/25 hover:bg-white/10"
              >
                <span className="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="size-5">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <nav aria-label="Site" className="mt-8">
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {NAV.map((item) => (
                  <li key={item.href} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      onClick={() => setMenu(false)}
                      className="group flex flex-col py-4"
                    >
                      <span className="text-[1.5rem] font-extrabold transition-colors group-hover:text-green">
                        {item.label}
                      </span>
                      <span className="mt-0.5 text-[0.8125rem] text-bone/60">
                        {item.blurb}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <WaCta
              message={PLAN}
              location="b-header"
              className="mt-10 inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 self-start rounded-full bg-green-deep px-7 text-[0.9375rem] font-extrabold text-white"
            >
              <WhatsAppIcon />
              Plan on WhatsApp
            </WaCta>
          </div>
        </div>
      )}

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
