import { Menu, protocol } from 'electron'
import isDev from 'electron-is-dev'

export const initialSetup = (): void => {
  // remove browser's menu bar for production env
  if (!isDev) Menu.setApplicationMenu(null)
}

export const readySetup = (): void => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''))
    callback(pathname)
  })
}
