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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <motion.div
        className="container mx-auto px-4 py-12"
        initial="hidden"
        animate="visible"
        variants={container}
      >
      <motion.div className="mb-12 text-center" variants={item}>
        <motion.h1
          className="mb-4 text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-teal-600 bg-clip-text text-transparent"
          variants={item}
        >
          {t('teachers.title', 'Our Teachers')}
        </motion.h1>
        <motion.p
          className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground"
          variants={item}
        >
          {t('teachers.description', 'The dedicated educators guiding and mentoring our ambassadors through their journey of European cooperation and cultural exchange.')}
        </motion.p>
      </motion.div>

      {teachers && teachers.length > 0 ? (
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          {teachers.map((teacher: Teacher) => (
            <motion.div key={teacher.id} variants={item} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 group rounded-3xl">
                <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                  <Image
                    src={teacher.image_url || "/placeholder.svg?height=400&width=400"}
                    alt={teacher.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="pt-6 px-6 pb-6">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <motion.h3
                      className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {teacher.name}
                    </motion.h3>
                    {teacher.subject && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        {teacher.subject}
                      </Badge>
                    )}
                  </div>
                  {teacher.bio && (
                    <motion.p
                      className="text-muted-foreground leading-relaxed text-sm"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {teacher.bio}
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="py-12 text-center"
          variants={item}
        >
          <p className="text-muted-foreground">{t('teachers.noTeachers', 'No teachers found. Please check back later.')}</p>
        </motion.div>
      )}
    </motion.div>
    </div>
  )
}
