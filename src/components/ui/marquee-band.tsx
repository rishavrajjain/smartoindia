import { BoltIcon } from "@/components/ui/line-icons";

/*
 * A scrolling strip of the page's punchiest claims, bolt-separated, riding
 * the existing marquee animation. Pure vibe, zero reading cost: the words
 * are ones the page already earns. Reduced motion gets a static row.
 */
export function MarqueeBand({ items }: { items: string[] }) {
  return (
    <div
      aria-hidden="true"
      className="marquee-mask overflow-hidden bg-clay-deep py-3.5"
    >
      <div className="flex w-max animate-marquee items-center gap-7">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-7">
            {items.map((item, index) => (
              <span
                key={`${copy}-${index}`}
                className="flex items-center gap-7 text-[0.8125rem] font-extrabold tracking-[0.18em] whitespace-nowrap text-bone uppercase"
              >
                {item}
                <BoltIcon className="size-3.5 shrink-0 text-green" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
