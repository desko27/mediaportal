import React from 'react'
import cx from 'classnames'

import { ReactComponent as XCircleIcon } from './icons/x-circle.svg'

import styles from './index.module.css'

const Header = ({ className, filesNumber, onRemoveChecksClick }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div>
        <button
          className={styles.removeChecksButton}
          onClick={onRemoveChecksClick}
        >
          <XCircleIcon />
        </button>
      </div>
      <span>{filesNumber || '--'} files</span>
    </div>
  )
}

export default Header
