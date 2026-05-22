"use client";

import { motion } from "framer-motion";
import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
  timeZone?: string;
};

export default function Providers({
  children,
  locale,
  messages,
  timeZone = "America/Havana",
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen">
          {mounted && (
            <motion.div
              className="fixed right-4 top-4 z-50 flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <LanguageSwitcher />
              <ModeToggle />
            </motion.div>
          )}
          {children}
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
