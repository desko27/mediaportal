import { app } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'

const webPreferences = {
  nodeIntegration: true,
  webSecurity: false,
  preload: path.join(__dirname, 'preload.js'),
  autoplayPolicy: 'no-user-gesture-required'
}

module.exports.commonWindowOptions = {
  webPreferences,
  acceptFirstMouse: true,
  show: app.commandLine.hasSwitch('debug-mode')
}

module.exports.getAppUrl = (route) => {
  return isDev
    ? `http://localhost:3000/#/${route}`
    /**
     * BE AWARE:
     * __dirname === 'build/dist/mac/mediaportal.app/Contents/Resources/app/build/main/windows/'
     */
    : `file://${path.join(__dirname, '../../renderer/index.html')}#/${route}`
}
