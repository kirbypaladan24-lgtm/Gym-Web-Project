import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { PageMasthead } from "@/components/page-masthead";
import { PlaceholderMedia } from "@/components/placeholder-media";
import {
  branches,
  equipmentCategories,
  equipmentContent,
  categoryPhotos,
  mastheadPhotos,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Equipment & Facilities",
  description:
    "Explore your training space — the AV Fitness Gym equipment catalog by category and branch, published only as inventories are verified.",
};

/* Equipment (plan §5.4, approved captions §4).

   AWWWARDS QUALITY PASS: shared PageMasthead opening (index 02), category
   headings rise word by word with an editorial index, photo grids lift on
   hover, and every category is a scroll target with generous breathing
   room. */

export default function EquipmentPage() {
  const ec = equipmentContent;
  const total = equipmentCategories.length;

  return (
    <>
      <PageMasthead
        index="02"
        label={ec.label}
        heading={ec.heading}
        description={ec.description}
        photo={mastheadPhotos.equipment}
      >
        {/* Branch availability legend */}
        <Reveal delay={280}>
          <div className="mt-10 flex flex-wrap gap-3">
            {branches.map((b) => (
              <span
                key={b.slug}
                className="flex items-center gap-2 rounded-xs border border-line px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-silver transition-colors duration-micro hover:border-silver/40"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember/80" />
                {b.name} — inventory pending
              </span>
            ))}
          </div>
        </Reveal>
      </PageMasthead>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="space-y-16">
          {equipmentCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 40}>
              <section
                id={cat.id}
                aria-labelledby={`${cat.id}-title`}
                className="scroll-mt-24 border-t border-line pt-12"
              >
                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
                  <div>
                    <p
                      className="label-utility !text-muted"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </p>
                    <WordReveal
                      as="h2"
                      id={`${cat.id}-title`}
                      text={cat.name}
                      delay={0.06}
                      className="heading-display mt-3 text-3xl text-bone sm:text-4xl"
                    />
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                      {cat.description}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {cat.examples.map((ex) => (
                        <li
                          key={ex}
                          className="flex items-center gap-3 text-sm text-silver"
                        >
                          <span
                            aria-hidden="true"
                            className="h-px w-5 bg-line-strong"
                          />
                          {ex}
                          <span className="text-[11px] text-muted">
                            (example — presence to be verified)
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="tag-unconfirmed mt-6 inline-flex rounded-xs px-3 py-1.5 text-[11px]">
                      {cat.meta.note}
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {(categoryPhotos[cat.id] ?? []).map((photo, j) => (
                      <PlaceholderMedia
                        key={`${photo}-${j}`}
                        photo={photo}
                        photoAlt={`AV Fitness Gym — ${cat.name.toLowerCase()} photograph`}
                        awaiting={`${cat.name} — equipment photographs`}
                        ratio="square"
                        className="shadow-beautiful-sm transition-transform duration-state hover:-translate-y-1"
                      />
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
