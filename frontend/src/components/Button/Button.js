import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

import { ButtonTypes } from './ButtonTypes'

export default function Button({ type, message }) {
  return (
    <button type="submit" className={`button-${type}`}>
      {message}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
}

Button.defaultProps = {
  type: ButtonTypes.FILL,
  message: '',
}
