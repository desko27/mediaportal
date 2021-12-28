import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from './index.module.css'

const UpdateButton = ({ onClick }) => {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      <FormattedMessage id='header.update' />
    </button>
  )
}

export default UpdateButton
