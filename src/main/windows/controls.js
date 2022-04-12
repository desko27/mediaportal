const { app, BrowserWindow } = require('electron')
const { commonWindowOptions, getAppUrl } = require('./common')

module.exports.createControlsWindow = (portalWindow) => {
  const window = new BrowserWindow({
    title: 'Media Portal',
    width: 350,
    height: 550,
    ...commonWindowOptions
  })

  window.loadURL(getAppUrl('controls'))

  window.on('closed', () => {
    portalWindow.destroy()
    app.quit()
  })

  if (app.commandLine.hasSwitch('debug-mode')) {
    window.webContents.openDevTools()
  }

  return window
}
