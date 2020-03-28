const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')
const webPreferences = {
  nodeIntegration: true,
  webSecurity: false
}

function getAppUrl (route) {
  return isDev
    ? `http://localhost:3000/${route}`
    : `file://${path.join(__dirname, '../build/index.html')}`
}

function createMainWindow (portalWindow) {
  const window = new BrowserWindow({ title: 'Media Portal', width: 350, height: 550, webPreferences })
  window.loadURL(getAppUrl('main'))
  window.on('closed', () => {
    portalWindow.destroy()
    app.quit()
  })
  return window
}

function createPortalWindow () {
  const window = new BrowserWindow({ title: 'Portal', closable: false, width: 900, height: 680, webPreferences })
  window.loadURL(getAppUrl('portal'))
  return window
}

app.on('ready', () => {
  const portalWindow = createPortalWindow()
  createMainWindow(portalWindow)

  // redirect event from main window to portal window
  ipcMain.on('portal-resource', (event, data) => {
    portalWindow.webContents.send('portal-resource', data)
  })
})
