"use client"

import '@/lib/i18n/client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, GraduationCap, Lightbulb, Award } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { AnimatedBackground } from "@/components/animations/animated-background"
import { AnimatedCounter } from "@/components/animations/animated-counter"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function HomePage() {
  const { t, i18n } = useTranslation('common')
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const currentLocale = pathname.split('/')[1] || 'bg'

  useEffect(() => {
    setMounted(true)
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale)
    }
  }, [currentLocale, i18n])

  if (!mounted) return null

  const stats = [
    { number: "15", label: t('stats.ambassadors') },
    { number: "16", label: t('stats.countries') },
    { number: "1", label: t('stats.completedProjects') },
    { number: "500+", label: t('stats.engagedStudents') },
  ]

  const features = [
    { icon: <Users className="h-6 w-6 text-[#306FEC]" />, title: t('features.knowledge'), description: t('features.knowledgeDesc') },
    { icon: <GraduationCap className="h-6 w-6 text-[#8FCEC7]" />, title: t('features.education'), description: t('features.educationDesc') },
    { icon: <Lightbulb className="h-6 w-6 text-[#B3E1F3]" />, title: t('features.innovation'), description: t('features.innovationDesc') },
    { icon: <Award className="h-6 w-6 text-[#306FEC]" />, title: t('features.sustainability'), description: t('features.sustainabilityDesc') },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans relative overflow-hidden">
      <AnimatedBackground />

      {/* Hero Section */}
      <motion.section
        className="relative py-32 px-6 flex flex-col items-center text-center z-10"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {t('hero.title').split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-black mb-12 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button asChild size="lg">
            <Link href={`/${currentLocale}/projects`}>{t('hero.viewProjects')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/${currentLocale}/ambassadors`}>{t('hero.meetTeam')}</Link>
          </Button>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid gap-8 md:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="group relative rounded-3xl p-8 text-center bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
                variants={fadeUp}
              >
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  <AnimatedCounter from={0} to={parseInt(stat.number.replace('+', ''))} />
                  {stat.number.includes('+') && '+'}
                </div>
                <div className="text-sm text-black font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              {t('features.title')}
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto leading-relaxed">
              {t('features.subtitle')}
            </p>
          </div>

          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="group relative rounded-3xl shadow-lg transition-all duration-500 hover:scale-105 bg-white border border-gray-200 overflow-hidden h-full">
                  <CardContent className="pt-8">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 border border-blue-200 mx-auto">
                      <div className="text-blue-600 group-hover:text-cyan-600 transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-3 text-center">{feature.title}</h3>
                    <p className="text-sm text-black text-center leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Background, border, and animations removed */}
      <section className="relative py-32 text-center z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            {t('cta.title')}
          </h2>
          <p className="mb-10 text-xl text-black max-w-3xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <Button asChild size="lg">
            <Link href={`/${currentLocale}/projects`}>{t('cta.voteNow')}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}