import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Input.scss'

import { inputTypes } from './InputTypes'
import { maskToCpf, maskToTelephone } from './masksInput'
import { icEye } from '../../assets/icons'

function Input({ placeholder, inputType, maxLength, minLength, value, handleOnChange, isRequired }) {
  const [type, setType] = useState(inputType)
  function formatValue(inputValue) {
    switch (inputType) {
      case inputTypes.CPF:
        return maskToCpf(inputValue)
      case inputTypes.CELPHONE:
        return maskToTelephone(inputValue)
      default:
        return inputValue
    }
  }

  function hideUnhidePassword() {
    if (type === inputTypes.PASSWORD) {
      return setType(inputTypes.TEXT)
    }
    return setType(inputTypes.PASSWORD)
  }

  return (
    <>
      <input
        className="customInput"
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        title={placeholder}
        type={type}
        value={formatValue(value)}
        onChange={(e) => handleOnChange(e.target.value)}
        required={isRequired}
      />

      {inputType === inputTypes.PASSWORD && (
        <span className="containerHideUnhidePassword" onClick={hideUnhidePassword}>
          <img className="containerHideUnhidePassword__icon" src={icEye} alt="icon of eye" height={14} />
        </span>
      )}
    </>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
}

Input.defaultProps = {
  placeholder: '',
  inputType: inputTypes.TEXT,
  maxLength: '120',
  minLength: '2',
  isRequired: false,
}

export default Input
