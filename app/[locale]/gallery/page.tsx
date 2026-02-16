"use client";

import "@/lib/i18n/client";
import { useEffect, useState, useCallback } from "react";
import { fetchProjects } from "@/lib/api-client";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/animations/animated-background";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { Camera, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/hooks";
import type { Project } from "@/lib/validations";

export default function GalleryPage() {
  const { t } = useTranslation("common");
  const { locale, getTranslated } = useLocale();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);

        if (projectId) {
          const found = data.find((p) => p.id === projectId);
          if (found && found.extra_images && found.extra_images.length > 0) {
            setSelectedProject(found);
          }
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [projectId]);

  const projectsWithPhotos = projects.filter(
    (p) => p.extra_images && p.extra_images.length > 0
  );

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">{t("loading", "Loading...")}</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // If a specific project is selected, show its gallery
  if (selectedProject) {
    const title = getTranslated(selectedProject.title);
    const images = selectedProject.extra_images || [];

    return (
      <div className="flex flex-col min-h-screen bg-background font-sans relative overflow-hidden">
        <AnimatedBackground />

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("gallery.backToAll", "Back to all projects")}
            </button>
          </motion.div>

          {/* Project title */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {t("gallery.projectPhotos", "{{count}} photos from this project", { count: images.length })}
            </p>
          </motion.div>

          {/* Photo grid */}
          <motion.div
            className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {images.map((imageUrl, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-lg dark:shadow-primary/5 cursor-pointer hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-500"
                onClick={() => openLightbox(index)}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={imageUrl}
                  alt={`${title} - ${t("gallery.photo", "Photo")} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {lightboxOpen && (
          <GalleryLightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </div>
    );
  }

  // Default: show all projects that have photos
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans relative overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
            {t("gallery.title", "Photo Gallery")}
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t("gallery.description", "Browse photos from our projects and see what our ambassadors have accomplished.")}
          </p>
        </motion.div>

        {projectsWithPhotos.length === 0 ? (
          <motion.div
            className="py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Camera className="h-16 w-16 text-muted-foreground/40 mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">
              {t("gallery.noPhotos", "No photos available yet. Check back soon!")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {projectsWithPhotos.map((project) => {
              const title = getTranslated(project.title);
              const description = getTranslated(project.short_description);
              const photoCount = project.extra_images?.length || 0;

              return (
                <motion.div
                  key={project.id}
                  variants={item}
                  whileHover={{ y: -8 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/80 dark:bg-card/60 shadow-lg dark:shadow-primary/5 backdrop-blur-sm transition-shadow hover:shadow-2xl dark:hover:shadow-primary/10">
                    {/* Cover image - use first extra image or main image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.extra_images?.[0] || project.image_url || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <Camera className="h-4 w-4 text-white" />
                        <span className="text-white text-sm font-medium">
                          {t("gallery.photoCount", "{{count}} photos", { count: photoCount })}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                      {description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
