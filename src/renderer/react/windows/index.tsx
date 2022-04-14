import { HashRouter, Routes, Route } from 'react-router-dom'

import ControlsWindow from './ControlsWindow'
import PortalWindow from './PortalWindow'

export default function WindowsRouter (): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path='controls' element={<ControlsWindow />} />
        <Route path='portal' element={<PortalWindow />} />
      </Routes>
    </HashRouter>
  )
}
