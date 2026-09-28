import { SITE } from "@/lib/site";

/*
 * The Terms & Conditions and Privacy Policy, in plain English.
 *
 * Built from Smarto's own published policies on smartocabs.com (Terms of
 * Service and Privacy Policy of 11 May 2023, and the Refund Policy): the
 * cancellation window, waiting fee, refund timings, 7-day reporting and
 * 2-day reply, lost items, conduct in the vehicle, Guwahati jurisdiction
 * and the Grievance Officer all come from there. They are extended to the
 * services this site now sells (flights, hotels, packages, events,
 * partners) and to how the site actually works: WhatsApp booking, no
 * payments, no sign-up, no cookies or trackers.
 *
 * Two deliberate changes from 2023, for Manav and counsel to confirm: the
 * liability cap is the amount paid for the booking (it was ₹1,000, written
 * for cab rides), and the arbitrator is no longer appointed by Smarto alone.
 *
 * Keep the privacy summary and "What this website records" true: update
 * them before adding analytics, cookies, payments or accounts.
 */

export type LegalBlock = { p: string } | { h: string } | { list: string[] };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  /** ISO date of the last change, shown at the top. */
  updated: string;
  intro: string[];
  sections: LegalSection[];
}

/** The Grievance Officer named in Smarto's published Privacy Policy. */
export const GRIEVANCE_OFFICER = {
  name: "Mr. Shashank Bajoria",
  role: "Managing Director",
} as const;

const WHO = `Smarto is the brand of ${SITE.legalName}, a company incorporated in India with its office at ${SITE.address} ("Smarto", "we", "us").`;

