const PLACES = [
  "Shillong",
  "Cherrapunji",
  "Kaziranga",
  "Tawang",
  "Majuli",
  "Dawki",
  "Gangtok",
  "Kohima",
  "Ziro",
  "Dirang",
  "Sivasagar",
  "Khonoma",
];

/**
 * Thin scrolling band of destinations.
 *
 * The list is rendered twice so the CSS animation can translate exactly -50%
 * and loop seamlessly. The duplicate is hidden from assistive tech, and the
 * whole band freezes under `prefers-reduced-motion`.
 */
export function DestinationMarquee() {
  return (
    <div className="overflow-hidden border-y border-line py-4">
      <div className="animate-marquee flex w-max items-center motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex items-center"
          >
            {PLACES.map((place) => (
              <li
                key={place}
                className="flex items-center gap-8 pr-8 whitespace-nowrap"
              >
                <span className="text-label font-medium text-taupe uppercase">
                  {place}
                </span>
                <span
                  aria-hidden="true"
                  className="size-[3px] shrink-0 rounded-full bg-line-strong"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
