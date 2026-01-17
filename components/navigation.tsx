"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from 'react-i18next'

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation('common')

  const currentLocale = pathname.split('/')[1] || 'bg'

  const links = [
    { href: `/${currentLocale}`, label: t('nav.home') },
    { href: `/${currentLocale}/ambassadors`, label: t('nav.ambassadors') },
    { href: `/${currentLocale}/teachers`, label: t('nav.teachers') },
    { href: `/${currentLocale}/projects`, label: t('nav.projects') },
    { href: `/${currentLocale}/results`, label: t('nav.results') },
    { href: "/admin", label: t('nav.admin') },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${currentLocale}`} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#306FEC] to-[#8FCEC7]">
              <span className="text-lg font-bold text-white">IT</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#306FEC] to-[#8FCEC7] bg-clip-text text-transparent">ITPG Ambassadors</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
