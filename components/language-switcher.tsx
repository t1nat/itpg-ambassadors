"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
// Import the initialized i18next instance
import i18nInstance from '@/lib/i18n/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

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
  
  // 2. Взимаме само 't', за да не гърми, ако i18n от контекста е празен
  const { t } = useTranslation('common')
  
  const currentLocale = pathname.split('/')[1] || 'bg'

  useEffect(() => {
    setMounted(true)
    
    // 3. Синхронизация при зареждане
    if (i18nInstance.language !== currentLocale) {
      i18nInstance.changeLanguage(currentLocale);
    }
  }, [currentLocale])

  const handleLanguageChange = async (locale: string) => {
    // 4. Записваме бисквитка (за Middleware)
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // 5. Генерираме новия път
    const segments = pathname.split('/')
    segments[1] = locale
    const newPath = segments.join('/')

    // 6. Смяна на езика
    try {
      await i18nInstance.changeLanguage(locale);
    } catch (error) {
      console.error("i18next fallback: could not change language programmatically", error);
    }
    
    // 7. Пренасочваме. Дори стъпка 6 да се забави, 
    // пренасочването ще зареди новия език чрез Middleware и Refresh.
    router.push(newPath);
  }

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  if (!mounted) {
    return <div className="w-10 h-10" />
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
      <DropdownMenuContent align="end" className="w-48 max-h-[400px] overflow-y-auto bg-white shadow-xl border border-gray-200">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`gap-3 cursor-pointer py-2 px-3 transition-colors ${
              currentLocale === language.code ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}