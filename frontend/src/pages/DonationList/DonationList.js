import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DonationList.scss'
import { connect } from '../../store'

import { Loader } from '../../components/Loader'

import { DonationHeader } from './DonationHeader'
import { DonationIsEmpty } from './DonationIsEmpty'
import { DonationItem } from './DonationItem'
import { BottomMenu } from './BottomMenu'

import { DonationsList } from '../../services/API/donationList'

function DonationList({ store, dispatch }) {
  const [loading, setLoading] = useState()
  const { donationList } = store

  async function getDonationList() {
    setLoading(true)
    await DonationsList(dispatch)
    setLoading(false)
  }

  useEffect(() => {
    getDonationList()
  }, [])
  return (
    <div className="containerDonation">
      {loading && <Loader />}
      <DonationHeader />
      {donationList ? (
        <div className="containerDonation__list">
          {donationList.map((item) => {
            const { donor, quantity, status, donationId, id } = item
            return (
              <DonationItem title={donor} quantity={quantity} key={id} stateDonation={status} donationId={donationId} />
            )
          })}
        </div>
      ) : (
        <DonationIsEmpty />
      )}
      <BottomMenu />
    </div>
  )
}

DonationList.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
export default connect(DonationList)
