import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { PageMasthead } from "@/components/page-masthead";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Common questions about AV Fitness Gym — branches, memberships, the virtual tour, and online registration.",
};

/* FAQs (plan §5.9, approved captions §9).

   AWWWARDS QUALITY PASS: narrow masthead variant, the two-line heading
   rises word by word ("\n" splits the lines), and the JS-free <details>
   accordion gains refined hover/open states — questions warm to silver on
   hover, the marker turns ember when open. */

export default function FaqsPage() {
  return (
    <>
      <PageMasthead
        index="08"
        label="Help"
        heading={"Frequently\nasked."}
        narrow
      />

      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <Reveal key={f.id} delay={Math.min(i, 6) * 40}>
              {/* <details> keeps it JS-free and keyboard-accessible */}
              <details className="group py-6" id={f.id}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-extrabold tracking-tight text-bone transition-colors duration-micro hover:text-silver focus-visible:text-silver [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span
                    aria-hidden="true"
                    className="text-2xl font-light text-muted transition-all duration-state group-open:rotate-45 group-open:text-ember-bright"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {f.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-12 text-sm leading-relaxed text-muted">
            Still have a question?{" "}
            <Link href="/contact" className="font-semibold text-silver underline decoration-line-strong underline-offset-4 transition-colors duration-micro hover:text-bone hover:decoration-silver">
              Send the gym a message
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </>
  );
}
