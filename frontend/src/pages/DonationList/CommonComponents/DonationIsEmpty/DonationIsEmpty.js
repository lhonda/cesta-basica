import React from 'react'
import PropTypes from 'prop-types'
import './DonationIsEmpty.scss'

import { donationListVoidText, messageIfListIsVoid } from '../../../../utils/strings'
import { icEmptyDonationList } from '../../../../assets/icons'

const options = {
  leader: donationListVoidText,
  admin: messageIfListIsVoid,
}

const DonationIsEmpty = ({ whichMessage }) => (
  <div className="containerIsEmpty">
    <span dangerouslySetInnerHTML={{ __html: options[whichMessage] }} />
    <img src={icEmptyDonationList} alt="void basket" />
  </div>
)

DonationIsEmpty.propTypes = {
  whichMessage: PropTypes.string,
}

DonationIsEmpty.defaultProps = {
  whichMessage: 'leader',
}

export default DonationIsEmpty
