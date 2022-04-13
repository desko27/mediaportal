import type { IpcRendererEvent } from 'electron'
import type { MediaFile, Displayer, VideoState, VideoAction } from '@types'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import MediaDisplayer from '../../components/MediaDisplayer'

import styles from './index.module.css'

const { ipcRenderer } = window.electron

const KEYCODES = { ESCAPE: 27, INTRO: 13 }

export default function PortalRoute (): JSX.Element {
  const [currentFile, setCurrentFile] = useState<MediaFile | null>(null)
  const currentFileRef = useRef<MediaFile | null>(null)
  const displayerRef = useRef<Displayer | null>(null)

  // create a reference to check outdated events in handlers
  currentFileRef.current = currentFile

  useLayoutEffect(() => {
    // show window when mounted
    ipcRenderer.send('portal-window-ready')
  }, [])

  useEffect(() => {
    const handlePortalResource = (event: IpcRendererEvent, file?: MediaFile): void => {
      if (typeof file === 'undefined') {
        setCurrentFile(null)
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
          ...(file.type === 'video'
            ? {
                video: {
                  elapsedTime: 0,
                  elapsedRatio: 0,
                  isPaused: false
                }
              }
            : {})
        }
      )
    }

    const handleVideoAction = (event: IpcRendererEvent, action: VideoAction): void => {
      const displayer = displayerRef.current
      if (displayer === null) return

      switch (action.type) {
        case 'setElapsedRatio':
          return displayer.video.setElapsedRatio(action.args[0] as number)
        case 'play': {
          void displayer.video.play()
          return
        }
        case 'pause': return displayer.video.pause()
      }
    }

    const handleKeydown = (event: KeyboardEvent): void => {
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

  const handleVideoUpdate = (fileToCheck: MediaFile, updatedState: VideoState): void => {
    // Do not send event if file is no longer the same
    // (prevents issues with outdated video events)
    if (fileToCheck !== currentFileRef.current) return

    ipcRenderer.send(
      'portal-state-update',
      {
        resource: { type: 'video' },
        video: updatedState
      }
    )
  }

  const handleDoubleClick = (): void => ipcRenderer.send('portal-fullscreen', 'toggle')

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
