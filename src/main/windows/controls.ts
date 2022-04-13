import { app, BrowserWindow } from 'electron'
import { commonWindowOptions, getAppUrl } from './common'

export const createControlsWindow = (
  portalWindow: Electron.BrowserWindow
): Electron.BrowserWindow => {
  const window = new BrowserWindow({
    title: 'Media Portal',
    width: 350,
    height: 550,
    ...commonWindowOptions
  })

  void window.loadURL(getAppUrl('controls'))

  window.on('closed', () => {
    portalWindow.destroy()
    app.quit()
  })

  if (app.commandLine.hasSwitch('debug-mode')) {
    window.webContents.openDevTools()
  }

  return window
}
