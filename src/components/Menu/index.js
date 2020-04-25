import React from 'react'
import cx from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import { version } from '../../../package.json'

import MenuItem from './MenuItem'
import styles from './index.module.css'

const { shell } = window.require('electron')
const openUrl = url => shell.openExternal(url)

const FLEX_SPACER = <div style={{ flexGrow: 1, minHeight: 15 }} />
const LINKS = {
  USER_MANUAL: locale => {
    const localizedExtension = locale === 'en' ? '' : `.${locale}`
    return `https://github.com/desko27/mediaportal/blob/master/README${localizedExtension}.md`
  },
  SOURCE_CODE: 'https://github.com/desko27/mediaportal',
  REPORT_ISSUE: 'https://github.com/desko27/mediaportal/issues/new',
  SEND_COMMENTS: 'mailto:desko27@gmail.com'
}

const Menu = ({
  isOpen,
  isUpdateAvailable,
  lang,
  performUpdate,
  setIsOpen
}) => {
  const { locale } = useIntl()
  return (
    <div className={cx(styles.wrapper, isOpen && styles.isOpen)}>
      <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      <div className={styles.menu}>
        {isUpdateAvailable && (
          <MenuItem hasNotification onClick={performUpdate}>
            <FormattedMessage id='menu.download-update' />
          </MenuItem>
        )}
        <MenuItem onClick={() => openUrl(LINKS.USER_MANUAL(locale))}>
          <FormattedMessage id='menu.see-user-manual' />
        </MenuItem>
        <MenuItem onClick={() => openUrl(LINKS.SOURCE_CODE)}>
          <FormattedMessage id='menu.source-code' />
        </MenuItem>
        <MenuItem onClick={() => openUrl(LINKS.REPORT_ISSUE)}>
          <FormattedMessage id='menu.report-issue' />
        </MenuItem>
        <MenuItem onClick={() => openUrl(LINKS.SEND_COMMENTS)}>
          <FormattedMessage id='menu.send-comments' />
        </MenuItem>
        {FLEX_SPACER}
        <MenuItem isDisabled>v{version}</MenuItem>
      </div>
    </div>
  )
}

export default Menu
