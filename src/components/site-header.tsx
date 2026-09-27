"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useId, useState } from "react";

import { SiteMenu } from "@/components/site-menu";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { cn } from "@/lib/cn";
import { NAV, SITE } from "@/lib/site";
import { enquiry } from "@/lib/whatsapp";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const closeMenu = useCallback(() => setOpen(false), []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-site-chrome="header"
      className="sticky top-0 z-50 border-b border-line bg-bone/88 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-5 sm:px-8 lg:h-[4.75rem] xl:gap-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center"
          aria-label={`${SITE.name} home`}
        >
          <Image
            src="/brand/smarto-wordmark.webp"
            alt={SITE.name}
            width={720}
            height={160}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-11 items-center text-[0.9375rem] transition-colors",
                    isActive(item.href)
                      ? "text-ink after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:bg-clay"
                      : "text-taupe hover:text-ink",
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
          >
            Plan a trip
          </WhatsAppLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="ml-auto inline-flex size-11 items-center justify-center border border-line-strong text-ink transition-colors hover:bg-sand lg:hidden"
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

      {open && (
        <SiteMenu
          id={panelId}
          onClose={closeMenu}
          location="header"
          currentPath={pathname}
        />
      )}
    </header>
  );
}
