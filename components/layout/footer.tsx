"use client";

import "@/lib/i18n/client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Instagram, Facebook, Music } from "lucide-react";

export function Footer() {
  const { t } = useTranslation("common");
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "bg";

  return (
    <footer className="border-t border-border bg-gradient-to-b from-muted/50 to-muted/80 dark:from-background dark:to-card backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 dark:from-primary/10 dark:via-accent/10 dark:to-primary/10" />
      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid gap-12 md:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="mb-6 text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">{t("footer.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("footer.description")}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h3 className="mb-6 text-xl font-semibold text-foreground">{t("footer.contact")}</h3>
            <div className="text-muted-foreground space-y-2">
              <p className="font-medium">ITPG Ambassadors</p>
              <p>sendov.ambassadors@gmail.com</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="mb-6 text-xl font-semibold text-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com/itpg.ambassadors"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl hover:bg-primary/20 dark:hover:bg-primary/30 transition-all duration-300 border border-border"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                href="https://facebook.com/profile.php?id=61582583567160"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl hover:bg-primary/20 dark:hover:bg-primary/30 transition-all duration-300 border border-border"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                href="https://tiktok.com/@itpg.ambassadors"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl hover:bg-primary/20 dark:hover:bg-primary/30 transition-all duration-300 border border-border"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Music className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            </div>
          </motion.div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center">
          <motion.p className="text-muted-foreground" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            &copy; {new Date().getFullYear()} {t("footer.title", "ITPG Ambassadors")}. {t("footer.rights", "All rights reserved.")}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
