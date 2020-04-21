import React, { useState } from 'react'
import cx from 'classnames'

import { ReactComponent as RadioIcon } from './icons/radio.svg'
import { ReactComponent as FilmIcon } from './icons/film.svg'
import { ReactComponent as ImageIcon } from './icons/image.svg'
import { ReactComponent as CheckIcon } from './icons/check.svg'

import styles from './index.module.css'

const FileItem = ({ file, isSelected, isChecked, onFileClick, onStateClick }) => {
  const [isFileButtonHover, setIsFileButtonHover] = useState()
  const [isFileStateHover, setIsFileStateHover] = useState()
  const { id, name, type } = file

  const dotSplitedName = name.split('.')
  const hasExtension = dotSplitedName.length > 1
  const [extension] = hasExtension && dotSplitedName.slice(-1)
  const baseName = hasExtension ? dotSplitedName.slice(0, -1).join('.') : name

  return (
    <div
      className={cx(
        styles.wrapper,
        isSelected && styles.isSelected,
        isChecked && styles.isChecked,
        isFileButtonHover && styles.isFileButtonHover,
        isFileStateHover && styles.isFileStateHover
      )}
    >
      <button
        className={styles.fileState}
        onClick={() => onStateClick(file)}
        onMouseEnter={() => setIsFileStateHover(true)}
        onMouseLeave={() => setIsFileStateHover(false)}
      >
        {(isSelected || isFileButtonHover)
          ? <RadioIcon />
          : (isChecked || isFileStateHover) && <CheckIcon />}
      </button>
      <button
        key={id}
        className={styles.fileButton}
        onClick={() => onFileClick(file)}
        onMouseEnter={() => setIsFileButtonHover(true)}
        onMouseLeave={() => setIsFileButtonHover(false)}
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
  )
}

export default FileItem
