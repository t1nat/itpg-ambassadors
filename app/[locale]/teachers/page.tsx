"use client"

import '@/lib/i18n/client' // Initialize i18n before useTranslation
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useTranslation } from 'react-i18next'

interface Teacher {
  id: string
  name: string
  subject: string | null
  bio: string | null
  image_url: string | null
}

export default function TeachersPage() {
  const { t } = useTranslation('common')
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeachers = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("teachers").select("*").order("name", { ascending: true })
      if (error) {
        console.error("[v0] Error fetching teachers:", error)
      } else {
        setTeachers(data || [])
      }
      setLoading(false)
    }
    fetchTeachers()
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
        <h1 className="mb-4 text-4xl font-bold">{t('teachers.title', 'Our Teachers')}</h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
          {t('teachers.description', 'The dedicated educators guiding and mentoring our ambassadors through their journey of European cooperation and cultural exchange.')}
        </p>
      </div>

      {teachers && teachers.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher: Teacher) => (
            <Card key={teacher.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={teacher.image_url || "/placeholder.svg?height=400&width=400"}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-xl font-semibold">{teacher.name}</h3>
                  {teacher.subject && <Badge variant="secondary">{teacher.subject}</Badge>}
                </div>
                {teacher.bio && <p className="text-sm text-muted-foreground leading-relaxed">{teacher.bio}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">{t('teachers.noTeachers', 'No teachers found. Please check back later.')}</p>
        </div>
      )}
    </div>
  )
}
