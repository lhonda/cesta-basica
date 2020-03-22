import React from 'react'
import PropTypes from 'prop-types'
import './Checkbox.scss'

function Checkbox({ message, handleChecked, checked }) {
  const handleCheckbox = () => {
    document.getElementById('checkbox-terms').checked = !document.getElementById('checkbox-terms').checked
    handleChecked()
  }
  return (
    <>
      <label htmlFor="checkbox-terms" className="container-checkbox">
        {message}
        <input
          name="checkbox"
          onChange={handleCheckbox}
          checked={checked}
          className="checkbox"
          id="checkbox-terms"
          type="checkbox"
        />
        <span className="checkmark" />
      </label>
    </>
  )
}
Checkbox.propTypes = {
  message: PropTypes.string,
  handleChecked: PropTypes.func,
  checked: PropTypes.bool,
}

Checkbox.defaultProps = {
  message: '',
  handleChecked: () => {},
  checked: false,
}

export default Checkbox
