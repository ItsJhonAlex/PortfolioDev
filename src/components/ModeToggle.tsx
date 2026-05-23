"use client";

import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const OPTIONS = [
  { value: "light", Icon: Sun },
  { value: "dark", Icon: Moon },
  { value: "system", Icon: Monitor },
] as const;

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("controls");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          type="button"
          aria-label={t("toggleTheme")}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="focus-cafe relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-cafe-border bg-cafe-elev text-cafe-ink shadow-cafe transition-colors hover:border-cafe-accent hover:bg-cafe-sticky"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t("toggleTheme")}</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[140px] border border-cafe-border bg-cafe-elev text-cafe-ink shadow-cafe-lg"
      >
        {OPTIONS.map(({ value, Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className="cursor-pointer gap-2 focus:bg-cafe-sticky focus:text-cafe-ink"
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="flex-1">{t(`theme.${value}`)}</span>
            {theme === value && (
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-cafe-pin"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
