"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Layout, GitBranch, Terminal, Layers, Cpu, Globe, Workflow, Zap, Brain } from "lucide-react"
import AnimatedSectionHeader from "./AnimatedSectionHeader"
import { useTranslations } from "next-intl"

const SkillIcon = ({ icon: Icon, color }: { icon: any; color: string }) => (
  <div className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg`}>
    <Icon className={`w-6 h-6 ${color}`} />
  </div>
)

interface Skill {
  icon: any
  key: string
  color: string
}

const skillsConfig: Skill[] = [
  { icon: Code, key: "frontend", color: "text-blue-500" },
  { icon: Server, key: "backend", color: "text-green-500" },
  { icon: Database, key: "database", color: "text-purple-500" },
  { icon: Layout, key: "ui", color: "text-pink-500" },
  { icon: GitBranch, key: "git", color: "text-orange-500" },
  { icon: Terminal, key: "typescript", color: "text-yellow-500" },
  { icon: Layers, key: "state", color: "text-indigo-500" },
  { icon: Cpu, key: "api", color: "text-red-500" },
  { icon: Globe, key: "performance", color: "text-teal-500" },
  { icon: Workflow, key: "agile", color: "text-cyan-500" },
  { icon: Zap, key: "web3", color: "text-amber-500" },
  { icon: Brain, key: "ai", color: "text-emerald-500" },
]

export default function Skills() {
  const t = useTranslations('skills')

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title={t('title')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsConfig.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6 rounded-xl shadow-lg card-backdrop card-hover">
                <div className="flex items-center mb-4">
                  <SkillIcon icon={skill.icon} color={skill.color} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {t(`${skill.key}.name`)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t(`${skill.key}.tech`)}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t(`${skill.key}.description`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
