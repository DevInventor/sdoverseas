"use client"

import { cva } from "class-variance-authority"
import { HTMLMotionProps, motion } from "framer-motion"
import { cn } from "../../utils/cn"

const spiceLoaderVariants = cva("flex gap-2 items-center justify-center", {
  variants: {
    messagePlacement: {
      bottom: "flex-col",
      top: "flex-col-reverse",
      right: "flex-row",
      left: "flex-row-reverse",
    },
  },
  defaultVariants: {
    messagePlacement: "bottom",
  },
})

export interface SpiceLoaderProps {
  message?: string
  /**
   * Position of the message relative to the spinner.
   * @default bottom
   */
  messagePlacement?: "top" | "bottom" | "left" | "right"
  spiceType?: "chili" | "cumin" | "turmeric" | "cardamom"
}

export function SpiceLoader({
  className,
  message,
  messagePlacement = "bottom",
  spiceType = "chili",
  ...props
}: HTMLMotionProps<"div"> & SpiceLoaderProps) {
  const spiceEmojis = {
    chili: "🌶️",
    cumin: "🥄",
    turmeric: "🌿",
    cardamom: "🍃"
  }

  return (
    <div className={cn(spiceLoaderVariants({ messagePlacement }))}>
      <motion.div
        className={cn("w-12 h-12 flex items-center justify-center text-3xl", className)}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        {...props}
      >
        <motion.span
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {spiceEmojis[spiceType]}
        </motion.span>
      </motion.div>
      {message && <div className="text-sm text-gray-600 dark:text-gray-400">{message}</div>}
    </div>
  )
}

// Keep the old name for backward compatibility
export const MorphingSquare = SpiceLoader
