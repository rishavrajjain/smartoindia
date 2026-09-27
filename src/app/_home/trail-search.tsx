"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/cn";

import type { SearchEntry } from "./data";

/*
 * The glowing search, PickYourTrail's signature, pointed at Smarto's
 * catalog: type a place, a state or a journey and pick from grouped
 * suggestions. It is a real form posting `q` to /packages, so Enter works
 * before hydration too; with JavaScript it becomes an ARIA combobox with
 * arrow-key navigation.
 */

const KIND_LABEL: Record<SearchEntry["kind"], string> = {
  place: "Places",
  state: "States",
  journey: "Journeys",
};

interface Option {
  id: string;
  label: string;
  meta: string;
  href: string;
  group: string;
}

export function TrailSearch({
  index,
  variant = "hero",
  className,
}: {
  index: SearchEntry[];
  variant?: "hero" | "bar";
  className?: string;
}) {
  const router = useRouter();
  const uid = useId();
  const listId = `${uid}-list`;
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const options = useMemo<Option[]>(() => {
    const q = query.trim().toLowerCase();
    const pick = (kind: SearchEntry["kind"], n: number) =>
      index
        .filter((e) => e.kind === kind && (!q || e.hay.includes(q)))
        .slice(0, n);

    // An empty box suggests the busiest stops; typing searches everything.
    const groups = q
      ? [...pick("place", 4), ...pick("state", 2), ...pick("journey", 5)]
      : [...pick("place", 6), ...pick("state", 3)];

    const list: Option[] = groups.map((e, i) => ({
      id: `${uid}-opt-${i}`,
      label: e.label,
      meta: e.meta,
      href: e.href,
      group: KIND_LABEL[e.kind],
    }));

    if (q) {
      list.push({
        id: `${uid}-opt-all`,
        label: `All journeys matching “${query.trim()}”`,
        meta: "Open the full catalog",
        href: `/packages?q=${encodeURIComponent(query.trim())}#journeys`,
        group: "",
      });
    }
    return list;
  }, [index, query, uid]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % Math.max(options.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (i <= 0 ? options.length - 1 : i - 1));
    } else if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const chosen = open && active >= 0 ? options[active] : undefined;
    if (chosen) return go(chosen.href);
    const q = query.trim();
    go(q ? `/packages?q=${encodeURIComponent(q)}#journeys` : "/packages");
  };

  const expanded = open && options.length > 0;
  const hero = variant === "hero";

  return (
    <form
      role="search"
      action="/packages"
      method="get"
      onSubmit={onSubmit}
      className={cn("relative", className)}
    >
      <label htmlFor={`${uid}-input`} className="sr-only">
        Search journeys, places or states
      </label>
      <div
        className={cn(
          "flex items-center bg-bone text-ink",
          hero
            ? "h-16 rounded-full pr-2 pl-6 shadow-[0_0_0_4px_rgba(117,184,132,0.55),0_0_48px_rgba(117,184,132,0.55),0_18px_40px_rgba(28,26,69,0.35)] lg:h-[4.5rem] lg:pl-7"
            : "h-11 rounded-full pr-1.5 pl-4 ring-2 ring-green/70",
        )}
      >
        <SearchGlyph className={cn("shrink-0 text-taupe", hero ? "size-5" : "size-4")} />
        <input
          ref={inputRef}
          id={`${uid}-input`}
          name="q"
          type="search"
          autoComplete="off"
          enterKeyHint="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-activedescendant={
            expanded && active >= 0 ? options[active]?.id : undefined
          }
          value={query}
          placeholder={hero ? "Search places or journeys" : "Search trips"}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className={cn(
            "h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-taupe/70 [&::-webkit-search-cancel-button]:hidden",
            hero ? "pl-3.5 text-[1rem] lg:text-[1.0625rem]" : "pl-2.5 text-[0.875rem]",
          )}
        />
        <button
          type="submit"
          className={cn(
            "flex shrink-0 items-center justify-center gap-2 rounded-full bg-green-deep font-extrabold text-white transition-transform duration-150 active:scale-[0.97]",
            hero ? "size-12 lg:h-14 lg:w-auto lg:px-7" : "size-8",
          )}
        >
          <span className={cn("sr-only", hero && "lg:not-sr-only lg:text-[0.9375rem]")}>
            Start planning
          </span>
          <ArrowGlyph className={cn(hero ? "size-5 lg:hidden" : "size-4")} />
        </button>
      </div>

      <ul
        id={listId}
        role="listbox"
        aria-label="Suggestions"
        hidden={!expanded}
        className={cn(
          "absolute inset-x-0 z-50 mt-3 max-h-[22rem] overflow-y-auto rounded-3xl bg-bone p-2 text-left text-ink shadow-[0_24px_60px_rgba(28,26,69,0.35)] ring-1 ring-line",
          !hero && "mt-2 rounded-2xl",
        )}
      >
        {options.map((option, i) => {
          const showGroup = option.group && option.group !== options[i - 1]?.group;
          return (
            <li key={option.id} role="presentation">
              {showGroup && (
                <p
                  aria-hidden="true"
                  className="px-3 pt-3 pb-1 text-[0.625rem] font-extrabold tracking-[0.2em] text-taupe/70 uppercase"
                >
                  {option.group}
                </p>
              )}
              <div
                id={option.id}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(option.href)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-3 py-2.5",
                  i === active && "bg-sand",
                  !option.group && "mt-1 border-t border-line pt-3",
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate text-[0.9375rem] font-extrabold">
                    {option.label}
                  </span>
                  <span className="block truncate text-[0.75rem] text-taupe">
                    {option.meta}
                  </span>
                </span>
                <ArrowGlyph className="size-4 shrink-0 text-taupe/60" />
              </div>
            </li>
          );
        })}
      </ul>
    </form>
  );
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
