import React from 'react'
import cx from 'clsx'
import { useDropzone } from 'react-dropzone'
import { Droppable } from 'react-beautiful-dnd'

import FileItem from './FileItem'
import styles from './index.module.css'

const FileList = ({
  checkedFiles,
  className: classNameProp,
  currentFile,
  fileList,
  onDropFiles,
  onFileClick,
  onStateClick,
  willRemoveChecks
}) => {
  const { getRootProps, isDragActive } = useDropzone({ onDrop: onDropFiles })
  const className = cx(styles.wrapper, classNameProp, isDragActive && styles.draggingPlaceholder)

  return (
    <div {...getRootProps({ className })}>
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
