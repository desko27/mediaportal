import React from 'react'

import styles from './index.module.css'

const Header = ({ filesNumber }) => {
  return (
    <div className={styles.wrapper}>
      <span>{filesNumber || '--'} files</span>
    </div>
  )
}

export default Header
