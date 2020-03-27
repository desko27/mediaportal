const { app, BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

function getAppUrl (route) {
  return isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
}

function createMainWindow (portalWindow) {
  const window = new BrowserWindow({ width: 350, height: 550, webPreferences: { nodeIntegration: true } })
  window.loadURL(getAppUrl('main'))
  window.on('closed', () => {
    portalWindow.destroy()
    app.quit()
  })
  return window
}

function createPortalWindow () {
  const window = new BrowserWindow({ closable: false, width: 900, height: 680, webPreferences: { nodeIntegration: true } })
  window.loadURL(getAppUrl('main'))
  return window
}

app.on('ready', () => {
  const portalWindow = createPortalWindow()
  createMainWindow(portalWindow)
})
