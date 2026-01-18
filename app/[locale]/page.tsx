"use client"

import '@/lib/i18n/client' // Initialize i18n before useTranslation
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, GraduationCap, Lightbulb, Award } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function HomePage() {
  const { t, i18n } = useTranslation('common')
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Извличаме текущия език от URL
  const currentLocale = pathname.split('/')[1] || 'bg'

  // Синхронизираме i18next при зареждане
  useEffect(() => {
    setMounted(true)
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale)
    }
  }, [currentLocale, i18n])

  // Предотвратяваме Hydration Mismatch
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative py-32 px-6 flex flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="relative z-10">
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent"
            variants={fadeUp}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-black mb-12 max-w-3xl leading-relaxed"
            variants={fadeUp}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-6 justify-center"
            variants={fadeUp}
          >
            {/* ВАЖНО: Добавен currentLocale в пътищата */}
            <Button asChild size="lg">
              <Link href={`/${currentLocale}/projects`}>{t('hero.viewProjects')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${currentLocale}/ambassadors`}>{t('hero.meetTeam')}</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section className="py-20 relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="group relative rounded-3xl p-8 text-center backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105"
                variants={fadeUp}
              >
                <div className="relative z-10">
                  <div className="text-5xl font-bold text-black mb-3 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{stat.number}</div>
                  <div className="text-sm text-black font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="py-24 relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <div className="container mx-auto px-4">
          <motion.div className="mb-16 text-center" variants={staggerContainer}>
            <motion.h2 className="text-4xl md:text-5xl font-bold text-black mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent" variants={fadeUp}>{t('features.title')}</motion.h2>
            <motion.p className="text-xl text-black max-w-2xl mx-auto leading-relaxed" variants={fadeUp}>{t('features.subtitle')}</motion.p>
          </motion.div>

          <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" variants={staggerContainer}>
            {features.map((feature, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="group relative rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-xl bg-white/10 border border-white/20 overflow-hidden">
                  <CardContent className="pt-8 relative z-10">
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
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative py-24 text-center rounded-3xl mx-4 mb-20 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-blue-600/20 rounded-3xl"></div>
        <div className="relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            variants={fadeUp}
          >
            {t('cta.title')}
          </motion.h2>
          <motion.p
            className="mb-10 text-xl text-black max-w-3xl mx-auto leading-relaxed"
            variants={fadeUp}
          >
            {t('cta.subtitle')}
          </motion.p>
          <motion.div variants={fadeUp}>
            {/* ВАЖНО: Добавен currentLocale */}
            <Button asChild size="lg">
              <Link href={`/${currentLocale}/projects`}>{t('cta.voteNow')}</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}