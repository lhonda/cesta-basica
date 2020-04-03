import React, { useState } from 'react'

import { Divider } from '../../components/Divider'
import { DeliveredLeader } from './DeliveredLeader'
import { WaitingReceivement } from './WaitingReceivement'
import { DeliveringDonation } from './DeliveringDonation'

import './styles.scss'

const statusTeste = {
  WAITING_RECEIVEMENT: 'WAITING_RECEIVEMENT',
  DELIVERED_LEADER: 'DELIVERED_LEADER',
  DELIVERING_DONATION: 'DELIVERING_DONATION',
}

export default function DonationDetails() {
  const [status, setStatus] = useState('DELIVERING_DONATION')

  function render() {
    if (statusTeste.WAITING_RECEIVEMENT === status) {
      return <WaitingReceivement />
    }
    if (statusTeste.DELIVERED_LEADER === status) {
      return <DeliveredLeader />
    }
    if (statusTeste.DELIVERING_DONATION === status) {
      return <DeliveringDonation />
    }
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
