# Discovery Report — Phase 0

**Project:** AV Fitness Gym website & membership platform
**Date:** Phase 0 audit, performed before any code was written
**Source of truth:** `.plan/AV-Fitness-Gym-Website-Build-Plan.md` (739 lines, read in full)

## 1. Repository audit

The workspace root contained **no application code** — a greenfield build:

- `.assets/` — one file: the gym's logo (see §2)
- `.plan/` — the build plan (this project's specification)
- `.skills/` — 20 skill packages (see §3)
- One loose copy of the logo at the workspace root (left untouched)

No package.json, no existing framework, no migrations, no CI, no env files.
**Decision:** follow the plan's proposed default stack — Next.js + TypeScript
(App Router) + Tailwind CSS, Node 24.19.0 / npm 11.17.0 verified on the
development machine.

## 2. Asset inventory

| File | Format | Size | Assessment |
|---|---|---|---|
| `.assets/470212943_522665064109280_2157699394641363501_n.jpg` | JPEG, 960×960, progressive | 35 KB | **The AV Fitness Gym logo** — black-and-white ring emblem, "AV" monogram, "EST. 2025", "FITNESS GYM" curved text. Confirmed by visual inspection. The only brand asset supplied. |

**Missing asset classes (all):** branch exterior/interior photography,
equipment photographs, staff photos, promotional graphics, and any 360°
equirectangular panoramas. No panorama exists yet, so the tour ships with
**clearly marked neutral sample scenes** (per plan §6.4).

Per plan §4.2, no stock gym imagery and no generated fake gym photos are
used. Placeholder blocks are neutral charcoal fields with the brand emblem
and an explicit "Photograph pending" label.

## 3. Skills inspected and applied

All 20 skills in `.skills/` were read and evaluated against the brand
direction (calm, dimly lit, restrained — plan §3.1).

**Applied:**

| Skill | How it shaped the build |
|---|---|
| `build-awwwards-quality-sites` | Quality bar: art-directed hero, honest assets, complete pages, motion discipline, validation before handoff |
| `no-ai-design-slop` | Passive gate: one visual thesis per viewport, hierarchy before labels, removal test on every decorative element |
| `agency-grid-layout-minimal` | Editorial grid, oversized headlines with tight tracking, quiet uppercase utility labels, restrained image frames |
| `animation-systems` | Motion tokens (150ms micro / 250ms state / 640ms reveal, soft expo-out easing), choreography, reduced-motion policy |
| `animation-on-scroll` | The exact IntersectionObserver + keyframes reveal pattern (paused → running on intersect, once) |
| `atmosphere-background` | Hero backdrop: drifting vertical light folds, screen-blended, lower-right focal bloom, canvas with DPR cap + visibility pausing + static fallback |
| `beautiful-shadows` | The skill's exact layered neutral shadow utilities (sm/md/lg) for cards, panels, hero media |
| `design-first-ui-prompting` | Spec-first structure of the design system (goal → layout → type → color → constraints) |
| `ambient-section-particles` | Reviewed; **not used** — particles would add noise to a calm brand (removal test: delete with no loss) |

**Reviewed and not selected** (documented reasons): `add-mouse-driven-orbit`,
`add-shader-cursor-trail`, `build-threejs-scroll-worlds`,
`build-interactive-particle-trail` (3D showpieces conflict with the plan's
"avoid decorative showoff" direction); `blue-cloudy-clean-modern`,
`blue-laser-clean-glass-layout`, `bright-green-tech-system-webgl`,
`background-grid-webgl` (tech/laser aesthetics conflict with the charcoal
gym brand); `book-serif-index` (archival literary style, wrong domain);
`beam-glow-states` (adds a dependency for a decorative state effect the
calm brand doesn't need); `audit-ai-design-slop` (audit-only workflow, not
an implementation skill).

## 4. Technical direction (decided)

- **Next.js 16 App Router + TypeScript + Tailwind CSS 4** — per plan §9 default for a new repo.
- **Viewer:** Pannellum 2.5.7 (MIT) behind a reusable `PanoViewer` component, lazy-loaded on "Enter tour", never auto-rotating, with scene selector + hotspots + fallback (plan §6.3 requirements met).
- **Data:** typed placeholder content layer (`src/lib/content.ts`) structured after the plan's §10 data model. Supabase (or another backend) connects in Phase 2/3 without reshaping the public pages.
- **Motion:** CSS + IntersectionObserver only — no animation framework. The plan (§3.3) asks for subtle transitions; the smallest sufficient system wins.
- **Typography:** Inter (single family, 400–800) via `next/font` — plan §3.4.

## 5. Implementation status

### This phase (delivered)

- [x] Design tokens + typography + motion system (`globals.css`)
- [x] Responsive header (mobile overlay menu) + sticky-bottom footer
- [x] All 11 public routes render on mobile and desktop (verified)
- [x] Hero with atmospheric light-fold canvas + static fallback + reduced-motion support
- [x] Branch directory + 2 branch detail pages (hours/location/equipment/tour sections, placeholder-marked)
- [x] Equipment catalog by category with per-branch verification notes
- [x] Memberships page (prices marked "to be confirmed") + 4-step registration-of-interest flow with review step that states plainly that payment is not yet enabled
- [x] 360° tour: branch selector, lazy Pannellum viewer, 6 scenes (3 per branch), hotspots, scene index, sample-scene tags, failure fallback
- [x] Announcements, About, Contact (inquiry form), FAQs (accessible `<details>`), 404
- [x] `docs/MISSING-CONTENT-CHECKLIST.md` — the owner checklist

### Verification performed

- All routes return 200; intentional 404 page works
- Hydration + client interactivity verified in a real browser (tour viewer
  mounts, scenes switch, join wizard completes, FAQ accordions open, mobile
  menu toggles)
- Mobile (390px): no horizontal overflow; footer pinned; touch targets ≥ 44px
- `prefers-reduced-motion`: reveal animations and hero canvas fall back to
  static states
- Design QA review against the anti-slop gates

### Blocked on the gym (see checklist)

Addresses, hours, contacts, equipment inventories, prices, payment methods,
announcements, photography, 360° panoramas, staff roles.

### Next phases (per plan §13)

- **Phase 2** — auth + admin CMS (owner/branch-manager roles) once the backend choice is confirmed
- **Phase 3** — real registration + payment integration after the provider is confirmed (GCash/Maya/gateway), with server-side verification and the §7.3 state machine
- **Phase 4** — replace sample panoramas with approved photography
- **Phase 5** — full QA pass + launch readiness
