"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import LanguageSwitcher from "@/components/language-switcher"
import { NextIntlClientProvider } from "next-intl"
import LoadingScreen from "./LoadingScreen"

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale: string
  messages: any
}) {
  // Estado para controlar si el componente está montado
  const [mounted, setMounted] = useState(false)
  // Estado para controlar la pantalla de carga
  const [isLoading, setIsLoading] = useState(true)
  // Estado para rastrear cambios de tema o idioma
  const [isTransitioning, setIsTransitioning] = useState(false)
  // Estado para almacenar el idioma actual
  const [currentLocale, setCurrentLocale] = useState(locale)
  
  // Efecto para manejar la carga inicial
  useEffect(() => {
    // Simular tiempo de carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false)
      setMounted(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Efecto para detectar cambios de idioma
  useEffect(() => {
    if (mounted && locale !== currentLocale) {
      setIsTransitioning(true)
      setCurrentLocale(locale)
      
      // Simular tiempo de carga al cambiar idioma
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [locale, mounted, currentLocale])
  
  // Función para manejar cambios de tema
  const handleThemeChange = () => {
    if (mounted) {
      setIsTransitioning(true)
      
      // Simular tiempo de carga al cambiar tema
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1500)
    }
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange
        // Eliminar la propiedad onThemeChange que causa el error
      >
        {/* Pantalla de carga inicial */}
        <LoadingScreen 
          isLoading={isLoading} 
          onLoadingComplete={() => setMounted(true)} 
        />
        
        {/* Pantalla de carga para transiciones */}
        <LoadingScreen 
          isLoading={isTransitioning} 
          onLoadingComplete={() => setIsTransitioning(false)} 
        />
        
        {/* Observar cambios de tema manualmente */}
        {mounted && (
          <ThemeObserver onThemeChange={handleThemeChange} />
        )}
        
        <div className="min-h-screen">
          {/* Solo renderizar los controles de tema e idioma cuando el componente está montado */}
          {mounted && (
            <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          )}
          {children}
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

// Componente para observar cambios de tema
function ThemeObserver({ onThemeChange }: { onThemeChange: () => void }) {
  useEffect(() => {
    // Observar cambios en el atributo de tema en el elemento html
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          onThemeChange()
        }
      })
    })
    
    observer.observe(document.documentElement, { attributes: true })
    
    return () => observer.disconnect()
  }, [onThemeChange])
  
  return null
}
