const { BrowserWindow } = require('electron')
const { commonWindowOptions, getAppUrl } = require('./common')

module.exports.createPortalWindow = () => {
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

  window.loadURL(getAppUrl('portal'))

  return window
}
