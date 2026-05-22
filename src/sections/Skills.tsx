"use client";

import { useTranslations } from "next-intl";
import MenuBoard, {
  type MenuCategoryData,
} from "@/components/MenuBoard";
import SectionHeading from "@/components/SectionHeading";

type CategoryKey = "frontend" | "backend" | "tooling" | "emerging";

const CATEGORY_GROUPS: { key: CategoryKey; skills: string[] }[] = [
  { key: "frontend", skills: ["frontend", "ui", "state"] },
  { key: "backend", skills: ["backend", "database", "api"] },
  { key: "tooling", skills: ["git", "typescript", "performance", "agile"] },
  { key: "emerging", skills: ["web3", "ai"] },
];

export default function Skills() {
  const t = useTranslations("skills");

  const categories: MenuCategoryData[] = CATEGORY_GROUPS.map((group) => ({
    label: t(`categories.${group.key}`),
    items: group.skills.map((skill) => ({
      label: t(`${skill}.name`),
      tech: t(`${skill}.tech`),
    })),
  }));

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="border-dashed-coffee relative overflow-hidden bg-cafe-base py-24 text-cafe-ink"
    >
      <div className="container relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
        <SectionHeading chapter={t("chapter")} title={t("headingTitle")} />

        <span id="skills-title" className="sr-only">
          {t("title")}
        </span>

        <div className="mt-12">
          <MenuBoard
            title={t("boardTitle")}
            subtitle={t("boardSubtitle")}
            categories={categories}
          />
        </div>
      </div>
    </section>
  );
}
