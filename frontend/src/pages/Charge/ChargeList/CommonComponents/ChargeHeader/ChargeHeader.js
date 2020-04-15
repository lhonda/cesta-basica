import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { func, string } from 'prop-types'
import './ChargeHeader.scss'

import { icExit } from '../../../../../assets/icons'
import { connect, types } from '../../../../../store'

import { chargeTitlePage, exitText } from '../../../../../utils/strings'

function ChargeHeader({ dispatch, title }) {
  const history = useHistory()
  const location = useLocation()

  function exit() {
    dispatch({ type: types.SET_LOGOUT })
    history.push('/login')
  }

  return (
    <div className="fixedHeader">
      <span className="containerHeader">
        {location.pathname === '/charge' ? <div style={{ paddingTop: '2rem' }} /> : <></>}
        <h2>{title}</h2>
        {location.pathname === '/charge' ? (
          <span>
            <a onClick={exit}>
              <img src={icExit} alt="alo" />
              {exitText}
            </a>
          </span>
        ) : (
          <></>
        )}
      </span>
    </div>
  )
}

ChargeHeader.propTypes = {
  dispatch: func.isRequired,
  title: string,
}

ChargeHeader.defaultProps = {
  title: chargeTitlePage,
}

export default connect(ChargeHeader)
