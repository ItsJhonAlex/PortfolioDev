"use client"

import { motion } from "framer-motion"
import { Code, Layout, Server, Smartphone, Zap, Brain } from "lucide-react"
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
    {
      icon: <Zap className="w-12 h-12 text-amber-500" />,
      key: "web3",
    },
    {
      icon: <Brain className="w-12 h-12 text-emerald-500" />,
      key: "ai",
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
              className="p-6 rounded-lg shadow-lg card-backdrop group cursor-pointer"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold ml-4 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {t(`${service.key}.title`)}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t(`${service.key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
