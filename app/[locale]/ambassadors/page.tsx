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
        setAmbassadors(data || [])
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
          <motion.div key={ambassador.id} variants={item}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-square">
                <Image
                  src={ambassador.image_url || "/placeholder.svg"}
                  alt={ambassador.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{ambassador.name}</h3>
                {ambassador.bio && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {/* Dynamic translation from JSONB or static key fallback */}
                    {typeof ambassador.bio === 'object'
                      ? (ambassador.bio[currentLang] || ambassador.bio['bg'])
                      : t(`ambassadors.bios.${ambassador.name}`, ambassador.bio)}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}