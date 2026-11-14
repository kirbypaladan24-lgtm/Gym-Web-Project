import Link from "next/link";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { HeroDrift } from "@/components/hero-drift";
import { PlaceholderMedia } from "@/components/placeholder-media";
import { MarqueeRibbon } from "@/components/marquee-ribbon";
import { PhotoBand } from "@/components/photo-band";
import {
  branches,
  equipmentCategories,
  membershipPlans,
  announcements,
  homeContent,
  branchPhotoSets,
  categoryPhotos,
  homeTourPreviewPhoto,
  homeClosingPhoto,
  heroPhoto,
} from "@/lib/content";

/* ============================================================================
   Home (plan §5.1, approved captions §1 + §10)
   Voice: the approved copywriting. Sections: hero → welcome → featured
   experience → branches → equipment → memberships → tour → updates →
   closing CTA. Business facts stay clearly marked placeholders (plan §1.2).

   PREMIUM SHINE PASS — owner direction: "modern, shiny, scream premium".
   AWWWARDS QUALITY PASS (build-awwwards-quality-sites skill):
   - motion stack: GSAP + ScrollTrigger, Lenis as the sole smooth-scroll
     engine (mounted in layout); CSS keeps hover/focus states
   - hero: chrome-platinum headline rises word by word (masked GSAP
     stagger, accessible name preserved on the h1) + one scrubbed drift
     as the visitor scrolls on (HeroDrift — the site's only scrub)
   - every section heading rises word by word (WordReveal)
   - beam-glow-states: traveling border light on the highlighted
     membership card (CSS beam; no new dependencies)
   - beautiful-shadows + card-gloss surfaces with top-edge light
   - animation-on-scroll reveal discipline unchanged for body copy
   Three.js: deliberately not used — the owner removed particle/pointer
   effects; static atmosphere is the established direction.
   Surface rhythm (plan §3.2, hero photo pass 2026-11-08): photo hero
   (backlit barbell racks) → marquee ribbon → deep → gradient cards →
   deep + photos → ink photo
   tiles → deep → full-bleed photo band (tour) → deep → full-bleed photo
   band (closing). Photography, rhythm, and oversized numerals — never the
   removed effects (no particles, no pointer light, no moving light lines).
   ============================================================================ */

