"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface CatMascotProps {
  message?: string
}

export function CatMascot({ message = "Meow! Let's take some notes!" }: CatMascotProps) {
  const [catMessage, setCatMessage] = useState(message)
  const [isAnimating, setIsAnimating] = useState(false)

  const encouragements = [
    "You're doing great! Keep those notes coming!",
    "Purr-fect progress on your study notes!",
    "Your knowledge graph is looking paw-some!",
    "Don't fur-get to connect related ideas!",
    "Taking notes is the cat's meow for learning!",
    "You're feline fine with your study progress!",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = encouragements[Math.floor(Math.random() * encouragements.length)]
      setCatMessage(randomMessage)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }, 60000) // Change message every minute

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
        <p className="text-pastel-secondary">{catMessage}</p>
      </motion.div>

      <motion.div whileHover={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 0.5 }}>
        <div className="relative w-32 h-32">
          <Image
            src="/placeholder.svg?height=128&width=128"
            alt="Cute cat mascot"
            width={128}
            height={128}
            className="rounded-full bg-pastel-accent p-2"
          />
        </div>
      </motion.div>
    </div>
  )
}
