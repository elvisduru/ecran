import React from 'react'
import PropTypes from 'prop-types'

export const Heading = ({ children, style }) => <h2 style={{
  fontSize: '18px',
  fontWeight: '500',
  margin: 0,
  marginBottom: '30px',
  ...style,
}}>
  {children}
</h2>

Heading.propTypes = {
  style: PropTypes.object
}