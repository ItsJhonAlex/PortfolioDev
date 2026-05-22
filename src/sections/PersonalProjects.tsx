"use client";

import { useLocale, useTranslations } from "next-intl";
import ProjectPolaroid from "@/components/ProjectPolaroid";
import SectionHeading from "@/components/SectionHeading";
import { PROJECTS } from "@/data/projects";

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1];
const TAPE_RHYTHM: { showTape: boolean; tapePosition: "left" | "center" }[] = [
  { showTape: true, tapePosition: "left" },
  { showTape: false, tapePosition: "left" },
  { showTape: true, tapePosition: "center" },
];

export default function PersonalProjects() {
  const t = useTranslations("personalProjects");
  const locale = useLocale();
  const projectLocale = locale === "es" ? "es" : "en";

  const labels = {
    github: t("github"),
    live: t("liveDemo"),
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-dashed-coffee relative overflow-hidden bg-cafe-base py-24 text-cafe-ink"
    >
      <div className="container relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
        <SectionHeading chapter={t("chapter")} title={t("headingTitle")} />

        <span id="projects-title" className="sr-only">
          {t("title")}
        </span>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => {
            const tape = TAPE_RHYTHM[i % TAPE_RHYTHM.length];
            return (
              <ProjectPolaroid
                key={project.slug}
                project={project}
                locale={projectLocale}
                rotation={ROTATIONS[i % ROTATIONS.length]}
                showTape={tape.showTape}
                tapePosition={tape.tapePosition}
                labels={labels}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
