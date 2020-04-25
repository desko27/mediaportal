import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import MainRoute from './routes/MainRoute'
import PortalRoute from './routes/PortalRoute'

import en from './translations/en.json'
import es from './translations/es.json'

const translations = { en, es }
const availableLanguages = Object.keys(translations)

// get language without region code from browser
const [rawBrowserLanguage] = navigator.language.split(/[-_]/)
const originalLang = rawBrowserLanguage && rawBrowserLanguage.toLowerCase()

// take decisions like fallback to english if browser's not available
const DEFAULT_LANGUAGE = 'en'
const browserLanguage = originalLang === 'ca' ? 'es' : originalLang // catalan -> spanish
const language = availableLanguages.includes(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE

const App = () => {
  return (
    <IntlProvider locale={language} messages={translations[language]}>
      <Router>
        <Switch>
          <Route path='/main'>
            <MainRoute />
          </Route>
          <Route path='/portal'>
            <PortalRoute />
          </Route>
        </Switch>
      </Router>
    </IntlProvider>
  )
}

export default App
