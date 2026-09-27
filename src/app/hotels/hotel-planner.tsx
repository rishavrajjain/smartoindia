"use client";

import { useId, useState } from "react";

import { DateTile, Stepper, Tile, longDate } from "@/components/ui/form-tiles";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/whatsapp";

/*
 * The hotel planner: the same mist tiles as the flight search, but there is
 * no hotel inventory behind it. The choices compose a WhatsApp message with
 * everything the desk needs for a useful first reply, then open the chat.
 * Every field is optional; whatever is filled in travels with the message.
 */

const SUGGESTIONS = ["Shillong", "Cherrapunjee", "Guwahati", "Kaziranga", "Tawang", "Bali", "Dubai", "Bangkok"];

const STAY_TYPES = ["Any", "5-star", "4-star", "3-star & budget"] as const;

function nightsBetween(a: string, b: string): number {
  const [y1, m1, d1] = a.split("-").map(Number);
  const [y2, m2, d2] = b.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86_400_000);
}

export function HotelPlanner() {
  const uid = useId();
  const [place, setPlace] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [stay, setStay] = useState<(typeof STAY_TYPES)[number]>("Any");
  const [error, setError] = useState("");

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;

  const submit = () => {
    if (checkIn && checkOut && nights < 1) {
      setError("Check-out needs to be after check-in.");
      return;
    }
    setError("");
    const lines = [
      `Hi Smarto, I would like hotel options${place.trim() ? ` in ${place.trim()}` : ""}.`,
      checkIn && `Check-in: ${longDate(checkIn)}`,
      checkOut && `Check-out: ${longDate(checkOut)}${nights > 0 ? ` (${nights} ${nights === 1 ? "night" : "nights"})` : ""}`,
      `Guests: ${guests} ${guests === 1 ? "guest" : "guests"}, ${rooms} ${rooms === 1 ? "room" : "rooms"}`,
      stay !== "Any" && `Stay: ${stay}`,
    ].filter(Boolean);
    trackCtaClick({ location: "hotels-plan", subject: place.trim() || "any" });
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      id="plan"
      noValidate
      className="flex scroll-mt-28 flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Tile label="Where to?" htmlFor={`${uid}-place`}>
        <input
          id={`${uid}-place`}
          type="text"
          autoComplete="off"
          enterKeyHint="next"
          placeholder="Any city in India or abroad"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="mt-1 w-full bg-transparent text-[1.25rem] leading-tight font-extrabold text-ink outline-none placeholder:font-light placeholder:text-taupe/60 sm:text-[1.375rem]"
        />
      </Tile>

      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setPlace(s)}
            aria-pressed={place === s}
            className={cn(
              "min-h-9 shrink-0 rounded-full px-3.5 text-[0.75rem] font-extrabold transition-colors",
              place === s ? "bg-ink text-bone" : "text-ink ring-1 ring-line-strong hover:bg-sand",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <DateTile label="Check-in" value={checkIn} onChange={setCheckIn} />
        <DateTile label="Check-out" value={checkOut} onChange={setCheckOut} min={checkIn || undefined} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stepper label="Guests" value={guests} min={1} max={20} onChange={setGuests} />
        <Stepper label="Rooms" value={rooms} min={1} max={10} onChange={setRooms} />
      </div>

      <fieldset>
        <legend className="text-label font-extrabold text-taupe uppercase">Type of stay</legend>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STAY_TYPES.map((t) => (
            <label
              key={t}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-2 text-center text-[0.8125rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                stay === t ? "bg-ink font-extrabold text-bone" : "bg-sand text-ink hover:bg-clay-soft",
              )}
            >
              <input
                type="radio"
                name={`${uid}-stay`}
                value={t}
                checked={stay === t}
                onChange={() => setStay(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite">
        {error && <p className="text-[0.8125rem] font-extrabold text-error">{error}</p>}
      </div>

      <button
        type="submit"
        className="mt-1 flex min-h-14 items-center justify-center gap-2.5 rounded-2xl bg-green-deep text-[1rem] font-extrabold text-white shadow-[0_14px_30px_rgba(57,151,114,0.3)] transition-transform duration-150 active:scale-[0.985]"
      >
        <WhatsAppIcon />
        Get hotel options
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </button>
      <p className="text-center text-[0.75rem] text-taupe">
        We reply with a few stays and their rates. Nothing is booked until you say yes.
      </p>
    </form>
  );
}
