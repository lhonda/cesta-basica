import React from 'react'
import { useHistory } from 'react-router-dom'
import { func } from 'prop-types'
import { types, connect } from '../../store'
import SettingsLink from './CommonComponents/SettingsLink/SettingsLink'
import BottomMenu from '../DonationList/CommonComponents/BottomMenu/BottomMenu'
import { icEmail, icPassword, icLogout } from '../../assets/icons/index'
import { profile, settings, changePassword, changeEmail, signOut } from '../../utils/strings'
import './Profile.scss'

function Profile({ dispatch, store }) {
  const history = useHistory()
  function exit() {
    dispatch({ type: types.SET_LOGOUT })
    history.push('/login')
  }
  function newPassword() {
    history.push('/newpass')
  }
  function newEmail() {
    history.push('/profile/update-email')
  }
  const { user } = store

  return (
    <>
      <header className="containerHeather">
        <h1>{profile}</h1>
        <div className="containerUser">
          <h2>{user.login}</h2>
          <p>{user.email}</p>
        </div>
      </header>
      <div className="containerSetup">
        <h3>{settings}</h3>
        <SettingsLink icon={icEmail} legend="envelop simbolizando e-mail" action={newEmail} message={changeEmail} />
        <SettingsLink icon={icPassword} legend="cadeado simbolizando senha" action={newPassword} message={changePassword} />
        <SettingsLink icon={icLogout} legend="alo" action={exit} message={signOut} />
      </div>
      <BottomMenu />
    </>
  )
}
Profile.propTypes = {
  dispatch: func.isRequired,
}

export default connect(Profile)
