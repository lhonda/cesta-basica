import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { string } from 'prop-types'
import './DonationHeader.scss'

import { icFilter } from '../../../../assets/icons'
import { connect } from '../../../../store'

import { donationTitlePage } from '../../../../utils/strings'

function DonationHeader({ title }) {
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
        <button onClick={exit} type="button">
          <img src={icFilter} alt="botao para filtrar doaçoes" />
        </button>
      </header>
    </div>
  )
}

DonationHeader.propTypes = {
  title: string,
}

DonationHeader.defaultProps = {
  title: donationTitlePage,
}

export default connect(DonationHeader)
