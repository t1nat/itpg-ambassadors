"use client";

import "@/lib/i18n/client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

/**
 * Syncs the i18n language with the URL locale on every route change.
 * Placed once in the locale layout so all pages get the correct language.
 */
export function LocaleSync() {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const locale = pathname.split("/")[1] || "bg";

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return null;
}
