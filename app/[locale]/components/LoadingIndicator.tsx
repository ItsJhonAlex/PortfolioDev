"use client"

import { motion } from "framer-motion"

export default function LoadingIndicator() {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Spinning gradient ring */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing dot */}
        <motion.div
          className="absolute inset-0 m-auto w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Loading text */}
      <motion.p
        className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading...
      </motion.p>
    </div>
  )
}