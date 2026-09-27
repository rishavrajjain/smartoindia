"use client";

import Link from "next/link";
import { useId, useRef, useState, type ComponentType } from "react";

import { Container } from "@/components/ui/container";
import {
  ChoicePills,
  DateTile,
  Stepper,
  Tile,
  TimeTile,
  longDate,
  timeLabel,
} from "@/components/ui/form-tiles";
import {
  AirportIcon,
  ArrowIcon,
  BuildingIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  HeadsetIcon,
  KeyIcon,
  LocateIcon,
  MountainIcon,
  PeopleIcon,
  PlusIcon,
  RoadIcon,
  RouteIcon,
  SuitcaseIcon,
  TrainIcon,
} from "@/components/ui/line-icons";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, whatsappUrl } from "@/lib/whatsapp";

/*
 * Quick services: the booking flow from Smarto's own booking page
 * (smartocabs.com), one service at a time with that service's trip types.
 * There is no fare engine behind it: the choices compose a WhatsApp message
 * and the desk replies with the fare before anything is booked. The facts
 * shown (terminals, stations, rental hours and kilometres, the city minimum
 * fare, the shared-ride rule, the average pickup time) are the ones that
 * page states. Every field is optional.
 */

type Icon = ComponentType<{ className?: string }>;
type Option = { value: string; label: string };

type ServiceId = "airport" | "rental" | "railway" | "city" | "shillong" | "outstation" | "sonapur";

interface Service {
  id: ServiceId;
  name: string;
  hint: string;
  icon: Icon;
  modes: readonly Option[] | null;
  note: (mode: string) => string;
}

const ONE_WAY_ROUND: readonly Option[] = [
  { value: "one-way", label: "One way" },
  { value: "round", label: "Round trip" },
];

const SERVICES: readonly Service[] = [
  {
    id: "airport",
    name: "Airport transfer",
    hint: "Terminal 1 and 2",
    icon: AirportIcon,
    modes: ONE_WAY_ROUND,
    note: () => "We follow your flight, so a delay never leaves you stranded.",
  },
  {
    id: "rental",
    name: "Car rental",
    hint: "2 to 12 hours",
    icon: KeyIcon,
    modes: null,
    note: () => "From ₹349/hr, with 10 km included for every hour.",
  },
  {
    id: "railway",
    name: "Railway station",
    hint: "Three stations",
    icon: TrainIcon,
    modes: null,
    note: () => "One flat fare, early train or late.",
  },
  {
    id: "city",
    name: "City trip",
    hint: "Across Guwahati",
    icon: BuildingIcon,
    modes: null,
    note: () => "Minimum fare ₹249. Book at least 2 hours ahead.",
  },
  {
    id: "shillong",
    name: "Shillong rides",
    hint: "Reserved or shared",
    icon: MountainIcon,
    modes: [
      { value: "reserved", label: "Reserved" },
      { value: "shared", label: "Shared" },
    ],
    note: (mode) =>
      mode === "shared"
        ? "A shared ride is confirmed once at least 3 travellers book the same time slot."
        : "The whole car is yours, on one flat fare.",
  },
  {
    id: "outstation",
    name: "Outstation",
    hint: "One way or multi-day",
    icon: RoadIcon,
    modes: [
      { value: "one-way", label: "One way" },
      { value: "multiday", label: "Multi-day" },
      { value: "custom", label: "Custom trip" },
    ],
    note: (mode) =>
      mode === "custom"
        ? "Add hotels, flights or a full itinerary and we plan it together."
        : "A fixed fare, agreed before you set off.",
  },
  {
    id: "sonapur",
    name: "Sonapur ride",
    hint: "One way or return",
    icon: RouteIcon,
    modes: ONE_WAY_ROUND,
    note: () => "One flat fare, confirmed before you ride.",
  },
];

const LINKS = [
  { href: "/corporate", name: "Corporate", hint: "Rides for your team", icon: SuitcaseIcon },
  { href: "/partners#register", name: "Partner", hint: "Agents and hotels", icon: PeopleIcon },
] as const;

