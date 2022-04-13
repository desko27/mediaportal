import type { MediaFile, Displayer, VideoState } from '@types'

import { useEffect, useRef } from 'react'

import styles from './index.module.css'

export type DisplayerRef = React.MutableRefObject<Displayer | null>

interface Props {
  displayerRef?: DisplayerRef
  file: MediaFile | null
  isMuted?: boolean
  onVideoUpdate?: (fileToCheck: MediaFile, updatedState: VideoState) => void
  playbackRate?: number
}

export default function MediaDisplayer ({
  displayerRef,
  file,
  isMuted = false,
  onVideoUpdate = () => {},
  playbackRate
}: Props): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null)

  /**
   * Allow triggering a video action from the outside
   */
  if (typeof displayerRef !== 'undefined') {
    displayerRef.current = {
      video: {
        setElapsedRatio (wantedRatio) {
          const video = videoRef.current
          if (video === null) return
          video.currentTime = wantedRatio * video.duration
        },
        async play () {
          const video = videoRef.current
          if (video === null) return
          return await video.play()
        },
        pause () {
          const video = videoRef.current
          if (video === null) return
          video.pause()
        }
      }
    }
  }

  useEffect(() => {
    if (file === null) return
    if (file.type === 'video') {
      const video = videoRef.current
      if (video === null) return

      if (video !== null && typeof playbackRate !== 'undefined') {
        video.defaultPlaybackRate = playbackRate
      }

      const timeupdateListener = (): void => {
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
      void video.play()

      return () => {
        video.removeEventListener('timeupdate', timeupdateListener)
      }
    }
  }, [file])

  const renderMedia = (): React.ReactNode => {
    if (file === null) return null

    const { name, type, path } = file
    const hasPath = typeof path === 'string' && path.length > 0
    const webPath = hasPath ? `file://${path}` : undefined

    const videoNode = (
      <video ref={videoRef} muted={isMuted}>
        <source src={webPath} />
      </video>
    )

    return type === 'image'
      ? <img src={webPath} alt={name} draggable={false} />
      : videoNode
  }

  return (
    <div className={styles.wrapper}>
      {renderMedia()}
    </div>
  )
}
