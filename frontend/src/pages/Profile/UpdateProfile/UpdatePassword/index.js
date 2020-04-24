import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { Input, inputTypes } from '../../../../components/Input'
import { Button } from '../../../../components/Button'

import { updatePassword } from '../../../../services/API/updateDataUser'

import {
  update,
  informationToUpdatePassword,
  typeNewPassword,
  typePasswordToCheck,
  passwordsNotSame,
  messageUpdatePasswordSuccess,
  messageUpdatePasswordFailure,
} from '../../../../utils/strings'

import { showSuccessAlert, showFailureAlert } from '../../../../utils/showAlert'

import { connect } from '../../../../store'

function UpdatePassword({ setLoading, dispatch }) {
  const { push } = useHistory()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [withError, setWithError] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)

  function validateForm() {
    if (password.length >= 8 && confirmPassword.length >= 8) {
      if (password === confirmPassword) {
        setWithError(false)
        return false
      }
      setWithError(true)
      return true
    }
    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { status } = await updatePassword(password, confirmPassword)
    setLoading(false)
    if (status === 200) {
      showSuccessAlert(dispatch, messageUpdatePasswordSuccess)
    } else {
      showFailureAlert(dispatch, messageUpdatePasswordFailure)
    }
    push('/profile')
  }

  useEffect(() => {
    setDisabledButton(validateForm())
  }, [password, confirmPassword])

  return (
    <>
      <div className="containerUpdate__legend">
        <p>{informationToUpdatePassword}</p>
      </div>
      <form onSubmit={handleSubmit} className="containerUpdate__form">
        <Input
          handleOnChange={setPassword}
          inputType={inputTypes.PASSWORD}
          placeholder={typeNewPassword}
          value={password}
          withError={withError}
          minLength="8"
          isRequired
        />

        <div style={{ marginTop: '1.2rem' }} />

        <Input
          handleOnChange={setConfirmPassword}
          inputType={inputTypes.PASSWORD}
          placeholder={typePasswordToCheck}
          value={confirmPassword}
          minLength="8"
          withError={withError}
          messageError={passwordsNotSame}
          isRequired
        />

        <div className="buttonUpdate">
          <Button message={update} disable={disabledButton} />
        </div>
      </form>
    </>
  )
}

UpdatePassword.propTypes = {
  setLoading: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const UpdatePasswordConnected = connect(UpdatePassword)

export { UpdatePasswordConnected as UpdatePassword }
