import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './SettingsLink.scss'

export function SettingsLink({ handleClick, message, icon, legend, to }) {
  return (
    <div className="containerSettingsLink">
      <div className="containerIcon">
        <img src={icon} alt={legend} />
      </div>
      <Link to={to} onClick={handleClick}>
        {message}
      </Link>
    </div>
  )
}

SettingsLink.propTypes = {
  handleClick: PropTypes.func,
  message: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}
