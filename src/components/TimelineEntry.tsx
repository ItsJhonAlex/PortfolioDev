"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  yearLabel: string;
  company?: string;
  location?: string;
  role?: string;
  responsibilities?: string[];
  isCurrent?: boolean;
  currentLabel?: string;
  isFuture?: boolean;
  futureLabel?: string;
  index?: number;
};

export default function TimelineEntry({
  yearLabel,
  company,
  location,
  role,
  responsibilities,
  isCurrent = false,
  currentLabel = "current",
  isFuture = false,
  futureLabel = "next chapter →",
  index = 0,
}: Props) {
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 12 };
  const animate = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  // Future placeholder — dimmed, no card
  if (isFuture) {
    return (
      <motion.li
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="grid grid-cols-[76px_1fr] items-center gap-4 sm:grid-cols-[96px_1fr]"
      >
        <div className="relative pr-5 text-right">
          <span className="font-mono text-[10px] uppercase tracking-wider text-cafe-mute">
            ???
          </span>
          <span
            aria-hidden="true"
            className="absolute right-[-7px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-[2px] border-cafe-border bg-cafe-base"
          />
        </div>
        <div className="ml-4 font-hand text-lg text-cafe-mute">
          {futureLabel}
        </div>
      </motion.li>
    );
  }

  return (
    <motion.li
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="grid grid-cols-[76px_1fr] gap-4 sm:grid-cols-[96px_1fr]"
    >
      {/* Year column with dot */}
      <div className="relative pr-5 pt-4 text-right">
        <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-wider text-cafe-accent">
          {yearLabel}
        </span>
        <motion.span
          aria-hidden="true"
          initial={reduceMotion ? { scale: 1 } : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.2,
            ease: "backOut",
          }}
          className="absolute right-[-7px] top-[18px] h-3.5 w-3.5 rounded-full bg-cafe-pin shadow-[0_0_0_3px_var(--cafe-base)]"
        />
      </div>

      {/* Card */}
      <article className="ml-4 bg-cafe-elev p-5 text-cafe-ink shadow-cafe">
        <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="font-display text-xl font-semibold leading-tight">
              {company}
            </h3>
            {isCurrent && (
              <span className="inline-flex items-center gap-1 rounded-sm bg-emerald-600/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                {currentLabel}
              </span>
            )}
          </div>
          {location && (
            <span className="font-mono text-[10px] lowercase text-cafe-mute">
              {location}
            </span>
          )}
        </header>

        {role && (
          <p className="mt-1 font-display text-sm italic text-cafe-mute">
            {role}
          </p>
        )}

        {responsibilities && responsibilities.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-cafe-ink">
            {responsibilities.map((item, i) => (
              <li key={i} className="relative pl-4">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[10px] h-[5px] w-[5px] rounded-full bg-cafe-pin"
                />
                {item}
              </li>
            ))}
          </ul>
        )}
      </article>
    </motion.li>
  );
}
