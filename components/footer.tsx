"use client"

import Link from "next/link"
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.quickLinks')}</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/ambassadors" className="text-muted-foreground hover:text-primary">
                {t('footer.ambassadors')}
              </Link>
              <Link href="/teachers" className="text-muted-foreground hover:text-primary">
                {t('footer.teachers')}
              </Link>
              <Link href="/projects" className="text-muted-foreground hover:text-primary">
                {t('footer.projects')}
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.contact')}</h3>
            <p className="text-sm text-muted-foreground">
              Instituto Técnico Profissional de Gestão
              <br />
              ambassadors@itpg.edu
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t('footer.title')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
