const { contextBridge, shell, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electron', {
  shell: {
    openExternal: url => shell.openExternal(url)
  },
  ipcRenderer: {
    on: (...args) => ipcRenderer.on(...args),
    send: (...args) => ipcRenderer.send(...args),
    removeListener: (...args) => ipcRenderer.removeListener(...args)
  }
})
