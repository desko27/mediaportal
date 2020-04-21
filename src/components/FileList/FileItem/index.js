import React from 'react'
import cx from 'classnames'

import { ReactComponent as RadioIcon } from './icons/radio.svg'
import { ReactComponent as FilmIcon } from './icons/film.svg'
import { ReactComponent as ImageIcon } from './icons/image.svg'

import styles from './index.module.css'

const FileItem = ({ file, isSelected, onFileClick }) => {
  const { name, path, type } = file
  return (
    <div className={cx(styles.wrapper, isSelected && styles.isSelected)}>
      <div className={styles.fileState}>
        {isSelected && <RadioIcon />}
      </div>
      <button
        key={path}
        className={styles.fileButton}
        onClick={() => onFileClick(file)}
      >
        <span className={styles.fileButtonType}>
          {type === 'video' ? <FilmIcon /> : <ImageIcon />}
        </span>
        <span className={styles.fileButtonText}>
          {name}
        </span>
      </button>
    </div>
  )
}

export default FileItem
