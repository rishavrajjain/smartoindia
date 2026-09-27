"use client";

import { useCallback, useId, useState } from "react";

import { SiteMenu } from "@/components/site-menu";

/**
 * Top-right hamburger for the classic phone-first homepage (/b). It sits in
 * the hero, so the button is light over the sky; it opens the shared site
 * menu used on every other page.
 */
export function HomeMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);

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

      {open && <SiteMenu id={panelId} onClose={close} location="home-hero" />}
    </>
  );
}
