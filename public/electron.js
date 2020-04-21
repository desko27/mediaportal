const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

// remove browser's menu bar for production env
if (!isDev) Menu.setApplicationMenu(false)

const webPreferences = {
  nodeIntegration: true,
  webSecurity: false,
  autoplayPolicy: 'no-user-gesture-required'
}

const commonWindowOptions = { webPreferences, show: false }

function getAppUrl (route) {
  return isDev
    ? `http://localhost:3000/#${route}`
    : `file://${path.join(__dirname, '../build/index.html')}#/${route}`
}

function createMainWindow (portalWindow) {
  const window = new BrowserWindow({
    title: 'Media Portal',
    width: 350,
    height: 550,
    ...commonWindowOptions
  })
  window.loadURL(getAppUrl('main'))
  window.on('closed', () => {
    portalWindow.destroy()
    app.quit()
  })
  return window
}

function createPortalWindow () {
  const window = new BrowserWindow({
    title: 'Portal',
    width: 768,
    height: 432,
    closable: false,
    maximizable: process.platform === 'darwin',
    ...commonWindowOptions
  })
  window.loadURL(getAppUrl('portal'))
  return window
}

app.on('ready', () => {
  const portalWindow = createPortalWindow()
  const mainWindow = createMainWindow(portalWindow)

  ipcMain.on('portal-fullscreen', (event, value) => {
    const newValue = value === 'toggle' ? !portalWindow.isFullScreen() : value
    portalWindow.setFullScreen(newValue)
    setTimeout(() => !newValue && portalWindow.unmaximize(), 100)
  })

  // only show when react render is ready
  ipcMain.once('portal-window-ready', () => portalWindow.show())
  ipcMain.once('main-window-ready', () => mainWindow.show())

  // redirect resource event from main window to portal window
  ipcMain.on('portal-resource', (event, data) => {
    portalWindow.webContents.send('portal-resource', data)
  })

  // redirect actions from main window to portal window
  ipcMain.on('portal-action', (event, data) => {
    portalWindow.webContents.send('portal-action', data)
  })

  // redirect portal state update from portal window to main window
  ipcMain.on('portal-state-update', (event, data) => {
    mainWindow.webContents.send('portal-state-update', data)
  })
})
