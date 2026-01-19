'use client'

import '@/lib/i18n/client'
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { motion } from "framer-motion"

export interface Project {
  id: number
  title: any
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
    <motion.div
      className="relative group overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={project.image_url}
          alt={getTranslatedText(project.title)}
          className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4">
          <button
            onClick={handleVote}
            disabled={voted || loading}
            className={`px-4 py-2 text-white text-sm font-medium rounded-full transition-all duration-300
              ${voted ? "bg-blue-500" : "bg-blue-500 hover:bg-blue-600"}
              ${loading ? "opacity-70 cursor-wait" : ""} transform hover:scale-105`}
          >
            {voted ? t('project.voted', 'Voted') : loading ? t('project.voting', 'Voting...') : t('project.vote', 'Vote')}
          </button>
        </div>
      </div>

      <div className="p-6 relative">
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-4">
            {getTranslatedText(project.title)}
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {getTranslatedText(project.short_description)}
          </p>

          {expanded && (
            <motion.div
              className="text-gray-700 whitespace-pre-line border-t border-gray-100 pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {getTranslatedText(project.long_description)}
            </motion.div>
          )}

          <div className="flex justify-between items-center mt-4">
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{expanded ? t('project.showLess', 'Show Less') : t('project.readMore', 'Read More')}</span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {error && (
          <motion.p
            className="mt-2 text-xs text-red-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}