import React from 'react'
import PropTypes from 'prop-types'
import './Checkbox.scss'

function Checkbox({ message, handleChecked, checked, disabled }) {
  return (
    <>
      <label className="container-checkbox">
        {message}
        <input
          name="checkbox"
          onChange={handleChecked}
          tabIndex={0}
          checked={checked}
          className="checkbox"
          type="checkbox"
          disabled={disabled}
        />
        <span className="checkmark" />
      </label>
    </>
  )
}
Checkbox.propTypes = {
  disabled: PropTypes.bool,
  message: PropTypes.string,
  handleChecked: PropTypes.func,
  checked: PropTypes.bool,
}

Checkbox.defaultProps = {
  message: '',
  handleChecked: () => {},
  checked: false,
  disabled: false,
}

export default Checkbox
