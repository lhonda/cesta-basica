import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

import { ButtonTypes } from './ButtonTypes'

function Button({ type, size, message, disable, handleClick, typeButton }) {
  return (
    <button
      type={typeButton}
      tabIndex={0}
      aria-label={message}
      disabled={disable}
      onClick={handleClick}
      className={`button ${type} ${size}`}
    >
      {message}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  disable: PropTypes.bool,
  handleClick: PropTypes.func,
  size: PropTypes.string,
  typeButton: PropTypes.string,
}

Button.defaultProps = {
  type: ButtonTypes.FILL,
  size: ButtonTypes.MEDIUM,
  message: '',
  disable: false,
  handleClick: () => {},
  typeButton: 'submit',
}
export default Button
