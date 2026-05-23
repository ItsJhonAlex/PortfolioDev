"use client";

import { motion } from "framer-motion";
import { useFadeVariants } from "@/lib/animations";

type Props = {
  chapter: string;
  title: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  chapter,
  title,
  align = "left",
  className = "",
}: Props) {
  const variants = useFadeVariants();

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
