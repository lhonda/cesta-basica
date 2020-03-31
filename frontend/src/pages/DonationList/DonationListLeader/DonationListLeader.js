import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DonationListLeader.scss'
import { connect, types } from '../../../store'

import { Loader } from '../../../components/Loader'

import { DonationHeader, DonationIsEmpty, DonationItem, BottomMenu } from '../CommonComponents'

import { DonationsList } from '../../../services/API/donationList'
import { CommitmentCheck } from '../../../services/API/terms'

function DonationListLeader({ store, dispatch, history }) {
  const [loading, setLoading] = useState()
  const { donationList } = store

  useEffect(() => {
    getGeoLocation()
  }, [])

  function getGeoLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }

      dispatch({ type: types.SET_USER_LOCATION, payload: userLocation })
    })
  }

  async function getDonationList() {
    setLoading(true)
    await DonationsList(dispatch)
    await CommitmentCheck(history)
    setLoading(false)
  }

  useEffect(() => getDonationList(), [])

  return (
    <div className="containerDonation">
      {loading && <Loader />}
      <DonationHeader />
      {donationList && (
        <div className="containerDonation__list">
          {donationList.map((item) => {
            const { quantity, status, donationId } = item
            return (
              <DonationItem
                title={donationId}
                quantity={quantity}
                key={donationId}
                stateDonation={status}
                donationId={donationId}
              />
            )
          })}
        </div>
      )}

      {((donationList && donationList.length === 0) || !donationList) && <DonationIsEmpty />}
      <BottomMenu />
    </div>
  )
}

DonationListLeader.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
export default connect(DonationListLeader)
