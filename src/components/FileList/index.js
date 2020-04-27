import React from 'react'
import cx from 'classnames'
import { useDropzone } from 'react-dropzone'
import { Droppable } from 'react-beautiful-dnd'

import FileItem from './FileItem'
import styles from './index.module.css'

const FileList = ({
  checkedFiles,
  className,
  currentFile,
  fileList,
  onDropFiles,
  onFileClick,
  onStateClick,
  willRemoveChecks
}) => {
  const { getRootProps, isDragActive } = useDropzone({ onDrop: onDropFiles })

  return (
    <div {...getRootProps({ className: cx(styles.wrapper, className, isDragActive && styles.draggingPlaceholder) })}>
      {!isDragActive && (
        <Droppable droppableId='file-list'>
          {provided => (
            <div
              className={styles.fileStack}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {fileList.map((file, index) => {
                const isSelected = currentFile && currentFile.id === file.id
                const isChecked = checkedFiles.includes(file.id)
                return (
                  <FileItem
                    key={file.id}
                    index={index}
                    file={file}
                    isSelected={isSelected}
                    onFileClick={onFileClick}
                    onStateClick={onStateClick}
                    isChecked={isChecked}
                    willRemoveChecks={willRemoveChecks}
                  />
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  )
}

export default FileList
