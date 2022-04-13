import type { MediaFile } from '@types'

import { useState } from 'react'
import cx from 'clsx'
import { Draggable } from 'react-beautiful-dnd'

import Preview from '../Preview'

import { ReactComponent as RadioIcon } from './icons/radio.svg'
import { ReactComponent as FilmIcon } from './icons/film.svg'
import { ReactComponent as ImageIcon } from './icons/image.svg'
import { ReactComponent as CheckIcon } from './icons/check.svg'

import styles from './index.module.css'

interface Props {
  file: MediaFile
  index: number
  isChecked: boolean
  isSelected: boolean
  onFileClick: (file: MediaFile) => void
  onStateClick: (file: MediaFile) => void
  willRemoveChecks: boolean
}

export default function FileItem ({
  file,
  index,
  isChecked,
  isSelected,
  onFileClick,
  onStateClick,
  willRemoveChecks
}: Props): JSX.Element {
  const [isFileButtonHover, setIsFileButtonHover] = useState(false)
  const [isFileStateHover, setIsFileStateHover] = useState(false)
  const [isFileTypeHover, setIsFileTypeHover] = useState(false)
  const { name, type } = file

  const dotSplitedName = name.split('.')
  const hasExtension = dotSplitedName.length > 1

  const handleStateClick = (): void => {
    onStateClick(file)
    setIsFileStateHover(false) // like if onMouseLeave happened
  }

  const getBaseName = (): string => {
    if (!hasExtension) return name
    const everythingButLastSegment = dotSplitedName.slice(0, -1).join('.')
    return everythingButLastSegment
  }

  const getExtension = (): string | null => {
    if (!hasExtension) return null
    const [lastSegment] = dotSplitedName.slice(-1)
    return lastSegment
  }

  const extension = getExtension()

  return (
    <>
      <Draggable draggableId={file.id} index={index} disableInteractiveElementBlocking>
        {(provided, snapshot) => (
          <div
            className={cx(
              styles.wrapper,
              isSelected && styles.isSelected,
              isChecked && styles.isChecked,
              isFileButtonHover && styles.isFileButtonHover,
              isFileStateHover && styles.isFileStateHover,
              willRemoveChecks && styles.willRemoveChecks,
              snapshot.isDragging && styles.isDragging
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
              <span
                className={styles.fileButtonType}
                onMouseEnter={() => setIsFileTypeHover(true)}
                onMouseLeave={() => setIsFileTypeHover(false)}
              >
                {type === 'video' ? <FilmIcon /> : <ImageIcon />}
              </span>
              <span className={styles.fileButtonText}>
                <span>{getBaseName()}</span>
                {extension !== null &&
                  <span className={styles.fileButtonTextExtension}>.{extension}</span>}
              </span>
            </button>
          </div>
        )}
      </Draggable>
      {isFileTypeHover && <Preview file={file} />}
    </>
  )
}
