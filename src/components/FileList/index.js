import React, { useCallback } from 'react'
import cx from 'classnames'
import { useDropzone } from 'react-dropzone'

import FileItem from './FileItem'
import styles from './index.module.css'

const FileList = ({
  checkedFiles,
  className,
  currentFile,
  fileList,
  onFileClick,
  onStateClick,
  setCheckedFiles,
  setFileList
}) => {
  const handleDrop = useCallback(files => {
    const fileList = files.map(({ name, path, type: mimeType }) => {
      const [type] = mimeType.split('/')
      return { id: path, name, path, type }
    })
    const sortedFileList = fileList.sort((a, b) => a.name.localeCompare(b.name))
    setCheckedFiles([])
    setFileList(sortedFileList)
  }, [])
  const { getRootProps, isDragActive } = useDropzone({ onDrop: handleDrop })

  return (
    <div {...getRootProps({ className: cx(styles.wrapper, className, isDragActive && styles.draggingPlaceholder) })}>
      {!isDragActive && (
        <div className={styles.fileStack}>
          {fileList.map(file => {
            const isSelected = currentFile && currentFile.id === file.id
            const isChecked = checkedFiles.includes(file.id)
            return (
              <FileItem
                key={file.id}
                file={file}
                isSelected={isSelected}
                onFileClick={onFileClick}
                onStateClick={onStateClick}
                isChecked={isChecked}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FileList
