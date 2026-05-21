"use client"

import { motion } from "framer-motion"

interface AnimatedSectionHeaderProps {
  title: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  subtitle?: string
}

export default function AnimatedSectionHeader({ 
  title, 
  level = 'h2',
  subtitle
}: AnimatedSectionHeaderProps) {
  const MotionComponent = motion[level]

  return (
    <div className="text-center mb-12">
      <MotionComponent
        className="text-4xl font-bold mb-4 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </MotionComponent>
      {subtitle && (
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

