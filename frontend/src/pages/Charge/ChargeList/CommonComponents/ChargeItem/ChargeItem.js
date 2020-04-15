import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import './ChargeItem.scss'

import { chargeItemTypes } from './chargeItemTypes'

function ChargeItem({ title, quantity, stateDonation, donationId, userRole }) {
  const history = useHistory()
  const verifyStateDonation = () => {
    if (
      !stateDonation ||
      stateDonation === chargeItemTypes[4].id ||
      stateDonation === chargeItemTypes[5].id ||
      stateDonation === chargeItemTypes[6].id
    ) {
      return false
    }
    return true
  }
  const handleClick = {
    leader() {
      if (verifyStateDonation()) {
        history.push(`/donation/${donationId}/${chargeItemTypes[stateDonation].type}`)
      }
    },
    admin() {
      history.push(`/donation/${donationId}/details`)
    },
  }
  const isComplete = stateDonation === chargeItemTypes[4].id
  return (
    <div className="chargeItem" onClick={handleClick[userRole]}>
      <div className="chargeItem__content">
        <span className="chargeItem__content__title">{title}</span>
        <div>
          <span className="chargeItem__content__quantity">{quantity} unidades</span>
          <span className={`floatRigth chargeItem__content__state${isComplete && '--complete'}`}>
            {chargeItemTypes[stateDonation].status}
          </span>
        </div>
      </div>
    </div>
  )
}

ChargeItem.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  stateDonation: PropTypes.number.isRequired,
  donationId: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
}

export default ChargeItem
