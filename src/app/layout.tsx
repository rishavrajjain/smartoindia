import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { ScrollSpark } from "@/components/scroll-spark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";
import { SITE } from "@/lib/site";

import "./globals.css";

// The brand system (docs/smarto-design-system.md) allows exactly two weights:
// Light 300 for setup lines and body, ExtraBold 800 for payoffs, titles, and
// labels. Gilroy is proprietary; Poppins 300/800 is the sanctioned fallback.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "800"],
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
  themeColor: "#282560",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${poppins.variable} h-full`}
      // globals.css sets smooth scrolling; declaring it here lets the router
      // suspend it during route transitions instead of animating every jump.
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-bone text-ink">
        <a
          href="#main"
          className="sr-only bg-ink px-5 py-3 text-sm font-extrabold text-bone focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>
        <ScrollSpark />
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
