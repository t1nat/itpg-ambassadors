"use client"

import '@/lib/i18n/client' 
import { useEffect, useState } from "react"
import { fetchAmbassadors } from "@/lib/api-client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useTranslation } from 'react-i18next'
import { motion } from "framer-motion"
import type { Ambassador } from "@/lib/validations"

export default function AmbassadorsPage() {
  const { t, i18n } = useTranslation('common')
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([])
  const [loading, setLoading] = useState(true)

  const currentLang = i18n.language || 'bg'

  useEffect(() => {
    const loadAmbassadors = async () => {
      try {
        setLoading(true)
        const data = await fetchAmbassadors()
        
        const sortedData = [...data].sort((a, b) => {
          const valA = a.name?.[currentLang] || a.name?.['bg'] || ""
          const valB = b.name?.[currentLang] || b.name?.['bg'] || ""

          const nameA = typeof valA === 'string' ? valA : String(valA || "")
          const nameB = typeof valB === 'string' ? valB : String(valB || "")

          return nameA.localeCompare(nameB, currentLang)
        })

        setAmbassadors(sortedData)
      } catch (err) {
        console.error("Error fetching ambassadors:", err)
      } finally {
        setLoading(false)
      }
    }

    loadAmbassadors()
  }, [currentLang]) 

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">{t('loading', 'Loading...')}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-12">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">{t('ambassadors.title', 'Our Ambassadors')}</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t('ambassadors.description', 'Meet our team')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ambassadors.map((ambassador) => {
            const getName = () => {
              const val = ambassador.name?.[currentLang] || ambassador.name?.['bg'] || ""
              return typeof val === 'string' ? val : String(val || "")
            }

            const getBio = () => {
              const val = ambassador.bio?.[currentLang] || ambassador.bio?.['bg'] || ""
              return typeof val === 'string' ? val : String(val || "")
            }

            const name = getName()
            const bio = getBio()

            return (
              <motion.div
                key={ambassador.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden rounded-3xl border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-2xl">
                  <div className="relative aspect-square">
                    <Image
                      src={ambassador.image_url || "/placeholder.svg"}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-2xl font-bold text-blue-600">{name}</h3>
                    {bio && <motion.p
                      className="text-sm leading-relaxed text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5 }}
                    >{bio}</motion.p>}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}