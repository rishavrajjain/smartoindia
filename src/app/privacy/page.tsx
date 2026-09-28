import { LegalPage } from "@/components/sections/legal-page";
import { PRIVACY } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What personal data Smarto collects when you plan or book a trip, why, who we share it with, and your rights under India's data protection law.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} other={{ href: "/terms", label: "Terms & Conditions" }} />;
}
