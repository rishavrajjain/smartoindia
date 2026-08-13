/**
 * Minimal typed analytics shim.
 *
 * No provider is wired up yet. Calls are recorded on `window.dataLayer` when it
 * exists and are otherwise a no-op, so adding GA4, Plausible, or Vercel Analytics
 * later is a one-file change rather than a hunt through components.
 */
import type { CtaLocation } from "./whatsapp";

interface CtaClickPayload {
  location: CtaLocation;
  /** What the visitor was looking at, e.g. a package slug or cab service id. */
  subject?: string;
}

interface AnalyticsEvent extends CtaClickPayload {
  event: "whatsapp_cta_click";
}

declare global {
  interface Window {
    dataLayer?: AnalyticsEvent[];
  }
}

export function trackCtaClick(payload: CtaClickPayload): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: "whatsapp_cta_click", ...payload });
}
