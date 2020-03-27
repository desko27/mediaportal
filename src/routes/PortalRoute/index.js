import React, { useEffect } from 'react'

const { ipcRenderer } = window.require('electron')

const PortalRoute = () => {
  useEffect(() => {
    const onPortalResource = (event, data) => {
      window.alert(data.message)
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
