"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"

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

const fadeInScale = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const spiceAnimation = {
  initial: {
    opacity: 0,
    scale: 0.5,
    rotate: -180,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { t, language } = useLanguage()
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)
  const [selectedSpices, setSelectedSpices] = useState<string[]>([])

  // Get configuration from context with language-specific access
  const welcomeMessagesConfig = t('preloader.welcomeMessages') || {}
  const brandingConfig = t('preloader.branding') || {}
  const spices = Array.isArray(t('preloader.spices')) ? t('preloader.spices') : []
  const cornerSpices = Array.isArray(t('preloader.cornerSpices')) ? t('preloader.cornerSpices') : []
  const animations = t('preloader.animations') || {}

  // Extract language-specific content
  const welcomeMessages = Array.isArray(welcomeMessagesConfig[language]) ? 
    welcomeMessagesConfig[language] : 
    (Array.isArray(welcomeMessagesConfig['eng']) ? welcomeMessagesConfig['eng'] : ['Welcome', 'स्वागत है', 'Bienvenue', 'Willkommen'])
  
  const branding = brandingConfig[language] || brandingConfig['eng'] || {}

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    // Randomly select spices to display from config
    if (Array.isArray(spices) && spices.length > 0) {
      const shuffled = [...spices].sort(() => 0.5 - Math.random())
      setSelectedSpices(shuffled.slice(0, 8).map(s => s.icon))
    }
  }, [spices, language])

  useEffect(() => {
    if (index === welcomeMessages.length - 1) {
      // Start exit animation after showing the last word
      setTimeout(() => {
        setIsExiting(true)
        // Call onComplete after exit animation
        setTimeout(() => {
          onComplete?.()
        }, 1000)
      }, 2000)
      return
    }

    setTimeout(
      () => {
        setIndex(index + 1)
      },
      index === 0 ? 2000 : 800,
    )
  }, [index, onComplete, welcomeMessages.length])

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

  // Don't render until we have at least basic config
  if (!Array.isArray(welcomeMessages) || welcomeMessages.length === 0) {
    return (
      <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-orange-800 to-red-900 z-[99999999999] overflow-hidden">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-orange-800 to-red-900 z-[99999999999] overflow-hidden"
    >
      {dimension.width > 0 && (
        <>
          {/* Logo Section */}
          <div className="absolute top-8 left-8 z-20">
            <motion.div 
              variants={fadeInScale}
              initial="initial"
              animate="enter"
              className="flex items-center space-x-3"
            >
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm">
                <span className="text-3xl">🌶️</span>
              </div>
              <div className="text-white">
                <div className="text-xl font-bold tracking-wide">{branding.companyName || 'SD Overseas'}</div>
                <div className="text-sm opacity-80">{branding.tagline || 'Premium Spices'}</div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="text-center z-10 px-4">
            <motion.div
              variants={fadeInScale}
              initial="initial"
              animate="enter"
              className="mb-8"
            >
              {/* Welcome text without circular ring */}
              <motion.p
                variants={opacity}
                initial="initial"
                animate="enter"
                className="flex items-center justify-center text-white text-4xl md:text-5xl lg:text-6xl font-bold"
              >
                <span className="block w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse"></span>
                {welcomeMessages[index] || 'Welcome'}
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="text-white text-lg md:text-xl font-light">
                {branding.mainMessage || 'Premium Indian Spices for Global Markets'}
              </div>
              <div className="text-yellow-200 text-sm md:text-base opacity-80 flex items-center justify-center space-x-2">
                <span>{branding.subMessage || 'Connecting the world with authentic Indian flavors'}</span>
                <span className="text-orange-300">🌶️</span>
              </div>
            </motion.div>
          </div>

          {/* Animated SVG Curve */}
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path 
              variants={curve} 
              initial="initial" 
              animate={isExiting ? "exit" : "initial"} 
              fill="#100D13" 
            />
          </svg>

          {/* Corner Spice Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {(Array.isArray(cornerSpices) ? cornerSpices : []).map((spice: any, i: number) => {
              const size = spice.size || 12
              const iconSize = size <= 8 ? 'text-sm' : size <= 10 ? 'text-base' : size <= 12 ? 'text-lg' : 'text-xl'
              
              const positionClasses = {
                'top-right': 'top-12 right-12',
                'top-right-secondary': 'top-32 right-8',
                'bottom-left': 'bottom-20 left-12',
                'bottom-right': 'bottom-32 right-20'
              }
              
              return (
                <motion.div 
                  key={i}
                  className={`absolute ${positionClasses[spice.position as keyof typeof positionClasses] || 'top-12 right-12'} w-${size} h-${size} bg-gradient-to-br ${spice.color} rounded-full flex items-center justify-center shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: spice.delay || 0.5, 
                    duration: 0.8, 
                    ease: "backOut" 
                  }}
                >
                  <span className={iconSize}>{spice.icon}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Enhanced Spice Icons Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(animations?.floatingSpices?.count || 12)].map((_, i) => {
              const opacityVariations = animations?.floatingSpices?.opacityVariations || [
                'text-white/30',
                'text-orange-300/25', 
                'text-yellow-300/25'
              ]
              
              return (
                <motion.div
                  key={i}
                  className={`absolute text-4xl md:text-5xl lg:text-6xl ${
                    opacityVariations[i % opacityVariations.length]
                  }`}
                  variants={spiceAnimation}
                  initial="initial"
                  animate="animate"
                  transition={{
                    delay: 0.2 + (i * 0.2) + Math.random() * 0.5,
                    duration: (animations?.floatingSpices?.baseDuration || 6) + Math.random() * (animations?.floatingSpices?.variationRange || 0),
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    x: Math.random() * (dimension.width - 100),
                    y: Math.random() * (dimension.height - 100),
                    rotate: Math.random() * 360
                  }}
                >
                  {selectedSpices[i] || (Array.isArray(spices) && spices.length > 0 ? spices[i % spices.length]?.icon : '🌶️')}
                </motion.div>
              )
            })}
            
            {/* Additional floating elements */}
            {(Array.isArray(animations?.mainSpices) ? animations.mainSpices : []).map((spice: any, i: number) => (
              <motion.div
                key={`main-spice-${i}`}
                className={`absolute ${spice.color} text-${spice.size}xl`}
                initial={{ 
                  x: dimension.width * spice.path[0].x,
                  y: dimension.height * spice.path[0].y,
                  scale: 0.3
                }}
                animate={{ 
                  x: dimension.width * spice.path[1].x,
                  y: dimension.height * spice.path[1].y,
                  scale: [0.3, 1.2, 0.3],
                  rotate: spice.icon === '🍯' ? [360, 180, 0] : [0, 180, 360]
                }}
                transition={{
                  duration: spice.duration || 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: spice.delay || 0
                }}
              >
                {spice.icon}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}
