"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Code, Sparkles, Globe, Sun, Moon, Monitor, RefreshCw } from "lucide-react"

export type LoadingType = 'initial' | 'languageChange' | 'themeChange' | 'refresh'
export type ThemeType = 'light' | 'dark' | 'system'

interface LoadingScreenProps {
  isLoading: boolean
  onLoadingComplete?: () => void
  type?: LoadingType
  theme?: ThemeType
  targetLocale?: string
  messages?: {
    title: string
    messages: string[]
  }
}

const getIcon = (type: LoadingType, theme?: ThemeType) => {
  switch (type) {
    case 'languageChange':
      return Globe
    case 'themeChange':
      if (theme === 'light') return Sun
      if (theme === 'dark') return Moon
      return Monitor
    case 'refresh':
      return RefreshCw
    default:
      return Code
  }
}

export default function LoadingScreen({ 
  isLoading, 
  onLoadingComplete, 
  type = 'initial',
  theme,
  messages
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  const loadingMessages = messages?.messages || [
    "Initializing...",
    "Loading components...",
    "Setting up environment...",
    "Almost there...",
    "Ready!"
  ]
  
  const title = messages?.title || "Loading"
  const Icon = getIcon(type, theme)
  
  // Efecto para marcar como montado (client-side)
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!isLoading) return
    
    // Simulación de progreso de carga
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete?.()
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 200)
    
    // Cambiar mensajes
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 800)
    
    return () => {
      clearInterval(interval)
      clearInterval(messageInterval)
    }
  }, [isLoading, onLoadingComplete])
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Animated background particles */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => {
                const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
                const randomY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
                const randomX2 = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
                const randomY2 = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
                const randomDuration = Math.random() * 10 + 10
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400/30 dark:bg-blue-600/30 rounded-full"
                    initial={{
                      x: randomX,
                      y: randomY,
                    }}
                    animate={{
                      y: [null, randomY2],
                      x: [null, randomX2],
                    }}
                    transition={{
                      duration: randomDuration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )
              })}
            </div>
          )}

          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="mb-8 relative"
          >
            <motion.div
              animate={{ rotate: type === 'refresh' ? 360 : 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50"
            />
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl">
              <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
              {title}
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto max-w-xs"
            />
          </motion.div>
          
          {/* Progress bar */}
          <div className="w-80 max-w-[90vw] mb-6">
            <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
          
          {/* Loading message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <Sparkles className="w-4 h-4" />
              <p className="text-sm font-medium">{loadingMessages[messageIndex]}</p>
              <span className="text-lg font-bold">{Math.round(progress)}%</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}