/*
 * Real client logos, mirrored from smartocabs.com's own "Clients" section.
 * Verified in the sense that Manav already publishes them on his live site;
 * confirm with him before adding any name that is not on smartocabs.com.
 */

export interface ClientLogo {
  src: string;
  name: string;
  w: number;
  h: number;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { src: "/logos/airtel.webp", name: "Airtel", w: 128, h: 128 },
  { src: "/logos/apollo-clinic.webp", name: "Apollo Clinic", w: 246, h: 128 },
  { src: "/logos/asian-paints.webp", name: "Asian Paints", w: 148, h: 128 },
  {
    src: "/logos/bharat-petroleum.webp",
    name: "Bharat Petroleum",
    w: 103,
    h: 128,
  },
  { src: "/logos/godrej.webp", name: "Godrej", w: 264, h: 128 },
];
