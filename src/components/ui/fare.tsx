import { cn } from "@/lib/cn";
import { formatAmount } from "@/lib/flights";

type Tone = "indicative" | "locked" | "struck" | "onDark";

const TONES: Record<Tone, string> = {
  // A fare the airline system quoted but has not yet confirmed: navy.
  indicative: "text-ink",
  // Confirmed by reprice or ticketed: the green the brand reserves for it.
  locked: "text-green-deep",
  // A superseded fare. Grey and struck, never magenta.
  struck: "text-struck line-through decoration-1",
  onDark: "text-bone",
};

const SIZES = {
  sm: "text-[1rem]",
  md: "text-[1.375rem]",
  lg: "text-[2rem]",
  xl: "text-[2.75rem]",
} as const;

/**
 * The fare lockup from the design system: ExtraBold, tabular figures, tight
 * tracking, with the rupee sign small and top-aligned at reduced opacity.
 */
export function Fare({
  amount,
  tone = "indicative",
  size = "md",
  className,
}: {
  amount: number;
  tone?: Tone;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-start font-extrabold leading-none tracking-[-0.03em] tabular-nums",
        TONES[tone],
        SIZES[size],
        className,
      )}
    >
      <span aria-hidden="true" className="mt-[0.08em] mr-[0.06em] text-[0.45em] opacity-75">
        ₹
      </span>
      <span className="sr-only">₹</span>
      {formatAmount(amount)}
    </span>
  );
}
