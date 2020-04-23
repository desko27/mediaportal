import React from 'react'
import cx from 'classnames'

import { version } from '../../../package.json'

import MenuItem from './MenuItem'

import styles from './index.module.css'

const FLEX_SPACER = <div style={{ flexGrow: 1 }} />

const Menu = ({ isOpen, setIsOpen }) => {
  return (
    <div className={cx(styles.wrapper, isOpen && styles.isOpen)}>
      <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      <div className={styles.menu}>
        <MenuItem>Download update</MenuItem>
        <MenuItem>See user manual</MenuItem>
        <MenuItem>Source code</MenuItem>
        <MenuItem>Report an issue</MenuItem>
        <MenuItem>Send comments</MenuItem>
        {FLEX_SPACER}
        <MenuItem>v{version}</MenuItem>
      </div>
    </div>
  )
}

export default Menu
