import React, { useRef } from 'react'
import cx from 'classnames'

import styles from './index.module.css'

const ElapsedTimeBar = ({ className, elapsedRatio = 0, onClick }) => {
  const ref = useRef()

  const handleClick = e => {
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
      className={cx(styles.wrapper, className)}
      onClick={handleClick}
    />
  )
}

export default ElapsedTimeBar
