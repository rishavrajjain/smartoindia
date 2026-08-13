"use client";

import type { ReactNode } from "react";

import { trackCtaClick } from "@/lib/analytics";
import { type CtaLocation, whatsappUrl } from "@/lib/whatsapp";

export function AltWhatsAppLink({
  children,
  className,
  location,
  message,
}: {
  children: ReactNode;
  className: string;
  location: CtaLocation;
  message: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackCtaClick({ location })}
    >
      {children}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
