"use client"

import '@/lib/i18n/client' // Initialize i18n before useTranslation
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ProjectContainer, Project } from "@/components/project-container"
import { useTranslation } from 'react-i18next'

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">{t('projects.title', 'Our Projects')}</h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
          {t('projects.description', 'Explore the wonderful initiatives created by our ambassadors. Vote for your favorite projects!')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectContainer key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
