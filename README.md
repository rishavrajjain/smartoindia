# Smarto India

Marketing site for Smarto, a Northeast India travel and mobility company. The
single conversion goal is a qualified WhatsApp enquiry — there is no checkout
and no accounts. The one exception to "no forms" is `/flights`, which searches
live fares through AgentBazar's Fixed Departure API and still hands the booking
to WhatsApp (see below).

## Stack

- Next.js 16 (App Router, Turbopack) with React 19
- Strict TypeScript, React Server Components by default
- Tailwind CSS v4 with design tokens declared in `src/app/globals.css`
- `next/font` with Poppins in two weights, Light 300 and ExtraBold 800 (see `docs/smarto-design-system.md`)
- Deployed on Vercel; every route is statically prerendered except `/flights`
  and `/flights/book`, which render per request against the airline API

## Getting started

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local`. The site builds without any variables;
`/flights` needs `AGENTBAZAR_API_URL` and `AGENTBAZAR_API_KEY` to show fares and
falls back to a WhatsApp enquiry when they are missing.

## Flights

`/flights` is the only route that talks to a third party at request time:
AgentBazar's (Tripforu Holidays) Fixed Departure API, a fixed-departure /
block-seat inventory rather than a live GDS, so empty results are normal.

- `src/lib/agentbazar.ts` is the server-only client (`import "server-only"`).
  The API always answers HTTP 200; success and failure live in the body's
  `statuscode`. Offers are rebuilt field by field at the boundary.
- Flow: search (URL state) → select → `/flights/book` re-prices the fare → the
  visitor confirms on WhatsApp. **No payment is taken on the site.**
- `AGENTBAZAR_LIVE_BOOKING=true` switches the booking page to a validated form
  that issues tickets through `AirBook`. That debits Smarto's agency wallet
  without collecting payment from the visitor, so it stays off until a payment
  process exists. Never test it against a wallet that holds real money.
- The staging endpoint returns test inventory (one DEL→GAU fare). Fares from it
  are labelled "Test fares". Production currently points at staging too, by
  decision, while the site has no public users; swap in real credentials (and
  consider re-adding a production guard in `agentbazar.ts`) before launch.

## Scripts

| Command                | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `pnpm dev`             | Dev server on :3000                                 |
| `pnpm build`           | Production build (static except `/flights`)          |
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

## Deployment

Pushes to `main` deploy to production through the connected Vercel project.

**Commits must be authored by an email GitHub recognises for the account.**
Once a Vercel project is linked to a GitHub repository, Vercel validates the
commit author and refuses to build otherwise, failing with:

```text
The Deployment was blocked because there was no git user associated with the commit.
```

The deployment sits in an `UNKNOWN` state in `vercel ls` rather than reporting a
build error, so check the API if a deploy appears stuck:

```bash
gh api user --jq .email
```

Set `git config user.email` to that address before committing.

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
