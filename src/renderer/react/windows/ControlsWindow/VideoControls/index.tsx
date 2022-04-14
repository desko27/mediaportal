
import type { VideoState } from '@types'

import cx from 'clsx'
import { useTranslation } from 'react-i18next'

import ElapsedTimeBar from './ElapsedTimeBar'
import { ReactComponent as PlayIcon } from './icons/play.svg'
import { ReactComponent as PauseIcon } from './icons/pause.svg'

import styles from './index.module.css'

interface Props {
  className: string
  sendAction: (type: string, ...args: unknown[]) => void
  video?: VideoState
}

const getMinutesString = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const restOfSeconds = `${Math.floor(seconds % 60)}`.padStart(2, '0')
  return `${minutes}:${restOfSeconds}`
}

export default function VideoControls ({ className, sendAction, video }: Props): JSX.Element {
  const { t } = useTranslation()
  const baseClass = cx(styles.wrapper, className)

  if (typeof video === 'undefined') {
    return (
      <div className={baseClass}>
        {t('media-controls.no-video-selected')}
      </div>
    )
  }

  const handleElapsedTimeClick = ({ wantedRatio }: { wantedRatio: number }): void => {
    sendAction('setElapsedRatio', wantedRatio)
  }

  return (
    <div className={baseClass}>
      <button
        className={styles.playToggle}
        onClick={() => sendAction(video.isPaused ? 'play' : 'pause')}
      >
        {video.isPaused ? <PlayIcon /> : <PauseIcon />}
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
