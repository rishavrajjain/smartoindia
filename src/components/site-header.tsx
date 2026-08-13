"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { cn } from "@/lib/cn";
import { NAV, SITE } from "@/lib/site";
import { enquiry } from "@/lib/whatsapp";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();

  // The home page opens with a full-height photograph, so the header sits over
  // it until the visitor scrolls, then takes on a solid background.
  const isHome = pathname === "/";
  const overlay = isHome && !scrolled && !open;

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // The panel is closed from the link handlers below rather than from a route
  // effect, which would trigger a cascading render on every navigation.

  // While the panel is open: lock the page behind it and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "top-0 z-50 transition-colors duration-500",
        // Fixed on the home page so it floats over the opening photograph;
        // sticky elsewhere so it still occupies layout space at the top.
        isHome ? "fixed inset-x-0" : "sticky",
        overlay
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-bone/90 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:h-[4.75rem]">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center"
          aria-label={`${SITE.name} home`}
        >
          <Image
            src={
              overlay
                ? "/brand/smarto-wordmark-light.webp"
                : "/brand/smarto-wordmark.webp"
            }
            alt={SITE.name}
            width={720}
            height={160}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-11 items-center text-[0.9375rem] transition-colors",
                    overlay && "text-bone/75 hover:text-bone",
                    overlay &&
                      isActive(item.href) &&
                      "text-bone after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:bg-bone/70",
                    !overlay && isActive(item.href)
                      ? "text-ink after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:bg-clay"
                      : !overlay && "text-taupe hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden lg:ml-0 lg:block">
          <WhatsAppLink
            message={enquiry("I would like to plan a trip in the Northeast.")}
            location="header"
            size="sm"
            tone={overlay ? "onDark" : "primary"}
          >
            Plan a trip
          </WhatsAppLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "ml-auto inline-flex size-11 items-center justify-center border transition-colors lg:hidden",
            overlay
              ? "border-bone/35 text-bone hover:bg-bone/10"
              : "border-line-strong text-ink hover:bg-sand",
          )}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-5"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 8h18M3 16h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel. Rendered only when open so its links stay out of the tab
          order otherwise, without needing an inert polyfill. */}
      {open && (
        <div
          id={panelId}
          className="animate-rise border-t border-line bg-bone lg:hidden"
        >
          <nav aria-label="Mobile" className="px-5 py-2 sm:px-8">
            <ul className="divide-y divide-line">
              {NAV.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="text-label font-medium text-taupe tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-2xl",
                        isActive(item.href) ? "text-clay italic" : "text-ink",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="py-5">
              <WhatsAppLink
                message={enquiry(
                  "I would like to plan a trip in the Northeast.",
                )}
                location="header"
                size="md"
                fullWidth
              >
                Plan on WhatsApp
              </WhatsAppLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
