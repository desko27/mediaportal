import { useRef } from 'react'
import cx from 'clsx'

import styles from './index.module.css'

interface Props {
  className: string
  elapsedRatio: number
  isPaused: boolean
  onClick: ({ wantedRatio }: { wantedRatio: number }) => void
}

export default function ElapsedTimeBar ({
  className,
  elapsedRatio = 0,
  isPaused,
  onClick
}: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    if (ref.current === null) return
    const elementWidth = ref.current.offsetWidth
    const elementX = ref.current.offsetLeft
    const mouseX = e.clientX
    const wantedRatio = (mouseX - elementX) / elementWidth
    onClick({ wantedRatio })
  }

  return (
    <div
      ref={ref}
      style={{ '--right': `${(1 - elapsedRatio) * 100}%` }}
      className={cx(styles.wrapper, className, isPaused && styles.isPaused)}
      onClick={handleClick}
    />
  )
}
