const { app } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

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
     * __dirname === 'dist/mac/mediaportal.app/Contents/Resources/app/src/main/windows/'
     */
    : `file://${path.join(__dirname, '../../../build/index.html')}#/${route}`
}
