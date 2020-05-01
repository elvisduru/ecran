import React from 'react'
import PropTypes from 'prop-types'
import styles from './ActivityList.module.css'

const ActivityList = ({ activities }) => {
  return (
    <table className={styles.ActivityList}>
      <tbody>
        {activities.map(({ time, action, user, campaign }, index) => (
          <tr key={index}>
            <td>{time}</td>
            <td><span>{campaign}</span> was <span className={styles.action} style={{ color: action === "deleted" ? '#FF0909' : action === "archived" ? '#FD9100' : '#96CF04' }}>{action}</span> successfully by <span>{user}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    campaign: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default ActivityList
