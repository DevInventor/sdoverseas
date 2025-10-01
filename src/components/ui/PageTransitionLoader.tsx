"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"
import { SpiceLoader } from "./MorphingSquare"
import { cn } from "../../utils/cn"

interface PageTransitionLoaderProps {
  className?: string
  message?: string
  duration?: number
}

export function PageTransitionLoader({ 
  className,
  message = "Loading...",
  duration = 800
}: PageTransitionLoaderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Show loader when route changes
    setIsLoading(true)
    
    // Hide loader after specified duration
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [location.pathname, duration])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
            className
          )}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center space-y-4 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            {/* Spice Loader */}
            <SpiceLoader 
              message={message}
              messagePlacement="bottom"
              spiceType="chili"
              className="w-16 h-16"
            />
            
            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-sm text-gray-600 dark:text-gray-400 font-medium"
            >
              Navigating to your destination...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for manual control of page transitions
export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = () => setIsTransitioning(true)
  const endTransition = () => setIsTransitioning(false)

  return {
    isTransitioning,
    startTransition,
    endTransition
  }
}
