import { ipcMain } from 'electron'

export const registerEvents = ({ controlsWindow, portalWindow }) => {
  ipcMain.on('portal-fullscreen', (event, value) => {
    const newValue = value === 'toggle' ? !portalWindow.isFullScreen() : value
    portalWindow.setFullScreen(newValue)
    setTimeout(() => !newValue && portalWindow.unmaximize(), 100)
  })

  // only show when react render is ready
  ipcMain.once('portal-window-ready', () => portalWindow.show())
  ipcMain.once('controls-window-ready', () => controlsWindow.show())

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
    controlsWindow.webContents.send('portal-state-update', data)
  })
}
