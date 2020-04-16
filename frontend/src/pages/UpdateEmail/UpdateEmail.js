import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { Header } from '../../components/Header'
import { Input, inputTypes } from '../../components/Input'
import { Button } from '../../components/Button'
import { Loader } from '../../components/Loader'

import { connect, types } from '../../store'

import { titleUpdateEmail, emailRegistered, registerNewEmail, update } from '../../utils/strings'

import { updateEmail } from '../../services/API/updateDataUser'

function UpdateEmail({ store, dispatch, history }) {
  const [newEmail, setNewEmail] = useState()
  const [loading, setLoading] = useState(false)
  const { goBack, push } = history
  const { user } = store

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { status } = await updateEmail(newEmail)
    setLoading(false)
    if (status === 200) {
      const payload = { ...user, email: newEmail }
      dispatch({ type: types.SET_USER, payload })
      push('/profile')
    } else {
      // an error message
      push('/profile')
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="containerUpdateEmail">
        <Header title={titleUpdateEmail} onGoBackClick={goBack} />

        <div className="containerUpdateEmail__group">
          <div className="containerUpdateEmail__group__title" dangerouslySetInnerHTML={{ __html: emailRegistered }} />
          <div className="containerUpdateEmail__group__value">{user.email}</div>
        </div>

        <form onSubmit={handleSubmit} className="containerUpdateEmail__form">
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
      </div>
    </>
  )
}

UpdateEmail.propTypes = {
  store: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect(UpdateEmail)
