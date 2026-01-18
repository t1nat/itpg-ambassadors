'use client'

import '@/lib/i18n/client' // Initialize i18n before useTranslation
import { useState } from "react"
import { useTranslation } from 'react-i18next'

export interface Project {
  id: number
  title: any // Changed to any to handle JSON
  short_description: any 
  long_description: any
  image_url: string
  extra_images: string[]
}

interface ProjectContainerProps {
  project: Project
}

export function ProjectContainer({ project }: ProjectContainerProps) {
  const { t, i18n } = useTranslation('common')
  const [voted, setVoted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [expanded, setExpanded] = useState(false) 

  // Helper to pick the correct language from JSON
  const getTranslatedText = (field: any) => {
    const lang = i18n.language || 'bg'
    if (field && typeof field === 'object') {
      return field[lang] || field['bg'] || Object.values(field)[0]
    }
    return field // Fallback if it's still a string
  }

  async function handleVote() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong")
      } else {
        setVoted(true)
      }
    } catch (err) {
      setError(t('project.voteError', 'Failed to vote. Try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative group border border-gray-200 rounded-2xl p-4 shadow-md bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:via-blue-50 hover:to-white">
      <div className="absolute -z-10 top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-20 bg-blue-200 blur-3xl transition-opacity duration-500 pointer-events-none"></div>

      <div className="overflow-hidden rounded-xl">
        <img
          src={project.image_url}
          alt={getTranslatedText(project.title)}
          className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{getTranslatedText(project.title)}</h2>
          <p className="text-sm text-gray-600">{getTranslatedText(project.short_description)}</p>
        </div>

        <button
          onClick={handleVote}
          disabled={voted || loading}
          className={`ml-4 px-3 py-1 rounded-full text-white text-sm font-semibold transition-all duration-500
            ${voted ? "bg-green-500 scale-105 shadow-md" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}
            ${loading ? "opacity-70 cursor-wait" : ""}`}
        >
          {voted ? t('project.voted', 'Voted ✅') : loading ? t('project.voting', 'Voting...') : t('project.vote', 'Vote')}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 text-gray-700 whitespace-pre-line animate-fadeIn border-t border-gray-100 pt-3">
          {getTranslatedText(project.long_description)}
        </div>
      )}

      <div className="mt-3 text-right">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-500 hover:underline font-medium"
        >
          {expanded ? t('project.showLess', 'Show Less ▲') : t('project.readMore', 'Read More ▼')}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500 animate-pulse">{error}</p>
      )}
    </div>
  )
}