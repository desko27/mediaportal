import React, { useCallback } from 'react'
import cx from 'classnames'
import { useDropzone } from 'react-dropzone'

import FileItem from './FileItem'
import styles from './index.module.css'

const FileList = ({ className, fileList, setFileList, onFileClick, currentFile }) => {
  const handleDrop = useCallback(files => {
    const fileList = files.map(({ name, path, type: mimeType }) => {
      const [type] = mimeType.split('/')
      return { name, path, type }
    })
    setFileList(fileList.sort((a, b) => a.name.localeCompare(b.name)))
  }, [])
  const { getRootProps, isDragActive } = useDropzone({ onDrop: handleDrop })

  return (
    <div {...getRootProps({ className: cx(styles.wrapper, className, isDragActive && styles.draggingPlaceholder) })}>
      {!isDragActive && (
        <div className={styles.fileStack}>
          {fileList.map(file => {
            const isSelected = currentFile && currentFile.path === file.path
            return (
              <FileItem
                key={file.path}
                file={file}
                isSelected={isSelected}
                onFileClick={onFileClick}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FileList
