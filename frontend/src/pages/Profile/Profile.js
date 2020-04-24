import React from 'react'
import PropTypes from 'prop-types'
import { types, connect } from '../../store'
import { SettingsLink } from './CommonComponents/SettingsLink'
import { Header } from '../../components/Header'
import { BottomMenu } from '../../components/BottomMenu'
import { icEmail, icPassword, icLogout } from '../../assets/icons/index'
import { profile, settings, changePassword, changeEmail, signOut } from '../../utils/strings'
import './Profile.scss'

function Profile({ dispatch, store, history }) {
  function logOut() {
    dispatch({ type: types.SET_LOGOUT })
    history.push('/login')
  }
  const { user } = store

  const isAdmin = () => user.role === 'admin'

  return (
    <>
      <div className="profileHeader">
        <Header title={profile} />
      </div>
      <div className="containerUser">
        <h2>{user.login}</h2>
        <p>{user.email}</p>
      </div>

      <div className="containerSetup">
        <h3>{settings}</h3>
        <SettingsLink
          icon={icEmail}
          legend="envelope simbolizando e-mail"
          to="/profile/update/email"
          message={changeEmail}
        />
        <SettingsLink
          icon={icPassword}
          legend="cadeado simbolizando senha"
          to="/profile/update/password"
          message={changePassword}
        />
        <SettingsLink icon={icLogout} legend="alo" to="/login" handleClick={logOut} message={signOut} />
      </div>
      <BottomMenu isAdmin={isAdmin()} />
    </>
  )
}
Profile.propTypes = {
  store: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(Profile)
