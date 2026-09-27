"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  BuildingIcon,
  CalendarIcon,
  CarIcon,
  PeopleIcon,
  SendIcon,
  SuitcaseIcon,
} from "@/components/ui/line-icons";
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

type GlyphProps = { className?: string };

function glyph(path: React.ReactNode) {
  return function Glyph({ className }: GlyphProps) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
        {path}
      </svg>
    );
  };
}

const SparkGlyph = glyph(<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />);
const LeafGlyph = glyph(
  <>
    <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
    <path d="M5 19 13 11" />
  </>,
);
const ArrowGlyph = glyph(<path d="M5 12h14M13 6l6 6-6 6" />);
const UserGlyph = glyph(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </>,
);

const MENU_ICON: Record<string, React.ComponentType<GlyphProps>> = {
  "/packages": SuitcaseIcon,
  "/cabs": CarIcon,
  "/flights": SendIcon,
  "/events": CalendarIcon,
  "/corporate": BuildingIcon,
  "/partners": PeopleIcon,
  "/festivals": SparkGlyph,
  "/impact": LeafGlyph,
};

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
            ref={menuButtonRef}
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

      {menu && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setMenu(false)}
            className="fixed inset-0 z-[60] bg-clay-deep/45 backdrop-blur-sm motion-safe:animate-fade-in"
          />
          <div
            id="trail-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-x-3 top-3 z-[61] max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-[1.75rem] bg-bone p-4 text-ink shadow-[0_30px_80px_rgba(10,9,30,0.45)] motion-safe:animate-rise sm:inset-x-auto sm:right-6 sm:w-[34rem] sm:p-5 lg:top-4"
          >
            <span aria-hidden="true" className="spark-fill absolute inset-x-8 top-0 h-1 rounded-b-full" />
            <div className="flex items-center justify-between pl-1">
              <Image
                src="/brand/smarto-wordmark.webp"
                alt={SITE.name}
                width={720}
                height={160}
                className="h-6 w-auto"
              />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setMenu(false)}
                className="grid size-11 place-items-center rounded-full bg-sand text-ink transition-colors hover:bg-ink hover:text-bone"
              >
                <span className="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="size-5">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Site" className="mt-4">
              <ul className="grid grid-cols-2 gap-2">
                {NAV.map((item) => {
                  const Icon = MENU_ICON[item.href] ?? ArrowGlyph;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenu(false)}
                        className="group flex h-full items-start gap-2.5 rounded-2xl bg-sand p-3 transition-colors duration-200 hover:bg-clay-soft hover:ring-1 hover:ring-line-strong"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-bone text-ink transition-colors duration-200 group-hover:bg-green-deep group-hover:text-white">
                          <Icon className="size-[1.125rem]" />
                        </span>
                        <span className="min-w-0 pt-0.5">
                          <span className="block text-[0.875rem] leading-tight font-extrabold sm:text-[0.9375rem]">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[0.6875rem] leading-snug text-taupe sm:text-[0.75rem]">
                            {item.short}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <WaCta
                message={PLAN}
                location="b-header"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-green-deep px-3 text-[0.875rem] font-extrabold text-white"
              >
                <WhatsAppIcon />
                Plan a trip
              </WaCta>
              <Link
                href="/login"
                onClick={() => setMenu(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl text-[0.875rem] font-extrabold text-ink ring-1 ring-line-strong transition-colors hover:bg-sand"
              >
                <UserGlyph className="size-[1.125rem]" />
                Log in
              </Link>
            </div>
          </div>
        </>
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
