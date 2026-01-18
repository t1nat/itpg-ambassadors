"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect } from "react"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ from, to, duration = 2, className = "" }: AnimatedCounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94]
    })
    return controls.stop
  }, [count, to, duration])

  return <motion.span className={className}>{rounded}</motion.span>
}