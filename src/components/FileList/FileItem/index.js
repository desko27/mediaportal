import React from 'react'
import cx from 'classnames'

import { ReactComponent as RadioIcon } from './icons/radio.svg'
import { ReactComponent as FilmIcon } from './icons/film.svg'
import { ReactComponent as ImageIcon } from './icons/image.svg'

import styles from './index.module.css'

const FileItem = ({ file, isSelected, onFileClick }) => {
  const { name, path, type } = file

  const dotSplitedName = name.split('.')
  const hasExtension = dotSplitedName.length > 1
  const [extension] = hasExtension && dotSplitedName.slice(-1)
  const baseName = hasExtension ? dotSplitedName.slice(0, -1).join('.') : name

  return (
    <div className={cx(styles.wrapper, isSelected && styles.isSelected)}>
      <button className={styles.fileState}>
        {isSelected && <RadioIcon />}
      </button>
      <button
        key={path}
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
