import React from 'react'
import cx from 'classnames'

import { ReactComponent as RadioIcon } from './icons/radio.svg'
import { ReactComponent as FilmIcon } from './icons/film.svg'
import { ReactComponent as ImageIcon } from './icons/image.svg'
import { ReactComponent as CheckIcon } from './icons/check.svg'

import styles from './index.module.css'

const FileItem = ({ file, isSelected, isChecked, onFileClick, onStateClick }) => {
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
        isChecked && styles.isChecked
      )}
    >
      <button
        className={styles.fileState}
        onClick={() => onStateClick(file)}
      >
        {isSelected
          ? <RadioIcon />
          : isChecked && <CheckIcon />}
      </button>
      <button
        key={id}
        className={styles.fileButton}
        onClick={() => onFileClick(file)}
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
