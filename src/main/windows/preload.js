const { contextBridge, shell, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electron', {
  shell: {
    openExternal: url => shell.openExternal(url)
  },
  ipcRenderer: {
    send: (...args) => ipcRenderer.send(...args),
    on: (...args) => {
      ipcRenderer.on(...args)
      const unsubscribe = () => { ipcRenderer.removeListener(...args) }
      return unsubscribe
    }
  }
})
