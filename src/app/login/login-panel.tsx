"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";

import {
  BuildingIcon,
  PeopleIcon,
  ShieldIcon,
  SuitcaseIcon,
} from "@/components/ui/line-icons";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import { enquiry } from "@/lib/whatsapp";

/*
 * The sign-in card. This site has no authentication backend yet, so the
 * form never sends what is typed anywhere: submitting says so plainly,
 * clears the password, and points to the current Smarto portal and to
 * WhatsApp. Wiring it to the real login API replaces onSubmit only.
 */

const PORTAL_URL = "https://smartocabs.com/admin/login";

const ROLES = [
  { id: "admin", label: "Admin", line: "Smarto team", icon: ShieldIcon },
  { id: "corporate", label: "Corporate", line: "Company travel desks", icon: BuildingIcon },
  { id: "agent", label: "Agent", line: "Travel agents", icon: SuitcaseIcon },
  { id: "partner", label: "Partner", line: "Hotels and fleet", icon: PeopleIcon },
] as const;

type RoleId = (typeof ROLES)[number]["id"];

export function LoginPanel() {
  const uid = useId();
  const [role, setRole] = useState<RoleId>("corporate");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const current = ROLES.find((r) => r.id === role) ?? ROLES[0];

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordRef.current) passwordRef.current.value = "";
    setNotice(true);
  };

  return (
    <div className="w-full max-w-[28rem]">
      <Link href="/" aria-label={`${SITE.name} home`} className="inline-block">
        <Image
          src="/brand/smarto-wordmark.webp"
          alt={SITE.name}
          width={720}
          height={160}
          priority
          className="h-7 w-auto"
        />
      </Link>

      <h1 className="mt-8 text-[2rem] leading-[1.08] sm:text-[2.25rem]">
        Welcome <span className="accent">back</span>
      </h1>
      <p className="mt-2 text-[0.9375rem] text-taupe">
        Choose how you work with Smarto, then sign in.
      </p>

      <form method="post" onSubmit={onSubmit} className="mt-7">
        <fieldset>
          <legend className="text-label font-extrabold text-taupe uppercase">
            Sign in as
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {ROLES.map((r) => {
              const on = r.id === role;
              return (
                <label
                  key={r.id}
                  className={cn(
                    "group relative flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl px-2 py-3.5 text-center transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.97] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                    on
                      ? "bg-ink text-bone shadow-[0_12px_26px_rgba(40,37,96,0.28)]"
                      : "bg-sand text-ink hover:bg-clay-soft hover:ring-1 hover:ring-line-strong",
                  )}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.id}
                    checked={on}
                    onChange={() => {
                      setRole(r.id);
                      setNotice(false);
                    }}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-full transition-colors",
                      on ? "bg-green text-clay-deep" : "bg-bone text-taupe",
                    )}
                  >
                    <r.icon className="size-[1.125rem]" />
                  </span>
                  <span className="text-[0.8125rem] font-extrabold">{r.label}</span>
                  <span className={cn("text-[0.625rem] leading-tight", on ? "text-bone/65" : "text-taupe")}>
                    {r.line}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor={`${uid}-user`} className="text-[0.8125rem] font-extrabold text-ink">
              Username or email
            </label>
            <input
              id={`${uid}-user`}
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-2 h-13 w-full rounded-2xl bg-sand px-4 text-[0.9375rem] text-ink ring-1 ring-transparent transition-shadow outline-none placeholder:text-taupe/60 focus:bg-bone focus:ring-2 focus:ring-ink"
              placeholder={`Your ${current.label.toLowerCase()} username`}
            />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor={`${uid}-pass`} className="text-[0.8125rem] font-extrabold text-ink">
                Password
              </label>
              <WaCta
                message={enquiry(`I need help with my ${current.label.toLowerCase()} login password.`)}
                location="login-help"
                subject={role}
                className="text-[0.75rem] font-extrabold text-taupe underline decoration-line-strong underline-offset-4 hover:text-ink"
              >
                Forgot password?
              </WaCta>
            </div>
            <div className="relative mt-2">
              <input
                ref={passwordRef}
                id={`${uid}-pass`}
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="h-13 w-full rounded-2xl bg-sand pr-14 pl-4 text-[0.9375rem] text-ink ring-1 ring-transparent transition-shadow outline-none placeholder:text-taupe/60 focus:bg-bone focus:ring-2 focus:ring-ink"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-pressed={showPassword}
                className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-xl text-taupe transition-colors hover:bg-sand hover:text-ink"
              >
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                <EyeGlyph open={showPassword} className="size-5" />
              </button>
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-2.5 text-[0.8125rem] text-taupe">
            <input type="checkbox" name="remember" className="size-4 accent-[#282560]" />
            Keep me signed in on this device
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-green-deep text-[0.9375rem] font-extrabold text-white shadow-[0_14px_30px_rgba(57,151,114,0.35)] transition-transform duration-150 active:scale-[0.985]"
        >
          Sign in as {current.label}
          <ArrowGlyph className="size-4" />
        </button>

        <div aria-live="polite">
          {notice && (
            <div className="mt-5 rounded-2xl bg-clay-soft p-4 text-[0.8125rem] leading-relaxed text-ink ring-1 ring-line motion-safe:animate-rise">
              <p>
                <b>Sign-in isn&rsquo;t connected on this new site yet.</b> What
                you typed was not sent anywhere. Use the current Smarto portal
                for now, or message us and we will get you in.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-[0.75rem] font-extrabold text-bone"
                >
                  Open the current portal
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <WaCta
                  message={enquiry(`I need help signing in to my ${current.label.toLowerCase()} account.`)}
                  location="login-help"
                  subject={role}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-bone px-4 text-[0.75rem] font-extrabold text-ink ring-1 ring-line-strong"
                >
                  <WhatsAppIcon />
                  Get help
                </WaCta>
              </div>
            </div>
          )}
        </div>
      </form>

      <p className="mt-7 border-t border-line pt-5 text-[0.8125rem] text-taupe">
        New {current.label.toLowerCase()}?{" "}
        <WaCta
          message={enquiry(`I would like to register as a ${current.label.toLowerCase()} with Smarto.`)}
          location="login-access"
          subject={role}
          className="font-extrabold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >
          Register
        </WaCta>
      </p>
    </div>
  );
}

function EyeGlyph({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <path d="M4 4l16 16" />}
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
