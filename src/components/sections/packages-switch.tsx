import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

/*
 * The two halves of Smarto's packages as a pair of big photo tabs at the
 * top of both package pages: Northeast India (the printed catalog) and
 * International (planned on request). Each is a real page, so the choice
 * can be shared and the back button steps between them.
 */

const TABS = [
  {
    id: "northeast",
    href: "/packages",
    title: "Northeast India",
    image: "/images/pkg-meghalaya-waterfalls.webp",
  },
  {
    id: "international",
    href: "/packages/international",
    title: "International",
    image: "/images/intl-southeast-asia.webp",
  },
] as const;

export function PackagesSwitch({
  active,
  northeastCount,
  internationalCount,
}: {
  active: (typeof TABS)[number]["id"];
  northeastCount: number;
  internationalCount: number;
}) {
  const sub = {
    northeast: `${northeastCount} planned journeys`,
    international: `${internationalCount} destinations`,
  } as const;

  return (
    <nav aria-label="Package type">
      <ul className="grid grid-cols-2 gap-2.5 rounded-[1.75rem] bg-sand p-1.5 sm:gap-3 sm:p-2">
        {TABS.map((tab) => {
          const on = tab.id === active;
          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "group flex h-full flex-col gap-2.5 rounded-[1.375rem] p-2 transition-[background-color,box-shadow] duration-300 sm:flex-row sm:items-center sm:gap-4 sm:p-2.5 sm:pr-5",
                  on
                    ? "bg-ink text-bone shadow-[0_14px_30px_rgba(40,37,96,0.28)]"
                    : "text-ink hover:bg-bone",
                )}
              >
                <span className="relative block h-16 w-full shrink-0 overflow-hidden rounded-2xl sm:size-16 lg:h-16 lg:w-24">
                  <Image
                    src={tab.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 6rem, 45vw"
                    className={cn(
                      "object-cover transition-transform duration-500",
                      !on && "grayscale-[35%] group-hover:scale-105 group-hover:grayscale-0",
                    )}
                  />
                </span>
                <span className="min-w-0 px-1.5 pb-1 sm:px-0 sm:pb-0">
                  <span className="block text-[0.9375rem] leading-tight font-extrabold sm:text-[1.125rem]">
                    {tab.title}
                  </span>
                  <span
                    className={cn(
                      "mt-1 flex items-center gap-1.5 text-[0.6875rem] whitespace-nowrap sm:text-[0.8125rem]",
                      on ? "text-bone/70" : "text-taupe",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn("size-1.5 shrink-0 rounded-full", on ? "bg-green" : "bg-line-strong")}
                    />
                    {sub[tab.id]}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
