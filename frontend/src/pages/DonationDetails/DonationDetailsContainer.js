import React from 'react'

import { Divider } from '../../components/Divider'
import { WaitingReceivement } from './WaitingReceivement'

import './styles.scss'

export default function DonationDetails() {
  return (
    <div className="component-donationDetails-container">
      <WaitingReceivement />
      <div className="component-donationDetails-divider">
        <Divider />
      </div>
    </div>
  )
}
