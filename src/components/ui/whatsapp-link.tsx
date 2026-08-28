"use client";

import type { ReactNode } from "react";

import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { type CtaLocation, whatsappUrl } from "@/lib/whatsapp";

import { WhatsAppIcon } from "./whatsapp-icon";

type Tone = "primary" | "accent" | "onDark" | "quiet" | "link";

const TONES: Record<Tone, string> = {
  // bone on ink — 18.8:1
  primary: "bg-ink text-bone hover:bg-clay-deep",
  // bone on clay — 5.4:1
  accent: "bg-clay text-bone hover:bg-clay-deep",
  // ink on bone — 18.8:1
  onDark: "bg-bone text-ink hover:bg-white",
  quiet: "border border-line-strong text-ink hover:border-ink/40 hover:bg-sand",
  // Underlined text link, for placements where a filled button would compete
  // with the headline.
  link: "link-rule text-clay hover:text-clay-deep",
};

interface WhatsAppLinkProps {
  /** Prefilled message body. Build it with `enquiry()` for a consistent opener. */
  message: string;
  /** Where this CTA lives, for conversion attribution. */
  location: CtaLocation;
  /** Optional subject (package slug, service id) recorded alongside the location. */
  subject?: string;
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

const SIZES = {
  // min-h keeps every CTA at or above the 44px tap target.
  sm: "min-h-11 px-5 py-2.5 text-sm gap-2",
  md: "min-h-12 px-6 py-3 text-[0.9375rem] gap-2.5",
  lg: "min-h-14 px-8 py-4 text-base gap-3",
} as const;

/**
 * The single WhatsApp CTA used across the site.
 *
 * Renders a real anchor so middle-click, long-press, and screen-reader link
 * semantics all behave. The click handler only records analytics; navigation is
 * the browser's, so the CTA still works if the handler never runs.
 */
export function WhatsAppLink({
  message,
  location,
  subject,
  children,
  tone = "primary",
  size = "md",
  className,
  fullWidth = false,
}: WhatsAppLinkProps) {
  const isLink = tone === "link";

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCtaClick({ location, subject })}
      className={cn(
        isLink
          ? "text-[0.9375rem] font-extrabold"
          : "inline-flex items-center justify-center rounded-sm font-extrabold tracking-[0.01em] transition-colors duration-300",
        TONES[tone],
        !isLink && SIZES[size],
        fullWidth && !isLink && "w-full",
        className,
      )}
    >
      <WhatsAppIcon className={isLink ? "size-[1em]" : undefined} />
      <span>{children}</span>
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
