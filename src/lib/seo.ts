import type { Metadata } from "next";

import { SITE, absoluteUrl } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Route path, e.g. "/packages". Used for the canonical URL. */
  path: string;
  /** Optional route-specific social image. Falls back to the generated default. */
  image?: string;
}

/**
 * Builds per-route metadata with a canonical URL and Open Graph tags.
 *
 * Deliberately does not emit structured data: Smarto has no verified ratings,
 * prices, or address yet, and inventing them for schema markup would be a lie
 * that search engines are entitled to act on.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      title,
      description,
      url,
      ...(image ? { images: [{ url: absoluteUrl(image) }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [absoluteUrl(image)] } : {}),
    },
  };
}
