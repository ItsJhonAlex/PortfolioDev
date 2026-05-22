"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  locale: "en" | "es";
  rotation?: number;
  showTape?: boolean;
  tapePosition?: "left" | "center";
  labels: { github: string; live: string };
  index?: number;
};

export default function ProjectPolaroid({
  project,
  locale,
  rotation = 0,
  showTape = false,
  tapePosition = "left",
  labels,
  index = 0,
}: Props) {
  const reduceMotion = useReducedMotion();
  const content = project.content[locale];

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
          : { rotate: rotation * 0.25, y: -6, scale: 1.02 }
      }
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="relative bg-cafe-elev p-2 pb-4 shadow-[0_6px_18px_rgba(61,40,23,0.18)] dark:shadow-[0_6px_22px_rgba(0,0,0,0.45)]"
    >
      {showTape && (
        <span
          aria-hidden="true"
          className="absolute top-[-10px] z-10 h-4 w-12 bg-cafe-pin/40"
          style={{
            left: tapePosition === "center" ? "50%" : "28%",
            transform:
              tapePosition === "center"
                ? "translateX(-50%) rotate(2deg)"
                : "rotate(-3deg)",
          }}
        />
      )}

      {project.year && (
        <span className="absolute right-2 top-2 z-10 border border-cafe-border bg-cafe-sticky px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-cafe-mute">
          {project.year}
        </span>
      )}

      {/* Photo */}
      <div className="relative mb-3 aspect-[4/3] overflow-hidden bg-cafe-border">
        <Image
          src={project.image}
          alt={content.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-transparent to-black/15"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-1.5 left-2 font-mono text-[8px] uppercase tracking-widest text-white/70"
        >
          screenshot
        </span>
      </div>

      {/* Caption */}
      <h3 className="px-2 font-hand text-2xl font-bold leading-none text-cafe-ink">
        {content.title}
      </h3>
      <p className="mt-2 px-2 text-sm leading-relaxed text-cafe-mute">
        {content.description}
      </p>

      {project.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1 px-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm bg-cafe-pin/15 px-1.5 py-0.5 font-mono text-[9px] lowercase tracking-wide text-cafe-accent dark:text-cafe-ink"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {(project.github || project.live) && (
        <div className="mt-3 flex items-center justify-between border-t border-dashed border-cafe-border px-2 pt-2 text-xs text-cafe-mute">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-cafe inline-flex items-center gap-1 transition-colors hover:text-cafe-ink"
              aria-label={`${labels.github}: ${content.title}`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              {labels.github}
            </a>
          ) : (
            <span />
          )}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-cafe inline-flex items-center gap-1 transition-colors hover:text-cafe-ink"
              aria-label={`${labels.live}: ${content.title}`}
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              {labels.live}
            </a>
          ) : (
            <span />
          )}
        </div>
      )}
    </motion.article>
  );
}
