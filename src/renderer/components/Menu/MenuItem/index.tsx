import cx from 'clsx'

import styles from './index.module.css'

interface Props {
  children: React.ReactNode
  hasNotification?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

const noop = (): void => {}

export default function MenuItem ({
  children,
  hasNotification = false,
  isDisabled = false,
  onClick = noop
}: Props): JSX.Element {
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
