/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'bg',
    locales: ['bg', 'en', 'de', 'fr', 'es', 'it', 'pl', 'ro', 'cs', 'sk', 'sl', 'hr', 'sr', 'mk', 'al', 'me'],
  },
  // Добави тази секция:
  detection: {
    order: ['path', 'cookie', 'localStorage', 'navigator'],
    caches: ['cookie', 'localStorage'], // Запазва избора в браузъра
    lookupFromPathIndex: 0,
  },
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}