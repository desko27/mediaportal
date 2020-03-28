import React, { useCallback, useState } from 'react'
import cx from 'classnames'
import { useDropzone } from 'react-dropzone'
import './index.css'

const { ipcRenderer } = window.require('electron')

const MainRoute = () => {
  const [fileList, setFileList] = useState([])

  const handleDrop = useCallback(files => {
    const fileList = files.map(({ name, path, type: mimeType }) => {
      const [type] = mimeType.split('/')
      return { name, path, type }
    })
    setFileList(fileList)
  }, [])
  const { getRootProps, isDragActive } = useDropzone({ onDrop: handleDrop })

  const handleFileClick = file => {
    ipcRenderer.send('portal-resource', file)
  }

  return (
    <div className='main'>
      <div {...getRootProps({ className: cx('file-list', isDragActive && 'is-drag-active') })}>
        <div className='file-list-stack'>
          {fileList.map(file => {
            const { name, path } = file
            return (
              <button key={path} onClick={() => handleFileClick(file)}>
                {name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MainRoute
