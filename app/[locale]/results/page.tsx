"use client";

import "@/lib/i18n/client";
import { useEffect, useState } from "react";
import { fetchVotingResults } from "@/lib/api-client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/animations/animated-background";
import type { ProjectWithVotes } from "@/lib/validations";

export default function ResultsPage() {
  const { t, i18n } = useTranslation("common");
  const [projectsWithVotes, setProjectsWithVotes] = useState<ProjectWithVotes[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentLang = i18n.language || "bg";

  useEffect(() => {
    const loadResults = async () => {
      try {
        const results = await fetchVotingResults();
        setProjectsWithVotes(results.projects);
        setTotalVotes(results.total_votes);
      } catch (error) {
        console.error("[v0] Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Badge className="bg-blue-600 text-white hover:bg-blue-700">{t("results.firstPlace", "1st Place")}</Badge>;
      case 1:
        return <Badge className="bg-cyan-600 text-white hover:bg-cyan-700">{t("results.secondPlace", "2nd Place")}</Badge>;
      case 2:
        return <Badge className="bg-teal-600 text-white hover:bg-teal-700">{t("results.thirdPlace", "3rd Place")}</Badge>;
      default:
        return <Badge variant="secondary">#{index + 1}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>{t("loading", "Loading...")}</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans relative overflow-hidden">
      <AnimatedBackground />
      <section className="relative py-32 px-6 z-10">
        <motion.div className="container mx-auto">
          <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="mb-4 text-4xl font-bold">{t("results.title", "Voting Results")}</h1>
            <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
              {t("results.description", "See which projects are leading the vote! Total votes cast:")} <span className="font-semibold">{totalVotes}</span>
            </p>
          </motion.div>

          {projectsWithVotes.length > 0 ? (
            <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {projectsWithVotes.map((project, index) => {
                const getTitle = () => {
                  const val = (project.title as any)?.[currentLang] || (project.title as any)?.["bg"] || "";
                  return typeof val === "string" ? val : String(val || "");
                };

                const getDescription = () => {
                  const val = (project.description as any)?.[currentLang] || (project.description as any)?.["bg"] || "";
                  return typeof val === "string" ? val : String(val || "");
                };

                const title = getTitle();
                const description = getDescription();

                const getLongDescription = () => {
                  const val = (project.long_description as any)?.[currentLang] || (project.long_description as any)?.["bg"] || "";
                  return typeof val === "string" ? val : String(val || "");
                };

                const longDescription = getLongDescription();

                return (
                  <motion.div key={project.id} variants={item}>
                    <Card className={`overflow-hidden rounded-3xl border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-2xl ${index < 3 ? "border-2 border-primary/20" : ""}`}>
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image src={project.image_url || "/placeholder.svg?height=200&width=300"} alt={title} fill className="object-cover" />
                        <div className="absolute top-4 left-4">{getRankIcon(index)}</div>
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-semibold">{title}</h3>
                          {getRankBadge(index)}
                          {project.year && <Badge variant="outline">{project.year}</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{description}</p>
                        <motion.div initial={{ opacity: 0, height: 0 }} whileHover={{ opacity: 1, height: "auto" }} className="overflow-hidden">
                          {longDescription && <p className="text-sm text-muted-foreground mb-4">{longDescription}</p>}
                        </motion.div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">{project.vote_count}</span>
                            <span className="text-sm text-muted-foreground">{project.vote_count === 1 ? t("results.vote", "vote") : t("results.votes", "votes")}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">{t("results.noResults", "No voting results available yet.")}</p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
