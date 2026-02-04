"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AnimatedBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div ref={ref} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Light mode - softer gradients; Dark mode - glowing blue orbs */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-primary/15 to-chart-2/15 dark:from-primary/25 dark:to-chart-2/25 rounded-full blur-3xl"
        style={{ y: y1, rotate: rotate1, scale: scale1 }}
        animate={{
          x: [0, 50, 0],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-60 h-60 bg-gradient-to-br from-chart-2/12 to-chart-3/12 dark:from-chart-2/20 dark:to-chart-3/20 rounded-full blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/4 w-96 h-96 bg-gradient-to-br from-chart-4/10 to-chart-5/10 dark:from-chart-4/15 dark:to-chart-5/15 rounded-full blur-3xl"
        style={{ y: y3, scale: scale2 }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-primary/12 to-chart-1/12 dark:from-primary/20 dark:to-chart-1/20 rounded-full blur-3xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-br from-chart-3/12 to-chart-2/12 dark:from-chart-3/18 dark:to-chart-2/18 rounded-full blur-3xl"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Large central glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-primary/15 to-chart-1/15 dark:from-primary/25 dark:to-chart-1/25 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-10 right-10 w-56 h-56 bg-gradient-to-br from-primary/10 to-chart-2/10 dark:from-primary/18 dark:to-chart-2/18 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-br from-chart-2/14 to-primary/14 dark:from-chart-2/22 dark:to-primary/22 rounded-full blur-3xl"
        animate={{
          x: [0, -25, 0],
          rotate: [0, 120, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-52 h-52 bg-gradient-to-br from-chart-4/12 to-chart-5/12 dark:from-chart-4/20 dark:to-chart-5/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-primary/14 to-chart-1/14 dark:from-primary/22 dark:to-chart-1/22 rounded-full blur-3xl"
        animate={{
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/2 w-72 h-72 bg-gradient-to-br from-primary/13 to-chart-4/13 dark:from-primary/20 dark:to-chart-4/20 rounded-full blur-3xl"
        animate={{
          x: [0, 20, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-3/4 left-1/2 w-76 h-76 bg-gradient-to-br from-chart-1/15 to-chart-2/15 dark:from-chart-1/24 dark:to-chart-2/24 rounded-full blur-3xl"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 left-3/4 w-64 h-64 bg-gradient-to-br from-chart-4/14 to-chart-5/14 dark:from-chart-4/22 dark:to-chart-5/22 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/6 left-1/2 transform -translate-x-1/2 w-88 h-88 bg-gradient-to-br from-primary/16 to-chart-1/16 dark:from-primary/26 dark:to-chart-1/26 rounded-full blur-3xl"
        animate={{
          rotate: [0, 360, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid pattern - adapts to theme */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
}
