import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { PageMasthead } from "@/components/page-masthead";
import {
  announcements,
  branches,
  announcementsContent,
  mastheadPhotos,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Announcements & Updates",
  description:
    "Stay connected with AV Fitness Gym — announcements, membership promotions, operating hour changes, branch updates, and other important information.",
};

/* Announcements (plan §5.8, approved captions §8).

   AWWWARDS QUALITY PASS: shared PageMasthead opening (index 05), notice
   cards share the home page's gloss surface language (card-gloss,
   sheen-hover, hover lift). */

export default function AnnouncementsPage() {
  const general = announcements.filter((a) => a.scope === "general");
  const branchAnnouncements = announcements.filter((a) => a.scope === "branch");
  const ac = announcementsContent;

  return (
    <>
      <PageMasthead
        index="05"
        label={ac.label}
        heading={ac.heading}
        description={ac.description}
        photo={mastheadPhotos.announcements}
      >
        {/* Categories staff will publish (captions §8) — quiet chips */}
        <Reveal delay={280}>
          <ul className="mt-9 flex flex-wrap gap-2" aria-label="Announcement categories">
            {ac.categories.map((c) => (
              <li
                key={c}
                className="rounded-xs border border-line px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-silver transition-colors duration-micro hover:border-silver/40"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            Notices appear under these categories once staff maintain them —
            general updates and branch-specific notices, with publication dates.
            Expired promotions never linger.
          </p>
        </Reveal>
      </PageMasthead>

      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-24">
        {/* General */}
        <section aria-labelledby="ann-general" className="scroll-mt-24">
          <h2 id="ann-general" className="label-utility !text-silver">
            General
          </h2>
          <div className="mt-6 space-y-6">
            {general.map((ann, i) => (
              <Reveal key={ann.id} delay={i * 60}>
                <article className="card-gloss sheen-hover h-full rounded-sm border border-line p-7 transition-transform duration-state hover:-translate-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <time
                      dateTime={ann.publishedAt}
                      className="label-utility"
                    >
                      {new Date(ann.publishedAt).toLocaleDateString("en-PH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
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
          </div>
        </section>

        {/* Branch-specific */}
        <section aria-labelledby="ann-branch" className="mt-14 scroll-mt-24">
          <h2 id="ann-branch" className="label-utility !text-silver">
            By branch
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {branches.map((b, i) => (
              <Reveal key={b.slug} delay={i * 60}>
                <div className="flex h-full flex-col rounded-sm border border-dashed border-line-strong p-6 transition-colors duration-micro hover:border-silver/50">
                  <h3 className="text-lg font-extrabold tracking-tight text-bone">
                    {b.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    Branch-specific notices — schedule changes, closures, and
                    local promotions — appear here once staff maintain them.
                  </p>
                  <p className="label-utility mt-5">No current notices</p>
                </div>
              </Reveal>
            ))}
            {branchAnnouncements.map((ann) => (
              <article key={ann.id} className="card-gloss rounded-sm border border-line p-6">
                <h3 className="text-lg font-extrabold tracking-tight text-bone">
                  {ann.title}
                </h3>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
