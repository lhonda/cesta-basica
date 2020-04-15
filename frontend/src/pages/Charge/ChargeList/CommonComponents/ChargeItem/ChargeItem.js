import React from 'react'
import PropTypes from 'prop-types'
import './ChargeItem.scss'

function ChargeItem({ fileName, date, chargeType }) {
  return (
    <div className="chargeItem">
      <div className="chargeItem__content">
        <span className="chargeItem__content__title">{fileName}</span>
        <div>
          <span className="chargeItem__content__quantity">{date}</span>
          <span className="floatRigth chargeItem__content__state--false">{chargeType}</span>
        </div>
      </div>
    </div>
  )
}

ChargeItem.propTypes = {
  fileName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  chargeType: PropTypes.string.isRequired,
}

export default ChargeItem
