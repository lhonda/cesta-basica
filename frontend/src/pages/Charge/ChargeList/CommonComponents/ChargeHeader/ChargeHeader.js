import React from 'react'
import { useLocation } from 'react-router-dom'
import { string } from 'prop-types'
import './ChargeHeader.scss'

import { chargeTitlePage } from '../../../../../utils/strings'

function ChargeHeader({ title }) {
  const location = useLocation()
  const { pathname } = location

  return (
    <div className="fixedHeader">
      <div className="containerHeader">
        {pathname === '/charge' && <div style={{ paddingTop: '2rem' }} />}
        <h2>{title}</h2>
      </div>
    </div>
  )
}

ChargeHeader.propTypes = {
  title: string,
}

ChargeHeader.defaultProps = {
  title: chargeTitlePage,
}

export default ChargeHeader
