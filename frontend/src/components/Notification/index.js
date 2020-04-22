import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

function Notification({ qntd }) {
  return (
    <>
      <div className="filterNotification-container">
        <span>{qntd}</span>
      </div>
    </>
  )
}

Notification.propTypes = {
  qntd: PropTypes.number,
}

Notification.defaultProps = {
  qntd: 0,
}

export { Notification }
