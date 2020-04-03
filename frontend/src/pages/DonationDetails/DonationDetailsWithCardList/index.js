import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Loader } from '../../../components/Loader'
import { DeliveredLeader } from '../DeliveredLeader'
import { CardList } from '../../../components/CardList'

import { statusDonationReceivedCurrent } from '../../../utils/strings'

function DonationDetailsWithCardList({ current, status }) {
  const [loading, setLoading] = useState(false)
  return (
    <>
      {loading && <Loader />}
      <DeliveredLeader current={current} status={status} />
      <CardList setLoading={setLoading} />
    </>
  )
}

DonationDetailsWithCardList.propTypes = {
  status: PropTypes.string,
  current: PropTypes.number,
}

DonationDetailsWithCardList.defaultProps = {
  current: 3,
  status: statusDonationReceivedCurrent,
}

export { DonationDetailsWithCardList }
