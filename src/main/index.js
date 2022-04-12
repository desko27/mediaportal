const { app } = require('electron')

const { createControlsWindow } = require('./windows/controls')
const { createPortalWindow } = require('./windows/portal')
const { registerEvents } = require('./events')
const { registerShortcuts } = require('./shortcuts')
const { initialSetup, readySetup } = require('./setup')

initialSetup()

app.on('ready', () => {
  readySetup()

  const portalWindow = createPortalWindow()
  const controlsWindow = createControlsWindow(portalWindow)

  registerShortcuts({ controlsWindow })
  registerEvents({ controlsWindow, portalWindow })
})
