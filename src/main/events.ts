import type { MediaFile, PortalState, VideoAction } from '@types'

import { ipcMain } from 'electron'

interface Options {
  controlsWindow: Electron.BrowserWindow
  portalWindow: Electron.BrowserWindow
}

export const registerEvents = ({ controlsWindow, portalWindow }: Options): void => {
  ipcMain.on('portal-fullscreen', (event, value: boolean | 'toggle') => {
    const newValue = value === 'toggle' ? !portalWindow.isFullScreen() : value
    portalWindow.setFullScreen(newValue)
    setTimeout(() => !newValue && portalWindow.unmaximize(), 100)
  })

  // only show when react render is ready
  ipcMain.once('portal-window-ready', () => portalWindow.show())
  ipcMain.once('controls-window-ready', () => {
    controlsWindow.show()
    controlsWindow.focus()
  })

  // redirect resource event from main window to portal window
  ipcMain.on('portal-resource', (event, file?: MediaFile) => {
    portalWindow.webContents.send('portal-resource', file)
  })

  // redirect actions from main window to portal window
  ipcMain.on('portal-action', (event, action: VideoAction) => {
    portalWindow.webContents.send('portal-action', action)
  })

  // redirect portal state update from portal window to main window
  ipcMain.on('portal-state-update', (event, state: PortalState) => {
    controlsWindow.webContents.send('portal-state-update', state)
  })
}
