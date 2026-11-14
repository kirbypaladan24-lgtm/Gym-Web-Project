import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PageMasthead } from "@/components/page-masthead";
import { PlaceholderMedia } from "@/components/placeholder-media";
import {
  siteFacts,
  aboutContent,
  mastheadPhotos,
  aboutStoryPhoto,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About AV Fitness Gym — established 2025, two branches, a comfortable and modern training environment.",
};

/* About (plan §5.2, approved captions §2): the approved brand story in the
   gym's voice, plus mission and vision. Only verified facts are stated as
   facts; photography and history remain pending owner content.

   AWWWARDS QUALITY PASS: shared PageMasthead opening (index 06), mission
   and vision panels carry the gloss surface language, CTAs use the site's
   glossy button system. */

export default function AboutPage() {
  const ac = aboutContent;

  return (
    <>
      <PageMasthead
        index="06"
        label={ac.label}
        heading={ac.heading}
        photo={mastheadPhotos.about}
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <div className="max-w-xl space-y-5 text-[15px] leading-relaxed text-silver">
                {ac.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {/* Mission & vision — quiet editorial panels */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Reveal delay={100}>
                <section
                  aria-labelledby="about-mission"
                  className="card-gloss sheen-hover h-full rounded-sm border border-line p-7 transition-transform duration-state hover:-translate-y-1"
                >
                  <h2 id="about-mission" className="label-utility !text-silver">
                    {ac.mission.label}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-bone/90">
                    {ac.mission.text}
                  </p>
                </section>
              </Reveal>
              <Reveal delay={170}>
                <section
                  aria-labelledby="about-vision"
                  className="card-gloss sheen-hover h-full rounded-sm border border-line p-7 transition-transform duration-state hover:-translate-y-1"
                >
                  <h2 id="about-vision" className="label-utility !text-silver">
                    {ac.vision.label}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-bone/90">
                    {ac.vision.text}
                  </p>
                </section>
              </Reveal>
            </div>

            <Reveal delay={220}>
              <div className="mt-11 flex flex-wrap gap-4">
                <Link
                  href="/branches"
                  className="btn-gloss-ember rounded-xs px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
                >
                  Explore the branches
                </Link>
                <Link
                  href="/contact"
                  className="btn-gloss-ghost rounded-xs px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
                >
                  Contact the gym
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={110}>
            <div className="space-y-5">
              {/* The one authentic brand asset, presented untouched on white */}
              <figure className="rounded-sm bg-bone p-10 shadow-beautiful-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteFacts.logoPath}
                  alt="AV Fitness Gym emblem — ring monogram with AV, EST. 2025, FITNESS GYM"
                  className="mx-auto w-full max-w-[220px]"
                  width={220}
                  height={220}
                />
                <figcaption className="mt-5 text-center text-[11px] uppercase tracking-[0.14em] text-ink/60">
                  The supplied AV Fitness Gym emblem (unmodified)
                </figcaption>
              </figure>

              <dl className="card-gloss rounded-sm border border-line p-6">
                <div className="flex justify-between border-b border-line py-3">
                  <dt className="label-utility">Established</dt>
                  <dd className="text-sm font-semibold text-silver">
                    {siteFacts.established}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-line py-3">
                  <dt className="label-utility">Branches</dt>
                  <dd className="text-sm font-semibold text-silver">
                    {siteFacts.branchCount}
                  </dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="label-utility">Member apps</dt>
                  <dd className="text-sm font-semibold text-muted">Planned, later</dd>
                </div>
              </dl>

              <PlaceholderMedia
                photo={aboutStoryPhoto}
                photoAlt="AV Fitness Gym — member incline-pressing under the glowing AV emblem"
                awaiting="The gym's story in pictures"
                ratio="tall"
                className="shadow-beautiful-md"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
