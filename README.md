# AV Fitness Gym — Website

The public website and membership platform for AV Fitness Gym (two branches).
**Phase 1 build** — brand system + complete public website + 360° tour
framework + registration-of-interest flow. See `docs/` for the discovery
report and the owner's missing-content checklist.

## Run it locally

Requirements: Node.js 20+ (built and verified on Node 24) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000 (or http://127.0.0.1:3000 — both hostnames are
allowed in dev).

```bash
npm run build   # production build
npm start       # serve the production build
```

## What's inside

| Route | Purpose |
|---|---|
| `/` | Home — hero, branches overview, equipment zones, memberships, tour invitation, updates |
| `/branches` · `/branches/[slug]` | Branch directory and one page per branch (hours, location, equipment, tour entry) |
| `/equipment` | Equipment catalog by training zone, per-branch verification status |
| `/memberships` · `/memberships/join` | Plans (prices pending) and the 4-step registration-of-interest flow |
| `/tour` | 360° indoor virtual tour — Pannellum viewer, lazy-loaded, scenes + hotspots + scene list |
| `/announcements` | General and branch-specific notices (staff-managed later) |
| `/about` · `/contact` · `/faqs` | Gym story, inquiry form, common questions |
| `404` | Friendly not-found page |

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4** — design tokens in `src/app/globals.css`
- **Pannellum 2.5.7** (MIT) for 360° panoramas — vendored in
  `public/vendor/pannellum/` (its npm build is a window-global script, so it
  is loaded as a classic script; license kept alongside)
- Content layer: `src/lib/content.ts` (typed placeholders, clearly marked)
  and `src/lib/tour.ts` (scene graph) — will connect to the backend in a
  later phase

## Honest-content policy

Until the gym owner confirms a business fact (address, hours, price,
equipment, photos), the site shows **clearly marked placeholders** — never
invented details, stock gym photos, or estimated prices. Each placeholder
carries a dashed "pending" tag, and `docs/MISSING-CONTENT-CHECKLIST.md`
tracks exactly what is needed.

## Design system

Palette, type, and motion tokens follow the build plan (§3): charcoal →
blue-gray brand gradient used sparingly, restrained ember red for key
actions, Inter as the single type family, editorial grid layouts, and
subtle scroll-reveal motion that respects `prefers-reduced-motion`.

## Workspace layout

`.plan/`, `.skills/`, and `.assets/` are the gym's planning material and are
intentionally git-ignored — the app never imports from them.
