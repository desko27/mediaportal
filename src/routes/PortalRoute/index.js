import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import MediaDisplayer from '../../components/MediaDisplayer'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const KEYCODES = { ESCAPE: 27, INTRO: 13 }

const PortalRoute = () => {
  const [currentFile, setCurrentFile] = useState()
  const displayerRef = useRef()

  useLayoutEffect(() => {
    // show window when mounted
    ipcRenderer.send('portal-window-ready')
  }, [])

  useEffect(() => {
    const handlePortalResource = (event, file) => {
      if (!file) {
        setCurrentFile(undefined)
        ipcRenderer.send('portal-state-update', {})
        return
      }

      setCurrentFile(file)
      ipcRenderer.send(
        'portal-state-update',
        {
          resource: {
            type: file.type
          },
          ...(file.type === 'video' ? {
            video: {
              elapsedTime: 0,
              elapsedRatio: 0,
              isPaused: false
            }
          } : {})
        }
      )
    }

    const handleVideoAction = (event, action) => {
      displayerRef.current.triggerVideoAction(action)
    }

    const handleKeydown = event => {
      if (event.keyCode === KEYCODES.ESCAPE) ipcRenderer.send('portal-fullscreen', false)
      if (event.keyCode === KEYCODES.INTRO) ipcRenderer.send('portal-fullscreen', true)
    }

    ipcRenderer.on('portal-resource', handlePortalResource)
    ipcRenderer.on('portal-action', handleVideoAction)
    document.addEventListener('keydown', handleKeydown)

    return () => {
      ipcRenderer.removeListener('portal-resource', handlePortalResource)
      ipcRenderer.removeListener('portal-action', handleVideoAction)
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  const handleVideoUpdate = updatedState => {
    ipcRenderer.send(
      'portal-state-update',
      {
        resource: { type: 'video' },
        video: updatedState
      }
    )
  }

  const handleDoubleClick = () => ipcRenderer.send('portal-fullscreen', 'toggle')

  return (
    <div className={styles.wrapper} onDoubleClick={handleDoubleClick}>
      <MediaDisplayer
        displayerRef={displayerRef}
        file={currentFile}
        onVideoUpdate={handleVideoUpdate}
      />
    </div>
  )
}

export default PortalRoute
