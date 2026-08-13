"use client";

import { usePathname } from "next/navigation";

import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { enquiry } from "@/lib/whatsapp";

/**
 * Persistent enquiry action for small screens.
 *
 * Only rendered below `lg`, where the header CTA is hidden behind the menu
 * button. Package detail pages carry their own context-specific sticky bar, so
 * this one steps aside there rather than stacking two CTAs.
 */
export function StickyWhatsApp() {
  const pathname = usePathname();

  const isPackageDetail =
    pathname.startsWith("/packages/") && pathname !== "/packages";

  if (isPackageDetail) return null;

  return (
    <div
      data-site-chrome="sticky-whatsapp"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden"
    >
      <div
        className="pointer-events-auto border-t border-line bg-bone/93 px-4 pt-3 backdrop-blur-lg"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <WhatsAppLink
          message={enquiry("I would like to plan a trip in the Northeast.")}
          location="sticky"
          size="md"
          fullWidth
        >
          Plan my trip on WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
