import React from 'react'
import PropTypes from 'prop-types'
import './SettingsLink.scss'

function SettingsLink({ action, message, icon, legend }) {

  return (
    <div className="container-setup">
      <div className="container-icon">
        <img src={icon} alt={legend} />
      </div>
      <a href="#" title={message} onClick={action}>{message}</a>
    </div>
  )
}

SettingsLink.propTypes = {
  action: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
}

export default SettingsLink
