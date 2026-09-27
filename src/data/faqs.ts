import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

/*
 * Frequently asked questions. Every answer restates something the site
 * already establishes (WhatsApp booking, all-in quotes, flat cab fares,
 * 24x7 support, hotels anywhere, permits planned for Arunachal journeys).
 * Payment methods, refunds and cancellation terms are left out until Manav
 * supplies them.
 */

export interface Faq {
  q: string;
  a: string;
}

export const GENERAL_FAQS: Faq[] = [
  {
    q: "How do I book with Smarto?",
    a: `Message us on WhatsApp or call ${WHATSAPP_DISPLAY}. Tell us where, when and who is travelling, and we reply with a plan and one all-in quote. There is no app to download.`,
  },
  {
    q: "Is the price I'm quoted the price I pay?",
    a: "Yes. Every quote is all-in, and our cab fares are flat: no surge for rain, rush hour or a 2 AM pickup. Nothing is added at the end.",
  },
  {
    q: "What can Smarto book for me?",
    a: "Cabs across Guwahati, flights across India, hotels in any city, domestic and international packages, and transport for companies, weddings and events.",
  },
  {
    q: "Will someone meet me at the airport?",
    a: "Yes. Our airport rides meet you at arrivals and follow your flight, so a delay does not leave you stranded.",
  },
  {
    q: "Do you sort out permits for Arunachal Pradesh?",
    a: "Yes, permits are part of how we plan every Arunachal journey. Indian citizens need an Inner Line Permit and foreign nationals a Protected Area Permit; we tell you exactly what we need from you.",
  },
  {
    q: "Can I reach you during the trip?",
    a: "Yes. Our team is on call 24x7 on WhatsApp and phone, from the first pickup to the drop home.",
  },
];

export const HOTEL_FAQS: Faq[] = [
  {
    q: "Which cities can you book hotels in?",
    a: "Anywhere in India, and abroad too. The Shillong and Cherrapunjee stays on this page are simply the ones our journeys use most.",
  },
  {
    q: "Can I book just a hotel, without a cab or package?",
    a: "Yes. Book only the stay, or add an airport ride or a whole trip and we plan them together.",
  },
  {
    q: "What budgets do you cover?",
    a: "From five-star hotels to clean, comfortable three-star and budget rooms. Tell us your budget and we suggest stays that fit it.",
  },
  {
    q: "How do I get hotel options?",
    a: "Use the planner at the top of this page or message us on WhatsApp. We send a few options with their rates, and you choose.",
  },
  GENERAL_FAQS[1],
  GENERAL_FAQS[5],
];
