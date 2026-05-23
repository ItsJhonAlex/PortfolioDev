"use client";

import { useTranslations } from "next-intl";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import TimelineEntry from "@/components/TimelineEntry";

type Degree = {
  yearLabel: string;
  title: string;
  institution: string;
  achievements: string[];
};

export default function Education() {
  const t = useTranslations("education");

  const degrees: Degree[] = [
    {
      yearLabel: t("degree.period"),
      title: t("degree.title"),
      institution: t("degree.institution"),
      achievements: t.raw("degree.achievements"),
    },
  ];

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="border-dashed-coffee relative overflow-hidden bg-cafe-base py-24 text-cafe-ink"
    >
      <div className="container relative z-10 mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
        <SectionHeading chapter={t("chapter")} title={t("headingTitle")} />

        <span id="education-title" className="sr-only">
          {t("title")}
        </span>

        <div className="mt-12">
          <Timeline>
            {degrees.map((degree, i) => (
              <TimelineEntry
                key={i}
                index={i}
                yearLabel={degree.yearLabel}
                company={degree.title}
                location={degree.institution}
                responsibilities={degree.achievements}
              />
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
