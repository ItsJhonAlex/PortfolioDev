"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type StickyColor = "yellow" | "pink" | "green" | "blue";

type Props = {
  Icon: LucideIcon;
  iconColorClass: string;
  title: string;
  tech: string;
  blurb: string;
  variant?: StickyColor;
  rotation?: number;
  index?: number;
};

const VARIANT_BG: Record<StickyColor, string> = {
  yellow: "bg-amber-100 dark:bg-cafe-sticky",
  pink: "bg-rose-100 dark:bg-cafe-sticky",
  green: "bg-lime-100 dark:bg-cafe-sticky",
  blue: "bg-sky-100 dark:bg-cafe-sticky",
};

const VARIANT_DARK_BORDER: Record<StickyColor, string> = {
  yellow: "dark:border-amber-700/50",
  pink: "dark:border-rose-700/50",
  green: "dark:border-emerald-700/50",
  blue: "dark:border-sky-700/50",
};

export default function SkillCard({
  Icon,
  iconColorClass,
  title,
  tech,
  blurb,
  variant = "yellow",
  rotation = 0,
  index = 0,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, rotate: 0 }
      }
      whileInView={
        reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: rotation }
      }
      viewport={{ once: true, margin: "-60px" }}
      whileHover={
        reduceMotion ? undefined : { rotate: rotation * 0.25, y: -4, scale: 1.02 }
      }
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className={`relative ${VARIANT_BG[variant]} ${VARIANT_DARK_BORDER[variant]} dark:border dark:border-dashed px-5 pb-5 pt-7 shadow-[3px_4px_8px_rgba(0,0,0,0.12)] dark:shadow-[3px_4px_14px_rgba(0,0,0,0.4)]`}
    >
      {/* Pin */}
      <span
        aria-hidden="true"
        className="absolute left-5 top-[-5px] h-3 w-3 rounded-full bg-cafe-pin shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
      />

      <Icon
        className={`mb-1.5 h-5 w-5 ${iconColorClass}`}
        aria-hidden="true"
      />

      <h3 className="font-hand text-2xl font-bold leading-none text-cafe-ink dark:text-cafe-ink">
        {title}
      </h3>

      <p className="mt-1 font-mono text-[10px] lowercase tracking-wide text-cafe-mute">
        {tech}
      </p>

      <p className="mt-2 font-hand text-lg leading-snug text-cafe-mute">
        {blurb}
      </p>
    </motion.div>
  );
}
