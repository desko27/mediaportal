const { globalShortcut } = require('electron')

module.exports.registerShortcuts = ({ controlsWindow }) => {
  Array(10).fill().forEach((_, number) => {
    globalShortcut.register(`Alt+Shift+${number}`, () => {
      controlsWindow.webContents.send('global-shortcut', {
        type: 'cast-resource',
        payload: { number }
      })
    })
  })
  globalShortcut.register('Alt+Shift+A', () => {
    controlsWindow.webContents.send('global-shortcut', {
      type: 'cast-resource',
      payload: { number: 'next' }
    })
  })
}
