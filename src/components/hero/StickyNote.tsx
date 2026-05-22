"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  heading?: string;
  children: ReactNode;
  rotation?: number;
  className?: string;
};

export default function StickyNote({
  heading,
  children,
  rotation = 3,
  className = "",
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      aria-label="Personal note"
      initial={{ rotate: rotation }}
      animate={{ rotate: rotation }}
      whileHover={reduceMotion ? undefined : { rotate: rotation - 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative inline-block px-4 pb-4 pt-5 font-hand text-cafe-ink shadow-[3px_4px_8px_rgba(0,0,0,0.12)] dark:shadow-[3px_4px_12px_rgba(0,0,0,0.5)] sticky-paper dark:sticky-paper-dark ${className}`}
      style={{ minWidth: "140px", maxWidth: "180px" }}
    >
      {/* Pin */}
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cafe-pin shadow-[0_1px_2px_rgba(0,0,0,0.35)] ${
          reduceMotion ? "" : "animate-pin-pulse"
        }`}
      />

      {heading && (
        <div className="mb-1 text-base font-bold leading-none">{heading}</div>
      )}
      <div className="whitespace-pre-line text-lg leading-snug text-cafe-ink dark:text-cafe-ink">
        {children}
      </div>
    </motion.aside>
  );
}