const TERMINALS: readonly Option[] = [
  { value: "Terminal 1", label: "Terminal 1" },
  { value: "Terminal 2", label: "Terminal 2" },
];

const STATIONS: readonly Option[] = [
  { value: "Guwahati Station", label: "Guwahati Station" },
  { value: "Kamakhya Station", label: "Kamakhya Station" },
  { value: "New Guwahati / Narangi", label: "New Guwahati / Narangi" },
];

const TIMING: readonly Option[] = [
  { value: "later", label: "Schedule" },
  { value: "now", label: "Ride now" },
];

const CABS: readonly Option[] = ["Any", "Hatchback", "Sedan", "MPV", "SUV", "EV sedan", "EV SUV"].map(
  (cab) => ({ value: cab, label: cab }),
);

const EXTRAS = ["Itinerary", "Hotel", "Flights"] as const;

const HERE = "My current location";
const MAX_STOPS = 3;

/* The direction choice each service offers, if any. */
function directionsFor(service: ServiceId, mode: string): { legend: string; options: readonly Option[] } | null {
  switch (service) {
    case "airport":
      return mode === "round"
        ? {
            legend: "Trip",
            options: [
              { value: "drop-first", label: "Drop, then pickup" },
              { value: "pickup-first", label: "Pickup, then drop" },
            ],
          }
        : {
            legend: "Trip",
            options: [
              { value: "from", label: "Pickup from airport" },
              { value: "to", label: "Drop to airport" },
            ],
          };
    case "railway":
      return {
        legend: "Trip",
        options: [
          { value: "to", label: "Drop to station" },
          { value: "from", label: "Pickup from station" },
          { value: "both", label: "Drop and pickup" },
        ],
      };
    case "shillong":
      return {
        legend: "Direction",
        options: [
          { value: "to", label: "To Shillong" },
          { value: "from", label: "From Shillong" },
          { value: "both", label: "Both ways" },
        ],
      };
    case "outstation":
      return mode === "one-way"
        ? {
            legend: "Route",
            options: [
              { value: "from", label: "From Guwahati" },
              { value: "to", label: "To Guwahati" },
              { value: "intercity", label: "Between cities" },
            ],
          }
        : null;
    case "sonapur":
      return mode === "one-way"
        ? {
            legend: "Direction",
            options: [
              { value: "to", label: "To Sonapur" },
              { value: "from", label: "From Sonapur" },
            ],
          }
        : null;
    default:
      return null;
  }
}

interface Place {
  key: "pickup" | "drop";
  label: string;
  /** How the line reads in the WhatsApp message. */
  line: string;
  placeholder: string;
  locate?: boolean;
}

const PICKUP: Place = { key: "pickup", label: "Pickup from", line: "Pickup", placeholder: "Your address", locate: true };
const DROP: Place = { key: "drop", label: "Drop at", line: "Drop", placeholder: "Where to?" };
const ADDRESS: Place = { key: "pickup", label: "Your address", line: "Address", placeholder: "Area or landmark", locate: true };

/* The address fields each trip needs. */
function placesFor(service: ServiceId, mode: string, direction: string): Place[] {
  switch (service) {
    case "airport":
      if (mode === "round") return [ADDRESS];
      return direction === "from" ? [DROP] : [PICKUP];
    case "rental":
      return [PICKUP];
    case "railway":
      if (direction === "from") return [DROP];
      return direction === "both" ? [ADDRESS] : [PICKUP];
    case "city":
      return [PICKUP, DROP];
    case "shillong":
      return direction === "from"
        ? [{ ...PICKUP, placeholder: "Where in Shillong?", locate: false }, { ...DROP, placeholder: "Where in Guwahati?" }]
        : [{ ...PICKUP, placeholder: "Where in Guwahati?" }, { ...DROP, placeholder: "Where in Shillong?" }];
    case "outstation":
      if (mode === "multiday")
        return [
          { key: "pickup", label: "From", line: "From", placeholder: "Starting city" },
          { key: "drop", label: "To", line: "To", placeholder: "Destination" },
        ];
      if (mode === "custom")
        return [{ key: "drop", label: "Where to?", line: "Where to", placeholder: "Places you want to see" }];
      return direction === "intercity"
        ? [{ ...PICKUP, placeholder: "Starting city", locate: false }, { ...DROP, placeholder: "Destination city" }]
        : [PICKUP, DROP];
    case "sonapur":
      if (mode === "round") return [ADDRESS];
      return direction === "from"
        ? [{ ...PICKUP, placeholder: "Where in Sonapur?", locate: false }, DROP]
        : [PICKUP, { ...DROP, placeholder: "Where in Sonapur?" }];
  }
}

