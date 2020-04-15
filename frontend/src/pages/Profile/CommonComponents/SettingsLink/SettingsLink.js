import React from 'react'
import './SettingsLink.scss'

function Setup({ action, message, icon, legend }) {
  return (
    <div className="container-setup">
      <div className="container-icon">
        <img src={icon} alt={legend} />
      </div>
      <a href="#" title={message} onClick={action}>{message}</a>
    </div>
  )
}

export default Setup
