import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import './DonationItem.scss'

import { donationItemTypes } from './donationItemTypes'

function DonationItem({ title, quantity, stateDonation, donationId }) {
  const history = useHistory()
  const verifyStateDonation = () => {
    if (
      !stateDonation ||
      stateDonation === donationItemTypes[4].id ||
      stateDonation === donationItemTypes[5].id ||
      stateDonation === donationItemTypes[6].id
    ) {
      return false
    }
    return true
  }
  const handleClick = () => {
    if (verifyStateDonation()) history.push(`/donation/${donationId}/${donationItemTypes[stateDonation].type}`)
  }
  const isComplete = stateDonation === donationItemTypes[4].id
  return (
    <div className="donationItem" onClick={handleClick}>
      <div className="donationItem__content">
        <span className="donationItem__content__title">{title}</span>
        <div>
          <span className="donationItem__content__quantity">{quantity} unidades</span>
          <span className={`floatRigth donationItem__content__state${isComplete && '--complete'}`}>
            {donationItemTypes[stateDonation].status}
          </span>
        </div>
      </div>
    </div>
  )
}

DonationItem.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  stateDonation: PropTypes.number.isRequired,
  donationId: PropTypes.string.isRequired,
}

export default DonationItem
