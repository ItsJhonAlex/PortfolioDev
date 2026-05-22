"use client";

import { useLocale, useTranslations } from "next-intl";
import CollaborationCard from "@/components/CollaborationCard";
import SectionHeading from "@/components/SectionHeading";
import { COLLABORATIONS } from "@/data/collaborations";

const ROTATIONS = [1.5, -1.5, 1, -2, 1.2, -1];
const TAPE_RHYTHM: { showTape: boolean; tapePosition: "left" | "center" }[] = [
  { showTape: false, tapePosition: "left" },
  { showTape: true, tapePosition: "center" },
  { showTape: true, tapePosition: "left" },
];

export default function Collaborations() {
  const t = useTranslations("collaborations");
  const locale = useLocale();
  const collabLocale = locale === "es" ? "es" : "en";

  return (
    <section
      id="collaborations"
      aria-labelledby="collaborations-title"
      className="border-dashed-coffee relative overflow-hidden bg-cafe-base py-24 text-cafe-ink"
    >
      <div className="container relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
        <SectionHeading chapter={t("chapter")} title={t("headingTitle")} />

        <span id="collaborations-title" className="sr-only">
          {t("title")}
        </span>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {COLLABORATIONS.map((collab, i) => {
            const tape = TAPE_RHYTHM[i % TAPE_RHYTHM.length];
            return (
              <CollaborationCard
                key={collab.slug}
                collaboration={collab}
                locale={collabLocale}
                rotation={ROTATIONS[i % ROTATIONS.length]}
                showTape={tape.showTape}
                tapePosition={tape.tapePosition}
                viewProjectLabel={t("viewProject")}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
