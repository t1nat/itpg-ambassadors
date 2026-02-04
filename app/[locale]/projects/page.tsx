"use client"

import '@/lib/i18n/client'
import { useEffect, useState } from "react"
import { fetchProjects } from "@/lib/api-client"
import { ProjectContainer } from "@/components/project-container"
import { useTranslation } from 'react-i18next'
import { motion } from "framer-motion"
import type { Project } from "@/lib/validations"

export default function ProjectsPage() {
  const { t } = useTranslation('common')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data)
      } catch (error) {
        console.error("[v0] Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <motion.div
        className="container mx-auto px-4 py-12"
        initial="hidden"
        animate="visible"
        variants={container}
      >
      <motion.div className="mb-12 text-center" variants={item}>
        <motion.h1 className="mb-4 text-4xl font-bold" variants={item}>{t('projects.title', 'Our Projects')}</motion.h1>
        <motion.p className="mx-auto max-w-2xl text-muted-foreground" variants={item}>
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
    </div>
  )
}
