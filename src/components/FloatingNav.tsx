"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "skills",
  "services",
  "projects",
  "collaborations",
  "education",
  "contact",
];

export default function FloatingNav() {
  const t = useTranslations("nav");
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setupObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return observer;
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const observer = setupObserver();
    return () => observer.disconnect();
  }, [mounted, setupObserver]);

  if (!mounted) return null;

  return (
    <motion.nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <ul className="flex flex-col items-center gap-3 rounded-full border border-cafe-border bg-cafe-elev/85 px-2 py-3 shadow-cafe backdrop-blur-sm">
        {SECTION_IDS.map((id) => {
          const isActive = activeSection === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                aria-label={`Scroll to ${t(id)}`}
                aria-current={isActive ? "true" : undefined}
                className="group focus-cafe relative flex h-3 w-3 items-center justify-center rounded-full"
              >
                {/* Tooltip */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-sm border border-cafe-border bg-cafe-elev px-2 py-0.5 font-mono text-[10px] lowercase tracking-wider text-cafe-ink opacity-0 shadow-cafe transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100"
                >
                  {t(id)}
                </span>

                {/* Dot */}
                <motion.span
                  aria-hidden="true"
                  className={`block rounded-full transition-colors duration-200 ${
                    isActive
                      ? "h-2.5 w-2.5 bg-cafe-pin"
                      : "h-2 w-2 bg-cafe-border group-hover:bg-cafe-accent"
                  }`}
                  animate={
                    isActive
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(217, 119, 87, 0.55)",
                            "0 0 0 6px rgba(217, 119, 87, 0)",
                          ],
                        }
                      : { boxShadow: "0 0 0 0 rgba(217, 119, 87, 0)" }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: isActive ? Infinity : 0,
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
