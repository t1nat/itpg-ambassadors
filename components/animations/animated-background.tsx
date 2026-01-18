"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function AnimatedBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90])
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <div ref={ref} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
        style={{ y: y1, rotate: rotate1, scale: scale1 }}
        animate={{
          x: [0, 50, 0],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-teal-400/8 to-green-400/8 rounded-full blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"
        style={{ y: y3, scale: scale2 }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-indigo-400/8 to-blue-400/8 rounded-full blur-2xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  )
}