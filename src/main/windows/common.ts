import { app } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'

const webPreferences: Partial<Electron.BrowserWindowConstructorOptions['webPreferences']> = {
  nodeIntegration: true,
  webSecurity: false,
  preload: path.join(__dirname, 'preload.js'),
  autoplayPolicy: 'no-user-gesture-required'
}

export const commonWindowOptions: Partial<Electron.BrowserWindowConstructorOptions> = {
  webPreferences,
  acceptFirstMouse: true,
  show: app.commandLine.hasSwitch('debug-mode')
}

export const getAppUrl = (route: string): string => {
  return isDev
    ? `http://localhost:3000/#/${route}`
    /**
     * BE AWARE:
     * __dirname === 'build/dist/mac/mediaportal.app/Contents/Resources/app/build/main/windows/'
     */
    : `file://${path.join(__dirname, '../../renderer/index.html')}#/${route}`
}
