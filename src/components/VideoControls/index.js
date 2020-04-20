import React from 'react'

import ElapsedTimeBar from './ElapsedTimeBar'

import styles from './index.module.css'

const getMinutesString = seconds => {
  const minutes = Math.floor(seconds / 60)
  const restOfSeconds = `${Math.floor(seconds % 60)}`.padStart(2, '0')
  return `${minutes}:${restOfSeconds}`
}

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
      <span>{getMinutesString(video.elapsedTime)}</span>
    </div>
  )
}

export default VideoControls
