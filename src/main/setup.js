const { Menu, protocol } = require('electron')
const isDev = require('electron-is-dev')

module.exports.initialSetup = () => {
  // remove browser's menu bar for production env
  if (!isDev) Menu.setApplicationMenu(false)
}

module.exports.readySetup = () => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''))
    callback(pathname)
  })
}
