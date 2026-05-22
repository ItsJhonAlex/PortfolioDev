"use client";

import { useTranslations } from "next-intl";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import TimelineEntry from "@/components/TimelineEntry";

type RawExperience = {
  yearLabel: string;
  company: string;
  location: string;
  role: string;
  responsibilities: string[];
  isCurrent?: boolean;
};

export default function Experience() {
  const t = useTranslations("experience");

  const experiences: RawExperience[] = [
    {
      yearLabel: t("yearLabel0"),
      company: t("company0"),
      location: t("location0"),
      role: t("role0"),
      responsibilities: t.raw("responsibilities0"),
      isCurrent: true,
    },
  ];

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-dashed-coffee relative overflow-hidden bg-cafe-base py-24 text-cafe-ink"
    >
      <div className="container relative z-10 mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
        <SectionHeading chapter={t("chapter")} title={t("headingTitle")} />

        <span id="experience-title" className="sr-only">
          {t("title")}
        </span>

        <div className="mt-12">
          <Timeline>
            {experiences.map((exp, i) => (
              <TimelineEntry
                key={i}
                index={i}
                yearLabel={exp.yearLabel}
                company={exp.company}
                location={exp.location}
                role={exp.role}
                responsibilities={exp.responsibilities}
                isCurrent={exp.isCurrent}
                currentLabel={t("current")}
              />
            ))}
            <TimelineEntry
              index={experiences.length}
              yearLabel=""
              isFuture
              futureLabel={t("nextChapter")}
            />
          </Timeline>
        </div>
      </div>
    </section>
  );
}
