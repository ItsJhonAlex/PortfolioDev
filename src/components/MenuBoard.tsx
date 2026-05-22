"use client";

import { motion, useReducedMotion } from "framer-motion";

export type MenuItemData = {
  label: string;
  tech: string;
};

export type MenuCategoryData = {
  label: string;
  items: MenuItemData[];
};

type Props = {
  title: string;
  subtitle: string;
  categories: MenuCategoryData[];
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function MenuBoard({ title, subtitle, categories }: Props) {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? reducedVariants : itemVariants;

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      whileInView={
        reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="mx-auto max-w-3xl"
    >
      {/* Outer wood frame */}
      <div className="border-[6px] border-cafe-accent bg-cafe-elev p-7 shadow-cafe-lg sm:p-10">
        {/* Title */}
        <div className="pb-2 text-center">
          <h3 className="font-hand text-3xl font-bold text-cafe-ink sm:text-4xl">
            {title}
          </h3>
        </div>

        {/* Subtitle */}
        <p className="mb-6 border-b border-dashed border-cafe-border pb-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-cafe-mute sm:text-xs">
          {subtitle}
        </p>

        {/* Categories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
          className="space-y-6"
        >
          {categories.map((cat) => (
            <div key={cat.label}>
              <motion.div
                variants={variants}
                transition={{ duration: 0.4 }}
                className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cafe-pin"
              >
                ▸ {cat.label}
              </motion.div>
              <ul className="space-y-1.5">
                {cat.items.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={variants}
                    transition={{ duration: 0.4 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="font-hand text-xl font-bold leading-none text-cafe-ink sm:text-2xl">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-cafe-border"
                    />
                    <span className="font-mono text-[10px] lowercase text-cafe-mute sm:text-xs">
                      {item.tech}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
