import type { IpcRenderer, Shell } from 'electron'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: IpcRenderer['send']
        on: (...args: Parameters<IpcRenderer['on']>) => (() => void)
      }
      shell: Shell
    }
  }
}
