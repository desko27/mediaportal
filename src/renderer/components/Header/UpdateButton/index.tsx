import { FormattedMessage } from 'react-intl'

import styles from './index.module.css'

interface Props {
  onClick: () => void
}

export default function UpdateButton ({ onClick }: Props): JSX.Element {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      <FormattedMessage id='header.update' />
    </button>
  )
}
