"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code, Database, Server, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/SectionHeading";
import SkillCard, { type StickyColor } from "@/components/SkillCard";

type SkillKey = "frontend" | "backend" | "database" | "performance";

type SkillConfig = {
  key: SkillKey;
  Icon: LucideIcon;
  iconColorClass: string;
  variant: StickyColor;
  rotation: number;
};

const SKILLS: SkillConfig[] = [
  { key: "frontend", Icon: Code, iconColorClass: "text-blue-600", variant: "yellow", rotation: -2 },
  { key: "backend", Icon: Server, iconColorClass: "text-emerald-600", variant: "pink", rotation: 1.5 },
  { key: "database", Icon: Database, iconColorClass: "text-purple-600", variant: "green", rotation: -1 },
  { key: "performance", Icon: Zap, iconColorClass: "text-amber-600", variant: "blue", rotation: 2 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const reducedFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function About() {
  const t = useTranslations("about");
  const reduceMotion = useReducedMotion();
  const itemVariants = reduceMotion ? reducedFade : fadeUp;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-dashed-coffee relative overflow-hidden bg-cafe-base py-24 text-cafe-ink"
    >
      <div className="container relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
        <SectionHeading chapter={t("chapter")} title={t("headingTitle")} />

        <span id="about-title" className="sr-only">
          {t("title")}
        </span>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — description paragraphs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
            className="flex max-w-prose flex-col gap-5"
          >
            <motion.p
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              className="text-base leading-relaxed text-cafe-mute"
            >
              {t("description1")}
            </motion.p>
            <motion.p
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              className="text-base leading-relaxed text-cafe-mute"
            >
              {t("description2")}
            </motion.p>
          </motion.div>

          {/* Right — 2x2 sticky note cards */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 pt-2 sm:grid-cols-2">
            {SKILLS.map(({ key, Icon, iconColorClass, variant, rotation }, i) => (
              <SkillCard
                key={key}
                Icon={Icon}
                iconColorClass={iconColorClass}
                title={t(`skills.${key}.title`)}
                tech={t(`skills.${key}.tech`)}
                blurb={t(`skills.${key}.blurb`)}
                variant={variant}
                rotation={rotation}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
