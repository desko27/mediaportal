import React, { useRef } from 'react'
import cx from 'classnames'

import styles from './index.module.css'

const ElapsedTime = ({ className, progress = 50, onClick }) => {
  const ref = useRef()

  const handleClick = e => {
    const elementWidth = ref.current.offsetWidth
    const elementX = ref.current.offsetLeft
    const mouseX = e.clientX
    const wantedProgress = ((mouseX - elementX) / elementWidth) * 100
    onClick({ wantedProgress })
  }

  return (
    <div
      ref={ref}
      style={{ '--right': `${100 - progress}%` }}
      className={cx(styles.wrapper, className)}
      onClick={handleClick}
    />
  )
}

export default ElapsedTime
