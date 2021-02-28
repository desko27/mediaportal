import React, { useEffect, useRef } from 'react'

import styles from './index.module.css'

const MediaDisplayer = ({
  displayerRef = {},
  file,
  isMuted,
  onVideoUpdate = () => {},
  playbackRate
}) => {
  const videoRef = useRef()

  /**
   * Allow triggering a video action from the outside
   */
  displayerRef.current = displayerRef.current || {}
  displayerRef.current.triggerVideoAction = action => {
    const video = videoRef.current
    const { type, args } = action

    // special managed actions
    if (type === 'setElapsedRatio') {
      const [wantedRatio] = args
      video.currentTime = wantedRatio * video.duration
      return
    }

    // directly mirrored media element functions
    video[type](...args)
  }

  useEffect(() => {
    if (!file) return
    if (file.type === 'video') {
      const video = videoRef.current

      if (playbackRate) {
        video.defaultPlaybackRate = playbackRate
      }

      const timeupdateListener = () => {
        const elapsedTime = video.currentTime
        const elapsedRatioCalc = video.currentTime / video.duration
        const elapsedRatio = isNaN(elapsedRatioCalc) ? 0 : elapsedRatioCalc

        onVideoUpdate(file, {
          elapsedTime,
          elapsedRatio,
          isPaused: video.paused
        })
      }

      video.addEventListener('timeupdate', timeupdateListener)
      video.load()
      video.play()

      return () => {
        video.removeEventListener('timeupdate', timeupdateListener)
      }
    }
  }, [file])

  const { name, type, path } = file || {}
  const webPath = path && `file://${path}`

  const videoNode = (
    <video ref={videoRef} muted={isMuted}>
      <source src={webPath} />
    </video>
  )

  return (
    <div className={styles.wrapper}>
      {file && (
        type === 'image'
          ? <img src={webPath} alt={name} draggable={false} />
          : videoNode
      )}
    </div>
  )
}

export default MediaDisplayer
