import React, { useEffect, useState, useRef } from 'react'

const { ipcRenderer } = window.require('electron')

const PortalRoute = () => {
  const [currentFile, setCurrentFile] = useState()
  const videoRef = useRef()

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

  if (!currentFile) return null
  const { name, type, path } = currentFile
  const webPath = `file://${encodeURI(path)}`
  console.log(webPath)

  return (
    <div>
      {type === 'image'
        ? <img src={webPath} alt={name} />
        : (
          <video ref={videoRef} controls>
            <source src={webPath} />
          </video>
        )}
    </div>
  )
}

export default PortalRoute
