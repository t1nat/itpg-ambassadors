/**
 * i18n client configuration
 * Centralized internationalization setup using i18next
 */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type SupportedLocale } from "@/lib/config/constants";

// Import locale files
import bgCommon from "../../public/locales/bg/common.json";
import enCommon from "../../public/locales/en/common.json";
import deCommon from "../../public/locales/de/common.json";
import frCommon from "../../public/locales/fr/common.json";
import esCommon from "../../public/locales/es/common.json";
import itCommon from "../../public/locales/it/common.json";
import plCommon from "../../public/locales/pl/common.json";
import roCommon from "../../public/locales/ro/common.json";
import csCommon from "../../public/locales/cs/common.json";
import skCommon from "../../public/locales/sk/common.json";
import slCommon from "../../public/locales/sl/common.json";
import hrCommon from "../../public/locales/hr/common.json";
import srCommon from "../../public/locales/sr/common.json";
import mkCommon from "../../public/locales/mk/common.json";
import alCommon from "../../public/locales/al/common.json";
import meCommon from "../../public/locales/me/common.json";

/**
 * i18n resources mapping locales to their translations
 */
export const resources = {
  bg: { common: bgCommon },
  en: { common: enCommon },
  de: { common: deCommon },
  fr: { common: frCommon },
  es: { common: esCommon },
  it: { common: itCommon },
  pl: { common: plCommon },
  ro: { common: roCommon },
  cs: { common: csCommon },
  sk: { common: skCommon },
  sl: { common: slCommon },
  hr: { common: hrCommon },
  sr: { common: srCommon },
  mk: { common: mkCommon },
  al: { common: alCommon },
  me: { common: meCommon },
} as const;

/**
 * i18n instance initialization
 * Only initializes once to prevent multiple instances
 */
const i18nInstance = i18next.use(initReactI18next);

if (!i18nInstance.isInitialized) {
  i18nInstance.init({
    resources,
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    defaultNS: "common",
    fallbackNS: "common",
    interpolation: {
      escapeValue: false, // React handles XSS protection
    },
    react: {
      useSuspense: false, // Required for SSR compatibility
    },
  });
}

/**
 * Change the current language
 * @param locale - The locale to switch to
 */
export function changeLanguage(locale: SupportedLocale): Promise<void> {
  return i18nInstance.changeLanguage(locale);
}

/**
 * Get the current language
 */
export function getCurrentLanguage(): string {
  return i18nInstance.language;
}

/**
 * Check if a locale is supported
 */
export function isLocaleSupported(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export default i18nInstance;
