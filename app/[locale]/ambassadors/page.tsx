"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useTranslation } from 'react-i18next'

interface Ambassador {
  id: string
  name: string
  bio: string | null
  image_url: string | null
}

export default function AmbassadorsPage() {
  const { t } = useTranslation('common')
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAmbassadors = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("ambassadors").select("*")
      if (error) {
        console.error("[v0] Error fetching ambassadors:", error)
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
          {t('ambassadors.description', 'Meet our ambassadors who inspire and lead the way to a better future through their initiatives and engagement.')}
        </p>
      </div>

      {ambassadors && ambassadors.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ambassadors.map((ambassador: Ambassador) => (
            <Card key={ambassador.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={ambassador.image_url || "/placeholder.svg?height=400&width=400"}
                  alt={ambassador.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-xl font-semibold">{ambassador.name}</h3>
                </div>
                {ambassador.bio && <p className="text-sm text-muted-foreground leading-relaxed">{ambassador.bio}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">{t('ambassadors.noAmbassadors', 'No ambassadors found. Please check back later.')}</p>
        </div>
      )}
    </div>
  )
}
