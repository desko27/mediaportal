import React from 'react'

import MediaDisplayer from '../../MediaDisplayer'

import styles from './index.module.css'

export default function Preview ({ file }) {
  return (
    <div className={styles.wrapper}>
      <MediaDisplayer file={file} isMuted />
    </div>
  )
}
