"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"
import { useTranslations } from "next-intl"

interface Project {
  key: string
  image: string
  github: string
  live: string
}

const projects: Project[] = [
  {
    key: "ecommerce",
    image: "/placeholder.svg?height=300&width=400",
    github: "https://github.com/yourusername/ecommerce-platform",
    live: "https://ecommerce-platform-demo.vercel.app",
  },
  {
    key: "taskManager",
    image: "/placeholder.svg?height=300&width=400",
    github: "https://github.com/yourusername/task-management-app",
    live: "https://task-app-demo.vercel.app",
  },
  {
    key: "weather",
    image: "/placeholder.svg?height=300&width=400",
    github: "https://github.com/yourusername/weather-dashboard",
    live: "https://weather-dashboard-demo.vercel.app",
  },
]

export default function PersonalProjects() {
  const t = useTranslations('personalProjects')

  return (
    <section id="projects" className="py-20 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title={t('title')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="rounded-xl shadow-lg overflow-hidden card-backdrop card-hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={t(`projects.${project.key}.title`)}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {t(`projects.${project.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(`projects.${project.key}.description`)}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {t.raw(`projects.${project.key}.tags`).map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    {t('github')}
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {t('liveDemo')}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
