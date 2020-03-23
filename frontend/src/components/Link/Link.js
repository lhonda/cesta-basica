import React from 'react'
import PropTypes from 'prop-types'
import './Link.scss'

function Link({ action, message }) {
  return (
    <a onClick={action} className="link">
      {message}
    </a>
  )
}
Link.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}

export default Link
