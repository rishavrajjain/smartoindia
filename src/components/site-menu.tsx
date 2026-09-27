"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
import { type CtaLocation, enquiry } from "@/lib/whatsapp";

/*
 * The site menu, shared by the homepage and every inner page: a white panel
 * that drops in over a blurred page, with the pages as two-column tiles and
 * Plan a trip and Log in side by side. While it is open it locks the page
 * behind, closes on Escape or a click outside, and hands focus back to
 * whatever opened it. It renders into document.body: a header with a
 * backdrop filter would otherwise trap the fixed overlay inside itself.
 */

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

const PLAN = enquiry("I would like to plan a trip in the Northeast.");

export function SiteMenu({
  id,
  onClose,
  location,
  currentPath,
}: {
  id: string;
  onClose: () => void;
  location: CtaLocation;
  /** Highlights the tile for the page being viewed. */
  currentPath?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose]);

  const isCurrent = (href: string) =>
    Boolean(currentPath) &&
    (currentPath === href || currentPath!.startsWith(`${href}/`));

  return createPortal(
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-clay-deep/45 backdrop-blur-sm motion-safe:animate-fade-in"
      />
      <div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-x-3 top-3 z-[61] max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-[1.75rem] bg-bone p-4 text-ink shadow-[0_30px_80px_rgba(10,9,30,0.45)] motion-safe:animate-rise sm:inset-x-auto sm:right-6 sm:w-[34rem] sm:p-5 lg:top-4"
      >
        <span aria-hidden="true" className="spark-fill absolute inset-x-8 top-0 h-1 rounded-b-full" />
        <div className="flex items-center justify-between pl-1">
          <Link href="/" onClick={onClose} aria-label={`${SITE.name} home`}>
            <Image
              src="/brand/smarto-wordmark.webp"
              alt={SITE.name}
              width={720}
              height={160}
              className="h-6 w-auto"
            />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
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
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group flex h-full items-start gap-2.5 rounded-2xl p-3 transition-colors duration-200",
                      current
                        ? "bg-ink text-bone"
                        : "bg-sand hover:bg-clay-soft hover:ring-1 hover:ring-line-strong",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-200",
                        current
                          ? "bg-green text-clay-deep"
                          : "bg-bone text-ink group-hover:bg-green-deep group-hover:text-white",
                      )}
                    >
                      <Icon className="size-[1.125rem]" />
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block text-[0.875rem] leading-tight font-extrabold sm:text-[0.9375rem]">
                        {item.label}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-[0.6875rem] leading-snug sm:text-[0.75rem]",
                          current ? "text-bone/70" : "text-taupe",
                        )}
                      >
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
            location={location}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-green-deep px-3 text-[0.875rem] font-extrabold text-white"
          >
            <WhatsAppIcon />
            Plan a trip
          </WaCta>
          <Link
            href="/login"
            onClick={onClose}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl text-[0.875rem] font-extrabold text-ink ring-1 ring-line-strong transition-colors hover:bg-sand"
          >
            <UserGlyph className="size-[1.125rem]" />
            Log in
          </Link>
        </div>
      </div>
    </>,
    document.body,
  );
}
