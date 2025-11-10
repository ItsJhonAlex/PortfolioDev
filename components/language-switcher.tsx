"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"
import { motion } from "framer-motion"

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return
    
    // Guardar información de carga en sessionStorage
    sessionStorage.setItem('loadingInfo', JSON.stringify({
      type: 'languageChange',
      locale: newLocale,
      timestamp: Date.now()
    }))
    
    // Disparar evento personalizado para notificar cambio de idioma
    const event = new CustomEvent("localeChange", { detail: { locale: newLocale } })
    window.dispatchEvent(event)
    
    // Obtener la ruta sin el prefijo de idioma
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "")
    
    // Redirigir a la nueva ruta con el nuevo idioma
    router.push(`/${newLocale}${pathnameWithoutLocale}`)
  }

  const currentLanguage = languages.find(lang => lang.code === locale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
          >
            <Globe className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 group-hover:rotate-12" />
            <span className="absolute -bottom-1 -right-1 text-xs">
              {currentLanguage?.flag}
            </span>
            <span className="sr-only">Change language</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-gray-200 dark:border-gray-700 shadow-xl min-w-[160px]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <span className="mr-2 text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {locale === lang.code && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <Check className="h-4 w-4 text-blue-600" />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
