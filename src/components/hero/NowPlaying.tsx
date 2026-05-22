"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  getNowPlaying,
  TRACK_COUNT,
  TRACK_ROTATION_MS,
} from "@/lib/now-playing";

export default function NowPlaying() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const track = getNowPlaying(index);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TRACK_COUNT);
    }, TRACK_ROTATION_MS);
    return () => clearInterval(id);
  }, []);

  const trackText = track.artist
    ? `${track.title} · ${track.artist}`
    : track.title;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${t("ariaNowPlaying")}: ${trackText}`}
      className="inline-flex items-center gap-2 rounded-full bg-cafe-ink py-1 pl-1 pr-3 font-mono text-xs text-cafe-base"
    >
      {/* Spinning vinyl disc */}
      <span
        aria-hidden="true"
        className={`h-5 w-5 rounded-full ${reduceMotion ? "" : "animate-spin-slow"}`}
        style={{
          background:
            "conic-gradient(var(--cafe-pin), var(--cafe-accent), var(--cafe-ink), var(--cafe-pin))",
          boxShadow: "inset 0 0 0 2px var(--cafe-ink), inset 0 0 0 3px var(--cafe-base)",
        }}
      />

      <span className="opacity-70">{t("nowPlayingPrefix")}</span>
      <span aria-hidden="true">·</span>

      {/* Rotating text with cross-fade */}
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="truncate"
        >
          {trackText}
        </motion.span>
      </AnimatePresence>

      {/* Equalizer bars */}
      <span
        aria-hidden="true"
        className="ml-1 inline-flex items-end gap-[2px]"
        style={{ height: "12px" }}
      >
        <span
          className={`w-[2px] bg-emerald-400 ${
            reduceMotion ? "h-[6px]" : "animate-eq-1"
          }`}
        />
        <span
          className={`w-[2px] bg-emerald-400 ${
            reduceMotion ? "h-[6px]" : "animate-eq-2"
          }`}
        />
        <span
          className={`w-[2px] bg-emerald-400 ${
            reduceMotion ? "h-[6px]" : "animate-eq-3"
          }`}
        />
      </span>
    </div>
  );
}
