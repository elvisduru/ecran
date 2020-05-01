import React from 'react'
import Proptypes from 'prop-types'
import styles from './Box.module.css'

export const Box = ({ children, style }) => {
  return (
    <div className={styles.Box} style={style}>
      {children}
    </div>
  )
}

Box.propTypes = {
  style: Proptypes.object
}
