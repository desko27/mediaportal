import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './index.css'

const { ipcRenderer } = window.require('electron')

const KEYCODES = { ESCAPE: 27, INTRO: 13 }

const PortalRoute = () => {
  const [currentFile, setCurrentFile] = useState()
  const videoRef = useRef()

  useLayoutEffect(() => {
    // show window when mounted
    ipcRenderer.send('portal-window-ready')
  }, [])

  useEffect(() => {
    const handlePortalResource = (event, file) => setCurrentFile(file)
    const handleKeydown = event => {
      if (event.keyCode === KEYCODES.ESCAPE) ipcRenderer.send('portal-fullscreen', false)
      if (event.keyCode === KEYCODES.INTRO) ipcRenderer.send('portal-fullscreen', true)
    }

    ipcRenderer.on('portal-resource', handlePortalResource)
    document.addEventListener('keydown', handleKeydown)

    return () => {
      ipcRenderer.removeListener('portal-resource', handlePortalResource)
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  useEffect(() => {
    if (!currentFile) return
    if (currentFile.type === 'video') {
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [currentFile])

  const handleDoubleClick = () => ipcRenderer.send('portal-fullscreen', 'toggle')

  const { name, type, path } = currentFile || {}
  const webPath = path && `file://${path}`

  return (
    <div className='portal' onDoubleClick={handleDoubleClick}>
      {currentFile && (
        type === 'image'
          ? <img src={webPath} alt={name} />
          : (
            <video ref={videoRef}>
              <source src={webPath} />
            </video>
          )
      )}
    </div>
  )
}

export default PortalRoute
