import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { types, connect } from '../../store'
import { SettingsLink } from './CommonComponents/SettingsLink'
import BottomMenu from '../DonationList/CommonComponents/BottomMenu/BottomMenu'
import { icEmail, icPassword, icLogout } from '../../assets/icons/index'
import { profile, settings, changePassword, changeEmail, signOut } from '../../utils/strings'
import './Profile.scss'

function Profile({ dispatch, store, history }) {
  const location = useLocation()
  const { pathname } = location
  function logOut() {
    dispatch({ type: types.SET_LOGOUT })
    history.push('/login')
  }
  const { user } = store

  return (
    <>
      <header className="containerHeader">
        {pathname === '/profile' && <div style={{ paddingTop: '2rem' }} />}
        <h2>{profile}</h2>
        <div className="containerUser">
          <h2>{user.login}</h2>
          <p>{user.email}</p>
        </div>
      </header>
      <div className="containerSetup">
        <h3>{settings}</h3>
        <SettingsLink
          icon={icEmail}
          legend="envelope simbolizando e-mail"
          to="/profile/update-email"
          message={changeEmail}
        />
        <SettingsLink icon={icPassword} legend="cadeado simbolizando senha" to="/newpass" message={changePassword} />
        <SettingsLink icon={icLogout} legend="alo" to="/login" handleClick={logOut} message={signOut} />
      </div>
      <BottomMenu />
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
