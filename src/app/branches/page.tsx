import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { PageMasthead } from "@/components/page-masthead";
import { PlaceholderMedia } from "@/components/placeholder-media";
import {
  branches,
  branchesContent,
  branchPhotoSets,
  mastheadPhotos,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Branches",
  description:
    "Find your AV Fitness Gym — two branches with verified addresses, hours, equipment, and virtual tour entry points, published as each detail is confirmed.",
};

/* Branches (plan §5.3, approved captions §3): branch directory. Each
   branch is documented on its own page — locations, operating hours,
   equipment, and tour entry points are never assumed to match.

   AWWWARDS QUALITY PASS: shared PageMasthead opening (index 01 — order
   follows the header navigation), branch names rise word by word, photos
   lift on hover, CTAs use the site's glossy button system. */

export default function BranchesPage() {
  const bc = branchesContent;

  return (
    <>
      <PageMasthead
        index="01"
        label={bc.label}
        heading={bc.heading}
        description={bc.description}
        photo={mastheadPhotos.branches}
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="space-y-16 lg:space-y-24">
          {branches.map((branch, i) => (
            <Reveal key={branch.slug} delay={i * 60}>
              <article className="group/branch grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <PlaceholderMedia
                    photo={branchPhotoSets[branch.slug].card}
                    photoAlt="AV Fitness Gym — gym interior photograph"
                    awaiting={`${branch.name} — exterior & interior photographs`}
                    ratio="wide"
                    className="shadow-beautiful-md transition-transform duration-state group-hover/branch:-translate-y-1.5"
                  />
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3">
                    <p className="label-utility">Branch {i + 1} of 2</p>
                    <span className="tag-unconfirmed rounded-xs px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]">
                      Details pending verification
                    </span>
                  </div>
                  <WordReveal
                    as="h2"
                    text={`AV Fitness Gym — ${branch.name}`}
                    delay={0.06}
                    className="heading-display mt-4 text-4xl text-bone"
                  />
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                    {branch.summary}
                  </p>

                  <dl className="mt-7 space-y-4 border-t border-line pt-7">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <div>
                        <dt className="label-utility">Address</dt>
                        <dd className="mt-1.5 text-sm text-silver">
                          To be confirmed with the gym
                        </dd>
                      </div>
                      <div>
                        <dt className="label-utility">Contact</dt>
                        <dd className="mt-1.5 text-sm text-silver">
                          To be confirmed with the gym
                        </dd>
                      </div>
                    </div>
                    <div>
                      <dt className="label-utility">Training zones</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {branch.equipmentGroups.map((g) => (
                          <span
                            key={g}
                            className="rounded-xs border border-line px-2.5 py-1 text-[12px] text-silver transition-colors duration-micro group-hover/branch:border-silver/40"
                          >
                            {g}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/branches/${branch.slug}`}
                      className="btn-gloss-ember rounded-xs px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
                    >
                      {bc.ctaLabel}
                    </Link>
                    <Link
                      href={`/tour?branch=${branch.slug}`}
                      className="btn-gloss-ghost rounded-xs px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
                    >
                      360° tour
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
