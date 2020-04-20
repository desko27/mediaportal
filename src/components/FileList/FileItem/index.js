import React from 'react'
import cx from 'classnames'

import styles from './index.module.css'

const FileItem = ({ file, isSelected, onFileClick }) => {
  const { name, path } = file
  return (
    <div className={cx(styles.wrapper, isSelected && styles.isSelected)}>
      <div className={styles.fileState}>
        {isSelected && <span role='img' aria-label='pin'>📍</span>}
      </div>
      <button
        key={path}
        className={styles.fileButton}
        onClick={() => onFileClick(file)}
      >
        {name}
      </button>
    </div>
  )
}

export default FileItem
