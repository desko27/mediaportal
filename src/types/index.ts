export interface MediaFile {
  id: string
  name: string
  path: string
  type: string
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
