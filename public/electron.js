const { app, BrowserWindow, ipcMain, Menu, globalShortcut, protocol } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

// remove browser's menu bar for production env
if (!isDev) Menu.setApplicationMenu(false)

const webPreferences = {
  nodeIntegration: true,
  webSecurity: false,
  preload: path.join(__dirname, 'preload.js'),
  autoplayPolicy: 'no-user-gesture-required'
}

const commonWindowOptions = {
  webPreferences,
  acceptFirstMouse: true,
  show: false
}

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
    frame: false,
    roundedCorners: false,
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
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''))
    callback(pathname)
  })

  const portalWindow = createPortalWindow()
  const mainWindow = createMainWindow(portalWindow)

  // register shortcuts
  Array(10).fill().forEach((_, number) => {
    globalShortcut.register(`Alt+Shift+${number}`, () => {
      mainWindow.webContents.send('global-shortcut', {
        type: 'cast-resource',
        payload: { number }
      })
    })
  })
  globalShortcut.register('Alt+Shift+A', () => {
    mainWindow.webContents.send('global-shortcut', {
      type: 'cast-resource',
      payload: { number: 'next' }
    })
  })

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
