
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import Header from '../../components/Header'
import Menu from '../../components/Menu'
import FileList from '../../components/FileList'
import MediaControls from '../../components/MediaControls'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const MainRoute = () => {
  const [fileList, setFileList] = useState([])
  const [checkedFiles, setCheckedFiles] = useState([])
  const [currentFile, setCurrentFile] = useState()
  const [portalState, setPortalState] = useState({})
  const [willRemoveChecks, setWillRemoveChecks] = useState()
  const [isMenuOpen, setIsMenuOpen] = useState()

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

  const handleFileClick = useCallback(file => {
    const { id } = file
    ipcRenderer.send('portal-resource', file)
    setCurrentFile(file)
    setCheckedFiles(prev => {
      const isChecked = prev.includes(id)
      if (!isChecked) return [...prev, id]
      return prev
    })
  }, [])

  useEffect(() => {
    const globalShortcutListener = (event, data) => {
      const { type, payload } = data
      switch (type) {
        case 'cast-resource': {
          switch (payload.number) {
            case 0:
              ipcRenderer.send('portal-resource', undefined)
              setCurrentFile(undefined)
              break
            case 'next': {
              if (!checkedFiles.length) {
                handleFileClick(fileList[0])
                break
              }
              const reversedCheckedFileObjects =
                fileList.filter(f => checkedFiles.includes(f.id)).reverse()
              const [lastCheckedFile] = reversedCheckedFileObjects
              const lasCheckedIndex = fileList.indexOf(lastCheckedFile)
              const targetIndex = lasCheckedIndex + 1
              if (targetIndex >= fileList.length) break
              handleFileClick(fileList[targetIndex])
              break
            }
            default: {
              const targetIndex = payload.number - 1
              if (targetIndex >= fileList.length) break
              handleFileClick(fileList[targetIndex])
              break
            }
          }
          break
        }
        default:
      }
    }
    ipcRenderer.on('global-shortcut', globalShortcutListener)
    return () => {
      ipcRenderer.removeListener('global-shortcut', globalShortcutListener)
    }
  }, [handleFileClick, fileList, checkedFiles])

  const handleDropFiles = files => {
    const fileList = files.map(({ name, path, type: mimeType }) => {
      const [type] = mimeType.split('/')
      return { id: path, name, path, type }
    })
    const sortedFileList = fileList.sort((a, b) => a.name.localeCompare(b.name))

    // reset everything
    setCheckedFiles([])
    ipcRenderer.send('portal-resource', undefined)
    setCurrentFile(undefined)

    // set new file list
    setFileList(sortedFileList)
  }

  const sendAction = (type, ...args) => {
    ipcRenderer.send('portal-action', { type, args })
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

  const handleRemoveChecksClick = () => setCheckedFiles(currentFile ? [currentFile.id] : [])
  const handleRemoveChecksHover = isHover => setWillRemoveChecks(isHover)

  return (
    <div className={styles.wrapper}>
      <Header
        checkedFiles={checkedFiles}
        className={styles.header}
        filesNumber={fileList.length}
        onRemoveChecksClick={handleRemoveChecksClick}
        onRemoveChecksHover={handleRemoveChecksHover}
        onMenuClick={() => setIsMenuOpen(prev => !prev)}
      />
      <div className={styles.mainContainer}>
        <Menu isOpen={isMenuOpen} />
        <FileList
          checkedFiles={checkedFiles}
          className={styles.fileList}
          currentFile={currentFile}
          fileList={fileList}
          onDropFiles={handleDropFiles}
          onFileClick={handleFileClick}
          onStateClick={handleStateClick}
          willRemoveChecks={willRemoveChecks}
        />
      </div>
      <MediaControls
        className={styles.mediaControls}
        sendAction={sendAction}
        video={portalState.video}
      />
    </div>
  )
}

export default MainRoute
