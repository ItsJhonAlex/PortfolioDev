"use client"

import { motion } from "framer-motion"
import { Users, Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"
import { useTranslations } from "next-intl"

interface Collaboration {
  key: string
  image: string
  link: string
}

const collaborations: Collaboration[] = [
  {
    key: "openSource",
    image: "/placeholder.svg?height=300&width=400",
    link: "https://github.com/open-source-library/react-components",
  },
  {
    key: "hackathon",
    image: "/placeholder.svg?height=300&width=400",
    link: "https://devpost.com/software/community-engagement-app",
  },
  {
    key: "blog",
    image: "/placeholder.svg?height=300&width=400",
    link: "https://tech-blog-example.com/authors/usman-zafar",
  },
]

export default function Collaborations() {
  const t = useTranslations('collaborations')

  return (
    <section id="collaborations" className="py-20 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title={t('title')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collaborations.map((collab, index) => (
            <motion.div
              key={index}
              className="rounded-xl shadow-lg overflow-hidden card-backdrop card-hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={collab.image || "/placeholder.svg"}
                alt={t(`projects.${collab.key}.title`)}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {t(`projects.${collab.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(`projects.${collab.key}.description`)}
                </p>
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {t(`projects.${collab.key}.role`)}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {t(`projects.${collab.key}.date`)}
                  </span>
                </div>
                <a
                  href={collab.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {t('viewProject')}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
