"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import LanguageSwitcher from "@/components/language-switcher"
import { NextIntlClientProvider } from "next-intl"
import LoadingScreen from "./LoadingScreen"
import { motion } from "framer-motion"

export default function Providers({
  children,
  locale,
  messages,
  timeZone = 'America/Havana',
}: {
  children: React.ReactNode
  locale: string
  messages: any
  timeZone?: string
}) {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Efecto para manejar la carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setMounted(true)
    }, 1500) // Reducido a 1.5 segundos para mejor UX
    
    return () => clearTimeout(timer)
  }, [])

  const loadingMessages = {
    title: messages.loading?.initial?.title || 'Loading',
    messages: messages.loading?.initial?.messages || []
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange
      >
        {/* Pantalla de carga inicial */}
        <LoadingScreen 
          isLoading={isLoading} 
          onLoadingComplete={() => setMounted(true)}
          type="initial"
          messages={loadingMessages}
        />
        

        
        <div className="min-h-screen">
          {/* Solo renderizar los controles de tema e idioma cuando el componente está montado */}
          {mounted && (
            <motion.div 
              className="fixed top-4 right-4 flex items-center gap-3 z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <LanguageSwitcher />
              <ModeToggle />
            </motion.div>
          )}
          {children}
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
