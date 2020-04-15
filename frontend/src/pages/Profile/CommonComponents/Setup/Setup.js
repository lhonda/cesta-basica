import React from 'react'
import './Setup.scss'

function Setup({ action, message, icon, legend }) {
  return (
    <div className="container-setup">
      <div className="container-icon">
        <img src={icon} alt={legend} />
      </div>
      <a onClick={action}>{message}</a>
    </div>
  )
}

export default Setup
