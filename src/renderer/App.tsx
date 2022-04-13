import { HashRouter, Routes, Route } from 'react-router-dom'

import './i18n'

import ControlsRoute from './routes/ControlsRoute'
import PortalRoute from './routes/PortalRoute'

export default function App (): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path='controls' element={<ControlsRoute />} />
        <Route path='portal' element={<PortalRoute />} />
      </Routes>
    </HashRouter>
  )
}
