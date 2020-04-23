import React from 'react'

import styles from './index.module.css'

const MenuItem = ({ children }) => {
  return (
    <button className={styles.wrapper}>
      {children}
    </button>
  )
}

export default MenuItem
