import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { Switch, Route, useLocation } from 'react-router-dom'
import { HeaderWithGoBack } from '../../../components/Header'
import { Loader } from '../../../components/Loader'

import { titleUpdateEmail, titleUpdatePassword } from '../../../utils/strings'

import { UpdateEmail } from './UpdateEmail'
import { UpdatePassword } from './UpdatePassword'

function UpdateProfile({ history, match }) {
  const [loading, setLoading] = useState(false)
  const { goBack } = history
  const { pathname } = useLocation()
  const { path } = match

  const titles = {
    [`${path}/email`]: titleUpdateEmail,
    [`${path}/password`]: titleUpdatePassword,
  }

  return (
    <>
      {loading && <Loader />}
      <div className="containerUpdate">
        <HeaderWithGoBack title={titles[pathname]} onGoBackClick={goBack} />
        <Switch>
          <Route path={`${path}/email`} component={() => <UpdateEmail setLoading={setLoading} />} />
          <Route path={`${path}/password`} component={() => <UpdatePassword setLoading={setLoading} />} />
        </Switch>
      </div>
    </>
  )
}

UpdateProfile.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default UpdateProfile
