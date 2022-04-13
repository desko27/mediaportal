import cx from 'clsx'
import { useTranslation } from 'react-i18next'
import { version } from '../../../../package.json'

import MenuItem from './MenuItem'
import styles from './index.module.css'

interface Props {
  isOpen: boolean
  isUpdateAvailable: boolean
  performUpdate: () => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const { shell } = window.electron
const openUrl = (url: string): void => shell.openExternal(url)

const FLEX_SPACER = <div style={{ flexGrow: 1, minHeight: 15 }} />
const LINKS = {
  USER_MANUAL: (locale: string) => {
    const localizedExtension = locale === 'en' ? '' : `.${locale}`
    return `https://github.com/desko27/mediaportal/blob/master/README${localizedExtension}.md`
  },
  SOURCE_CODE: 'https://github.com/desko27/mediaportal',
  REPORT_ISSUE: 'https://github.com/desko27/mediaportal/issues/new',
  SEND_FEEDBACK: 'mailto:desko27@gmail.com'
}

export default function Menu ({
  isOpen,
  isUpdateAvailable,
  performUpdate,
  setIsOpen
}: Props): JSX.Element {
  const { t, i18n } = useTranslation()
  return (
    <div className={cx(styles.wrapper, isOpen && styles.isOpen)}>
      <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      <div className={styles.menu}>
        {isUpdateAvailable && (
          <MenuItem hasNotification onClick={performUpdate}>
            {t('menu.download-update')}
          </MenuItem>
        )}
        <MenuItem onClick={() => openUrl(LINKS.USER_MANUAL(i18n.language))}>
          {t('menu.see-user-manual')}
        </MenuItem>
        <MenuItem onClick={() => openUrl(LINKS.SOURCE_CODE)}>
          {t('menu.source-code')}
        </MenuItem>
        <MenuItem onClick={() => openUrl(LINKS.REPORT_ISSUE)}>
          {t('menu.report-issue')}
        </MenuItem>
        <MenuItem onClick={() => openUrl(LINKS.SEND_FEEDBACK)}>
          {t('menu.send-feedback')}
        </MenuItem>
        {FLEX_SPACER}
        <MenuItem isDisabled>v{version}</MenuItem>
      </div>
    </div>
  )
}
