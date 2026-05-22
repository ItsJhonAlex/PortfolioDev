"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  chapter: string;
  title: string;
  align?: "left" | "center";
  className?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const reducedFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function SectionHeading({
  chapter,
  title,
  align = "left",
  className = "",
}: Props) {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? reducedFade : fadeUp;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`flex items-baseline gap-3 ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span className="font-mono text-xs lowercase tracking-wide text-cafe-mute">
        // {chapter}
      </span>
      <h2 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] italic font-medium leading-none tracking-tight text-cafe-ink">
        {title}
      </h2>
    </motion.div>
  );
}
