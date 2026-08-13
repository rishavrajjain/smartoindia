import { ImageResponse } from "next/og";

import { PACKAGES, getPackage } from "@/data/packages";

export const alt = "Smarto travel package";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Prerender a card for every package rather than generating them on request. */
export function generateStaticParams() {
  return PACKAGES.map((item) => ({ slug: item.slug }));
}

export default async function PackageOpengraphImage({
  params,
}: {
  // Async in Next 16, in line with the async request APIs change.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPackage(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(100deg, #5b2bd9 0%, #8b2fc9 48%, #e0356b 100%)",
          padding: "68px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "#fff7ec",
                color: "#5b2bd9",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              S
            </div>
            <div style={{ color: "#fff7ec", fontSize: 30, fontWeight: 700 }}>
              Smarto
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffb020",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {item?.state ?? "Northeast India"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#fff7ec",
              fontSize: item && item.title.length > 30 ? 62 : 74,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -1.8,
              maxWidth: 980,
            }}
          >
            {item?.title ?? "Trips across the Northeast"}
          </div>
          <div
            style={{
              marginTop: 22,
              color: "rgba(255,247,236,0.82)",
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {item
              ? item.summary.slice(0, 145)
              : "Planned routes across Assam, Meghalaya, Arunachal Pradesh, Sikkim, and Nagaland."}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          {item && (
            <div
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                background: "#ffb020",
                color: "#1b1033",
              }}
            >
              {item.durationLabel}
            </div>
          )}
          <div style={{ display: "flex", color: "#fff7ec" }}>
            Request a quote on WhatsApp
          </div>
        </div>
      </div>
    ),
    size,
  );
}
