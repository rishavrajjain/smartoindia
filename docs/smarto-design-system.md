# Smarto Travel — design system (working version)

> Supplied by Manav on 28 Aug 2026 ("last updated 26 Aug 2026, for the
> Smarto Travel launch, 1 Sept 2026"). This is the single source of truth for
> all Smarto creative. The website applies it with judgment — deviations are
> noted at the bottom.

## 1. The non-negotiables

1. **Navy `#282560` replaces black.** No pure black text anywhere, ever.
2. **Two weights only** — Light 300 and ExtraBold 800. No Regular/Medium/
   SemiBold. The Light↔ExtraBold jump *is* the identity.
3. **Sentence case for all headlines and body.** (Caps only in the three
   tiers in §4.)
4. **Spark gradient is reserved** — logo, edge band, hero glows, small
   accents only. Never a fill for body text or large blocks.
5. **Green family = eco / EV / confirmed-price meaning.**
6. **Flat surfaces** — no shadows, no strokes, radius 4–16.
7. **The bottom edge band is the signature.** Every light layout is anchored
   by it.
8. **Headline construction:** Light setup → ExtraBold payoff.

## 2. Colour

Core: navy `#282560` (primary ink) · indigo `#393978` (secondary text) ·
magenta `#C44868` (gradient hotspot only, never a flat fill) · green
`#75B884` · green-deep `#399772` (success, confirmed fares) · green-dark
`#438F6F` · lime `#B5C07A` / emerald `#3EB391` (green-gradient stops).

Neutrals: white `#FFFFFF` (default ground) · mist `#EEF0F4` (alternating
sections) · grays `#DADADA` / `#C9C9C8` / `#C3C3C3` · slate `#585F66` (the
only recurring stroke) · slate-dark `#2C4157`.

Grounds: `--ground-navy-deep` `#1C1A45` (video/reel ground) ·
`--scrim-navy` `linear-gradient(180deg, rgba(40,37,96,0) 0%,
rgba(40,37,96,.88) 100%)` — the only sanctioned way to put white type over
photography.

Gradients: **spark** `linear-gradient(90deg, #282560 0%, #7B3F7E 50%,
#C44868 100%)` · **green** `linear-gradient(135deg, #B5C07A 0%, #3EB391
100%)`.

Fare states: locked/flat/honest `#399772` · struck/competitor surge
`#9A9AB0` (strikethrough, never magenta) · default `#282560`.

Semantic (functional UI only): success `#399772` · error `#C44868` · info
`#393978` · warning `#E3A63C` (booking-form validation only — **no amber or
yellow in any marketing asset**).

## 3. Logo

Wordmark "Smarto", bolt knocked out of the 'a'. Light grounds: spark
gradient fill, pink hotspot on the 'a'. Dark grounds/video/photos: solid
white knockout. Tagline lockup: "Smart People," (Light, `#393978`) +
"Smart" (ExtraBold, `#393978`) + "Choice" (ExtraBold, **green gradient**).
Clear space ≥ one 'o'-width. Never recolour the bolt or use it standalone.

## 4. Typography

Gilroy Light 300 / ExtraBold 800. Gilroy is proprietary — **fallback
Poppins 300/800** (runner-up Montserrat). Leading: display ≈0.90×
(ExtraBold) / 1.05× (Light); body 1.4.

Casing: sentence case everywhere except three tiers —
1. **Micro-labels**: ALL CAPS, ExtraBold, 14–15px, `letter-spacing .2em`
   (eyebrows, badges, tabs, chips).
2. **The shout**: ALL CAPS ExtraBold in a navy chip, one per asset
   (`LAUNCHING 1.09.2026`).
3. **Fare unit**: ALL CAPS ExtraBold, `.22em` of the fare size, `.2em`
   tracking (`FLAT · ALL-IN`).

Title Case is off-brand — never use it.

## 5. Radius, border, shadow

radius 4 / 6 / 12 / 16 / pill. Borders effectively none (hairline 0.5–1pt
`#282560`/`#585F66` only where unavoidable). **No shadows — cards sit flat.**

## 6. Components

- **Edge gradient band** — full-width spark strip at the bottom of every
  light layout. The signature.
- **Chip highlight** — headline phrases on navy rectangles (radius 2–4),
  white ExtraBold, ragged widths. White grounds only.
- **Fare lockup** — ExtraBold, tabular-nums, `letter-spacing -.03em`,
  currency at `.45em` top-aligned at `.75` opacity; locked fares
  `#399772`; struck `#9A9AB0` line-through. Never in the spark gradient.
  Mandated microcopy on every package price: **"all-in"** or **"no hidden
  costs"**.
- **Destination card** — photo radius 12, 4:5 or 3:2, no border/shadow;
  navy scrim over bottom 45% when type sits on the image; name ExtraBold
  white sentence case; price below/outside the image.
- **Service icons** — line/outline 2pt at 24px, rounded, navy, unfilled;
  Phosphor (regular) or Lucide, one library only. Never emoji as icons.
- **Chart style** — unit pictograms (stacked green cars), thin navy axis,
  no gridlines, no legend.

## 7. Motion & video

`--motion-fast` 180ms · `--motion-base` 260ms · `--motion-slow` 420ms ·
`--ease-brand` `cubic-bezier(.22,.8,.28,1)` (confident settle, no bounce).
Video ground `#1C1A45`; logo white knockout only; the spark gradient becomes
the **progress bar** at the top of a reel; fare reveals land on green; every
video ends with the branded outro. No yellow.

## 8. Voice

Sentence case; Light setup → ExtraBold payoff. Established lines: "Smart
People, Smart Choice" (the only Title Case element — it's a lockup) ·
"Safe, reliable, and eco-friendly." · "Thank you."

Travel: pair the place with the feeling, not the distance ("Shillong, in a
quiet car"). Every package price carries "all-in"/"no hidden costs".
"Northeast specialists", never "India's leading travel portal". Humour is
confident-cheeky, aimed at surge pricing, captions/X only, never stacked on
a price.

---

## Website deviations (deliberate, agreed in implementation)

- **Token names**: `src/app/globals.css` keeps pre-rebrand token names
  (bone/sand/ink/taupe/clay/terracotta/ochre) with brand values, so ~80
  call sites didn't churn. See the note in that file.
- **3D service icons stay** on the homepage turntable — they are bespoke
  illustration assets (Airbnb-category style), not emoji glyphs; the
  line-icon rule applies to utility UI icons.
- **Illustration shadows stay** (turntable ground shadow, coverflow depth
  shadow) — they are part of a 3D scene, not card chrome. Flat-surface
  rule applies to cards and panels.
- **Micro-labels run 12px** on the phone-width site (14–15px is deck
  scale).
- **Hero-film fares stay white** over footage for legibility; green fare
  lockups apply on controlled page grounds.
- The wordmark asset in `/public/brand/` is used as supplied.
