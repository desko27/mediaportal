import { app } from 'electron'

import { createControlsWindow } from './windows/controls'
import { createPortalWindow } from './windows/portal'
import { registerEvents } from './events'
import { registerShortcuts } from './shortcuts'
import { initialSetup, readySetup } from './setup'

initialSetup()

app.on('ready', () => {
  readySetup()

  const portalWindow = createPortalWindow()
  const controlsWindow = createControlsWindow(portalWindow)

  registerShortcuts({ controlsWindow })
  registerEvents({ controlsWindow, portalWindow })
})
