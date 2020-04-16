import React from 'react'
import { useLocation } from 'react-router-dom'
import { string } from 'prop-types'
import './ChargeHeader.scss'

import { chargeTitlePage } from '../../../../../utils/strings'

function ChargeHeader({ title }) {
  const location = useLocation()

  return (
    <div className="fixedHeader">
      <span className="containerHeader">
        {location.pathname === '/charge' ? <div style={{ paddingTop: '2rem' }} /> : <></>}
        <h2>{title}</h2>
      </span>
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
