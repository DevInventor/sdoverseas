"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const words = ["Welcome", "Bienvenue", "Willkommen", "Benvenuto", "Bem-vindo", "ようこそ", "Välkommen", "Добро пожаловать"]

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
}

const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
}

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    if (index === words.length - 1) {
      // Start exit animation after showing the last word
      setTimeout(() => {
        setIsExiting(true)
        // Call onComplete after exit animation
        setTimeout(() => {
          onComplete?.()
        }, 1000)
      }, 1000)
      return
    }

    setTimeout(
      () => {
        setIndex(index + 1)
      },
      index === 0 ? 1000 : 150,
    )
  }, [index, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary z-[99999999999]"
    >
      {dimension.width > 0 && (
        <>
          {/* Spice Icon */}
          <div className="absolute top-8 left-8 z-20">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl">🌶️</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center z-10">
            <motion.p
              variants={opacity}
              initial="initial"
              animate="enter"
              className="flex items-center justify-center text-white text-4xl md:text-5xl lg:text-6xl font-medium mb-4"
            >
              <span className="block w-2.5 h-2.5 bg-white rounded-full mr-2.5"></span>
              {words[index]}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white/80 text-lg md:text-xl font-light"
            >
              Premium Indian Spices for Global Markets
            </motion.div>
          </div>

          {/* Animated SVG Curve */}
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path 
              variants={curve} 
              initial="initial" 
              animate={isExiting ? "exit" : "initial"} 
              fill="#070b13" 
            />
          </svg>

          {/* Spice Icons Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/20 text-6xl"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  rotate: 0
                }}
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.3, 1],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                {['🌶️', '🥄', '🌿', '🍃', '🌶️', '🥄', '🌿', '🍃'][i]}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}
