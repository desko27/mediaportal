import type { IpcRendererEvent } from 'electron'
import type { MediaFile, PortalState } from '@types'

import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { version } from '../../../../package.json'

import Header from '../../components/Header'
import Menu from '../../components/Menu'
import FileList from '../../components/FileList'
import VideoControls from '../../components/VideoControls'

import styles from './index.module.css'

const { ipcRenderer, shell } = window.electron
const openUrl = (url: string): void => { void shell.openExternal(url) }

const performUpdate = (): void => openUrl('https://github.com/desko27/mediaportal/releases/latest')

export default function ControlsRoute (): JSX.Element {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [fileList, setFileList] = useState<MediaFile[]>([])
  const [checkedFiles, setCheckedFiles] = useState<string[]>([])
  const [currentFile, setCurrentFile] = useState<MediaFile | null>(null)
  const [portalState, setPortalState] = useState<PortalState>({})
  const [willRemoveChecks, setWillRemoveChecks] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useLayoutEffect(() => {
    // show window when mounted
    ipcRenderer.send('controls-window-ready')
  }, [])

  // check for updates once at startup
  useEffect(() => {
    const githubApiLatestReleaseUrl =
      'https://api.github.com/repos/desko27/mediaportal/releases/latest'
    const headers = new window.Headers({ Accept: 'application/vnd.github.v3+json' }) as RequestInit

    window
      .fetch(githubApiLatestReleaseUrl, headers)
      .then(async res => await res.json())
      .then(latestRelease => {
        const { tag_name: tagName } = latestRelease
        if (tagName === `v${version}`) return // we're up to date!
        setIsUpdateAvailable(true)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const portalStateListener =
      (event: IpcRendererEvent, state: PortalState): void => setPortalState(state)
    const unsubscribe = ipcRenderer.on('portal-state-update', portalStateListener)
    return () => {
      unsubscribe()
    }
  }, [])

  const handleFileClick = useCallback((file: MediaFile): void => {
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
    const globalShortcutListener = (
      event: IpcRendererEvent,
      data: { type: string, payload: { number: number | string } }
    ): void => {
      const { type, payload } = data
      switch (type) {
        case 'cast-resource': {
          if (fileList.length === 0) break // can't cast resource with no resources

          switch (payload.number) {
            case 0:
              ipcRenderer.send('portal-resource', undefined)
              setCurrentFile(null)
              break
            case 'next': {
              if (checkedFiles.length === 0) {
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
              const targetIndex = +payload.number - 1
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
    const unsubscribe = ipcRenderer.on('global-shortcut', globalShortcutListener)
    return () => {
      unsubscribe()
    }
  }, [handleFileClick, fileList, checkedFiles])

  const handleDropFiles = (files: File[]): void => {
    const fileList = files.map(({ name, path, type: mimeType }) => {
      const [type] = mimeType.split('/')
      return {
        id: path,
        name,
        path,
        type,
        hash: crypto.randomUUID()
      }
    })

    const sortedFileList = fileList.sort((a, b) => a.name.localeCompare(b.name))

    // reset everything
    setCheckedFiles([])
    ipcRenderer.send('portal-resource', undefined)
    setCurrentFile(null)

    // set new file list
    setFileList(sortedFileList)
  }

  const sendAction = (type: string, ...args: unknown[]): void => {
    ipcRenderer.send('portal-action', { type, args })
  }

  const handleStateClick = (file: MediaFile): void => {
    const { id } = file
    const isCurrent = (currentFile != null) && currentFile.id === id

    if (isCurrent) {
      ipcRenderer.send('portal-resource', undefined)
      setCurrentFile(null)
      return
    }

    setCheckedFiles(prev => {
      const isChecked = prev.includes(id)
      if (!isChecked) return [...prev, id]
      return prev.filter(checkedId => checkedId !== id)
    })
  }

  const handleRemoveChecksClick = (): void => setCheckedFiles((currentFile != null) ? [currentFile.id] : [])
  const handleRemoveChecksHover = (isHover: boolean): void => setWillRemoveChecks(isHover)

  const handleFileItemDragEnd = (event: DropResult): void => {
    const { draggableId, source, destination } = event
    if (typeof destination === 'undefined') return

    setFileList(prev => {
      const fileListWithoutSource = prev.filter((_, index) => source.index !== index)
      return [
        ...fileListWithoutSource.slice(0, destination.index),
        prev.find(file => file.id === draggableId) as MediaFile,
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
      <DragDropContext onDragEnd={handleFileItemDragEnd}>
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
      <VideoControls
        className={styles.videoControls}
        sendAction={sendAction}
        video={portalState.video}
      />
    </div>
  )
}
