import React from 'react'
import PropTypes from 'prop-types'
import { types, connect } from '../../store'
import SettingsLink from './CommonComponents/SettingsLink/SettingsLink'
import BottomMenu from '../DonationList/CommonComponents/BottomMenu/BottomMenu'
import { icEmail, icPassword, icLogout } from '../../assets/icons/index'
import { profile, settings, changePassword, changeEmail, signOut } from '../../utils/strings'
import './Profile.scss'

import { Alert } from '../../components/Alert'

function Profile({ dispatch, store, history }) {
  function logOut() {
    dispatch({ type: types.SET_LOGOUT })
    history.push('/login')
  }
  const { user } = store

  return (
    <>
      <Alert />
      <header className="containerHeather">
        <h1>{profile}</h1>
        <div className="containerUser">
          <h2>{user.login}</h2>
          <p>{user.email}</p>
        </div>
      </header>
      <div className="containerSetup">
        <h3>{settings}</h3>
        <SettingsLink
          icon={icEmail}
          legend="envelop simbolizando e-mail"
          to="/profile/update-email"
          message={changeEmail}
        />
        <SettingsLink icon={icPassword} legend="cadeado simbolizando senha" to="/newpass" message={changePassword} />
        <SettingsLink icon={icLogout} legend="alo" to="/login" handleClick={logOut} message={signOut} />
        <button
          type="button"
          onClick={() => {
            dispatch({
              type: types.SHOW_ALERT,
              payload: {
                message: 'Falha ai irmao',
                type: 'failure',
              },
            })
          }}
        >
          oi
        </button>

        <button onClick={() => dispatch({ type: types.HIDE_ALERT })}>oi2</button>
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
