import React from 'react'
import { useHistory } from 'react-router-dom'
import { func } from 'prop-types'
import './DonationHeader.scss'

import { icExit } from '../../../assets/icons'
import { connect, types } from '../../../store'

function DonationHeader({ dispatch }) {
  const history = useHistory()
  function exit() {
    dispatch({ type: types.SET_LOGOUT })
    history.push('/login')
  }
  return (
    <header className="containerHeader">
      <h2>Title</h2>
      <div>
        <a onClick={exit}>
          <img src={icExit} alt="alo" />
        Sair
      </a>
      </div>
    </header>
  )
}

DonationHeader.propTypes = {
  dispatch: func.isRequired,
}

export default connect(DonationHeader)
