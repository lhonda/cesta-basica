import React from 'react'
import PropTypes from 'prop-types'
import './RadioButton.scss'

function RadioButton({ name, options, handleChecked }) {
  return (
    <>
    {options.map( option =>
      <label htmlFor={option} key={option}>
        <input
          name={name}
          onChange={handleChecked}
          value={option}
          type="radio"
          id={option}
        />

        {option}
      </label>
      )}
    </>
  )
}
RadioButton.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  handleChecked: PropTypes.func,
  checked: PropTypes.bool,
}

RadioButton.defaultProps = {
  name: 'radio',
  options: [],
  handleChecked: () => {},
  checked: false,
}

export default RadioButton
