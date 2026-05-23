"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AtSign, Github, MapPin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFadeVariants } from "@/lib/animations";

const EMAIL = "itsjhonalex@gmail.com";

export default function ContactLetter() {
  const t = useTranslations("contact");
  const reduceMotion = useReducedMotion();
  const variants = useFadeVariants();

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 16 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
      aria-label={t("title")}
      className="relative mx-auto max-w-xl bg-cafe-elev px-7 pb-6 pt-10 shadow-[0_10px_28px_rgba(61,40,23,0.18)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:px-10"
    >
      {/* Tape strip */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[-10px] h-4 w-20 -translate-x-1/2 bg-cafe-pin/45"
        style={{ transform: "translateX(-50%) rotate(-2deg)" }}
      />

      {/* Meta row */}
      <div className="mb-5 flex items-baseline justify-between border-b border-dashed border-cafe-border pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-cafe-mute">
        <span>{t("metaLeft")}</span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 animate-dot-pulse rounded-full bg-emerald-600 dark:bg-emerald-400" />
          {t("metaRight")}
        </span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
      >
        <motion.h3
          variants={variants}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl font-medium italic leading-tight text-cafe-ink sm:text-3xl"
        >
          {t("letterHeading")}
        </motion.h3>

        <motion.p
          variants={variants}
          transition={{ duration: 0.5 }}
          className="mt-4 text-base leading-relaxed text-cafe-mute"
        >
          {t("letterBody")}
        </motion.p>

        {/* Channels */}
        <motion.div
          variants={variants}
          transition={{ duration: 0.5 }}
          className="mt-6 flex flex-col gap-2.5"
        >
          <a
            href={`mailto:${EMAIL}`}
            aria-label={`${t("openEmail")} — ${EMAIL}`}
            className="focus-cafe group flex items-center gap-3 border border-cafe-border bg-cafe-sticky px-4 py-3 font-mono text-sm shadow-cafe transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cafe-lg"
          >
            <AtSign className="h-4 w-4 text-cafe-pin" aria-hidden="true" />
            <span className="text-[9px] uppercase tracking-[0.18em] text-cafe-mute">
              {t("emailLabel")}
            </span>
            <span className="flex-1 truncate text-right font-medium text-cafe-ink">
              {EMAIL}
            </span>
          </a>

          <div className="flex items-center gap-3 border border-cafe-border bg-cafe-elev/60 px-4 py-3 font-mono text-sm">
            <MapPin className="h-4 w-4 text-cafe-pin" aria-hidden="true" />
            <span className="text-[9px] uppercase tracking-[0.18em] text-cafe-mute">
              {t("locationLabel")}
            </span>
            <span className="flex-1 text-right text-cafe-ink">
              {t("locationValue")}
            </span>
          </div>
        </motion.div>

        {/* Social row */}
        <motion.ul
          variants={variants}
          transition={{ duration: 0.5 }}
          className="mt-5 flex justify-center gap-2.5"
        >
          <li>
            <a
              href="https://github.com/ItsJhonAlex"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="focus-cafe inline-flex h-9 w-9 items-center justify-center rounded-full border border-cafe-border bg-cafe-elev text-cafe-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cafe-accent hover:text-cafe-accent"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/ItsJhonAlex"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit X (Twitter) profile"
              className="focus-cafe inline-flex h-9 w-9 items-center justify-center rounded-full border border-cafe-border bg-cafe-elev text-cafe-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cafe-accent hover:text-cafe-accent"
            >
              <Twitter className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        </motion.ul>

        {/* Signature */}
        <motion.div
          variants={variants}
          transition={{ duration: 0.5 }}
          className="mt-6 border-t border-dashed border-cafe-border pt-4 text-right"
        >
          <p className="font-display text-sm italic text-cafe-mute">
            {t("signClosing")}
          </p>
          <p className="mt-1 font-hand text-3xl leading-none text-cafe-ink">
            {t("signName")}
          </p>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
