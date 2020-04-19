import React from 'react'

import ElapsedTime from './ElapsedTime'

import styles from './index.module.css'

const VideoControls = ({ videoAction, elapsedTime }) => {
  const handleElapsedTimeClick = ({ wantedProgress }) => {
    videoAction('setElapsedTimePercent', wantedProgress)
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => videoAction('play')}>▶️</button>
      <button onClick={() => videoAction('pause')}>⏸</button>
      <ElapsedTime
        className={styles.elapsedTime}
        progress={elapsedTime}
        onClick={handleElapsedTimeClick}
      />
    </div>
  )
}

export default VideoControls
