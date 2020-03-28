import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

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
  const { getRootProps } = useDropzone({ onDrop: handleDrop })

  const handleFileClick = file => {
    ipcRenderer.send('portal-resource', file)
  }

  return (
    <div>
      <h1>MainRoute</h1>
      <div {...getRootProps({ style: { height: 200, background: '#ddd' } })}>
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
  )
}

export default MainRoute
