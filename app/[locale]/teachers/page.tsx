"use client"

import '@/lib/i18n/client' 
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useTranslation } from 'react-i18next'
import { motion } from "framer-motion"

interface Teacher {
  id: string
  name: any 
  subject: any
  bio: any 
  image_url: string | null
}

export default function TeachersPage() {
  const { t, i18n } = useTranslation('common')
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)

  const currentLang = i18n.language || 'bg'

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true)
        const supabase = createClient()
        const { data, error } = await supabase.from("teachers").select("*")
        
        if (error) throw error

        const rawData = (data || []) as Teacher[]
        
        const sortedData = [...rawData].sort((a, b) => {
          const valA = typeof a.name === 'object' ? (a.name?.[currentLang] || a.name?.['bg'] || "") : (a.name || "")
          const valB = typeof b.name === 'object' ? (b.name?.[currentLang] || b.name?.['bg'] || "") : (b.name || "")
          return String(valA).localeCompare(String(valB), currentLang)
        })
        
        setTeachers(sortedData)
      } catch (err) {
        console.error("Fetch Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTeachers()
  }, [currentLang])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>{t('loading', 'Loading...')}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">
            {t('teachers.title', 'Our Teachers')}
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => {
            const getTranslated = (field: any) => {
              if (!field) return ""
              if (typeof field === 'object') {
                return field[currentLang] || field['bg'] || ""
              }
              return field // Return as is if it's already a string
            }

            const name = getTranslated(teacher.name)
            const subject = getTranslated(teacher.subject)
            const bio = getTranslated(teacher.bio)

            return (
              <motion.div 
                key={teacher.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full overflow-hidden border-0 bg-white/80 shadow-md backdrop-blur-sm rounded-3xl">
                  <div className="relative aspect-square">
                    <Image
                      src={teacher.image_url || "/placeholder.svg"}
                      alt={typeof name === 'string' ? name : "Teacher"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <h3 className="text-2xl font-bold text-slate-800">{name}</h3>
                      {subject && (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
                          {subject}
                        </Badge>
                      )}
                    </div>
                    {bio && (
                      <p className="text-sm leading-relaxed text-slate-600 line-clamp-4">
                        {bio}
                      </p>
                    )}
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