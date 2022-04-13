import { HashRouter, Routes, Route } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import ControlsRoute from './routes/ControlsRoute'
import PortalRoute from './routes/PortalRoute'

import en from './translations/en.json'
import es from './translations/es.json'
import pt from './translations/pt.json'

const translations: {[K: string]: {[K: string]: string}} = { en, es, pt }
const availableLanguages = Object.keys(translations)

// get language without region code from browser
const [rawBrowserLanguage] = navigator.language.split(/[-_]/)
const originalLang = rawBrowserLanguage?.toLowerCase()

// take decisions like fallback to english if browser's not available
const DEFAULT_LANGUAGE = 'en'
const browserLanguage = originalLang === 'ca' ? 'es' : originalLang // catalan -> spanish
const language = availableLanguages.includes(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE

export default function App (): JSX.Element {
  return (
    <IntlProvider locale={language} messages={translations[language]}>
      <HashRouter>
        <Routes>
          <Route path='controls' element={<ControlsRoute />} />
          <Route path='portal' element={<PortalRoute />} />
        </Routes>
      </HashRouter>
    </IntlProvider>
  )
}