export default function HomePage() {
  const hc = homeContent;

  return (
    <>
      {/* ------------------------------ Hero ------------------------------ */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden">
        {/* Photographic backdrop (owner request, 2026-11-08) — the gym's
            own photography behind the headline, dimmed in the site's
            photo language. Atmosphere.tsx stays for an easy revert. */}
        <HeroBackdrop
          photo={heroPhoto}
          photoAlt="AV Fitness Gym — member loading a barbell at the racks, backlit by the windows"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
          {/* HeroDrift: the site's single scrubbed moment — the whole column
              drifts up and dims as the visitor scrolls into the page. */}
          <HeroDrift className="max-w-4xl">
            {/* Three-line display headline — the site's authored moment.
                Chrome-platinum fill with a slow traveling light; each line
                rises word by word (GSAP masked stagger). The h1 keeps one
                unsplit accessible name; the animated words are decorative. */}
            <h1
              className="heading-display text-[clamp(2.5rem,8.2vw,6.4rem)]"
              aria-label={hc.hero.lines.join(" ")}
            >
              {hc.hero.lines.map((line, i) => (
                <WordReveal
                  key={line}
                  as="span"
                  text={line}
                  delay={0.22 + i * 0.16}
                  className="block"
                  wordClassName="text-metallic"
                />
              ))}
            </h1>

            <Reveal delay={430}>
              <p className="mt-9 max-w-xl text-lg leading-relaxed text-silver">
                {hc.hero.description}
              </p>
            </Reveal>

            <Reveal delay={520}>
              <div className="mt-11 flex flex-wrap items-center gap-4">
                <Link
                  href={hc.hero.primaryCta.href}
                  className="btn-gloss-ember rounded-xs px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
                >
                  {hc.hero.primaryCta.label}
                </Link>
                <Link
                  href={hc.hero.secondaryCta.href}
                  className="btn-gloss-ghost rounded-xs px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
                >
                  {hc.hero.secondaryCta.label}
                </Link>
              </div>
            </Reveal>
          </HeroDrift>
        </div>
      </section>

      {/* --------------------- Marquee ribbon (cool pass) -------------------- */}
      {/* The tagline as a slow horizontal ticker — the hero's exit ribbon. */}
      <MarqueeRibbon
        items={["YOUR SPACE", "YOUR STRENGTH", "YOUR PROGRESS", "AV FITNESS GYM"]}
      />

      {/* ----------------------------- Welcome ----------------------------- */}
      <section aria-labelledby="home-welcome" className="border-t border-line bg-deep">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="label-utility">{hc.welcome.label}</p>
              </Reveal>
              <WordReveal
                as="h2"
                id="home-welcome"
                text={hc.welcome.heading}
                delay={0.08}
                className="heading-display mt-5 max-w-xl text-4xl sm:text-5xl"
                wordClassName="text-metallic-static"
              />
            </div>
            <Reveal delay={110} className="lg:col-span-4 lg:col-start-9 lg:pt-20">
              <div className="space-y-5 border-t border-line pt-8 text-[15px] leading-relaxed text-silver lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                {hc.welcome.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------ Featured experience ------------------------ */}
      <section
        aria-labelledby="home-featured"
        className="surface-brand-gradient border-t border-line"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <Reveal>
            <p className="label-utility">{hc.featured.label}</p>
          </Reveal>
          <WordReveal
            as="h2"
            id="home-featured"
            text={hc.featured.heading}
            delay={0.08}
            className="heading-display mt-5 max-w-2xl text-4xl sm:text-5xl"
            wordClassName="text-metallic-static"
          />
          <Reveal delay={130}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver">
              {hc.featured.description}
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {hc.featured.features.map((f, i) => (
              <Reveal
                as="li"
                key={f.title}
                delay={i * 70}
                className="card-gloss sheen-hover transition-transform duration-state hover:-translate-y-1"
              >
                <Link href={f.href} className="group flex h-full flex-col p-6 sm:p-7">
                  <h3 className="text-lg font-extrabold tracking-tight text-bone">
                    {f.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {f.copy}
                  </p>
                  <p className="label-utility mt-7 !text-silver transition-colors duration-micro group-hover:!text-bone">
                    Explore{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-micro group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------- Branches ----------------------------- */}
      <section aria-labelledby="home-branches" className="border-t border-line bg-deep">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Reveal>
                <p className="label-utility">{hc.branches.label}</p>
              </Reveal>
              <WordReveal
                as="h2"
                id="home-branches"
                text={hc.branches.heading}
                delay={0.08}
                className="heading-display mt-5 text-4xl sm:text-5xl"
                wordClassName="text-metallic-static"
              />
            </div>
            <Reveal delay={80}>
              <Link
                href="/branches"
                className="label-utility !text-silver transition-colors duration-micro hover:!text-bone"
              >
                All branch details →
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {branches.map((branch, i) => (
              <Reveal key={branch.slug} delay={i * 90}>
                <Link
                  href={`/branches/${branch.slug}`}
                  className="group relative block overflow-hidden rounded-sm border border-line transition-all duration-state hover:-translate-y-1.5 hover:border-silver/40 hover:shadow-beautiful-md"
                >
                  <PlaceholderMedia
                    photo={branchPhotoSets[branch.slug].card}
                    photoAlt={`AV Fitness Gym — gym interior photograph`}
                    awaiting={`${branch.name} interior photographs`}
                    ratio="wide"
                    label="Photograph pending"
                    className="rounded-b-none border-0 border-b border-line"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 z-10 heading-display text-4xl font-extrabold text-outline drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
                  >
                    0{i + 1}
                  </span>
                  <div className="card-gloss p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-extrabold tracking-tight text-bone">
                        {branch.name}
                      </h3>
                      <span className="tag-unconfirmed rounded-xs px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]">
                        Details pending
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {branch.summary}
                    </p>
                    <p className="label-utility mt-6 !text-silver transition-colors duration-micro group-hover:!text-bone">
                      Explore this branch{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-micro group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- Equipment ----------------------------- */}
      <section
        aria-labelledby="home-equipment"
        className="border-t border-line bg-ink"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Reveal>
                <p className="label-utility">{hc.equipment.label}</p>
              </Reveal>
              <WordReveal
                as="h2"
                id="home-equipment"
                text={hc.equipment.heading}
                delay={0.08}
                className="heading-display mt-5 max-w-2xl text-4xl sm:text-5xl"
                wordClassName="text-metallic-static"
              />
              <Reveal delay={130}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-silver">
                  {hc.equipment.description}
                </p>
              </Reveal>
            </div>
            <Reveal delay={80}>
              <Link
                href="/equipment"
                className="label-utility !text-silver transition-colors duration-micro hover:!text-bone"
              >
                {hc.equipment.cta} →
              </Link>
            </Reveal>
          </div>

          {/* Category tiles (cool pass) — real gym photography, grayscale at
              rest, full color on hover. The site's photo language at scale. */}
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {equipmentCategories.map((cat, i) => (
              <Reveal as="li" key={cat.id} delay={i * 60}>
                <Link
                  href={`/equipment#${cat.id}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-sm border border-line shadow-beautiful-sm transition-all duration-state hover:-translate-y-1.5 hover:border-silver/40 hover:shadow-beautiful-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={categoryPhotos[cat.id][0]}
                    alt={`${cat.name} at AV Fitness Gym`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover grayscale brightness-[0.82] contrast-[1.05] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0 group-hover:brightness-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-3 heading-display text-[3.2rem] font-extrabold leading-none text-outline-faint"
                  >
                    0{i + 1}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-lg font-extrabold tracking-tight text-bone">
                      {cat.name}
                    </h3>
                    <p className="label-utility mt-2.5 !text-silver/80 transition-colors duration-micro group-hover:!text-bone">
                      Browse{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-micro group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------- Memberships ---------------------------- */}
      <section
        aria-labelledby="home-memberships"
        className="border-t border-line bg-deep"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Reveal>
                <p className="label-utility">{hc.memberships.label}</p>
              </Reveal>
              <WordReveal
                as="h2"
                id="home-memberships"
                text={hc.memberships.heading}
                delay={0.08}
                className="heading-display mt-5 max-w-2xl text-4xl sm:text-5xl"
                wordClassName="text-metallic-static"
              />
              <Reveal delay={130}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-silver">
                  {hc.memberships.description}
                </p>
              </Reveal>
            </div>
            <Reveal delay={80}>
              <Link
                href="/memberships"
                className="label-utility !text-silver transition-colors duration-micro hover:!text-bone"
              >
                Compare plans →
              </Link>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {membershipPlans.map((plan, i) => (
              <Reveal as="li" key={plan.id} delay={i * 80} className="h-full">
                {/* The featured 12-month plan carries the traveling border
                    light (beam-glow-states: one highlighted surface per view). */}
                <div
                  className={`flex h-full flex-col rounded-sm border p-6 transition-transform duration-state hover:-translate-y-1.5 ${
                    plan.featured
                      ? "beam-card border-line-strong shadow-beautiful-md"
                      : "border-line shadow-beautiful-sm hover:shadow-beautiful-md"
                  } card-gloss`}
                >
                  <h3 className="text-lg font-extrabold tracking-tight text-bone">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">{plan.duration}</p>
                  <p className="mt-5 flex items-baseline gap-1.5 border-t border-line pt-5">
                    <span className="text-3xl font-extrabold tracking-tight text-metallic-static">
                      {plan.price}
                    </span>
                    <span className="text-[13px] font-medium text-muted">
                      {plan.priceUnit}
                    </span>
                  </p>
                  {plan.total ? (
                    <p className="mt-2 text-[12px] text-muted">
                      Total{" "}
                      <span className="font-semibold text-silver">
                        {plan.total}
                      </span>
                    </p>
                  ) : null}
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.inclusions.map((inc) => (
                      <li key={inc} className="flex gap-2.5 text-sm text-muted">
                        <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-silver/50" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/memberships/join?plan=${plan.id}`}
                    className={`mt-6 rounded-xs px-4 py-3 text-center text-[12px] font-bold uppercase tracking-[0.14em] ${
                      plan.featured ? "btn-gloss-ember" : "btn-gloss-ghost"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------- Tour ------------------------------- */}
      {/* Full-bleed cinematic band (cool pass): the preview photograph
          becomes the section itself — dimmed, drifting slowly on scroll. */}
      <PhotoBand
        photo={homeTourPreviewPhoto}
        photoAlt="AV Fitness Gym — free weights training area with dumbbell racks"
        label={hc.tour.label}
        heading={hc.tour.heading}
        id="home-tour"
        className="h-[72vh] min-h-[560px] max-h-[920px]"
      >
        <Reveal delay={160}>
          <p className="label-utility mt-7 !text-silver">{hc.tour.intro}</p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-silver">
            {hc.tour.description}
          </p>
          <div className="mt-9">
            <Link
              href="/tour"
              className="btn-gloss-ember rounded-xs px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
            >
              {hc.tour.cta}
            </Link>
          </div>
          <p className="mt-6 text-[12px] leading-relaxed text-muted">
            The tour framework is live with clearly marked sample scenes.
            Real 360° photography of both branches will replace them once
            captured and approved.
          </p>
        </Reveal>
      </PhotoBand>

      {/* --------------------------- Announcements --------------------------- */}
      <section
        aria-labelledby="home-updates"
        className="border-t border-line bg-deep"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <Reveal>
            <p className="label-utility">{hc.updates.label}</p>
          </Reveal>
          <WordReveal
            as="h2"
            id="home-updates"
            text={hc.updates.heading}
            delay={0.08}
            className="heading-display mt-5 max-w-2xl text-4xl sm:text-5xl"
            wordClassName="text-metallic-static"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {announcements.slice(0, 2).map((ann, i) => (
              <Reveal key={ann.id} delay={i * 80}>
                <article className="card-gloss sheen-hover h-full rounded-sm border border-line p-7 transition-transform duration-state hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <p className="label-utility">
                      {new Date(ann.publishedAt).toLocaleDateString("en-PH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <span className="tag-unconfirmed rounded-xs px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                      Placeholder notice
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold tracking-tight text-bone">
                    {ann.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {ann.body}
                  </p>
                </article>
              </Reveal>
            ))}

            <Reveal delay={160}>
              <Link
                href="/announcements"
                className="flex h-full min-h-40 items-center justify-center rounded-sm border border-dashed border-line-strong p-7 text-sm font-semibold text-muted transition-all duration-micro hover:-translate-y-1 hover:border-silver hover:text-bone"
              >
                {hc.updates.cta} →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------- */}
      {/* Closing statement as a cinematic band (cool pass) — the final
          full-bleed photograph under the last call to action. */}
      <PhotoBand
        photo={homeClosingPhoto}
        photoAlt="AV Fitness Gym — squat rack by the windows"
        label="Memberships"
        heading={hc.closing.heading}
        id="home-cta"
        className="h-[76vh] min-h-[580px] max-h-[960px]"
      >
        <Reveal delay={180}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-silver">
            {hc.closing.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={hc.closing.primaryCta.href}
              className="btn-gloss-ember rounded-xs px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
            >
              {hc.closing.primaryCta.label}
            </Link>
            <Link
              href={hc.closing.secondaryCta.href}
              className="btn-gloss-ghost rounded-xs px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
            >
              {hc.closing.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </PhotoBand>
    </>
  );
}



