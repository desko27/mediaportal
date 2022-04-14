import cx from 'clsx'
import { useTranslation } from 'react-i18next'

import { ReactComponent as XCircleIcon } from './icons/x-circle.svg'
import { ReactComponent as MenuIcon } from './icons/menu.svg'
import UpdateButton from './UpdateButton'

import styles from './index.module.css'

interface Props {
  checkedFiles: string[]
  className: string
  filesNumber: number
  isUpdateAvailable: boolean
  onMenuClick: () => void
  onRemoveChecksClick: () => void
  onRemoveChecksHover: (isHover: boolean) => void
  performUpdate: () => void
}

const FLEX_SPACER = <div style={{ flexGrow: 1 }} />

export default function Header ({
  checkedFiles,
  className,
  filesNumber,
  isUpdateAvailable,
  onMenuClick,
  onRemoveChecksClick,
  onRemoveChecksHover,
  performUpdate
}: Props): JSX.Element {
  const { t } = useTranslation()
  const progressRatio = filesNumber !== 0 ? (checkedFiles.length / filesNumber) : 0
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
        {Boolean(filesNumber) && `${Math.round(progressRatio * 100)}% | `}
        {filesNumber !== 0 ? filesNumber : '--'} {t('header.files')}
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
