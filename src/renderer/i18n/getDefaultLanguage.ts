import type { Resources } from './types'

export default function getDefaultLanguage (resources: Resources): string {
  const availableLanguages = Object.keys(resources)

  // get language without region code from browser
  const [rawBrowserLanguage] = navigator.language.split(/[-_]/)
  const originalLang = rawBrowserLanguage?.toLowerCase()

  // take decisions like fallback to english if browser's not available
  const DEFAULT_LANGUAGE = 'en'
  const browserLanguage = originalLang === 'ca' ? 'es' : originalLang // catalan -> spanish
  return availableLanguages.includes(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE
}
