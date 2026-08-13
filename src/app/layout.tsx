import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";
import { SITE } from "@/lib/site";

import "./globals.css";

// Both are variable fonts. Omitting `weight` loads a single variable file per
// family covering the whole axis, instead of one static file per weight.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0805",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${newsreader.variable} ${archivo.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bone text-ink">
        <a
          href="#main"
          className="sr-only bg-ink px-5 py-3 text-sm font-medium text-bone focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <StickyWhatsApp />
      </body>
    </html>
  );
}
