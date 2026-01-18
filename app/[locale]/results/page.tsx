"use client"

import '@/lib/i18n/client' // Initialize i18n before useTranslation
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"
import Image from "next/image"
import { useTranslation } from 'react-i18next'

interface ProjectWithVotes {
  id: string
  title: string
  description: string
  image_url: string | null
  year: string | null
  voteCount: number
}

export default function ResultsPage() {
  const { t } = useTranslation('common')
  const [projectsWithVotes, setProjectsWithVotes] = useState<ProjectWithVotes[]>([])
  const [totalVotes, setTotalVotes] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      const supabase = createClient()

      // Get all projects
      const { data: projects, error: projectsError } = await supabase.from("projects").select("*")

      if (projectsError) {
        console.error("[v0] Error fetching projects:", projectsError)
        setLoading(false)
        return
      }

      // Get vote counts
      const { data: votes, error: votesError } = await supabase.from("votes").select("project_id")

      if (votesError) {
        console.error("[v0] Error fetching votes:", votesError)
        setLoading(false)
        return
      }

      // Count votes per project
      const voteCountMap = new Map<string, number>()
      if (votes) {
        votes.forEach((vote) => {
          const count = voteCountMap.get(vote.project_id) || 0
          voteCountMap.set(vote.project_id, count + 1)
        })
      }

      // Combine projects with vote counts and sort
      const projectsWithVotesData: ProjectWithVotes[] =
        projects?.map((project) => ({
          ...project,
          voteCount: voteCountMap.get(project.id) || 0,
        })) || []

      projectsWithVotesData.sort((a, b) => b.voteCount - a.voteCount)

      setProjectsWithVotes(projectsWithVotesData)
      setTotalVotes(votes?.length || 0)
      setLoading(false)
    }
    fetchResults()
  }, [])

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return null
    }
  }

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">{t('results.firstPlace', '1st Place')}</Badge>
      case 1:
        return <Badge className="bg-gray-400 text-white hover:bg-gray-500">{t('results.secondPlace', '2nd Place')}</Badge>
      case 2:
        return <Badge className="bg-amber-600 text-white hover:bg-amber-700">{t('results.thirdPlace', '3rd Place')}</Badge>
      default:
        return <Badge variant="secondary">#{index + 1}</Badge>
    }
  }

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
        <h1 className="mb-4 text-4xl font-bold">{t('results.title', 'Voting Results')}</h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
          {t('results.description', 'See which projects are leading the vote! Total votes cast:')} <span className="font-semibold">{totalVotes}</span>
        </p>
      </div>

      {projectsWithVotes.length > 0 ? (
        <div className="mx-auto max-w-4xl space-y-6">
          {projectsWithVotes.map((project, index) => (
            <Card key={project.id} className={`overflow-hidden ${index < 3 ? "border-2" : ""}`}>
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                    {getRankIcon(index) || (
                      <span className="text-2xl font-bold text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={project.image_url || "/placeholder.svg?height=200&width=300"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {getRankBadge(index)}
                    {project.year && <Badge variant="outline">{project.year}</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
                <div className="flex shrink-0 flex-col items-center gap-1 rounded-lg bg-primary/10 px-6 py-4">
                  <span className="text-3xl font-bold text-primary">{project.voteCount}</span>
                  <span className="text-xs text-muted-foreground">{project.voteCount === 1 ? t('results.vote', 'vote') : t('results.votes', 'votes')}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">{t('results.noResults', 'No voting results available yet.')}</p>
        </div>
      )}
    </div>
  )
}
