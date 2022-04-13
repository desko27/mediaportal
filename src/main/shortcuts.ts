import { globalShortcut } from 'electron'

interface Options {
  controlsWindow: Electron.BrowserWindow
}

export const registerShortcuts = ({ controlsWindow }: Options): void => {
  Array(10).fill(undefined).forEach((_, number) => {
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
