import React from 'react'
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
  onDropFiles,
  willRemoveChecks
}) => {
  const { getRootProps, isDragActive } = useDropzone({ onDrop: onDropFiles })

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
                willRemoveChecks={willRemoveChecks}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FileList
