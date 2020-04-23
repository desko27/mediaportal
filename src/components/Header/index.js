import React from 'react'
import cx from 'classnames'

import { ReactComponent as XCircleIcon } from './icons/x-circle.svg'
import { ReactComponent as MenuIcon } from './icons/menu.svg'

import styles from './index.module.css'

const Header = ({
  checkedFiles,
  className,
  filesNumber,
  onMenuClick,
  onRemoveChecksClick,
  onRemoveChecksHover
}) => {
  const progressRatio = filesNumber && (checkedFiles.length / filesNumber)

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.flexLine}>
        <button
          className={cx(styles.headerIconButton, styles.removeChecksButton)}
          onClick={onRemoveChecksClick}
          onMouseEnter={() => onRemoveChecksHover(true)}
          onMouseLeave={() => onRemoveChecksHover(false)}
        >
          <XCircleIcon />
        </button>
        <span className={styles.filesInfo}>
          {!!filesNumber && `${Math.round(progressRatio * 100)}% | `}
          {filesNumber || '--'} files
        </span>
      </div>
      <div className={styles.flexLine}>
        <button
          className={styles.headerIconButton}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </button>
      </div>
    </div>
  )
}

export default Header
