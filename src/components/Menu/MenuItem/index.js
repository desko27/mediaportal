import React from 'react'
import cx from 'classnames'

import styles from './index.module.css'

const MenuItem = ({ children, isDisabled, onClick = () => {} }) => {
  return (
    <button
      className={cx(styles.wrapper, isDisabled && styles.isDisabled)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default MenuItem
