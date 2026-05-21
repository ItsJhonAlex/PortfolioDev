"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const sectionIds = [
  "hero",
  "about",
  "experience",
  "skills",
  "services",
  "projects",
  "collaborations",
  "education",
  "contact",
]

export default function FloatingNav() {
  const t = useTranslations('nav')
  const [activeSection, setActiveSection] = useState("hero")
  const [mounted, setMounted] = useState(false)

  // Efecto para establecer mounted a true después del montaje
  useEffect(() => {
    setMounted(true)
  }, [])

  // Función para configurar el observador de intersección
  const setupObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return observer
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Esperar a que los componentes lazy-loaded se carguen
    const timer = setTimeout(() => {
      const observer = setupObserver()
      return () => observer.disconnect()
    }, 1000)

    return () => clearTimeout(timer)
  }, [mounted, setupObserver])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="flex flex-col gap-3">
        {sectionIds.map((id, index) => (
          <motion.button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            className="group relative flex items-center"
            aria-label={`Scroll to ${t(id)}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span 
              className="absolute right-8 px-2 py-1 rounded bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm whitespace-nowrap"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {t(id)}
            </motion.span>
            <motion.div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === id
                  ? "bg-blue-600 dark:bg-blue-400"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
              animate={activeSection === id ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
