export interface MediaFile {
  id: string
  name: string
  path: string
  type: string
  hash: string
}

export interface Displayer {
  video: {
    play: () => Promise<void>
    pause: () => void
    setElapsedRatio: (ratio: number) => void
  }
}

export interface VideoState {
  elapsedTime: number
  elapsedRatio: number
  isPaused: boolean
}

export interface PortalState {
  resource?: { type: string }
  video?: VideoState
}

type VideoActionType = 'play' | 'pause' | 'setElapsedRatio'
export interface VideoAction {type: VideoActionType, args: unknown[]}
