import React from 'react'
import cx from 'clsx'

import styles from './index.module.css'

const noop = () => {}

const MenuItem = ({
  children,
  hasNotification,
  isDisabled,
  onClick = noop
}) => {
  return (
    <button
      className={cx(
        styles.wrapper,
        isDisabled && styles.isDisabled,
        hasNotification && styles.hasNotification
      )}
      onClick={onClick}
    >
      {hasNotification && <span className={styles.notificationBall} />}{' '}
      {children}
    </button>
  )
}

export default MenuItem
