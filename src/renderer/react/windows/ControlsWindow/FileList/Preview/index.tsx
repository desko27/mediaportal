import type { MediaFile } from '@types'

import MediaDisplayer from '@components/MediaDisplayer'

import styles from './index.module.css'

interface Props {
  file: MediaFile
}

const PLAYBACK_RATE = 5

export default function Preview ({ file }: Props): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <MediaDisplayer file={file} isMuted playbackRate={PLAYBACK_RATE} />
    </div>
  )
}
