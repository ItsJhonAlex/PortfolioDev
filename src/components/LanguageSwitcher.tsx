"use client";

import { motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { code: "es", flag: "🇪🇸" },
  { code: "en", flag: "🇺🇸" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("controls");

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");
    router.replace(`/${newLocale}${pathnameWithoutLocale}`, { scroll: false });
  };

  const currentLanguage = LANGUAGES.find((lang) => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          type="button"
          aria-label={t("changeLanguage")}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="focus-cafe relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-cafe-border bg-cafe-elev text-cafe-ink shadow-cafe transition-colors hover:border-cafe-accent hover:bg-cafe-sticky"
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute -bottom-0.5 -right-0.5 text-[10px]"
          >
            {currentLanguage?.flag}
          </span>
          <span className="sr-only">{t("changeLanguage")}</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[160px] border border-cafe-border bg-cafe-elev text-cafe-ink shadow-cafe-lg"
      >
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="cursor-pointer gap-2 focus:bg-cafe-sticky focus:text-cafe-ink"
          >
            <span className="text-base">{lang.flag}</span>
            <span className="flex-1">{t(`language.${lang.code}`)}</span>
            {locale === lang.code && (
              <Check className="h-3.5 w-3.5 text-cafe-pin" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
