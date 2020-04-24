import React from 'react'

import styles from './index.module.css'

const UpdateButton = ({ onClick }) => {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      Update!
    </button>
  )
}

export default UpdateButton
