import React from 'react'
import PropTypes from 'prop-types'
import './Select.scss'

function Select({ value, placeholder, getValue, optionsList }) {
  const handleOnChange = (e) => getValue(e.target.value)
  return (
    <select value={value} className="customSelect" placeholder={placeholder} onChange={handleOnChange}>
      {optionsList.map((item) => {
        const { value, string } = item
        return <option value={value}>{string}</option>
      })}
    </select>
  )
}

export default Select
