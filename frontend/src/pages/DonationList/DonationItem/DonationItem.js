import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import './DonationItem.scss'

function DonationItem({ title, quantity, stateDonation, donationId }) {
  const history = useHistory()
  const handleClick = () => history.push(`/${donationId}/`)
  const isComplete = stateDonation === 'Completo'
  return (
    <div className="donationItem" onClick={handleClick}>
      <div className="donationItem__content">
        <span className="donationItem__content__title">{title}</span>
        <div>
          <span className="donationItem__content__quantity">{quantity} unidades</span>
          <span className={`floatRigth donationItem__content__state${isComplete && '--complete'}`}>
            {stateDonation}
          </span>
        </div>
      </div>
    </div>
  )
}

DonationItem.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  stateDonation: PropTypes.string.isRequired,
  donationId: PropTypes.string.isRequired,
}

export default DonationItem
