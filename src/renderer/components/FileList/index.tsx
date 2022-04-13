import type { MediaFile } from '@types'

import cx from 'clsx'
import { useDropzone } from 'react-dropzone'
import { Droppable } from 'react-beautiful-dnd'

import FileItem from './FileItem'
import styles from './index.module.css'

interface Props {
  checkedFiles: string[]
  className: string
  currentFile: MediaFile | null
  fileList: MediaFile[]
  onDropFiles: (files: File[]) => void
  onFileClick: (file: MediaFile) => void
  onStateClick: (file: MediaFile) => void
  willRemoveChecks: boolean
}

export default function FileList ({
  checkedFiles,
  className: classNameProp,
  currentFile,
  fileList,
  onDropFiles,
  onFileClick,
  onStateClick,
  willRemoveChecks
}: Props): JSX.Element {
  const { getRootProps, isDragActive } = useDropzone({ onDrop: onDropFiles, noClick: true })
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
                const isSelected = currentFile !== null ? currentFile.id === file.id : false
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
