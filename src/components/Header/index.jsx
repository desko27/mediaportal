import React from 'react'
import cx from 'classnames'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as XCircleIcon } from './icons/x-circle.svg'
import { ReactComponent as MenuIcon } from './icons/menu.svg'
import UpdateButton from './UpdateButton'

import styles from './index.module.css'

const FLEX_SPACER = <div style={{ flexGrow: 1 }} />

const Header = ({
  checkedFiles,
  className,
  filesNumber,
  isUpdateAvailable,
  onMenuClick,
  onRemoveChecksClick,
  onRemoveChecksHover,
  performUpdate
}) => {
  const progressRatio = filesNumber && (checkedFiles.length / filesNumber)
  const hasNotification = !!isUpdateAvailable

  return (
    <div className={cx(styles.wrapper, className, hasNotification && styles.hasNotification)}>
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
        {filesNumber || '--'} <FormattedMessage id='header.files' />
      </span>
      {FLEX_SPACER}
      {isUpdateAvailable && <UpdateButton onClick={performUpdate} />}
      <button
        className={cx(styles.headerIconButton, styles.menuButton)}
        onClick={onMenuClick}
      >
        <MenuIcon />
      </button>
    </div>
  )
}

export default Header
