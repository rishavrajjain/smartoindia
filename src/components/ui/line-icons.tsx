/*
 * The utility icon set: Lucide-style 2pt rounded outlines, per the design
 * system ("line/outline, 2pt at 24px, rounded, unfilled, one library only").
 * Shared by the business pages (/events, /corporate). Decorative by default;
 * every icon is aria-hidden and sized by the caller.
 */

type IconProps = { className?: string };

function icon(path: React.ReactNode) {
  return function Icon({ className }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
      >
        {path}
      </svg>
    );
  };
}

export const PhoneIcon = icon(
  <path d="M21.5 16.9v2.8a1.9 1.9 0 0 1-2.1 1.9 18.8 18.8 0 0 1-8.2-2.9 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.6 4.7 1.9 1.9 0 0 1 4.5 2.6h2.8a1.9 1.9 0 0 1 1.9 1.6c.12.9.34 1.8.65 2.65a1.9 1.9 0 0 1-.43 2L8.2 10.05a15 15 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.43c.85.31 1.75.53 2.65.65a1.9 1.9 0 0 1 1.65 1.93z" />,
);

export const ShieldIcon = icon(
  <>
    <path d="M12 2.5 4 6v6c0 4.6 3.4 8.3 8 9.5 4.6-1.2 8-4.9 8-9.5V6z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </>,
);

export const PeopleIcon = icon(
  <>
    <path d="M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20" />
    <circle cx="9.5" cy="7.5" r="3.5" />
    <path d="M20.5 20v-1.6a3.4 3.4 0 0 0-2.6-3.3M15.5 4.2a3.4 3.4 0 0 1 0 6.6" />
  </>,
);

export const HeadsetIcon = icon(
  <>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="2.5" y="13.5" width="4.2" height="6" rx="2" />
    <rect x="17.3" y="13.5" width="4.2" height="6" rx="2" />
  </>,
);

export const ClockIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6.8V12l3.6 2.1" />
  </>,
);

export const BoltIcon = icon(<path d="M13 2 4 14h6l-1 8 9-12h-6z" />);

export const CheckIcon = icon(
  <path d="M20 6.5 9.5 17 4 11.5" strokeWidth="2.2" />,
);

export const HouseIcon = icon(
  <>
    <path d="M3 21V9.5L12 4l9 5.5V21" />
    <path d="M9 21v-6h6v6" />
  </>,
);

export const CarIcon = icon(
  <>
    <path d="M3.5 13.5 5.2 8.9A2.2 2.2 0 0 1 7.3 7.5h9.4a2.2 2.2 0 0 1 2.1 1.4l1.7 4.6" />
    <rect x="3" y="13.5" width="18" height="4.5" rx="1.8" />
    <circle cx="7" cy="18.8" r="1.6" />
    <circle cx="17" cy="18.8" r="1.6" />
  </>,
);

export const HeartIcon = icon(
  <path d="M12 20.5s-7.5-4.6-7.5-9.6a4.2 4.2 0 0 1 7.5-2.6 4.2 4.2 0 0 1 7.5 2.6c0 5-7.5 9.6-7.5 9.6z" />,
);

export const BuildingIcon = icon(
  <>
    <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21" />
    <path d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21" />
    <path d="M2.5 21h19M7.5 8h3M7.5 12h3M7.5 16h3" />
  </>,
);

export const CalendarIcon = icon(
  <>
    <rect x="3.5" y="5" width="17" height="16" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </>,
);

export const PhoneCheckIcon = icon(
  <>
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <path d="M10.5 18.5h3" />
    <path d="M9.5 8.5l1.8 1.8 3.2-3.4" />
  </>,
);

export const TagIcon = icon(
  <>
    <path d="M3.2 12.6V4.5a1.3 1.3 0 0 1 1.3-1.3h8.1a1.3 1.3 0 0 1 .9.4l7.2 7.2a1.3 1.3 0 0 1 0 1.8l-8.1 8.1a1.3 1.3 0 0 1-1.8 0l-7.2-7.2a1.3 1.3 0 0 1-.4-.9z" />
    <circle cx="7.8" cy="7.8" r="1.3" />
  </>,
);

export const ArrowIcon = icon(
  <path d="M4 12h15M13 6l6 6-6 6" strokeWidth="2.4" />,
);

export const InvoiceIcon = icon(
  <>
    <path d="M6 2.5h9l4 4v15H6z" />
    <path d="M14.5 2.5V7H19" />
    <path d="M9.5 12.5h6M9.5 16.5h4" />
  </>,
);

export const CrossIcon = icon(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M12 8.5v7M8.5 12h7" />
  </>,
);

export const CopyIcon = icon(
  <>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
    <path d="M15.5 5.5H6a2.5 2.5 0 0 0-2.5 2.5v9.5" />
  </>,
);

export const PinIcon = icon(
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="2.6" />
  </>,
);

export const SendIcon = icon(
  <>
    <path d="M21 4 3.5 11.2l6.3 2.7 2.7 6.3z" />
    <path d="M21 4 9.8 13.9" />
  </>,
);


export const TrainIcon = icon(
  <>
    <rect x="5" y="3" width="14" height="13.5" rx="3.5" />
    <path d="M5 10.5h14" />
    <path d="M9.5 16.5 7 21M14.5 16.5 17 21M9 20h6" />
  </>,
);

export const SurgeOffIcon = icon(
  <>
    <path d="M3 16l5-5 3.5 3.5L19 7" />
    <path d="M14.5 7H19v4.5" />
    <path d="M4 20 20 4" />
  </>,
);

export const SuitcaseIcon = icon(
  <>
    <rect x="2.5" y="7" width="19" height="13" rx="3" />
    <path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
    <path d="M2.5 12.5h19" />
  </>,
);

export const AirportIcon = icon(
  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />,
);

export const KeyIcon = icon(
  <>
    <circle cx="7.5" cy="15.5" r="5" />
    <path d="m11 12 9.5-9.5M17 6l2.5 2.5M14.5 8.5 16.5 10.5" />
  </>,
);

export const MountainIcon = icon(
  <>
    <path d="m8.5 5 4 7 3-3.5L22 20H2z" />
    <path d="m6.2 9 2.3 2 2-1.6" />
  </>,
);

export const RoadIcon = icon(
  <path d="M9 3 4.5 21M15 3l4.5 18M12 4.5v2.5M12 10.5V13M12 16.5V20" />,
);

export const RouteIcon = icon(
  <>
    <circle cx="6" cy="19" r="2.5" />
    <circle cx="18" cy="5" r="2.5" />
    <path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5" />
  </>,
);

export const LocateIcon = icon(
  <>
    <circle cx="12" cy="12" r="6.5" />
    <circle cx="12" cy="12" r="2.2" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
  </>,
);

export const CloseIcon = icon(<path d="M18 6 6 18M6 6l12 12" />);

export const PlusIcon = icon(<path d="M12 5v14M5 12h14" />);