interface Legs {
  first: string;
  second: string | null;
  /** How each leg reads in the message. */
  lines: [string, string];
  withTime: boolean;
  order: string;
}

/* The one or two moments a trip is timed around. */
function legsFor(service: ServiceId, mode: string, direction: string): Legs {
  const roundTrip: Legs = {
    first: "Onward",
    second: "Return",
    lines: ["Onward", "Return"],
    withTime: true,
    order: "The return needs to be after the onward ride.",
  };
  if (service === "airport" && mode === "round") return roundTrip;
  if (service === "sonapur" && mode === "round") return roundTrip;
  if (service === "shillong" && direction === "both") return roundTrip;
  if (service === "railway" && direction === "both")
    return {
      first: "Drop",
      second: "Pickup",
      lines: ["Station drop", "Station pickup"],
      withTime: true,
      order: "The station pickup needs to be after the drop.",
    };
  if (service === "outstation" && mode !== "one-way")
    return {
      first: "Start",
      second: "End",
      lines: ["Start", "End"],
      withTime: mode === "multiday",
      order: "The end needs to be after the start.",
    };
  return { first: "Pickup", second: null, lines: ["When", ""], withTime: true, order: "" };
}

function headline(service: ServiceId, mode: string): string {
  switch (service) {
    case "airport":
      return mode === "round" ? "an airport transfer, both ways" : "an airport transfer";
    case "rental":
      return "a car on hourly rental";
    case "railway":
      return "a railway station ride";
    case "city":
      return "a city ride in Guwahati";
    case "shillong":
      return `a ${mode === "shared" ? "shared" : "reserved"} Shillong ride`;
    case "outstation":
      return mode === "multiday" ? "a car for a multi-day trip" : "an outstation ride";
    case "sonapur":
      return mode === "round" ? "a Sonapur round trip" : "a Sonapur ride";
  }
}

function at(date: string, time: string): string {
  return [date && longDate(date), time && timeLabel(time)].filter(Boolean).join(", ");
}

