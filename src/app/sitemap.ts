import type { MetadataRoute } from "next";

import { PACKAGES } from "@/data/packages";
import { NAV, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/a"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/b"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...NAV.map((item) => ({
      url: absoluteUrl(item.href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PACKAGES.map((item) => ({
      url: absoluteUrl(`/packages/${item.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
