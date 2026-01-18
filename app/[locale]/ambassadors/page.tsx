"use client"

import '@/lib/i18n/client' // Initialize i18n before useTranslation
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useTranslation } from 'react-i18next'
import { motion } from "framer-motion"

interface Ambassador {
  id: string
  name: string
  bio: any // Changed to any for JSON support
  image_url: string | null
}

export default function AmbassadorsPage() {
  const { t, i18n } = useTranslation('common')
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([])
  const [loading, setLoading] = useState(true)

  const currentLang = i18n.language || 'bg'

  useEffect(() => {
    const fetchAmbassadors = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("ambassadors").select("*")
      if (error) {
        console.error("Error fetching ambassadors:", error)
      } else {
        setAmbassadors((data || []).sort((a, b) => a.name.localeCompare(b.name)))
      }
      setLoading(false)
    }
    fetchAmbassadors()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>{t('loading', 'Loading...')}</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <motion.div
        className="container mx-auto px-4 py-12"
        initial="hidden"
        animate="visible"
        variants={container}
      >
      <motion.div className="mb-12 text-center" variants={item}>
        <motion.h1 className="mb-4 text-4xl font-bold" variants={item}>{t('ambassadors.title', 'Our Ambassadors')}</motion.h1>
        <motion.p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground" variants={item}>
          {t('ambassadors.description', 'Meet our ambassadors...')}
        </motion.p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {ambassadors.map((ambassador) => (
          <motion.div
            key={ambassador.id}
            variants={item}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 group rounded-3xl">
              <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                <Image
                  src={ambassador.image_url || "/placeholder.svg"}
                  alt={ambassador.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <CardContent className="pt-6 px-6 pb-6">
                <motion.h3
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {ambassador.name}
                </motion.h3>
                {ambassador.bio && (
                  <motion.p
                    className="text-muted-foreground leading-relaxed text-sm"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Dynamic translation from JSONB or static key fallback */}
                    {typeof ambassador.bio === 'object'
                      ? (ambassador.bio[currentLang] || ambassador.bio['bg'])
                      : t(`ambassadors.bios.${ambassador.name}`, ambassador.bio)}
                  </motion.p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    </div>
  )
}