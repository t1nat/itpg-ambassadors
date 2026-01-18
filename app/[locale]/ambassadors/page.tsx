"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useTranslation } from 'react-i18next'

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">{t('ambassadors.title', 'Our Ambassadors')}</h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
          {t('ambassadors.description', 'Meet our ambassadors...')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {ambassadors.map((ambassador) => (
          <Card key={ambassador.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={ambassador.image_url || "/placeholder.svg"}
                alt={ambassador.name}
                fill
                className="object-cover"
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
        ))}
      </div>
    </div>
  )
}