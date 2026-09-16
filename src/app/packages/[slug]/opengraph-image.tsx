import { ImageResponse } from "next/og";

import { JOURNEYS } from "@/data/journeys";
import { loadOgAssets } from "@/lib/og";

export const alt = "A Smarto journey across Northeast India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Prerender a card for every journey rather than generating them on request. */
export function generateStaticParams() {
  return JOURNEYS.map((journey) => ({ slug: journey.slug }));
}

export default async function JourneyOpengraphImage({
  params,
}: {
  // Async in Next 16, in line with the async request APIs change.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = JOURNEYS.find((item) => item.slug === slug);
  const title = journey?.title ?? "Northeast India, on one honest price";
  const { fonts, wordmark } = await loadOgAssets();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1c1a45",
          color: "#ffffff",
          padding: "72px 84px 0",
          fontFamily: "Poppins",
          fontWeight: 300,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={wordmark} alt="" width={180} height={40} />
          {journey && (
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Journey {journey.num} · {journey.states.join(" & ")}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.04,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {journey && (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "rgba(255,255,255,0.75)",
                maxWidth: 980,
              }}
            >
              {journey.nights} nights / {journey.days} days ·{" "}
              {journey.route.slice(0, 5).join(" → ")}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#3eb391",
              marginBottom: 56,
            }}
          >
            All-in price on request · No hidden costs
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 14,
            margin: "0 -84px",
            background:
              "linear-gradient(90deg, #282560 0%, #7b3f7e 50%, #c44868 100%)",
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
