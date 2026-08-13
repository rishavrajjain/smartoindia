import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card.
 *
 * Deliberately typographic rather than photographic: it renders identically
 * everywhere, needs no font or image fetch at build time, and stays legible in
 * the small preview most clients actually show.
 */
export default function OpengraphImage() {
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
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#fff7ec",
              color: "#5b2bd9",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div
            style={{
              color: "#fff7ec",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Smarto
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffb020",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Assam · Meghalaya · Arunachal · Sikkim · Nagaland
          </div>
          <div
            style={{
              marginTop: 22,
              color: "#fff7ec",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Northeast India, travelled well
          </div>
          <div
            style={{
              marginTop: 24,
              color: "rgba(255,247,236,0.82)",
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 840,
            }}
          >
            Trips and transport planned by people who drive these roads every
            week.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#fff7ec",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              background: "#ffb020",
            }}
          />
          Plan on WhatsApp
        </div>
      </div>
    ),
    size,
  );
}
