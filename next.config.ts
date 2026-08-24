import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: typically 25-40% smaller than WebP for these photographs.
    formats: ["image/avif", "image/webp"],
    // Widths the layout actually requests. Trimming the default list keeps the
    // optimiser from generating variants nothing will ever download.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
    // Site imagery is static and content-hashed, so it can be cached hard.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  // Strips the `x-powered-by` header; nothing gained by advertising the stack.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // All generated site assets follow the rename-on-change convention, so
      // they can be cached hard: repeat visits load them from disk cache with
      // zero network. Never overwrite a file in place under these paths —
      // changed content gets a new filename.
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/logos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
