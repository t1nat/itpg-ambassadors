"use client";

import "@/lib/i18n/client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { submitVote } from "@/lib/api-client";
import { useLocale } from "@/lib/hooks";
import type { Project } from "@/lib/validations";

export type { Project };

interface ProjectContainerProps {
  project: Project;
}

/**
 * Project card component with voting functionality
 * Displays project information with expandable description and vote button
 */
export function ProjectContainer({ project }: ProjectContainerProps) {
  const { t, getTranslated } = useLocale();
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleVote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await submitVote(project.id);
      setVoted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : t("project.voteError", "Failed to vote. Try again.");
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [project.id, t]);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const title = getTranslated(project.title);
  const shortDescription = getTranslated(project.short_description);
  const longDescription = getTranslated(project.long_description);

  return (
    <motion.div
      className="relative group overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img src={project.image_url ?? "/placeholder.svg"} alt={title} className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4">
          <button
            type="button"
            onClick={handleVote}
            disabled={voted || loading}
            aria-label={voted ? t("project.alreadyVoted", "Already voted") : t("project.voteFor", "Vote for this project")}
            className={`px-4 py-2 text-white text-sm font-medium rounded-full transition-all duration-300
              ${voted ? "bg-green-500 cursor-default" : "bg-blue-500 hover:bg-blue-600"}
              ${loading ? "opacity-70 cursor-wait" : ""} 
              transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300`}
          >
            {voted ? t("project.voted", "Voted") : loading ? t("project.voting", "Voting...") : t("project.vote", "Vote")}
          </button>
        </div>
      </div>

      <div className="p-6 relative">
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-4">{title}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">{shortDescription}</p>

          {expanded && longDescription && (
            <motion.div
              className="text-gray-700 whitespace-pre-line border-t border-gray-100 pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {longDescription}
            </motion.div>
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={toggleExpanded}
              aria-expanded={expanded}
              className="text-blue-500 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
            >
              <span>{expanded ? t("project.showLess", "Show Less") : t("project.readMore", "Read More")}</span>
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }} aria-hidden="true">
                ▼
              </motion.span>
            </button>
          </div>
        </div>

        {error && (
          <motion.p role="alert" className="mt-2 text-xs text-red-500" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
