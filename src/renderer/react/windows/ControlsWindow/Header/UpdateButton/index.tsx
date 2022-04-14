import { useTranslation } from 'react-i18next'

import styles from './index.module.css'

interface Props {
  onClick: () => void
}

export default function UpdateButton ({ onClick }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <button className={styles.wrapper} onClick={onClick}>
      {t('header.update')}
    </button>
  )
}
