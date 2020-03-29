import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './index.css'

const { ipcRenderer } = window.require('electron')

const PortalRoute = () => {
  const [currentFile, setCurrentFile] = useState()
  const videoRef = useRef()

  useLayoutEffect(() => {
    // show window when mounted
    ipcRenderer.send('portal-window-ready')
  }, [])

  useEffect(() => {
    const onPortalResource = (event, file) => setCurrentFile(file)
    ipcRenderer.on('portal-resource', onPortalResource)
    return () => ipcRenderer.removeListener('portal-resource', onPortalResource)
  }, [])

  useEffect(() => {
    if (!currentFile) return
    if (currentFile.type === 'video') {
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [currentFile])

  if (!currentFile) return <div className='portal' />
  const { name, type, path } = currentFile
  const webPath = `file://${encodeURI(path)}`

  return (
    <div className='portal'>
      {type === 'image'
        ? <img src={webPath} alt={name} />
        : (
          <video ref={videoRef}>
            <source src={webPath} />
          </video>
        )}
    </div>
  )
}

export default PortalRoute
