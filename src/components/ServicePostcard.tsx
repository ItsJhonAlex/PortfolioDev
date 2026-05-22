"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  iconColorClass: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  rotation?: number;
  index?: number;
};

export default function ServicePostcard({
  Icon,
  iconColorClass,
  number,
  tag,
  title,
  description,
  rotation = 0,
  index = 0,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, rotate: 0 }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, rotate: rotation }
      }
      viewport={{ once: true, margin: "-60px" }}
      whileHover={
        reduceMotion
          ? undefined
          : { rotate: rotation * 0.3, y: -4, scale: 1.02 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="relative bg-cafe-elev px-5 pb-5 pt-6 shadow-[2px_4px_10px_rgba(61,40,23,0.18)] dark:shadow-[2px_4px_14px_rgba(0,0,0,0.45)]"
    >
      {/* Stamp */}
      <span
        aria-hidden="true"
        className="absolute right-4 top-[-9px] flex h-12 w-10 flex-col items-center justify-center border border-dashed border-cafe-accent bg-cafe-sticky shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
        style={{ transform: "rotate(4deg)" }}
      >
        <Icon className={`h-4 w-4 ${iconColorClass}`} />
        <span className="mt-0.5 font-mono text-[8px] tracking-wider text-cafe-mute">
          {number}
        </span>
      </span>

      <div className="pr-10">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cafe-pin">
          {tag}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold italic leading-snug text-cafe-ink">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-cafe-mute">
        {description}
      </p>
    </motion.article>
  );
}
