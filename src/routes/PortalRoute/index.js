import React, { useEffect } from 'react'

const { ipcRenderer } = window.require('electron')

const PortalRoute = () => {
  useEffect(() => {
    const onPortalResource = (event, file) => {
      window.alert(file.name)
    }
    ipcRenderer.on('portal-resource', onPortalResource)
    return () => ipcRenderer.removeListener('portal-resource', onPortalResource)
  }, [])

  return (
    <div>
      PortalRoute
    </div>
  )
}

export default PortalRoute
