import React from 'react'
import cx from 'classnames'

import { ReactComponent as XCircleIcon } from './icons/x-circle.svg'

import styles from './index.module.css'

const Header = ({
  checkedFiles,
  className,
  filesNumber,
  onRemoveChecksClick,
  onRemoveChecksHover
}) => {
  const progressRatioStr = `${checkedFiles.length}/${filesNumber}`
  const progressRatio = filesNumber && (checkedFiles.length / filesNumber)

  return (
    <div className={cx(styles.wrapper, className)}>
      <div>
        <button
          className={styles.removeChecksButton}
          onClick={onRemoveChecksClick}
          onMouseEnter={() => onRemoveChecksHover(true)}
          onMouseLeave={() => onRemoveChecksHover(false)}
        >
          <XCircleIcon />
        </button>
      </div>
      <span>
        {!!filesNumber && `${Math.round(progressRatio * 100)}% | `}
        {filesNumber ? progressRatioStr : '--'} files
      </span>
    </div>
  )
}

export default Header
