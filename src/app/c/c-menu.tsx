"use client";

import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import { WaCta } from "@/components/ui/wa-cta";
import { NAV } from "@/lib/site";
import { enquiry, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

/* Same face as the page (Next dedupes the request). Declared here because the
   menu portals to document.body, outside the page wrapper that carries the
   font variable and palette, so the panel brings its own. */
const cormorant = Cormorant_Garamond({
  variable: "--font-c-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

/**
 * Top-right hamburger for the night-drive concept. Opens a full-screen
 * near-black overlay with the site's routes in the concept's own type and
 * gold, since /c's header carries nothing but the wordmark.
 */
export function CMenu() {
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
        className="inline-flex size-11 items-center justify-center rounded-full text-[#ece7db] transition-colors hover:bg-[rgba(236,231,219,0.12)]"
      >
        <span className="sr-only">Open menu</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          className="size-6 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.5))]"
        >
          <path d="M4 8h16M4 16h16" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            id={panelId}
            className={`${cormorant.variable} animate-rise fixed inset-x-0 top-0 bottom-0 z-[60] mx-auto flex max-w-[26.5rem] flex-col bg-[#0b0f0c] text-[#ece7db] ring-1 ring-[rgba(236,231,219,0.1)]`}
          >
            <div className="flex h-20 shrink-0 items-center justify-between px-6">
              <span className="text-[0.6875rem] font-medium tracking-[0.32em] text-[#a8ad9f] uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full text-[#ece7db] transition-colors hover:bg-[rgba(236,231,219,0.12)]"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav
              aria-label="Site"
              className="flex-1 overflow-y-auto px-6"
            >
              <ul className="mx-auto max-w-xl border-t border-[rgba(236,231,219,0.14)]">
                {NAV.map((item, index) => (
                  <li
                    key={item.href}
                    className="border-b border-[rgba(236,231,219,0.14)]"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-5"
                    >
                      <span
                        aria-hidden="true"
                        className="text-[0.6875rem] font-medium tracking-[0.32em] text-[#c9a962] tabular-nums"
                      >
                        0{index + 1}
                      </span>
                      <span className="flex-1">
                        <span className="block font-[family-name:var(--font-c-display)] text-[1.75rem] leading-tight font-light transition-colors group-hover:text-[#c9a962]">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-[#a8ad9f]">
                          {item.blurb}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[0.6875rem] font-medium tracking-[0.32em] text-[#c9a962]"
                    >
                      ↤
                    </span>
                    <span className="font-[family-name:var(--font-c-display)] text-[1.25rem] font-light text-[#a8ad9f] italic">
                      Classic site
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="shrink-0 px-6 py-6">
              <div className="mx-auto max-w-xl">
                <WaCta
                  message={enquiry(
                    "I would like to plan a private Northeast journey.",
                  )}
                  location="concept-c"
                  className="inline-flex min-h-13 w-full items-center justify-center gap-3 border border-[#c9a962] px-8 text-[0.8125rem] font-medium tracking-[0.22em] text-[#c9a962] uppercase transition-colors duration-500 hover:bg-[#c9a962] hover:text-[#0b0f0c]"
                >
                  Plan a journey
                </WaCta>
                <p className="mt-3 text-center text-[0.8125rem] text-[#a8ad9f]">
                  {WHATSAPP_DISPLAY} · usually replies the same day
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
