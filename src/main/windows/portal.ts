import { BrowserWindow } from 'electron'
import { commonWindowOptions, getAppUrl } from './common'

export const createPortalWindow = (): Electron.BrowserWindow => {
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

  void window.loadURL(getAppUrl('portal'))

  return window
}
