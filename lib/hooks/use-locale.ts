"use client";

import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from "@/lib/config/constants";
import { getLocalizedText, type LocalizedText } from "@/lib/types";
import { changeLanguage, isLocaleSupported } from "@/lib/i18n/client";

/**
 * Hook for managing locale-related functionality
 * Provides a consistent way to handle localization across components
 */
export function useLocale() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation("common");

  // Extract locale from pathname
  const currentLocale = useMemo<SupportedLocale>(() => {
    const pathLocale = pathname.split("/")[1];
    return isLocaleSupported(pathLocale) ? pathLocale : DEFAULT_LOCALE;
  }, [pathname]);

  // Memoized function to get localized text
  const getTranslated = useCallback(
    (text: LocalizedText | null | undefined): string => {
      return getLocalizedText(text, currentLocale, DEFAULT_LOCALE);
    },
    [currentLocale],
  );

  // Memoized function to change language
  const setLocale = useCallback(
    async (locale: SupportedLocale) => {
      if (locale !== i18n.language) {
        await changeLanguage(locale);
      }
    },
    [i18n.language],
  );

  return {
    locale: currentLocale,
    t,
    i18n,
    getTranslated,
    setLocale,
    supportedLocales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  };
}
