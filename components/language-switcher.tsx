"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from '@/lib/i18n/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'bg',
      supportedLngs: ['bg', 'en', 'de', 'fr', 'es', 'it', 'pl', 'ro', 'cs', 'sk', 'sl', 'hr', 'sr', 'mk', 'al', 'me'],
      defaultNS: 'common',
      fallbackNS: 'common',
      interpolation: { escapeValue: false }
    })
}

const languages = [
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  { code: 'al', name: 'Shqip', flag: '🇦🇱' },
  { code: 'me', name: 'Crnogorski', flag: '🇲🇪' },
]

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { i18n } = useTranslation('common')
  const currentLocale = pathname.split('/')[1] || 'bg'

  useEffect(() => {
    setMounted(true)
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale)
    }
  }, [currentLocale, i18n])

  const handleLanguageChange = (locale: string) => {
    // ПРОМЯНА: Записваме бисквитката за Middleware
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    
    const segments = pathname.split('/')
    segments[1] = locale
    const newPath = segments.join('/') || '/'
    
    i18n.changeLanguage(locale)
    router.push(newPath)
  }

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  if (!mounted) {
    return <Button variant="ghost" size="sm" className="gap-2 opacity-0"><Globe className="h-4 w-4" /></Button>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="hidden md:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-[400px] overflow-y-auto bg-white">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`gap-2 cursor-pointer ${currentLocale === language.code ? 'bg-gray-100' : ''}`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}