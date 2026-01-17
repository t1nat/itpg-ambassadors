import { useEffect } from 'react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import bgCommon from '../../public/locales/bg/common.json'
import enCommon from '../../public/locales/en/common.json'
import deCommon from '../../public/locales/de/common.json'
import frCommon from '../../public/locales/fr/common.json'
import esCommon from '../../public/locales/es/common.json'
import itCommon from '../../public/locales/it/common.json'
import plCommon from '../../public/locales/pl/common.json'
import roCommon from '../../public/locales/ro/common.json'
import csCommon from '../../public/locales/cs/common.json'
import skCommon from '../../public/locales/sk/common.json'
import slCommon from '../../public/locales/sl/common.json'
import hrCommon from '../../public/locales/hr/common.json'
import srCommon from '../../public/locales/sr/common.json'
import mkCommon from '../../public/locales/mk/common.json'
import alCommon from '../../public/locales/al/common.json'
import meCommon from '../../public/locales/me/common.json'

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
}

export const useI18n = () => {
  // Init is done in language-switcher
}