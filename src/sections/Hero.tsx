"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import NowPlaying from "@/components/hero/NowPlaying";
import SocialIcons from "@/components/hero/SocialIcons";
import StatusPill from "@/components/hero/StatusPill";
import StickyNote from "@/components/hero/StickyNote";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const reducedFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const cvPath =
    locale === "es" ? "/ItsJhonAlex_cv_es.pdf" : "/ItsJhonAlex_cv_en.pdf";
  const variants = reduceMotion ? reducedFade : fadeUp;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="border-dashed-coffee relative min-h-[calc(100vh-2rem)] overflow-hidden bg-cafe-base text-cafe-ink"
    >
      <h1 id="hero-title" className="sr-only">
        {t("ariaTitle")}
      </h1>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
        className="container relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] max-w-5xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left column — content */}
          <div className="flex max-w-xl flex-col gap-5">
            <motion.div variants={variants} transition={{ duration: 0.5 }}>
              <StatusPill state="available" />
            </motion.div>

            <motion.div variants={variants} transition={{ duration: 0.5 }}>
              <NowPlaying />
            </motion.div>

            <motion.p
              variants={variants}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs lowercase text-cafe-mute"
            >
              {t("roleLine")}
            </motion.p>

            <motion.p
              variants={variants}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
              className="font-display text-[clamp(2rem,6vw,3.75rem)] italic leading-[1.05] tracking-tight text-cafe-ink"
            >
              {t("sloganLine1")}
              <br />
              {t("sloganLine2")}
            </motion.p>

            <motion.p
              variants={variants}
              transition={{ duration: 0.5 }}
              className="max-w-md text-base leading-relaxed text-cafe-mute"
            >
              {t("tagline")}
            </motion.p>

            <motion.div
              variants={variants}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="focus-cafe inline-flex items-center gap-2 rounded-md bg-cafe-ink px-5 py-2.5 font-medium text-cafe-base shadow-cafe transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cafe-lg active:translate-x-0 active:translate-y-0 active:shadow-cafe"
              >
                {t("ctaExplore")}
              </button>

              <a
                href={cvPath}
                download
                className="focus-cafe inline-flex items-center gap-2 rounded-md border-[1.5px] border-cafe-ink bg-transparent px-5 py-2.5 font-medium text-cafe-ink transition-colors duration-200 hover:bg-cafe-ink hover:text-cafe-base"
              >
                {t("ctaResume")}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div
              variants={variants}
              transition={{ duration: 0.5 }}
              className="pt-2"
            >
              <SocialIcons
                github="https://github.com/ItsJhonAlex"
                x="https://x.com/ItsJhonAlex"
                email="itsjhonalex@gmail.com"
              />
            </motion.div>
          </div>

          {/* Right column — sticky note + (future) polaroid slot */}
          <div className="relative flex flex-col items-end gap-6 self-start pt-4 lg:pt-12">
            {/* TODO: Polaroid slot — when profile photo is ready, render <Polaroid /> here.
                Suggested positioning: -rotate-3, ~180px wide, with tape strip on top. */}
            {/*
            <div className="hero-photo-slot">
              <Polaroid src="/profile.png" alt="..." />
            </div>
            */}

            <motion.div
              variants={variants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StickyNote heading={t("stickyHeading")} rotation={3}>
                {t("stickyBody")}
              </StickyNote>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
