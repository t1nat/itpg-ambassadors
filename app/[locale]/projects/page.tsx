"use client"

import '@/lib/i18n/client' // Initialize i18n before useTranslation
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ProjectContainer, Project } from "@/components/project-container"
import { useTranslation } from 'react-i18next'
import { motion } from "framer-motion"

export default function ProjectsPage() {
  const { t } = useTranslation('common')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createClient()
      const { data: projectsRaw, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching projects:", error)
      } else {
        const mappedProjects: Project[] = (projectsRaw || []).map((p) => ({
          id: p.id,
          title: p.title,
          short_description: p.short_description,
          long_description: p.long_description,
          image_url: p.image_url,
          extra_images: p.extra_images || [],
          created_at: p.created_at,
        }))
        setProjects(mappedProjects)
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>{t('loading', 'Loading...')}</p>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">{t('projects.noProjects', 'No projects found. Please check back later.')}</p>
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
        <motion.h1 className="mb-4 text-4xl font-bold" variants={item}>{t('projects.title', 'Our Projects')}</motion.h1>
        <motion.p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground" variants={item}>
          {t('projects.description', 'Explore the wonderful initiatives created by our ambassadors. Vote for your favorite projects!')}
        </motion.p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projects.map((project, index) => (
          <motion.div key={project.id} variants={item}>
            <ProjectContainer project={project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
