import React from 'react'
import PropTypes from 'prop-types'
import './Select.scss'

function Select({ value, disabled, placeholder, getValue, optionsList }) {
  const handleOnChange = (e) => getValue(e.target.value)
  return (
    <select
      value={value}
      disabled={disabled}
      className="customSelect"
      placeholder={placeholder}
      onChange={handleOnChange}
    >
      {optionsList.map((item) => {
        const { value, string } = item
        return (
          <option key={value} value={value}>
            {string}
          </option>
        )
      })}
    </select>
  )
}
Select.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  getValue: PropTypes.func.isRequired,
  optionsList: PropTypes.array.isRequired,
}

Select.defaultProps = {
  disabled: false,
}

export default Select
