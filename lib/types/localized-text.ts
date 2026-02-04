/**
 * Localized text type for multi-language support
 * Maps locale codes to translated strings
 */
export type LocalizedText = Record<string, string>;

/**
 * Helper function to get localized text with fallback
 * @param text - The localized text object
 * @param locale - The desired locale
 * @param fallbackLocale - Fallback locale (default: 'en')
 * @returns The translated string or empty string
 */
export function getLocalizedText(
  text: LocalizedText | null | undefined,
  locale: string,
  fallbackLocale: string = 'en'
): string {
  if (!text || typeof text !== 'object') {
    return '';
  }
  
  return text[locale] || text[fallbackLocale] || Object.values(text)[0] || '';
}

/**
 * Type guard to check if a value is a valid LocalizedText object
 */
export function isLocalizedText(value: unknown): value is LocalizedText {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === 'string')
  );
}
