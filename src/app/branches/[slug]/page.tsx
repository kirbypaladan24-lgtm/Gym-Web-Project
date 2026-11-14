import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { PlaceholderMedia } from "@/components/placeholder-media";
import {
  branches,
  getBranch,
  equipmentCategories,
  branchPhotoSets,
} from "@/lib/content";
import { scenesForBranch } from "@/lib/tour";

interface BranchPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BranchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) return { title: "Branch not found" };
  return {
    title: branch.name,
    description: `${branch.name} — address, operating hours, equipment, and the 360° virtual tour. Details are published as they are verified with AV Fitness Gym.`,
  };
}

export default async function BranchDetailPage({ params }: BranchPageProps) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();

  const scenes = scenesForBranch(branch.slug);
  const photos = branchPhotoSets[branch.slug];
  const otherBranch = branches.find((b) => b.slug !== branch.slug);

  return (
    <>
      {/* Branch header — echoes the site masthead language (breadcrumb in
          place of the index row, chrome word-reveal heading) */}
      <div className="surface-brand-gradient relative overflow-hidden border-b border-line">
        {/* Top light bloom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56"
          style={{
            background:
              "radial-gradient(62% 100% at 50% 0%, rgba(203, 211, 221, 0.07), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="label-utility">
              <Link href="/branches" className="transition-colors duration-micro hover:text-bone">
                Branches
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span className="text-silver">{branch.name}</span>
            </nav>
          </Reveal>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <WordReveal
              as="h1"
              text={`AV Fitness Gym — ${branch.name}`}
              delay={0.1}
              className="heading-display max-w-2xl text-4xl sm:text-5xl"
              wordClassName="text-metallic-static"
            />
            <Reveal delay={180}>
              <span className="tag-unconfirmed rounded-xs px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]">
                Details pending verification
              </span>
            </Reveal>
          </div>
          <Reveal delay={260}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-silver">
              {branch.summary}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Main column */}
          <div className="space-y-14">
            {/* Photographs */}
            <Reveal>
              <section aria-labelledby={`${branch.slug}-photos`}>
                <h2
                  id={`${branch.slug}-photos`}
                  className="label-utility !text-silver"
                >
                  Photographs
                </h2>
                <p className="mt-3 max-w-lg text-[12px] leading-relaxed text-muted">
                  Photographs supplied by AV Fitness Gym. Branch-specific
                  sets replace these as each location is photographed.
                </p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <PlaceholderMedia
                    photo={photos.entrance}
                    photoAlt="AV Fitness Gym — entrance and brand wall"
                    awaiting="Entrance & reception"
                    ratio="tall"
                    className="shadow-beautiful-sm"
                  />
                  <PlaceholderMedia
                    photo={photos.floor}
                    photoAlt="AV Fitness Gym — training floor"
                    awaiting="Training floor"
                    ratio="tall"
                    className="shadow-beautiful-sm"
                  />
                  <PlaceholderMedia
                    photo={photos.equipment}
                    photoAlt="AV Fitness Gym — equipment in use"
                    awaiting="Equipment detail"
                    ratio="wide"
                    className="shadow-beautiful-sm sm:col-span-2"
                  />
                </div>
              </section>
            </Reveal>

            {/* Equipment at this branch */}
            <Reveal>
              <section aria-labelledby={`${branch.slug}-equipment`}>
                <h2
                  id={`${branch.slug}-equipment`}
                  className="label-utility !text-silver"
                >
                  Equipment at this branch
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
                  The presence of every item is confirmed with the branch
                  before it is listed. Nothing is shown here until verified.
                </p>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                  {equipmentCategories.map((cat) => (
                    <li key={cat.id} className="bg-surface p-5 transition-colors duration-micro hover:bg-surface-2">
                      <h3 className="text-[15px] font-extrabold tracking-tight text-bone">
                        {cat.name}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        Inventory to be confirmed — {cat.examples.slice(0, 3).join(", ").toLowerCase()} and related equipment.
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Virtual tour entry */}
            <Reveal>
              <section aria-labelledby={`${branch.slug}-tour`}>
                <h2
                  id={`${branch.slug}-tour`}
                  className="label-utility !text-silver"
                >
                  Virtual tour
                </h2>
                <div className="mt-5 grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-center">
                  <Link href={`/tour?branch=${branch.slug}`} className="group block">
                    <PlaceholderMedia
                      photo={photos.tour}
                      photoAlt="AV Fitness Gym — training area, tour preview"
                      awaiting="360° panoramas of this branch"
                      ratio="wide"
                      label="Sample tour scene"
                      className="transition-transform duration-state group-hover:-translate-y-1"
                    />
                  </Link>
                  <div>
                    <p className="text-sm leading-relaxed text-muted">
                      Explore {branch.name} indoors — {scenes.length} tour
                      viewpoints with clearly marked sample scenes until the
                      gym's approved 360° photography replaces them.
                    </p>
                    <Link
                      href={`/tour?branch=${branch.slug}`}
                      className="label-utility mt-4 inline-block !text-silver hover:!text-bone"
                    >
                      Open the tour →
                    </Link>
                  </div>
                </div>
              </section>
            </Reveal>
          </div>

          {/* Aside: verified facts */}
          <aside className="space-y-8">
            <Reveal>
              <section
                aria-labelledby={`${branch.slug}-hours`}
                className="card-gloss rounded-sm border border-line p-6"
              >
                <h2 id={`${branch.slug}-hours`} className="label-utility !text-silver">
                  Operating hours
                </h2>
                <dl className="mt-5 space-y-4">
                  {branch.hours.map((h) => (
                    <div
                      key={h.days}
                      className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-silver">{h.days}</dt>
                      <dd className="text-sm font-semibold text-muted">
                        {h.unconfirmed ? "To be confirmed" : h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[12px] leading-relaxed text-muted">
                  Holiday hours and temporary closures will be announced under
                  Updates once staff procedures are confirmed.
                </p>
              </section>
            </Reveal>

            <Reveal delay={70}>
              <section
                aria-labelledby={`${branch.slug}-location`}
                className="card-gloss rounded-sm border border-line p-6"
              >
                <h2 id={`${branch.slug}-location`} className="label-utility !text-silver">
                  Location & contact
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  The verified address, map embed, and contact details for this
                  branch will be published here once confirmed with the gym.
                  No approximate or invented location is shown.
                </p>
                {otherBranch ? (
                  <Link
                    href={`/branches/${otherBranch.slug}`}
                    className="label-utility mt-5 inline-block !text-silver hover:!text-bone"
                  >
                    Compare with {otherBranch.name} →
                  </Link>
                ) : null}
              </section>
            </Reveal>
          </aside>
        </div>
      </div>
    </>
  );
}



