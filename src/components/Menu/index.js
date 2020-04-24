import React from 'react'
import cx from 'classnames'

import { version } from '../../../package.json'
import MenuItem from './MenuItem'
import styles from './index.module.css'

const { shell } = window.require('electron')
const openUrl = url => shell.openExternal(url)

const FLEX_SPACER = <div style={{ flexGrow: 1, minHeight: 15 }} />
const LINKS = {
  USER_MANUAL: 'https://github.com/desko27/mediaportal/blob/master/README.md',
  SOURCE_CODE: 'https://github.com/desko27/mediaportal',
  REPORT_ISSUE: 'https://github.com/desko27/mediaportal/issues/new',
  SEND_COMMENTS: 'mailto:desko27@gmail.com'
}

const Menu = ({
  isOpen,
  isUpdateAvailable,
  performUpdate,
  setIsOpen
}) => {
  return (
    <div className={cx(styles.wrapper, isOpen && styles.isOpen)}>
      <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      <div className={styles.menu}>
        {isUpdateAvailable && (
          <MenuItem hasNotification onClick={performUpdate}>Download update</MenuItem>
        )}
        <MenuItem onClick={() => openUrl(LINKS.USER_MANUAL)}>See user manual </MenuItem>
        <MenuItem onClick={() => openUrl(LINKS.SOURCE_CODE)}>Source code</MenuItem>
        <MenuItem onClick={() => openUrl(LINKS.REPORT_ISSUE)}>Report an issue</MenuItem>
        <MenuItem onClick={() => openUrl(LINKS.SEND_COMMENTS)}>Send comments</MenuItem>
        {FLEX_SPACER}
        <MenuItem isDisabled>v{version}</MenuItem>
      </div>
    </div>
  )
}

export default Menu
