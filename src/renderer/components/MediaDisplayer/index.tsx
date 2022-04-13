import type { MediaFile } from '@types'

import { useEffect, useRef } from 'react'

import styles from './index.module.css'

type VideoActionType =
  'play' |
  'pause' |
  'setElapsedRatio'

export interface VideoAction {type: VideoActionType, args: unknown[]}
export type TriggerVideoAction = (action: VideoAction) => void
export interface Displayer {triggerVideoAction: TriggerVideoAction}
export type DisplayerRef = React.MutableRefObject<Displayer | null>
export interface VideoState {
  elapsedTime: number
  elapsedRatio: number
  isPaused: boolean
}

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
      triggerVideoAction (action) {
        const video = videoRef.current
        if (video === null) return

        const { type, args } = action

        // special managed actions
        if (type === 'setElapsedRatio') {
          const isSetElapsedRatioArgs = (args: unknown[]): args is [number] =>
            args.length === 1 && typeof args[0] === 'number'
          if (!isSetElapsedRatioArgs(args)) throw new Error('Bad arguments for `setElapsedRatio` video action')

          const [wantedRatio] = args
          video.currentTime = wantedRatio * video.duration
          return
        }

        // directly mirrored media element functions w/o arguments
        void video[type]()
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
