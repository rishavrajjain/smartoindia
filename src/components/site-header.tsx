"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useId, useState } from "react";

import { SiteMenu } from "@/components/site-menu";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/cn";
import { HEADER_NAV, SITE } from "@/lib/site";
import { type CtaLocation, enquiry } from "@/lib/whatsapp";

/*
 * The one header bar every page shows: the same links, the same trip
 * button, log in and the tile menu, in the same places. Only its colours
 * change: light on the page, or light-on-photo over the homepage hero.
 */

const PLAN = enquiry("I would like to plan a trip in the Northeast.");

export function HeaderBar({
  tone,
  location,
}: {
  tone: "light" | "overlay";
  location: CtaLocation;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const closeMenu = useCallback(() => setOpen(false), []);
  const overlay = tone === "overlay";

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const iconButton = cn(
    "grid size-11 shrink-0 place-items-center rounded-full ring-1 transition-colors",
    overlay ? "text-bone ring-white/25 hover:bg-white/10" : "text-ink ring-line-strong hover:bg-sand",
  );

  return (
    <>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-5 sm:px-8 lg:h-[4.5rem] lg:gap-8">
        <Link href="/" aria-label={`${SITE.name} home`} className="mr-auto shrink-0 lg:mr-0">
          <Image
            src={overlay ? "/brand/smarto-wordmark-light.webp" : "/brand/smarto-wordmark.webp"}
            alt={SITE.name}
            width={720}
            height={160}
            priority
            className="h-6 w-auto lg:h-7"
          />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {HEADER_NAV.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center text-[0.9375rem] transition-colors",
                      overlay ? "text-bone/85 hover:text-bone" : active ? "text-ink" : "text-taupe hover:text-ink",
                      active &&
                        "after:absolute after:inset-x-0 after:bottom-2 after:h-[2px] after:rounded-full after:bg-[linear-gradient(90deg,#282560_0%,#7b3f7e_50%,#c44868_100%)]",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <WaCta
          message={PLAN}
          location={location}
          className={cn(
            "hidden min-h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[0.875rem] font-extrabold transition-colors lg:inline-flex",
            overlay ? "bg-bone text-ink hover:bg-sand" : "bg-ink text-bone hover:bg-clay-deep",
          )}
        >
          <WhatsAppIcon />
          Plan a trip
        </WaCta>

        <Link href="/login" className={iconButton}>
          <span className="sr-only">Log in</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls={menuId}
          className={iconButton}
        >
          <span className="sr-only">Open menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="size-5">
            <path d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>

      {open && <SiteMenu id={menuId} onClose={closeMenu} location={location} currentPath={pathname} />}
    </>
  );
}

export function SiteHeader() {
  return (
    <header
      data-site-chrome="header"
      className="sticky top-0 z-50 border-b border-line bg-bone/90 backdrop-blur-md"
    >
      <HeaderBar tone="light" location="header" />
    </header>
  );
}
