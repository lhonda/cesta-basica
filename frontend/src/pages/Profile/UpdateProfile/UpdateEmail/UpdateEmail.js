import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { Input, inputTypes } from '../../../../components/Input'
import { Button } from '../../../../components/Button'

import {
  emailRegistered,
  registerNewEmail,
  update,
  messageUpdateEmailSuccess,
  messageUpdateEmailFailure,
} from '../../../../utils/strings'
import { updateEmail } from '../../../../services/API/updateDataUser'

import { connect, types } from '../../../../store'

import { showSuccessAlert, showFailureAlert } from '../../../../utils/showAlert'
import { alertTypes } from '../../../../components/Alert'

function UpdateEmail({ setLoading, store, dispatch }) {
  const [newEmail, setNewEmail] = useState()
  const { push } = useHistory()
  const { user } = store
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { status } = await updateEmail(newEmail)
    setLoading(false)
    if (status === 200) {
      const payload = { ...user, email: newEmail }
      dispatch({ type: types.SET_USER, payload })
      showSuccessAlert(dispatch, messageUpdateEmailSuccess)
    } else {
      showFailureAlert(dispatch, messageUpdateEmailFailure)
    }
    push('/profile')
  }

  return (
    <>
      <div className="containerUpdate__group">
        <div className="containerUpdate__group__title" dangerouslySetInnerHTML={{ __html: emailRegistered }} />
        <div className="containerUpdate__group__value">{user.email}</div>
      </div>

      <form onSubmit={handleSubmit} className="containerUpdate__form">
        <Input
          handleOnChange={setNewEmail}
          inputType={inputTypes.EMAIL}
          placeholder={registerNewEmail}
          value={newEmail}
          minLength="8"
          isRequired
        />

        <div className="buttonUpdate">
          <Button message={update} disable={!newEmail} />
        </div>
      </form>
    </>
  )
}

UpdateEmail.propTypes = {
  setLoading: PropTypes.func.isRequired,
  store: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(UpdateEmail)
