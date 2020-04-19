import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import cx from 'classnames'
import { useDropzone } from 'react-dropzone'

import VideoControls from '../../components/VideoControls'

import './index.css'

const { ipcRenderer } = window.require('electron')

const MainRoute = () => {
  const [fileList, setFileList] = useState([])
  const [currentFile, setCurrentFile] = useState()
  const [videoElapsedTimePercent, setVideoElapsedTimePercent] = useState(0)

  useLayoutEffect(() => {
    // show window when mounted
    ipcRenderer.send('main-window-ready')
  }, [])

  useEffect(() => {
    const elapsedTimeListener = (event, percent) => setVideoElapsedTimePercent(percent)
    ipcRenderer.on('portal-video-elapsed-time-percent-update', elapsedTimeListener)
    return () => {
      ipcRenderer.removeListener('portal-video-action', elapsedTimeListener)
    }
  }, [])

  const handleDrop = useCallback(files => {
    const fileList = files.map(({ name, path, type: mimeType }) => {
      const [type] = mimeType.split('/')
      return { name, path, type }
    })
    setFileList(fileList.sort((a, b) => a.name.localeCompare(b.name)))
  }, [])
  const { getRootProps, isDragActive } = useDropzone({ onDrop: handleDrop })

  const handleFileClick = file => {
    ipcRenderer.send('portal-resource', file)
    setCurrentFile(file)
  }

  return (
    <div className='main'>
      <div {...getRootProps({ className: cx('file-list', isDragActive && 'is-drag-active') })}>
        <div className='file-list-stack'>
          {fileList.map(file => {
            const { name, path } = file
            const isSelected = currentFile && currentFile.path === path
            return (
              <button
                key={path}
                className={cx(isSelected && 'is-selected')}
                onClick={() => handleFileClick(file)}
              >
                {isSelected && <>{<span role='img' aria-label='pin'>📍</span>}{' '}</>}
                {name}
              </button>
            )
          })}
        </div>
      </div>
      <VideoControls
        elapsedTime={videoElapsedTimePercent}
        videoAction={(type, ...args) => {
          ipcRenderer.send('portal-video-action', { type, args })
        }}
      />
    </div>
  )
}

export default MainRoute
