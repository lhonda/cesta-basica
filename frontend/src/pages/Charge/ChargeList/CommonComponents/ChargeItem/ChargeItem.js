import React from 'react'
import PropTypes from 'prop-types'
import './ChargeItem.scss'

function ChargeItem({ fileName, date, chargeType, status }) {
  return (
    <div className="chargeItem">
      <div className="chargeItem__container1">
        <span className="chargeItem__container1__title">{fileName}</span>
        <span className="chargeItem__container1__chargeType">{chargeType}</span>
      </div>
      <div className="chargeItem__container2">
        <span className="chargeItem__container2__status">{status}</span>
        <span className="chargeItem__container2__date">{date}</span>
      </div>
    </div>
  )
}

ChargeItem.propTypes = {
  fileName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  chargeType: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

export default ChargeItem
