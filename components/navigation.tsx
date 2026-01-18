"use client"

import '@/lib/i18n/client' // Initialize i18n before useTranslation
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from 'react-i18next'

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t, i18n } = useTranslation('common')

  const currentLocale = pathname.split('/')[1] || 'bg'

  useEffect(() => {
    setMounted(true)
    if (currentLocale && i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale)
    }
  }, [currentLocale, i18n])

  // Ако не е заредил клиента, не показваме навигацията, за да няма грешни преводи
  if (!mounted) return <div className="h-16 bg-white/80 border-b" />

  const links = [
    { href: `/${currentLocale}`, label: t('nav.home') },
    { href: `/${currentLocale}/ambassadors`, label: t('nav.ambassadors') },
    { href: `/${currentLocale}/teachers`, label: t('nav.teachers') },
    { href: `/${currentLocale}/projects`, label: t('nav.projects') },
    { href: `/${currentLocale}/results`, label: t('nav.results') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${currentLocale}`} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 shadow-lg">
              <span className="text-lg font-bold text-white">IT</span>
            </div>
            <span className="text-xl font-bold text-black">ITPG Ambassadors</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-cyan-600 relative ${
                  pathname === link.href ? "text-cyan-600" : "text-gray-700"
                } after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-teal-400 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="border-t border-gray-200/50 py-6 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium px-4 py-2 rounded-lg ${
                    pathname === link.href ? "text-cyan-600 bg-gray-200/50" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 px-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}