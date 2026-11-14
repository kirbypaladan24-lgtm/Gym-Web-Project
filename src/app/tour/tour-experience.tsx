"use client";

/* ============================================================================
   Tour page — 360° indoor virtual tour (plan §6, approved captions §5).
   The heavy viewer (Pannellum) and its panoramas load ONLY after the visitor
   presses "Start virtual tour" — never on initial page load (plan §11
   performance). Only locations with approved panoramic photography are
   listed; sample scenes are clearly marked.
   ============================================================================ */

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PanoViewer } from "@/components/pano-viewer";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { PageMasthead } from "@/components/page-masthead";
import { branches, tourContent, mastheadPhotos } from "@/lib/content";
import { scenesForBranch, type BranchSlug } from "@/lib/tour";

function TourExperience() {
  const params = useSearchParams();
  const initialBranch = (
    branches.some((b) => b.slug === params.get("branch"))
      ? params.get("branch")
      : "branch-one"
  ) as BranchSlug;

  const [branchSlug, setBranchSlug] = useState<BranchSlug>(initialBranch);
  const [entered, setEntered] = useState(false);

  const scenes = scenesForBranch(branchSlug);
  const branch = branches.find((b) => b.slug === branchSlug);
  const tc = tourContent;

  return (
    <>
      <PageMasthead
        index="04"
        label={tc.label}
        heading={tc.heading}
        description={tc.description}
        photo={mastheadPhotos.tour}
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      {/* Tour introduction (captions §5) */}
      <Reveal delay={70}>
        <div className="flex flex-col gap-3 border-l-2 border-ember pl-6 sm:flex-row sm:items-baseline sm:gap-8">
          <p className="label-utility !text-bone">{tc.intro.heading}</p>
          <p className="max-w-lg text-[15px] leading-relaxed text-muted">
            {tc.intro.text}
          </p>
        </div>
      </Reveal>

      {/* Branch selector */}
      <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Choose a branch">
        {branches.map((b) => {
          const active = b.slug === branchSlug;
          return (
            <button
              key={b.slug}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setBranchSlug(b.slug as BranchSlug);
              }}
              className={`rounded-xs px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors duration-micro ${
                active
                  ? "bg-bone text-ink"
                  : "border border-line-strong text-silver hover:border-silver hover:text-bone"
              }`}
            >
              {b.name}
            </button>
          );
        })}
      </div>

      {/* Viewer or entry gate */}
      <div className="mt-8">
        {entered ? (
          <PanoViewer
            key={branchSlug}
            scenes={scenes}
            initialSceneId={scenes[0]?.id ?? ""}
          />
        ) : (
          <div className="relative overflow-hidden rounded-sm border border-line">
            {/* Poster gate — keeps panorama bytes off the wire until opened */}
            <div className="surface-brand-gradient flex aspect-video flex-col items-center justify-center px-6 text-center">
              <p className="label-utility !text-silver">
                {branch?.name} · {scenes.length} viewpoints
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                The 360° viewer and its panoramas load only when you open the
                tour — kind to your data plan.
              </p>
              <button
                type="button"
                onClick={() => setEntered(true)}
                className="btn-gloss-ember mt-8 rounded-xs px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
              >
                {tc.cta}
              </button>
              <p className="mt-6 text-[12px] text-muted">
                Sample scenes — the gym's approved 360° photography will
                replace them.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Scene index (plan: navigation never depends on hotspots alone) */}
      <Reveal delay={60}>
        <section aria-labelledby="scene-index" className="mt-14">
          <h2 id="scene-index" className="label-utility !text-silver">
            {branch?.name} — scene index
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            {tc.navNote}
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {scenes.map((s) => (
              <li
                key={s.id}
                className="card-gloss rounded-sm border border-line p-5 transition-transform duration-state hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[15px] font-extrabold tracking-tight text-bone">
                    {s.name}
                  </h3>
                  <span className="tag-unconfirmed rounded-xs px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                    Sample
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {s.description}
                </p>
                {s.hotspots.length > 0 ? (
                  <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-muted">
                    Links to: {s.hotspots.map((h) => h.label).join(", ")}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
      </div>
    </>
  );
}

export default function TourPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="label-utility">Loading tour…</p>
        </div>
      }
    >
      <TourExperience />
    </Suspense>
  );
}

