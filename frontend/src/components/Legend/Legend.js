import React from 'react'
import PropTypes from 'prop-types'
import './Legend.scss'
import { LegendTypes } from './LegendTypes'

function Legend({ type, orientation, message }) {
  return <h5 className={`legend__${type} ${orientation}`}>{message}</h5>
}

Legend.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  orientation: PropTypes.string,
}
Legend.defaultProps = {
  type: LegendTypes.NORMAL,
  orientation: LegendTypes.START,
}

export default Legend