export function CabQuickServices() {
  const uid = useId();
  const [service, setService] = useState<ServiceId>("airport");
  const [modeChoice, setMode] = useState("one-way");
  const [directionChoice, setDirection] = useState("");
  const [terminal, setTerminal] = useState(TERMINALS[0].value);
  const [station, setStation] = useState(STATIONS[0].value);
  const [timing, setTiming] = useState("later");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [date2, setDate2] = useState("");
  const [time2, setTime2] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [here, setHere] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [stops, setStops] = useState<{ id: number; value: string }[]>([]);
  const [hours, setHours] = useState(4);
  const [seats, setSeats] = useState(1);
  const [cab, setCab] = useState("Any");
  const [extras, setExtras] = useState<string[]>([]);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const svc = SERVICES.find((s) => s.id === service) ?? SERVICES[0];
  const mode = svc.modes?.some((m) => m.value === modeChoice) ? modeChoice : (svc.modes?.[0].value ?? "");
  const dir = directionsFor(service, mode);
  const direction = dir?.options.some((o) => o.value === directionChoice)
    ? directionChoice
    : (dir?.options[0].value ?? "");
  const places = placesFor(service, mode, direction);
  const legs = legsFor(service, mode, direction);
  const canRideNow = (service === "airport" && mode === "one-way") || service === "rental" || service === "railway";
  const now = canRideNow && timing === "now";
  const canStop =
    service === "airport" || service === "railway" || service === "city" || (service === "outstation" && mode === "one-way");
  const custom = service === "outstation" && mode === "custom";

  const pickService = (id: ServiceId) => {
    const next = SERVICES.find((s) => s.id === id);
    setService(id);
    setMode(next?.modes?.[0].value ?? "");
    setDirection("");
    setError("");
  };

  /* On a phone the card sits below the tiles: after a tap, bring it into
     view if it is off screen. Keyboard changes never move the page. */
  const revealForm = () => {
    const form = formRef.current;
    if (!form || window.matchMedia("(min-width: 1024px)").matches) return;
    if (form.getBoundingClientRect().top > window.innerHeight * 0.6) {
      requestAnimationFrame(() => form.scrollIntoView({ block: "start" }));
    }
  };

  const setPlace = (key: Place["key"], value: string) => {
    if (key === "pickup") {
      setPickup(value);
      setHere(null);
    } else {
      setDrop(value);
    }
  };

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setError("Your browser cannot share a location. Type the address instead.");
      return;
    }
    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setHere(`${position.coords.latitude.toFixed(5)},${position.coords.longitude.toFixed(5)}`);
        setPickup(HERE);
        setLocating(false);
      },
      () => {
        setLocating(false);
        setError("We could not get your location. Type the address instead.");
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  };

  const submit = () => {
    if (legs.second && date && date2) {
      const first = legs.withTime ? `${date}T${time || "00:00"}` : date;
      const second = legs.withTime ? `${date2}T${time2 || "00:00"}` : date2;
      if (!now && second < first) {
        setError(legs.order);
        return;
      }
    }
    setError("");

    const pickupText = here && pickup === HERE ? `${HERE} (https://www.google.com/maps?q=${here})` : pickup.trim();
    const lines: (string | false)[] = [
      custom ? "Hi Smarto, I would like help planning an outstation trip." : `Hi Smarto, I would like to book ${headline(service, mode)}.`,
      !!dir && `Trip: ${dir.options.find((o) => o.value === direction)?.label}`,
      service === "airport" && `Terminal: ${terminal}`,
      service === "railway" && `Station: ${station}`,
      service === "rental" && `Duration: ${hours} hours (${hours * 10} km included)`,
      service === "shillong" && mode === "shared" && `Seats: ${seats}`,
      ...places.map((place) => {
        const value = place.key === "pickup" ? pickupText : drop.trim();
        return !!value && `${place.line}: ${value}`;
      }),
    ];
    const stopList = canStop ? stops.map((s) => s.value.trim()).filter(Boolean) : [];
    if (stopList.length) lines.push(`Stops: ${stopList.join("; ")}`);
    if (custom && cab !== "Any") lines.push(`Cab: ${cab}`);
    if (custom && extras.length) lines.push(`Also need: ${extras.join(", ")}`);
    if (now) lines.push("When: Now");
    else if (date || time) lines.push(`${legs.lines[0]}: ${at(date, legs.withTime ? time : "")}`);
    if (legs.second && (date2 || time2)) lines.push(`${legs.lines[1]}: ${at(date2, legs.withTime ? time2 : "")}`);

    trackCtaClick({ location: "cabs-quick-book", subject: mode ? `${service}-${mode}` : service });
    window.open(whatsappUrl(lines.filter(Boolean).join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="book" aria-labelledby={`${uid}-title`} className="scroll-mt-20 bg-bone pb-16 lg:pb-24">
      <Container width="wide">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <div>
            <p className="text-label font-extrabold text-clay uppercase">Quick services</p>
            <h2 id={`${uid}-title`} className="mt-3 text-[1.875rem] leading-[1.08] sm:text-[2.25rem] lg:text-[2.5rem]">
              What kind of ride <span className="accent">do you need?</span>
            </h2>
          </div>
          <p className="max-w-sm text-[0.875rem] leading-relaxed text-taupe">
            Pick a service and fill in what you know. We reply on WhatsApp with
            your fare, before anything is booked.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          {/* --- The services. */}
          <fieldset className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <legend className="sr-only">Choose a service</legend>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {SERVICES.map((s) => {
                const active = s.id === service;
                return (
                  <label
                    key={s.id}
                    onPointerUp={revealForm}
                    className={cn(
                      "relative flex min-h-[6.5rem] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-3 transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink sm:min-h-[8rem] sm:p-4",
                      active ? "bg-ink text-bone" : "bg-sand text-ink hover:bg-line",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${uid}-service`}
                      value={s.id}
                      checked={active}
                      onChange={() => pickService(s.id)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "grid size-9 place-items-center rounded-full transition-colors sm:size-10",
                        active ? "bg-bone/12 text-green" : "bg-bone text-ink",
                      )}
                    >
                      <s.icon className="size-[1.125rem] sm:size-5" />
                    </span>
                    <span className="mt-3 block">
                      <span className="block text-[0.78125rem] leading-tight font-extrabold sm:text-[0.875rem]">
                        {s.name}
                      </span>
                      <span
                        className={cn(
                          "mt-1 hidden text-[0.6875rem] leading-snug sm:block",
                          active ? "text-bone/65" : "text-taupe",
                        )}
                      >
                        {s.hint}
                      </span>
                    </span>
                    {active && <span aria-hidden="true" className="spark-fill absolute inset-x-0 bottom-0 h-[3px]" />}
                  </label>
                );
              })}
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group relative flex min-h-[6.5rem] flex-col justify-between rounded-2xl bg-bone p-3 text-ink ring-1 ring-line transition-shadow duration-200 hover:ring-ink sm:min-h-[8rem] sm:p-4"
                >
                  <span className="flex items-start justify-between gap-1">
                    <span className="grid size-9 place-items-center rounded-full bg-sand sm:size-10">
                      <l.icon className="size-[1.125rem] sm:size-5" />
                    </span>
                    <ArrowIcon className="size-3.5 -rotate-45 text-taupe transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="mt-3 block">
                    <span className="block text-[0.78125rem] leading-tight font-extrabold sm:text-[0.875rem]">{l.name}</span>
                    <span className="mt-1 hidden text-[0.6875rem] leading-snug text-taupe sm:block">{l.hint}</span>
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-3 rounded-2xl px-1 text-[0.8125rem] leading-snug text-taupe sm:mt-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-green-deep/10 text-green-deep">
                <HeadsetIcon className="size-[1.125rem]" />
              </span>
              <span>
                Not sure which? Call us on{" "}
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="font-extrabold whitespace-nowrap text-ink underline-offset-4 hover:underline">
                  {WHATSAPP_DISPLAY}
                </a>
                , around the clock.
              </span>
            </p>
          </fieldset>

          {/* --- The chosen service's booking card. */}
          <form
            ref={formRef}
            noValidate
            aria-labelledby={`${uid}-service-name`}
            className="relative scroll-mt-20 overflow-hidden rounded-[1.75rem] bg-bone p-4 shadow-[0_28px_60px_-32px_rgba(28,26,69,0.45)] ring-1 ring-line sm:p-6 lg:col-span-7 lg:p-7"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <span aria-hidden="true" className="spark-fill absolute inset-x-0 top-0 h-[3px]" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-green">
                  <svc.icon className="size-5" />
                </span>
                <div>
                  <p className="text-label font-extrabold text-taupe uppercase">Book</p>
                  <h3 id={`${uid}-service-name`} className="text-[1.25rem] leading-tight font-extrabold text-ink">
                    {svc.name}
                  </h3>
                </div>
              </div>
              {svc.modes && (
                <fieldset className="w-full sm:w-auto">
                  <legend className="sr-only">Trip type</legend>
                  <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-full bg-sand p-1">
                    {svc.modes.map((m) => (
                      <label
                        key={m.value}
                        className={cn(
                          "flex min-h-11 cursor-pointer items-center justify-center rounded-full px-4 text-[0.8125rem] whitespace-nowrap transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-ink",
                          mode === m.value ? "bg-ink font-extrabold text-bone" : "text-ink hover:bg-bone/80",
                        )}
                      >
                        <input
                          type="radio"
                          name={`${uid}-mode`}
                          value={m.value}
                          checked={mode === m.value}
                          onChange={() => {
                            setMode(m.value);
                            setDirection("");
                            setError("");
                          }}
                          className="sr-only"
                        />
                        {m.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>

            <div key={`${service}-${mode}`} className="mt-6 flex flex-col gap-4 motion-safe:animate-fade-in">
              {dir && (
                <ChoicePills
                  legend={dir.legend}
                  name={`${uid}-direction`}
                  options={dir.options}
                  value={direction}
                  onChange={setDirection}
                  layout={dir.options.length === 3 ? "grid-3" : "grid-2"}
                />
              )}
              {service === "airport" && (
                <ChoicePills legend="Terminal" name={`${uid}-terminal`} options={TERMINALS} value={terminal} onChange={setTerminal} />
              )}
              {service === "railway" && (
                <ChoicePills legend="Station" name={`${uid}-station`} options={STATIONS} value={station} onChange={setStation} layout="wrap" />
              )}
              {service === "rental" && (
                <Stepper
                  label="Hours"
                  value={hours}
                  min={2}
                  max={12}
                  onChange={setHours}
                  display={`${hours} hours`}
                  note={`${hours * 10} km included`}
                />
              )}
              {service === "shillong" && mode === "shared" && (
                <Stepper label="Seats" value={seats} min={1} max={4} onChange={setSeats} />
              )}

              {places.map((place) => {
                const id = `${uid}-${place.key}`;
                return (
                  <Tile key={place.key} label={place.label} htmlFor={id}>
                    <span className="mt-1 flex items-center gap-2">
                      <input
                        id={id}
                        type="text"
                        autoComplete="off"
                        enterKeyHint="next"
                        placeholder={place.placeholder}
                        value={place.key === "pickup" ? pickup : drop}
                        onChange={(e) => setPlace(place.key, e.target.value)}
                        className="min-w-0 flex-1 bg-transparent text-[1.0625rem] leading-tight font-extrabold text-ink outline-none placeholder:font-light placeholder:text-taupe/60 sm:text-[1.125rem]"
                      />
                      {place.locate && (
                        <button
                          type="button"
                          onClick={locate}
                          disabled={locating}
                          aria-label={here && pickup === HERE ? "Update my location" : "Use my location"}
                          className={cn(
                            "inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-[0.75rem] font-extrabold ring-1 transition-colors disabled:opacity-60 sm:px-3",
                            here && pickup === HERE
                              ? "bg-green-deep text-white ring-green-deep"
                              : "bg-bone text-ink ring-line hover:bg-ink hover:text-bone",
                          )}
                        >
                          <LocateIcon className={cn("size-4", locating && "motion-safe:animate-spin")} />
                          <span className="hidden sm:inline">{locating ? "Locating" : "My location"}</span>
                        </button>
                      )}
                    </span>
                  </Tile>
                );
              })}

              {canStop && (
                <>
                  {stops.map((stop, i) => {
                    const id = `${uid}-stop-${stop.id}`;
                    return (
                      <Tile key={stop.id} label={`Stop ${i + 1}`} htmlFor={id} className="min-h-[4.75rem]">
                        <span className="mt-1 flex items-center gap-2">
                          <input
                            id={id}
                            type="text"
                            autoComplete="off"
                            placeholder="Where should we stop?"
                            value={stop.value}
                            onChange={(e) =>
                              setStops(stops.map((s) => (s.id === stop.id ? { ...s, value: e.target.value } : s)))
                            }
                            className="min-w-0 flex-1 bg-transparent text-[1.0625rem] leading-tight font-extrabold text-ink outline-none placeholder:font-light placeholder:text-taupe/60"
                          />
                          <button
                            type="button"
                            onClick={() => setStops(stops.filter((s) => s.id !== stop.id))}
                            aria-label={`Remove stop ${i + 1}`}
                            className="grid size-9 shrink-0 place-items-center rounded-full bg-bone text-ink ring-1 ring-line transition-colors hover:bg-ink hover:text-bone"
                          >
                            <CloseIcon className="size-4" />
                          </button>
                        </span>
                      </Tile>
                    );
                  })}
                  {stops.length < MAX_STOPS && (
                    <button
                      type="button"
                      onClick={() => setStops([...stops, { id: Math.max(0, ...stops.map((s) => s.id)) + 1, value: "" }])}
                      className="inline-flex min-h-11 items-center gap-2 self-start rounded-full px-4 text-[0.8125rem] font-extrabold text-ink ring-1 ring-line-strong transition-colors hover:bg-sand"
                    >
                      <PlusIcon className="size-4" />
                      Add a stop
                    </button>
                  )}
                </>
              )}

              {custom && (
                <>
                  <ChoicePills legend="Preferred cab" name={`${uid}-cab`} options={CABS} value={cab} onChange={setCab} layout="wrap" />
                  <fieldset>
                    <legend className="text-label font-extrabold text-taupe uppercase">Add to the trip</legend>
                    <div className="mt-2.5 grid grid-cols-3 gap-2">
                      {EXTRAS.map((extra) => {
                        const on = extras.includes(extra);
                        return (
                          <label
                            key={extra}
                            className={cn(
                              "flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2 text-[0.8125rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                              on ? "bg-ink font-extrabold text-bone" : "bg-sand text-ink hover:bg-line",
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() => setExtras(on ? extras.filter((x) => x !== extra) : [...extras, extra])}
                              className="sr-only"
                            />
                            {on && <CheckIcon className="size-3.5 text-green" />}
                            {extra}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </>
              )}

              {canRideNow && (
                <ChoicePills legend="When" name={`${uid}-timing`} options={TIMING} value={timing} onChange={setTiming} />
              )}
              {now ? (
                <p className="flex items-center gap-3 rounded-2xl bg-sand px-4 py-4 text-[0.875rem] text-ink">
                  <ClockIcon className="size-5 shrink-0 text-green-deep" />
                  Average pickup time is about 20 minutes.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <DateTile
                    label={`${legs.first} date`}
                    ariaLabel={`${legs.first} date`}
                    value={date}
                    onChange={setDate}
                  />
                  {legs.withTime ? (
                    <TimeTile label={`${legs.first} time`} ariaLabel={`${legs.first} time`} value={time} onChange={setTime} />
                  ) : (
                    legs.second && (
                      <DateTile
                        label={`${legs.second} date`}
                        ariaLabel={`${legs.second} date`}
                        value={date2}
                        min={date || undefined}
                        onChange={setDate2}
                      />
                    )
                  )}
                </div>
              )}
              {legs.second && legs.withTime && (
                <div className="grid grid-cols-2 gap-3">
                  <DateTile
                    label={`${legs.second} date`}
                    ariaLabel={`${legs.second} date`}
                    value={date2}
                    min={(!now && date) || undefined}
                    onChange={setDate2}
                  />
                  <TimeTile label={`${legs.second} time`} ariaLabel={`${legs.second} time`} value={time2} onChange={setTime2} />
                </div>
              )}

              <p className="mt-1 flex items-start gap-2.5 text-[0.8125rem] leading-snug text-taupe">
                <CheckIcon className="mt-px size-4 shrink-0 text-green-deep" />
                {svc.note(mode)}
              </p>
            </div>

            <div aria-live="polite" className="mt-3">
              {error && <p className="text-[0.8125rem] font-extrabold text-error">{error}</p>}
            </div>

            <button
              type="submit"
              className="mt-3 flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-green-deep text-[1rem] font-extrabold text-white shadow-[0_14px_30px_rgba(57,151,114,0.3)] transition-transform duration-150 active:scale-[0.985]"
            >
              <WhatsAppIcon />
              {custom ? "Plan it on WhatsApp" : "Get your fare on WhatsApp"}
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </button>
            <p className="mt-3 text-center text-[0.75rem] text-taupe">
              A real person replies. Nothing is booked until you say yes.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
