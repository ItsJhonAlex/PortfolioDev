"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const sections = [
  { id: "hero", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "👤" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "services", label: "Services", icon: "🎯" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "contact", label: "Contact", icon: "📧" },
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Mostrar después de un delay
    const timer = setTimeout(() => setIsVisible(true), 1500)
    
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

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="flex flex-col gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-3 shadow-xl border border-gray-200 dark:border-gray-700">
            {sections.map(({ id, label, icon }, index) => (
              <motion.button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="group relative flex items-center justify-center"
                aria-label={`Scroll to ${label}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute right-14 px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium whitespace-nowrap shadow-lg"
                  initial={{ opacity: 0, x: 10, scale: 0.8 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-2">{icon}</span>
                  {label}
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-gray-100" />
                </motion.div>
                
                <motion.div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSection === id
                      ? "bg-blue-600 dark:bg-blue-400"
                      : "bg-gray-400 dark:bg-gray-600"
                  }`}
                  animate={
                    activeSection === id 
                      ? { 
                          scale: [1, 1.4, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.7)",
                            "0 0 0 8px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0)"
                          ]
                        } 
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: activeSection === id ? Infinity : 0 }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

