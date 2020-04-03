import React, { useState } from 'react'

import { Divider } from '../../components/Divider'
import { DeliveredLeader } from './DeliveredLeader'
import { WaitingReceivement } from './WaitingReceivement'
import { DonationDetailsWithCardList } from './DonationDetailsWithCardList'

import './styles.scss'

import { completedFirstLetterCapitalized } from '../../utils/strings'

const statusTeste = {
  WAITING_RECEIVEMENT: 'WAITING_RECEIVEMENT',
  DELIVERED_LEADER: 'DELIVERED_LEADER',
  DELIVERING_DONATION: 'DELIVERING_DONATION',
  COMPLETE: 'COMPLETE',
}

export default function DonationDetails() {
  const [status, setStatus] = useState('COMPLETE')

  function render() {
    if (statusTeste.WAITING_RECEIVEMENT === status) {
      return <WaitingReceivement />
    }
    if (statusTeste.DELIVERED_LEADER === status) {
      return <DeliveredLeader />
    }
    if (statusTeste.DELIVERING_DONATION === status) {
      return <DonationDetailsWithCardList />
    }
    return <DonationDetailsWithCardList current={4} status={completedFirstLetterCapitalized} />
  }
  return (
    <div className="component-donationDetails-container">
      {render()}
      <div className="component-donationDetails-divider">
        <Divider />
      </div>
    </div>
  )
}
