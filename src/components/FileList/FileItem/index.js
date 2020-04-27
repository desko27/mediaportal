import React, { useState } from 'react'
import cx from 'classnames'
import { Draggable } from 'react-beautiful-dnd'

import { ReactComponent as RadioIcon } from './icons/radio.svg'
import { ReactComponent as FilmIcon } from './icons/film.svg'
import { ReactComponent as ImageIcon } from './icons/image.svg'
import { ReactComponent as CheckIcon } from './icons/check.svg'

import styles from './index.module.css'

const FileItem = ({
  file,
  index,
  isChecked,
  isSelected,
  onFileClick,
  onStateClick,
  willRemoveChecks
}) => {
  const [isFileButtonHover, setIsFileButtonHover] = useState()
  const [isFileStateHover, setIsFileStateHover] = useState()
  const { name, type } = file

  const dotSplitedName = name.split('.')
  const hasExtension = dotSplitedName.length > 1
  const [extension] = hasExtension && dotSplitedName.slice(-1)
  const baseName = hasExtension ? dotSplitedName.slice(0, -1).join('.') : name

  const handleStateClick = () => {
    onStateClick(file)
    setIsFileStateHover(false) // like if onMouseLeave happened
  }

  return (
    <Draggable draggableId={file.id} index={index} disableInteractiveElementBlocking>
      {provided => (
        <div
          className={cx(
            styles.wrapper,
            isSelected && styles.isSelected,
            isChecked && styles.isChecked,
            isFileButtonHover && styles.isFileButtonHover,
            isFileStateHover && styles.isFileStateHover,
            willRemoveChecks && styles.willRemoveChecks
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <button
            className={styles.fileState}
            onClick={handleStateClick}
            onMouseEnter={() => setIsFileStateHover(true)}
            onMouseLeave={() => setIsFileStateHover(false)}
          >
            {(isSelected || isFileButtonHover)
              ? <RadioIcon />
              : (isChecked || isFileStateHover) && <CheckIcon />}
          </button>
          <button
            className={styles.fileButton}
            onClick={() => onFileClick(file)}
            onMouseEnter={() => setIsFileButtonHover(true)}
            onMouseLeave={() => setIsFileButtonHover(false)}
            {...provided.dragHandleProps}
          >
            <span className={styles.fileButtonType}>
              {type === 'video' ? <FilmIcon /> : <ImageIcon />}
            </span>
            <span className={styles.fileButtonText}>
              <span>{baseName}</span>
              {extension &&
                <span className={styles.fileButtonTextExtension}>.{extension}</span>}
            </span>
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default FileItem
