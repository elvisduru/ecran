import React from 'react'
import PropTypes from 'prop-types'
import styles from './Stat.module.css'
import { Card } from 'antd'

const Stat = ({ icon, count, title }) => {
  return (
    <Card style={{ width: '153px', borderRadius: '30px' }}>
      <div className={styles.Stat}>
        <div>
          <img src={icon} alt="" />
        </div>
        <p>{new Intl.NumberFormat('en', { notation: "compact" }).format(count)}</p>
        <p>{title}</p>
      </div>
    </Card>
  )
}

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired
}

export default Stat
