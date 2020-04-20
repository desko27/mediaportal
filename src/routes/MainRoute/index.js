import React, { useEffect, useLayoutEffect, useState } from 'react'

import Header from '../../components/Header'
import FileList from '../../components/FileList'
import VideoControls from '../../components/VideoControls'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const MainRoute = () => {
  const [fileList, setFileList] = useState([])
  const [currentFile, setCurrentFile] = useState()
  const [portalState, setPortalState] = useState({})

  useLayoutEffect(() => {
    // show window when mounted
    ipcRenderer.send('main-window-ready')
  }, [])

  useEffect(() => {
    const portalStateListener = (event, state) => setPortalState(state)
    ipcRenderer.on('portal-state-update', portalStateListener)
    return () => {
      ipcRenderer.removeListener('portal-state-update', portalStateListener)
    }
  }, [])

  const handleFileClick = file => {
    ipcRenderer.send('portal-resource', file)
    setCurrentFile(file)
  }

  return (
    <div className={styles.wrapper}>
      <Header filesNumber={fileList.length} />
      <FileList
        className={styles.fileList}
        fileList={fileList}
        setFileList={setFileList}
        onFileClick={handleFileClick}
        currentFile={currentFile}
      />
      <VideoControls
        video={portalState.video}
        sendAction={(type, ...args) => {
          ipcRenderer.send('portal-action', { type, args })
        }}
      />
    </div>
  )
}

export default MainRoute
