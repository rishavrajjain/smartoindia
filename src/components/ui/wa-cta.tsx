"use client";

import type { ReactNode } from "react";

import { trackCtaClick } from "@/lib/analytics";
import { type CtaLocation, whatsappUrl } from "@/lib/whatsapp";

/**
 * Unstyled WhatsApp CTA for the concept pages (/a–/f), whose art directions
 * each bring their own button styling. Keeps the conversion contract — real
 * anchor, prefilled message, analytics, new-tab announcement — in one place
 * while leaving presentation entirely to the caller's className.
 */
export function WaCta({
  message,
  location,
  subject,
  className,
  children,
}: {
  message: string;
  location: CtaLocation;
  subject?: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCtaClick({ location, subject })}
      className={className}
    >
      {children}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
