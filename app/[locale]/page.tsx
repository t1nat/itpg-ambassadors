"use client";

import "@/lib/i18n/client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, Lightbulb, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { AnimatedBackground } from "@/components/animations/animated-background";
import { AnimatedCounter } from "@/components/animations/animated-counter";

export default function HomePage() {
  const { t, i18n } = useTranslation("common");
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 50, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const currentLocale = pathname.split("/")[1] || "bg";

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale, i18n]);

  if (!mounted) return null;

  const stats = [
    { number: "15", label: t("stats.ambassadors") },
    { number: "16", label: t("stats.countries") },
    { number: "1", label: t("stats.completedProjects") },
    { number: "500+", label: t("stats.engagedStudents") },
  ];

  const features = [
    { icon: <Users className="h-6 w-6 text-[#306FEC]" />, title: t("features.knowledge"), description: t("features.knowledgeDesc") },
    { icon: <GraduationCap className="h-6 w-6 text-[#8FCEC7]" />, title: t("features.education"), description: t("features.educationDesc") },
    { icon: <Lightbulb className="h-6 w-6 text-[#B3E1F3]" />, title: t("features.innovation"), description: t("features.innovationDesc") },
    { icon: <Award className="h-6 w-6 text-[#306FEC]" />, title: t("features.sustainability"), description: t("features.sustainabilityDesc") },
  ];

  const heroTitleWords = t("hero.title").split(" ");

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans relative overflow-hidden">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative py-32 px-6 flex flex-col items-center text-center z-10">
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {heroTitleWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button asChild size="lg">
            <Link href={`/${currentLocale}/projects`}>{t("hero.viewProjects")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/${currentLocale}/ambassadors`}>{t("hero.meetTeam")}</Link>
          </Button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div className="grid gap-8 md:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3, margin: "100px" }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="group relative rounded-3xl p-8 text-center bg-card border border-border shadow-lg hover:shadow-xl dark:shadow-primary/5 dark:hover:shadow-primary/10 transition-all duration-500 hover:scale-105"
                variants={fadeUp}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  <AnimatedCounter from={0} to={parseInt(stat.number.replace("+", ""))} />
                  {stat.number.includes("+") && "+"}
                </div>
                <div className="text-sm text-foreground/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div className="mb-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3, margin: "100px" }} variants={fadeUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">{t("features.title")}</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">{t("features.subtitle")}</p>
          </motion.div>

          <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1, margin: "50px" }} variants={staggerContainer}>
            {features.map((feature, i) => (
              <motion.div key={i} variants={i < 2 ? slideFromLeft : slideFromRight} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.6 }}>
                <Card className="group relative rounded-3xl shadow-lg dark:shadow-primary/5 transition-all duration-500 hover:scale-105 bg-card border border-border overflow-hidden h-full">
                  <CardContent className="pt-8">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-chart-2/20 dark:from-primary/30 dark:to-chart-2/30 border border-primary/20 mx-auto">
                      <div className="text-primary group-hover:text-chart-2 transition-colors duration-300">{feature.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 text-center">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 text-center z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3, margin: "100px" }}
            variants={fadeUp}
          >
            {t("cta.title")}
          </motion.h2>

          <motion.p
            className="mb-10 text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3, margin: "100px" }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            {t("cta.subtitle")}
          </motion.p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3, margin: "100px" }} variants={fadeUp} transition={{ delay: 0.4 }}>
            <Button asChild size="lg">
              <Link href={`/${currentLocale}/projects`}>{t("cta.voteNow")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
