import React, { useState } from 'react'

import { Divider } from '../../components/Divider'
import { DeliveredLeader } from './DeliveredLeader'
import { WaitingReceivement } from './WaitingReceivement'

import './styles.scss'

const statusTeste = {
  WAITING_RECEIVEMENT: 'WAITING_RECEIVEMENT',
  DELIVERED_LEADER: 'DELIVERED_LEADER',
}

export default function DonationDetails() {
  const [status, setStatus] = useState('DELIVERED_LEADER')

  function render() {
    if (statusTeste.WAITING_RECEIVEMENT === status) {
      return <WaitingReceivement />
    }
    if (statusTeste.DELIVERED_LEADER === status) {
      return <DeliveredLeader />
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
