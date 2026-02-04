"use client";

import "@/lib/i18n/client";
import { useEffect, useState } from "react";
import { fetchTeachers } from "@/lib/api-client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Teacher } from "@/lib/validations";

export default function TeachersPage() {
  const { t, i18n } = useTranslation("common");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const currentLang = i18n.language || "bg";

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        setLoading(true);
        const data = await fetchTeachers();

        const sortedData = [...data].sort((a, b) => {
          const valA = typeof a.name === "object" ? a.name?.[currentLang] || a.name?.["bg"] || "" : a.name || "";
          const valB = typeof b.name === "object" ? b.name?.[currentLang] || b.name?.["bg"] || "" : b.name || "";
          return String(valA).localeCompare(String(valB), currentLang);
        });

        setTeachers(sortedData);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTeachers();
  }, [currentLang]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>{t("loading", "Loading...")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">{t("teachers.title", "Our Teachers")}</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => {
            const getTranslated = (field: any) => {
              if (!field) return "";
              if (typeof field === "object") {
                return field[currentLang] || field["bg"] || "";
              }
              return field; // Return as is if it's already a string
            };

            const name = getTranslated(teacher.name);
            const subject = getTranslated(teacher.subject);
            const bio = getTranslated(teacher.bio);

            return (
              <motion.div key={teacher.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }}>
                <Card className="h-full overflow-hidden border border-border bg-card/80 dark:bg-card/60 shadow-md dark:shadow-primary/5 backdrop-blur-sm rounded-3xl">
                  <div className="relative aspect-square">
                    <Image src={teacher.image_url || "/placeholder.svg"} alt={typeof name === "string" ? name : "Teacher"} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <h3 className="text-2xl font-bold text-foreground">{name}</h3>
                      {subject && <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-3 py-1">{subject}</Badge>}
                    </div>
                    {bio && <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">{bio}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
