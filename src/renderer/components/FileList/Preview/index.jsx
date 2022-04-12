import React from 'react'

import MediaDisplayer from '../../MediaDisplayer'

import styles from './index.module.css'

const PLAYBACK_RATE = 5

export default function Preview ({ file }) {
  return (
    <div className={styles.wrapper}>
      <MediaDisplayer file={file} isMuted playbackRate={PLAYBACK_RATE} />
    </div>
  )
}
