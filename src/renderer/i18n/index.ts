import type { Resources } from './types'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import getDefaultLanguage from './getDefaultLanguage'

import en from './translations/en.json'
import es from './translations/es.json'
import pt from './translations/pt.json'

const resources: Resources = {
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt }
}

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDefaultLanguage(resources),
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
