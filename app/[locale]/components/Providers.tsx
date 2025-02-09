"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import LanguageSwitcher from "@/components/language-switcher"
import { NextIntlClientProvider } from "next-intl"

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale: string
  messages: any
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange
      >
        <div className="min-h-screen">
          <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
          {children}
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
