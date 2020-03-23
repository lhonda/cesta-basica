import React from 'react'
import PropTypes from 'prop-types'
import './Legend.scss'

function Legend({ message }) {
  return <h5 className="legend">{message}</h5>
}

Legend.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Legend
