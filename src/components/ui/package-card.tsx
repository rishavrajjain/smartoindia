import Image from "next/image";
import Link from "next/link";

import type { TravelPackage } from "@/types";

interface PackageCardProps {
  item: TravelPackage;
  /** Responsive `sizes` for the card image; depends on the grid it sits in. */
  sizes: string;
  priority?: boolean;
}

/**
 * Trip card.
 *
 * No border, no shadow, no coloured chips — the photograph and a hairline are
 * the whole frame. The image lifts slightly on hover; nothing else moves.
 */
export function PackageCard({ item, sizes, priority = false }: PackageCardProps) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-4/5 overflow-hidden bg-sand">
        <Image
          src={item.hero.src}
          alt={item.hero.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="zoom-slow object-cover"
        />
        <span className="absolute top-4 left-4 border border-bone/40 bg-ink/35 px-2.5 py-1 text-label font-medium text-bone uppercase backdrop-blur-sm">
          {item.state}
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col border-t border-line pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-label font-medium text-taupe uppercase">
            {item.durationLabel}
          </p>
          <p className="text-label font-medium text-clay uppercase">
            {item.priceLabel}
          </p>
        </div>

        <h3 className="mt-3 text-[1.5rem] leading-[1.14] text-ink">
          {/* Stretched link: the whole card is the target, but only one link
              lands in the tab order and the accessible name stays the title. */}
          <Link
            href={`/packages/${item.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-clay"
          >
            {item.title}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-2 text-[0.9375rem] leading-relaxed text-taupe">
          {item.summary}
        </p>

        <div className="flex-1" />

        <p className="mt-4 text-[0.8125rem] text-taupe">
          {item.destinations.slice(0, 3).join(" · ")}
          {item.destinations.length > 3 && " · …"}
        </p>
      </div>
    </article>
  );
}
