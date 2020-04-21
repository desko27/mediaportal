import React, { useEffect, useLayoutEffect, useState } from 'react'

import Header from '../../components/Header'
import FileList from '../../components/FileList'
import MediaControls from '../../components/MediaControls'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const MainRoute = () => {
  const [fileList, setFileList] = useState([])
  const [checkedFiles, setCheckedFiles] = useState([])
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

  const sendAction = (type, ...args) => {
    ipcRenderer.send('portal-action', { type, args })
  }

  const handleFileClick = file => {
    const { id } = file
    ipcRenderer.send('portal-resource', file)
    setCurrentFile(file)
    setCheckedFiles(prev => {
      const isChecked = prev.includes(id)
      if (!isChecked) return [...prev, id]
      return prev
    })
  }

  const handleStateClick = file => {
    const { id } = file
    const isCurrent = currentFile && currentFile.id === id

    if (isCurrent) {
      ipcRenderer.send('portal-resource', undefined)
      setCurrentFile(undefined)
      return
    }

    setCheckedFiles(prev => {
      const isChecked = prev.includes(id)
      if (!isChecked) return [...prev, id]
      return prev.filter(checkedId => checkedId !== id)
    })
  }

  return (
    <div className={styles.wrapper}>
      <Header
        className={styles.header}
        filesNumber={fileList.length}
      />
      <FileList
        className={styles.fileList}
        fileList={fileList}
        setFileList={setFileList}
        checkedFiles={checkedFiles}
        setCheckedFiles={setCheckedFiles}
        onFileClick={handleFileClick}
        onStateClick={handleStateClick}
        currentFile={currentFile}
      />
      <MediaControls
        className={styles.mediaControls}
        video={portalState.video}
        sendAction={sendAction}
      />
    </div>
  )
}

export default MainRoute
