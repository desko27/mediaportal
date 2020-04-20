import React from 'react'

import ElapsedTimeBar from './ElapsedTimeBar'

import styles from './index.module.css'

const VideoControls = ({ sendAction, video }) => {
  if (!video) {
    return (
      <div className={styles.wrapper}>
        No video selected
      </div>
    )
  }

  const handleElapsedTimeClick = ({ wantedRatio }) => {
    sendAction('setElapsedRatio', wantedRatio)
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => sendAction('play')}>▶️</button>
      <button onClick={() => sendAction('pause')}>⏸</button>
      <ElapsedTimeBar
        className={styles.elapsedTimeBar}
        elapsedRatio={video.elapsedRatio}
        onClick={handleElapsedTimeClick}
      />
    </div>
  )
}

export default VideoControls
