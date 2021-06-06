import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { version } from '../../../package.json'

import Header from '../../components/Header'
import Menu from '../../components/Menu'
import FileList from '../../components/FileList'
import MediaControls from '../../components/MediaControls'

import styles from './index.module.css'

const { ipcRenderer, shell } = window.electron
const openUrl = url => shell.openExternal(url)

const performUpdate = () => openUrl('https://github.com/desko27/mediaportal/releases/latest')

const MainRoute = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState()
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

  // check for updates once at startup
  useEffect(() => {
    const githubApiLatestReleaseUrl =
      'https://api.github.com/repos/desko27/mediaportal/releases/latest'
    const headers = new window.Headers({ Accept: 'application/vnd.github.v3+json' })

    window
      .fetch(githubApiLatestReleaseUrl, headers)
      .then(res => res.json())
      .then(latestRelease => {
        const { tag_name: tagName } = latestRelease
        if (tagName === `v${version}`) return // we're up to date!
        setIsUpdateAvailable(true)
      })
      .catch(err => console.log(err))
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
          if (!fileList.length) break // can't cast resource with no resources

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

  const onFileItemDragEnd = event => {
    const { draggableId, source, destination } = event
    if (!destination) return

    setFileList(prev => {
      const fileListWithoutSource = prev.filter((_, index) => source.index !== index)
      return [
        ...fileListWithoutSource.slice(0, destination.index),
        prev.find(file => file.id === draggableId),
        ...fileListWithoutSource.slice(destination.index)
      ]
    })
  }

  return (
    <div className={styles.wrapper}>
      <Header
        checkedFiles={checkedFiles}
        className={styles.header}
        filesNumber={fileList.length}
        isUpdateAvailable={isUpdateAvailable}
        onMenuClick={() => setIsMenuOpen(prev => !prev)}
        onRemoveChecksClick={handleRemoveChecksClick}
        onRemoveChecksHover={handleRemoveChecksHover}
        performUpdate={performUpdate}
      />
      <Menu
        isOpen={isMenuOpen}
        isUpdateAvailable={isUpdateAvailable}
        performUpdate={performUpdate}
        setIsOpen={setIsMenuOpen}
      />
      <DragDropContext onDragEnd={onFileItemDragEnd}>
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
      </DragDropContext>
      <MediaControls
        className={styles.mediaControls}
        sendAction={sendAction}
        video={portalState.video}
      />
    </div>
  )
}

export default MainRoute
