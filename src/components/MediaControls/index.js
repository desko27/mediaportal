import React from 'react'
import cx from 'classnames'

import ElapsedTimeBar from './ElapsedTimeBar'
import srcPlay from './icons/play.svg'
import srcPause from './icons/pause.svg'

import styles from './index.module.css'

const getMinutesString = seconds => {
  const minutes = Math.floor(seconds / 60)
  const restOfSeconds = `${Math.floor(seconds % 60)}`.padStart(2, '0')
  return `${minutes}:${restOfSeconds}`
}

const MediaControls = ({ className, sendAction, video }) => {
  const baseClass = cx(styles.wrapper, className)

  if (!video) {
    return (
      <div className={baseClass}>
        No video selected
      </div>
    )
  }

  const handleElapsedTimeClick = ({ wantedRatio }) => {
    sendAction('setElapsedRatio', wantedRatio)
  }

  return (
    <div className={baseClass}>
      <button
        className={styles.playToggle}
        onClick={() => sendAction(video.isPaused ? 'play' : 'pause')}
      >
        <img src={video.isPaused ? srcPlay : srcPause} />
      </button>
      <ElapsedTimeBar
        className={styles.elapsedTimeBar}
        elapsedRatio={video.elapsedRatio}
        isPaused={video.isPaused}
        onClick={handleElapsedTimeClick}
      />
      <span>{getMinutesString(video.elapsedTime)}</span>
    </div>
  )
}

export default MediaControls
