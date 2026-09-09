"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import { WaCta } from "@/components/ui/wa-cta";
import { NAV } from "@/lib/site";
import { enquiry, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

/**
 * Top-right hamburger for the homepage.
 *
 * The homepage has no persistent header nav, the route bar covers in-page
 * jumps, so this opens a full-frame overlay with the site's actual routes.
 * Rendered inside the hero, so the button is light over the sky; the panel
 * locks scroll and closes on Escape or navigation.
 */
export function HomeMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full text-bone transition-colors hover:bg-bone/15"
      >
        <span className="sr-only">Open menu</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
          className="size-6 [filter:drop-shadow(0_1px_3px_rgba(12,8,5,0.45))]"
        >
          <path d="M4 8h16M4 16h16" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            id={panelId}
            className="animate-rise fixed inset-x-0 top-0 bottom-0 z-[60] mx-auto flex max-w-[26.5rem] flex-col bg-bone"
          >
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-6">
            <span className="text-label font-extrabold text-taupe uppercase">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
            >
              <span className="sr-only">Close menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-6"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Site" className="flex-1 overflow-y-auto px-6">
            <ul className="border-t border-line">
              {NAV.map((item, index) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="text-label font-extrabold text-taupe tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-2xl text-ink">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-taupe">
                        {item.blurb}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-line px-6 py-5">
            <WaCta
              message={enquiry("I would like to plan a trip in the Northeast.")}
              location="header"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-sm bg-ink px-6 text-[0.9375rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
            >
              Plan on WhatsApp
            </WaCta>
            <p className="mt-3 text-center text-[0.8125rem] text-taupe">
              {WHATSAPP_DISPLAY} · usually replies the same day
            </p>
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
