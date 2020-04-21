import React from 'react'
import cx from 'classnames'

import styles from './index.module.css'

const Header = ({ className, filesNumber }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <span>{filesNumber || '--'} files</span>
    </div>
  )
}

export default Header
