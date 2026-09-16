import { cn } from "@/lib/cn";

/*
 * A bento of short claims: icon and a phrase, nothing to read twice. The
 * tints rotate through the palette so the grid feels lively rather than
 * administrative; hover gives each tile a small lift.
 */

/* Fills that stay visible on both the white and mist grounds. */
const TINTS = [
  { tile: "bg-clay-soft", icon: "bg-paper text-clay" },
  { tile: "bg-green-deep/10", icon: "bg-paper text-green-deep" },
  { tile: "bg-paper ring-1 ring-line-strong", icon: "bg-sand text-ink" },
];

export interface FactTile {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export function FactTiles({ items }: { items: FactTile[] }) {
  return (
    <ul className="reveal mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
      {items.map((item, index) => {
        const tint = TINTS[index % TINTS.length];
        return (
          <li
            key={item.label}
            className={cn(
              "flex items-center gap-3 rounded-2xl p-4 transition-transform duration-[260ms] hover:-translate-y-1 sm:p-5",
              tint.tile,
            )}
          >
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-full",
                tint.icon,
              )}
            >
              <item.icon className="size-5" />
            </span>
            <span className="text-[0.875rem] leading-snug font-extrabold text-ink sm:text-[0.9375rem]">
              {item.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
