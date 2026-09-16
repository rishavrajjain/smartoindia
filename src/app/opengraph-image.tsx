import { ImageResponse } from "next/og";

import { loadOgAssets } from "@/lib/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Default social card, in the brand system: navy-deep ground, the real
 * wordmark, the Light→ExtraBold headline jump, green for the promise, and
 * the spark band along the bottom edge. Poppins is bundled (OFL) so the
 * card renders identically everywhere, at build time, with no network.
 */

export default async function OpengraphImage() {
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
          fontFamily: "Poppins",
          fontWeight: 300,
        }}
      >
        {/* The spark glow, tucked into the corner like every dark hero. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 620,
            height: 620,
            borderRadius: 620,
            background:
              "radial-gradient(circle, rgba(196,72,104,0.5) 0%, rgba(123,63,126,0.26) 45%, rgba(28,26,69,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "64px 84px 0",
          }}
        >
          <img src={wordmark} alt="" width={216} height={48} />
          <div
            style={{
              display: "flex",
              fontSize: 21,
              fontWeight: 800,
              letterSpacing: 5,
              color: "#75b884",
            }}
          >
            GUWAHATI · NORTHEAST INDIA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 84px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              lineHeight: 1.04,
              letterSpacing: -2,
            }}
          >
            <span>Northeast India,</span>
            <span style={{ fontWeight: 800 }}>travelled well.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 760,
            }}
          >
            Flat-fare EV cabs, and fifty curated journeys planned end to end.
            No surge, no bargaining, nothing added at the end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "0 84px 56px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#399772",
                color: "#ffffff",
                fontSize: 24,
                fontWeight: 800,
                padding: "18px 34px",
                borderRadius: 999,
              }}
            >
              Plan on WhatsApp
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              +91 70990 13815 · 24×7
            </div>
          </div>
          <div
            style={{
              display: "flex",
              height: 14,
              background:
                "linear-gradient(90deg, #282560 0%, #7b3f7e 50%, #c44868 100%)",
            }}
          />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
