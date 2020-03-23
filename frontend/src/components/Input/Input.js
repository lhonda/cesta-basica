import React from 'react'
import PropTypes from 'prop-types'
import './Input.scss'

import { inputTypes } from './InputTypes'
import { maskToCpf, maskToTelephone } from './masksInput'
import { icWarning, icSuccess } from '../../assets/icons'

function Input({
  placeholder,
  inputType,
  maxLength,
  minLength,
  value,
  handleOnChange,
  isRequired,
  withError,
  messageError,
}) {
  // eslint-disable-next-line eqeqeq
  const isValid = value.length > 0 && (value.length >= minLength || value.length == maxLength)
  const currentStyleInput = isValid ? 'customInput--success' : ''

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

  return (
    <>
      <input
        className={`customInput ${currentStyleInput} ${withError && 'customInput--error'}`}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        title={placeholder}
        type={inputType}
        value={formatValue(value)}
        onChange={(e) => handleOnChange(e.target.value)}
        required={isRequired}
      />

      {withError ? (
        <span style={{ zIndex: '1000' }}>
          <img
            className="customInput__icon"
            src={icWarning}
            alt="icon for information warning or success"
            height={18}
          />
          {withError && <span className="customInput__messageError">{messageError}</span>}
        </span>
      ) : (
        isValid && (
          <span>
            <img
              className="customInput__icon"
              src={icSuccess}
              alt="icon for information warning or success"
              height={18}
            />
          </span>
        )
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
  withError: PropTypes.bool,
  messageError: PropTypes.string,
}

Input.defaultProps = {
  placeholder: '',
  inputType: inputTypes.TEXT,
  maxLength: '120',
  minLength: '2',
  isRequired: true,
  withError: false,
  messageError: 'Senha incorreta. Tente novamente.',
}

export default Input
