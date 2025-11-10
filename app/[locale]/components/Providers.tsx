"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import LanguageSwitcher from "@/components/language-switcher"
import { NextIntlClientProvider } from "next-intl"
import LoadingScreen, { LoadingType, ThemeType } from "./LoadingScreen"
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
  // Estado para controlar si el componente está montado
  const [mounted, setMounted] = useState(false)
  // Estado para controlar la pantalla de carga
  const [isLoading, setIsLoading] = useState(true)
  // Estado para el tipo de carga
  const [loadingType, setLoadingType] = useState<LoadingType>('initial')
  const [targetTheme, setTargetTheme] = useState<ThemeType>('light')
  const [targetLocale, setTargetLocale] = useState(locale)
  
  // Detectar el tipo de carga al montar
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Verificar si hay información de carga pendiente en sessionStorage
    const loadingInfo = sessionStorage.getItem('loadingInfo')
    
    if (loadingInfo) {
      try {
        const info = JSON.parse(loadingInfo)
        setLoadingType(info.type)
        setTargetTheme(info.theme || 'light')
        setTargetLocale(info.locale || locale)
        
        // Limpiar después de leer
        sessionStorage.removeItem('loadingInfo')
      } catch (e) {
        console.error('Error parsing loading info:', e)
      }
    } else {
      // Si no hay info, es una carga inicial real
      setLoadingType('initial')
    }
  }, [])
  
  // Obtener mensajes de carga - usar useMemo para evitar recalcular innecesariamente
  const getLoadingMessages = () => {
    // Para cambio de idioma, usar los mensajes del idioma de destino
    let messagesSource = messages
    
    if (loadingType === 'languageChange' && targetLocale !== locale) {
      // Intentar cargar los mensajes del idioma de destino
      try {
        const targetMessages = require(`@/messages/${targetLocale}.json`)
        messagesSource = targetMessages
      } catch (e) {
        // Si falla, usar los mensajes actuales
        messagesSource = messages
      }
    }
    
    const loadingMessages = messagesSource.loading || {}
    
    switch (loadingType) {
      case 'languageChange':
        return {
          title: targetLocale === 'es' ? 'Cambiando a Español' : 'Switching to English',
          messages: loadingMessages.languageChange?.messages || []
        }
      case 'themeChange':
        return {
          title: loadingMessages.themeChange?.[targetTheme]?.title || 'Changing Theme',
          messages: loadingMessages.themeChange?.[targetTheme]?.messages || []
        }
      case 'refresh':
        return {
          title: loadingMessages.refresh?.title || 'Reloading',
          messages: loadingMessages.refresh?.messages || []
        }
      default:
        return {
          title: loadingMessages.initial?.title || 'Welcome',
          messages: loadingMessages.initial?.messages || []
        }
    }
  }
  
  // Efecto para manejar la carga inicial
  useEffect(() => {
    // Simular tiempo de carga
    const duration = loadingType === 'initial' ? 2500 : 
                     loadingType === 'languageChange' ? 2000 : 
                     loadingType === 'themeChange' ? 1800 : 2000
    
    const timer = setTimeout(() => {
      setIsLoading(false)
      setMounted(true)
    }, duration)
    
    return () => clearTimeout(timer)
  }, [loadingType])

  const loadingMessages = getLoadingMessages()

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
          type={loadingType}
          theme={targetTheme}
          targetLocale={targetLocale}
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
