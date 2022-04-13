import { Menu, protocol } from 'electron'
import isDev from 'electron-is-dev'

export const initialSetup = () => {
  // remove browser's menu bar for production env
  if (!isDev) Menu.setApplicationMenu(false)
}

export const readySetup = () => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''))
    callback(pathname)
  })
}
