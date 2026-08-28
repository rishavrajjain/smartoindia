"use client";

import { WhatsAppLink } from "@/components/ui/whatsapp-link";

/**
 * Context-specific enquiry bar for a package detail page.
 *
 * Replaces the global sticky CTA on these routes so the visitor gets a message
 * that already names the trip they are looking at, rather than a generic one.
 */
export function PackageStickyCta({
  title,
  message,
  slug,
}: {
  title: string;
  message: string;
  slug: string;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div
        className="pointer-events-auto border-t border-line bg-bone/93 px-4 pt-3 backdrop-blur-lg"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-extrabold text-ink">{title}</p>
            <p className="text-label font-extrabold text-taupe uppercase">Request a quote</p>
          </div>
          <WhatsAppLink
            message={message}
            location="package-detail-sticky"
            subject={slug}
            size="sm"
            className="shrink-0"
          >
            Enquire
          </WhatsAppLink>
        </div>
      </div>
    </div>
  );
}
