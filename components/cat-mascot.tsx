"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface CatMascotProps {
  message?: string
}

export function CatMascot({ message = "Ready to take some purr-fect notes today?" }: CatMascotProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Animate occasionally to draw attention
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center mb-8">
      <motion.div
        className="bg-pastel-light p-4 rounded-lg mb-4 max-w-md text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isAnimating ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-pastel-secondary">{message}</p>
      </motion.div>

      <motion.div whileHover={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 0.5 }}>
        <div className="relative w-36 h-36 flex items-center justify-center">
          <Image
            src="/cat_face.png"
            alt="Cute cat mascot"
            width={136}
            height={136}
          />
        </div>
      </motion.div>
    </div>
  )
}
