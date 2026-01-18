"use client"

import '@/lib/i18n/client' // Initialize i18n before useTranslation
import Link from "next/link"
import { useTranslation } from 'react-i18next'
import { usePathname } from "next/navigation"

export function Footer() {
  const { t } = useTranslation('common')
  const pathname = usePathname()
  
  // Използваме URL за определяне на текущия език за линковете във футъра, ако има такива
  const currentLocale = pathname.split('/')[1] || 'bg'

  return (
    <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">{t('footer.title')}</h3>
            <p className="text-sm text-blue-100">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">{t('footer.contact')}</h3>
            <p className="text-sm text-blue-100">
              ITPG Ambassadors
              <br />
              ambassadors@itpg.edu
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-blue-100">
          <p>&copy; {new Date().getFullYear()} {t('footer.title', 'ITPG Ambassadors')}. {t('footer.rights', 'All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  )
}