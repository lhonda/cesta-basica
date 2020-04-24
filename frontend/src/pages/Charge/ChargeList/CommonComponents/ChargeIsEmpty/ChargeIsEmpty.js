import React from 'react'
import PropTypes from 'prop-types'
import './ChargeIsEmpty.scss'

import { chargeListVoidText, legendEmptyBasket } from '../../../../../utils/strings'
import { icEmptyDonationList } from '../../../../../assets/icons'

const options = {
  admin: chargeListVoidText,
}

const ChargeIsEmpty = ({ whichMessage }) => (
  <div className="containerIsEmpty">
    <span dangerouslySetInnerHTML={{ __html: options[whichMessage] }} />
    <img src={icEmptyDonationList} alt={legendEmptyBasket} />
  </div>
)

ChargeIsEmpty.propTypes = {
  whichMessage: PropTypes.string,
}

ChargeIsEmpty.defaultProps = {
  whichMessage: 'leader',
}

export default ChargeIsEmpty
