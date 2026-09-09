import { ScrollToResults } from "@/components/sections/scroll-to-results";

/**
 * Results skeleton, shown the instant a search is submitted while the airline
 * system answers. Mirrors the heading and three fare rows at their real heights.
 */
export default function Loading() {
  return (
    <div id="results" className="scroll-mt-24" aria-busy="true" aria-live="polite">
      <ScrollToResults />
      <p className="sr-only">Finding fares…</p>
      <div aria-hidden="true">
        <div className="h-3 w-32 rounded bg-sand" />
        <div className="mt-3 h-7 w-64 rounded bg-sand" />
        <div className="mt-2 h-4 w-48 rounded bg-sand" />
        <ol className="mt-5 space-y-3.5">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="animate-rise rounded-2xl bg-bone p-5 ring-1 ring-line sm:p-6"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-sand" />
                <div className="h-4 w-28 rounded bg-sand" />
              </div>
              <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-4">
                <div className="h-8 w-16 rounded bg-sand" />
                <div className="h-px bg-line-strong" />
                <div className="h-8 w-16 rounded bg-sand" />
              </div>
              <div className="mt-6 flex items-end justify-between border-t border-line pt-4">
                <div className="h-4 w-36 rounded bg-sand" />
                <div className="h-12 w-28 rounded-xl bg-sand" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
