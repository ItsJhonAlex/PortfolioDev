"use client"

import { motion } from "framer-motion"
import { Code, Layout, Server, Smartphone } from "lucide-react"
import { useTranslations } from "next-intl"

interface Service {
  icon: JSX.Element
  key: string
}

export default function Services() {
  const t = useTranslations('services')

  const services: Service[] = [
    {
      icon: <Layout className="w-12 h-12 text-blue-500" />,
      key: "web",
    },
    {
      icon: <Server className="w-12 h-12 text-green-500" />,
      key: "backend",
    },
    {
      icon: <Code className="w-12 h-12 text-purple-500" />,
      key: "api",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-yellow-500" />,
      key: "responsive",
    },
  ]

  return (
    <section id="services" className="py-20 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg shadow-lg card-backdrop card-hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="text-2xl font-semibold ml-4 dark:text-white">{t(`${service.key}.title`)}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t(`${service.key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
