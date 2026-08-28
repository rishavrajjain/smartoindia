import type { MetadataRoute } from "next";

import { JOURNEYS } from "@/data/journeys";
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
    ...["/b", "/c", "/d", "/e", "/f"].map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...NAV.map((item) => ({
      url: absoluteUrl(item.href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...JOURNEYS.map((item) => ({
      url: absoluteUrl(`/packages/${item.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
