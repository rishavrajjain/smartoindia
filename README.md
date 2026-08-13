# Smarto India

Marketing site for Smarto, a Northeast India travel and mobility company. The
single conversion goal is a qualified WhatsApp enquiry — there is no checkout,
no accounts, and no booking form.

## Stack

- Next.js 16 (App Router, Turbopack) with React 19
- Strict TypeScript, React Server Components by default
- Tailwind CSS v4 with design tokens declared in `src/app/globals.css`
- `next/font` (Newsreader for display, Archivo for UI)
- Deployed on Vercel; every route is statically prerendered

## Getting started

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` before running the image script. No
environment variables are required to run or build the site itself.

## Scripts

| Command                | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `pnpm dev`             | Dev server on :3000                                 |
| `pnpm build`           | Production build (all routes prerender)             |
| `pnpm start`           | Serve the production build                          |
| `pnpm lint`            | ESLint                                              |
| `pnpm typecheck`       | `tsc --noEmit`                                      |
| `pnpm generate:images` | Regenerate site photography (development only)      |

## Structure

```text
src/
  app/          Routes, metadata, sitemap, robots, OG images
  components/
    ui/         Reusable primitives
    sections/   Page sections and client-side interaction
  data/         Typed catalog content
  lib/          WhatsApp URLs, analytics, SEO, site config
  types/        Shared domain types
public/
  images/       Generated photography + manifest.json
  brand/        Logo variants
scripts/        Development-time asset generation
```

## Content status

**Most catalog content is placeholder.** Every record in `src/data/` carries a
`status: "mock" | "verified"` field, and everything currently reads `"mock"`.
Itineraries, cab service details, impact commitments, and reviews were written
by the build team as a credible starting shape — not supplied by the business.

Before launch, the owner needs to confirm:

- Package itineraries, inclusions, exclusions, and stay standards
- Cab coverage areas and vehicle availability
- Festival dates for the coming year (several follow lunar calendars and move;
  each record stores `timingYear` and `timingSource`)
- Any impact figures — the impact page deliberately contains no numbers
- Real reviews with permission to publish; the current six are fictional and
  labelled as illustrative in the UI

No prices appear anywhere. Every package uses `priceLabel: "Request a quote"`.

## Images

Photography is generated during development with the OpenAI image API and the
optimised output is committed, so production never calls the API. `OPENAI_API_KEY`
is server-side only and is never exposed through a `NEXT_PUBLIC_` variable.

`scripts/media-manifest.mjs` records the prompt, aspect ratio, and intended
placement for each asset. Regenerate one with:

```bash
pnpm generate:images -- home-hero
```

`src/data/images.ts` mirrors the manifest and supplies intrinsic dimensions to
`next/image`, which is what keeps layout shift at zero.

## Conventions

- All WhatsApp links are built through `src/lib/whatsapp.ts`; never hardcode the
  number or an intent URL
- CTA placements are typed as `CtaLocation` and reported through
  `src/lib/analytics.ts`, which is a no-op until a provider is wired up
- Colours come from tokens only. Contrast ratios are documented beside each
  token in `globals.css`; combinations marked "fills only" must not carry text
- No structured data is emitted — the business has no verified ratings, prices,
  or address yet, and inventing them for schema markup would misinform search
