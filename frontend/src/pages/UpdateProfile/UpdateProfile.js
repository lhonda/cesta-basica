import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { Header } from '../../components/Header'
import { Loader } from '../../components/Loader'

import { titleUpdateEmail, titleUpdatePassword } from '../../utils/strings'

import { UpdateEmail } from './UpdateEmail'
import { UpdatePassword } from './UpdatePassword'

function UpdateProfile({ history, match }) {
  const [loading, setLoading] = useState(false)
  const { goBack } = history
  const { whatUpdate } = match.params

  const possibleUpdates = {
    email: {
      title: titleUpdateEmail,
      Component: () => <UpdateEmail setLoading={setLoading} />,
    },
    password: {
      title: titleUpdatePassword,
      Component: () => <UpdatePassword setLoading={setLoading} />,
    },
  }

  const { title, Component } = possibleUpdates[whatUpdate] ? possibleUpdates[whatUpdate] : goBack()

  return (
    <>
      {loading && <Loader />}
      <div className="containerUpdate">
        <Header title={title} onGoBackClick={goBack} />
        <Component />
      </div>
    </>
  )
}

UpdateProfile.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default UpdateProfile
