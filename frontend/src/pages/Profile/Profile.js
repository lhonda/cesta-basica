import React from 'react'
import { useHistory } from 'react-router-dom'
import { func } from 'prop-types'
import { types, connect } from '../../store'
import Setup from './CommonComponents/Setup/Setup'
import MenuBottom from './CommonComponents/MenuBottom/MenuBottom'
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
    history.push('./newpass')
  }
  function newEmail() {
    history.push('./newEmail')
  }
  const { user } = store

  return (
    <div>
      <header className="containerHeather">
        <h2>{profile}</h2>
      </header>
      <div className="containerUser">
        <h3>{user.login}</h3>
        <p>{user.email}</p>
      </div>
      <div className="containerSettings">
        <span>
          <p>{settings}</p>
        </span>
        <div className="containerSetup">
          <Setup icon={icEmail} legend="envelop simbolizando e-mail" action={newEmail} message={changeEmail} />
          <Setup icon={icPassword} legend="cadeado simbolizando senha" action={newPassword} message={changePassword} />
          <Setup icon={icLogout} legend="alo" action={exit} message={signOut} />
        </div>
      </div>
      <MenuBottom />
    </div>
  )
}
Profile.propTypes = {
  dispatch: func.isRequired,
}

export default connect(Profile)
