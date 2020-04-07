import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from '../../store'

import { Loader } from '../../components/Loader'
import { Divider } from '../../components/Divider'
import { DeliveredLeader } from './DeliveredLeader'
import { WaitingReceivement } from './WaitingReceivement'
import { DonationDetailsWithCardList } from './DonationDetailsWithCardList'

import './styles.scss'

import { DonationDetails as DonationDetailsService } from '../../services/API/donationList'

import { status } from '../../utils/status'

function DonationDetails({ dispatch, store }) {
  const [loading, setLoading] = useState(true)
  const { donation } = store
  const { id } = useParams()

  async function retrieveDonationDetails() {
    await DonationDetailsService(dispatch, id)
  }

  useEffect(() => {
    retrieveDonationDetails()
    setLoading(false)
  }, [])

  function render() {
    if (donation.status === status.ESPERANDO_RECEBIMENTO.id) {
      return <WaitingReceivement donation={donation} />
    }
    if (donation.status === status.ENTREGUE_LIDER.id) {
      return <DeliveredLeader donation={donation} />
    }
    if (donation.status === status.ENTREGANDO.id) {
      return <DonationDetailsWithCardList donation={donation} />
    }
    return <DonationDetailsWithCardList current={4} donation={donation} />
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="component-donationDetails-container">
          {render()}
          <div className="component-donationDetails-divider">
            <Divider />
          </div>
        </div>
      )}
    </>
  )
}

export default connect(DonationDetails)
