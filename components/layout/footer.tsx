"use client"

import '@/lib/i18n/client'
import Link from "next/link"
import { useTranslation } from 'react-i18next'
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Instagram, Facebook, Music } from "lucide-react"

export function Footer() {
  const { t } = useTranslation('common')
  const pathname = usePathname()

  const currentLocale = pathname.split('/')[1] || 'bg'

  return (
    <footer className="border-t border-white/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5" />
      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid gap-12 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">{t('footer.title')}</h3>
            <p className="text-blue-100 leading-relaxed">
              {t('footer.description')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-6 text-xl font-semibold text-white">{t('footer.contact')}</h3>
            <div className="text-blue-100 space-y-2">
              <p className="font-medium">ITPG Ambassadors</p>
              <p>sendov.ambassadors@gmail.com</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-6 text-xl font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com/itpg.ambassadors"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-6 h-6 text-blue-100 group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a
                href="https://facebook.com/profile.php?id=61582583567160"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-6 h-6 text-blue-100 group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a
                href="https://tiktok.com/@itpg.ambassadors"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Music className="w-6 h-6 text-blue-100 group-hover:text-white transition-colors" />
              </motion.a>
            </div>
          </motion.div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <motion.p
            className="text-blue-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            &copy; {new Date().getFullYear()} {t('footer.title', 'ITPG Ambassadors')}. {t('footer.rights', 'All rights reserved.')}
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