export const TERMS: LegalDoc = {
  title: "Terms & Conditions",
  updated: "2026-09-28",
  intro: [
    `These terms cover every booking you make with Smarto, whether on this website, on WhatsApp, by phone or by email. ${WHO}`,
    "By booking with us or using this website, you agree to these terms and to our Privacy Policy. If you do not agree, please do not book.",
  ],
  sections: [
    {
      id: "services",
      title: "What we do",
      blocks: [
        {
          p: "Smarto arranges travel in and from Northeast India: cab rides and car rentals, flights, hotels, domestic and international packages, and transport for companies, weddings and events.",
        },
        {
          p: "Some parts of a trip are provided by others: airlines, hotels, activity operators, and the drivers and vehicle owners who work with us. Where they are, their own rules also apply, such as an airline's fare and baggage rules or a hotel's check-in policy. We tell you about the ones that matter for your booking.",
        },
      ],
    },
    {
      id: "booking",
      title: "How booking works",
      blocks: [
        {
          list: [
            "You can start on this website, but every booking is made and confirmed on WhatsApp, by phone or by email. Filling in a form here only prepares a message; nothing is booked until we confirm it with you.",
            "We send you a quote with the price and what it includes. A booking is confirmed only when we say so in writing, on WhatsApp, SMS or email.",
            "Check your confirmation, especially the pickup time and place, names and dates, and tell us straight away if anything is wrong.",
            "You must be at least 18 to book. If you book for other people, you confirm that they accept these terms too.",
          ],
        },
      ],
    },
    {
      id: "prices",
      title: "Prices and payment",
      blocks: [
        {
          list: [
            "The price in your quote is the price you pay for the trip as quoted. It changes only if the trip changes: an extra stop, a different drop, extra waiting, or extra hours or kilometres on a rental.",
            "Cab fares are flat, with no surge for rain, rush hour or the time of day.",
            "Your quote says what it includes, such as tolls, parking, state entry taxes, meals or entry fees. Anything it does not list is not included.",
            "Flight fares and hotel rates come from the airline or hotel, and can change or sell out until your booking is confirmed.",
            "Prices shown on this website, such as starting fares, are a guide. Your quote is what counts.",
            "You pay using the options we confirm with your booking. This website never asks for card or bank details.",
          ],
        },
      ],
    },
    {
      id: "cancellations",
      title: "Cancellations and refunds",
      blocks: [
        { h: "Cab rides" },
        {
          list: [
            "Cancel free of charge up to 1 hour before your pickup time.",
            "Cancelling within 1 hour of pickup, or after the driver has reached you, may carry a cancellation fee. We tell you the fee before you cancel.",
            "If your driver reaches you late, there is no cancellation fee.",
            "If the driver waits beyond the agreed time at your pickup or at a stop, a small waiting fee may be added.",
            "We do not cancel a confirmed ride unless you ask us to, except when weather, traffic, law and order or safety leave no other choice.",
          ],
        },
        { h: "Flights, hotels, packages and events" },
        {
          p: "The cancellation and refund terms for these bookings are sent with your quote, before you pay. They follow the rules of the airline, hotel or operator involved, so they differ from booking to booking.",
        },
        { h: "Refunds" },
        {
          list: [
            "You can ask for a refund if you cancelled in time, were charged incorrectly, or the service fell short for reasons within our control. Call or email us with the date, time and reason.",
            "Approved refunds go back to the original payment method. We start them within 3 to 5 working days, and banks usually credit them within 7 to 10 working days.",
            "Delays caused by banks or payment providers are outside our control.",
          ],
        },
      ],
    },
    {
      id: "documents",
      title: "Travel documents and permits",
      blocks: [
        {
          list: [
            "You are responsible for carrying valid ID and the documents your trip needs: photo ID for flights and hotels, and passports and visas for international trips.",
            "Arunachal Pradesh and some other areas need an Inner Line Permit for Indian citizens or a Protected Area Permit for foreign nationals. We plan and help with permits, but the government issues them, and a refusal or delay is outside our control.",
            "Plans can change because of weather, landslides, road closures, festival dates or local rules. When that happens, we suggest the closest alternative.",
          ],
        },
      ],
    },
    {
      id: "rides",
      title: "On the road",
      blocks: [
        {
          list: [
            "Please be at the pickup point on time, and allow for check-in times, traffic and weather. We are not responsible for missed flights, trains or events caused by delays outside our control.",
            "No smoking, alcohol or anything illegal in the vehicle. Treat drivers with respect: harassment, abuse or damage to the vehicle can end the ride without a refund, and you may be charged for cleaning or repairs.",
            "Look after your belongings. If you leave something behind, tell us within 24 hours and we will do our best to find it.",
          ],
        },
      ],
    },
    {
      id: "business",
      title: "Corporate, event and partner bookings",
      blocks: [
        {
          list: [
            "Companies, event organisers, travel agents and hotels may have a separate agreement or rate card with us. Where they do, that agreement applies alongside these terms, and it prevails where the two differ.",
            "Partner commission is set out in the partner agreement.",
            "Logins on this website are for accounts we create. Keep your login details private, and tell us at once if you think someone else has used them.",
          ],
        },
      ],
    },
    {
      id: "website",
      title: "Using this website",
      blocks: [
        {
          list: [
            "Photos, sample itineraries and descriptions on this website show the kind of trip we plan. They are a guide, not a promise of the exact hotel, vehicle, view or weather you will get.",
            "Festival dates and flight fares shown here can change. We confirm them before you book.",
            "The content, design and brand on this website belong to Smarto. Please do not copy or reuse them without permission, or scrape, disrupt or misuse the site.",
            "Links to other websites, such as Google reviews or WhatsApp, are there for convenience. Those sites have their own terms.",
          ],
        },
      ],
    },
    {
      id: "liability",
      title: "Our responsibility",
      blocks: [
        {
          list: [
            "We take reasonable care in arranging your trip. We are not liable for losses caused by events outside our reasonable control, such as weather, natural disasters, strikes, road closures or government action, or by the acts of airlines, hotels and other providers beyond our part in the booking.",
            "To the extent the law allows, we are not liable for indirect or consequential losses, and our total liability for any claim is limited to the amount you paid us for the booking concerned.",
            "Nothing in these terms takes away any right you have under the Consumer Protection Act, 2019 or any other law that cannot be limited.",
          ],
        },
      ],
    },
    {
      id: "complaints",
      title: "Complaints",
      blocks: [
        {
          list: [
            `Tell us about any problem within 7 days, on WhatsApp, by phone or at ${SITE.email}. We reply within 2 working days and resolve issues as quickly as we can.`,
            "If you are not satisfied with our answer, write to our Grievance Officer, whose details are below.",
          ],
        },
      ],
    },
    {
      id: "law",
      title: "Law and disputes",
      blocks: [
        {
          list: [
            "These terms are governed by the laws of India.",
            "We will first try to settle any dispute with you directly. If it is not settled within 60 days, it will go to a sole arbitrator under the Arbitration and Conciliation Act, 1996, seated in Guwahati and conducted in English. Subject to that, the courts at Guwahati have jurisdiction.",
            "This does not stop you from approaching a consumer commission where the law allows.",
          ],
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [
        {
          p: "We may update these terms. The date at the top shows the latest version, and the terms in force when you book apply to that booking.",
        },
      ],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  updated: "2026-09-28",
  intro: [
    `This policy explains what personal data Smarto collects, why, and what we do with it. It covers this website, our WhatsApp number, phone calls and email. ${WHO} Smarto is responsible for your data.`,
    "We follow the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000 and its rules.",
  ],
  sections: [
    {
      id: "summary",
      title: "The short version",
      blocks: [
        {
          list: [
            "This website does not ask you to sign up, and it does not take payments.",
            "It uses no advertising or tracking cookies, and no third-party analytics.",
            "The booking forms here do not send your details to us. They prepare a WhatsApp message, and you decide whether to send it.",
            "We use your details to plan and deliver your trip, and share them only with the people who make it happen.",
            "We never sell your data.",
          ],
        },
      ],
    },
    {
      id: "collect",
      title: "What we collect",
      blocks: [
        { h: "What you tell us" },
        {
          list: [
            "When you message, call or email us: your name, phone number, email, pickup and drop addresses, travel dates, the number of travellers and your preferences.",
            "When a booking needs it: traveller names and ages, ID or passport details for flights, hotels, permits and international trips, and company details for corporate bookings.",
            "Calls with our team may be recorded, for quality and to settle disputes.",
          ],
        },
        { h: "Your location, only if you ask" },
        {
          p: "The cab booking card has a My location button. If you tap it, your browser asks for your permission, and your location is added to your WhatsApp message as a map link. This website does not store it.",
        },
        { h: "What this website records" },
        {
          list: [
            "Our hosting provider keeps standard server logs, such as IP address, browser type and the pages requested, to keep the site secure and working.",
            "Flight searches send the route, dates and number of passengers to our airline partner to fetch fares. They carry no names or contact details.",
            "One page keeps a small note in your browser for the length of your visit, so it can scroll to your results. It holds no personal data.",
          ],
        },
      ],
    },
    {
      id: "use",
      title: "How we use it",
      blocks: [
        {
          list: [
            "To reply to you, prepare quotes, and make, change or cancel bookings.",
            "To run the trip: pickups, driver details, tickets, hotel reservations and permits.",
            "To support you during the trip, handle complaints and refunds, and keep the records tax and accounting law requires.",
            "For safety, to prevent fraud, and when the law requires it.",
            "To tell you about offers, only if you agree. You can stop them at any time by telling us.",
          ],
        },
      ],
    },
    {
      id: "share",
      title: "Who we share it with",
      blocks: [
        {
          list: [
            "The people who deliver your trip, and only what they need: drivers, airlines, hotels, activity operators and permit authorities.",
            "Companies that help us run our service, such as website hosting and messaging, who must keep it confidential.",
            "Your company, when your travel is booked under a corporate account.",
            "Government or law enforcement bodies, when the law requires it.",
          ],
        },
        {
          p: "WhatsApp is run by Meta. Messages you send us there are also covered by WhatsApp's own privacy policy.",
        },
        {
          p: "For international trips, the airlines and hotels involved are often outside India, so your details go to them there to complete the booking.",
        },
      ],
    },
    {
      id: "keep",
      title: "How long we keep it",
      blocks: [
        {
          p: "We keep booking details for as long as we need them to deliver the trip, handle any follow-up, and meet our legal, tax and accounting duties. After that we delete them or make them anonymous.",
        },
      ],
    },
    {
      id: "security",
      title: "Keeping it safe",
      blocks: [
        {
          p: "We use reasonable security practices to protect your data, and limit access to the people who need it. No system is completely secure, so please never send card numbers or passwords over WhatsApp or email.",
        },
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        {
          list: [
            "Ask what personal data we hold about you and how we use it.",
            "Ask us to correct or update it.",
            "Ask us to delete it, unless the law requires us to keep it.",
            "Withdraw your consent, for example to offers. This does not affect anything we did before.",
            "Nominate someone to act for you if you cannot.",
            "Complain to our Grievance Officer, and after that to the Data Protection Board of India.",
          ],
        },
        {
          p: `Write to us at ${SITE.email}. We may need to confirm who you are first.`,
        },
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        {
          p: "Bookings are made by adults. We collect children's details only from a parent or guardian, and only what their travel needs.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          p: "When we change this policy, we update it here with the new date at the top.",
        },
      ],
    },
  ],
};
