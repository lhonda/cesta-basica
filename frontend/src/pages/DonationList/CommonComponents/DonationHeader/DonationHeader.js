import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { string, bool, number } from 'prop-types'
import './DonationHeader.scss'

import { icFilter } from '../../../../assets/icons'
import { connect } from '../../../../store'

import { Notification } from '../../../../components/Notification'

import { donationTitlePage } from '../../../../utils/strings'

function DonationHeader({ title, isAdmin, qntd }) {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  function exit() {
    history.push('/filter')
  }

  return (
    <div className="fixedHeader">
      <header className="containerHeader">
        {pathname === '/donation-list' && <div style={{ paddingTop: '2rem' }} />}
        <h2>{title}</h2>
        {isAdmin && (
          <div>
            <div className="header-notification">
              <Notification qntd={qntd} />
            </div>
            <button onClick={exit} type="button">
              <img src={icFilter} alt="botao para filtrar doaçoes" />
            </button>
          </div>
        )}
      </header>
    </div>
  )
}

DonationHeader.propTypes = {
  title: string,
  isAdmin: bool,
  qntd: number,
}

DonationHeader.defaultProps = {
  title: donationTitlePage,
  isAdmin: false,
  qntd: 0,
}

export default connect(DonationHeader)
