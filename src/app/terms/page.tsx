import { LegalPage } from "@/components/sections/legal-page";
import { TERMS } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms for booking cabs, flights, hotels, packages and events with Smarto: how booking works, prices, cancellations and refunds, permits, and complaints.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage doc={TERMS} other={{ href: "/privacy", label: "Privacy Policy" }} />;
}
