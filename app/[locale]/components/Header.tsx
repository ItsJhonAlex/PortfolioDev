"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, resolvedTheme } = useTheme()

  // Efecto para establecer mounted a true después del montaje
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    })

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [lastScrollY, mounted])

  // No renderizar nada durante SSR o antes del montaje
  if (!mounted) return null

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Height of the header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Usar resolvedTheme para obtener el tema actual (system, light, dark)
  const currentTheme = resolvedTheme || theme

  return (
    <header
      className={`
        fixed w-full z-50 transition-all duration-300
        ${isVisible ? "top-0" : "-top-20"}
        ${currentTheme === "dark" ? "bg-gray-900/95" : "bg-white/95"}
        backdrop-blur-sm shadow-md
      `}
    >
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-6">
          {[
            ["about", "About"],
            ["experience", "Experience"],
            ["skills", "Skills"],
            ["services", "Services"],
            ["education", "Education"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`
                  transition-colors duration-300
                  ${
                    activeSection === id
                      ? "text-blue-600 dark:text-blue-400"
                      : theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-800 hover:text-blue-600"
                  }
                `}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

