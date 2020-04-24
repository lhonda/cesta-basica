import React from 'react'
import PropTypes from 'prop-types'
import './RadioButton.scss'

function RadioButton({ name, options, handleChecked }) {
  return (
    <div className="radioButton-container">
      {options.map((option) => (
        <div className="radioButton-content">
          <input name={name} onChange={handleChecked} value={option} type="radio" id={option} />
          <label htmlFor={option} key={option}>
            {option}
          </label>
        </div>
      ))}
    </div>
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
