import React from 'react'
import PropTypes from 'prop-types'
import './ChargeItem.scss'

function ChargeItem({ fileName, date, chargeType }) {
  return (
    <div className="chargeItem">
      <span className="chargeItem__title">{fileName}</span>
      <span className="floatLeft chargeItem__quantity">{date}</span>
      <span className="floatRight chargeItem__state">{chargeType}</span>
    </div>
  )
}

ChargeItem.propTypes = {
  fileName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  chargeType: PropTypes.string.isRequired,
}

export default ChargeItem
