import React from 'react'
import cx from 'classnames'

import MenuItem from './MenuItem'

import styles from './index.module.css'

const Menu = ({ isOpen }) => {
  return (
    <div className={cx(styles.wrapper, isOpen && styles.isOpen)}>
      <MenuItem>Download update</MenuItem>
      <MenuItem>See user manual</MenuItem>
      <MenuItem>Source code</MenuItem>
      <MenuItem>Report an issue</MenuItem>
      <MenuItem>Send comments</MenuItem>
    </div>
  )
}

export default Menu
