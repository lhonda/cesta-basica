import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DonationList.scss'
import { connect, types } from '../../store'

import { Loader } from '../../components/Loader'

import { DonationHeader, DonationIsEmpty, DonationItem, BottomMenu } from './CommonComponents'
import { Button, ButtonTypes } from '../../components/Button'

import { DonationsList } from '../../services/API/donationList'
import { CommitmentCheck } from '../../services/API/terms'

import { registerNewDonation } from '../../utils/strings'

function DonationList({ store, dispatch, history }) {
  const [loading, setLoading] = useState()
  const {
    donationList,
    user: { role },
  } = store

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

  useEffect(() => {
    getGeoLocation()
    getDonationList()
  }, [])

  return (
    <div className="containerDonation">
      {loading && !donationList && <Loader />}
      <DonationHeader />

      {donationList.length > 0 ? (
        <div className={`containerDonation__list containerDonation__list--${role}`}>
          {donationList.map((item) => {
            const { quantity, status, donationId } = item
            return (
              <DonationItem
                title={donationId}
                quantity={quantity}
                key={donationId}
                stateDonation={status}
                donationId={donationId}
                userRole={role}
              />
            )
          })}
        </div>
      ) : (
          <DonationIsEmpty whichMessage={role} />
        )}
      {role === 'admin' && (
        <div className="containerDonation__button">
          <Button
            size={ButtonTypes.LARGE}
            typeButton="button"
            message={registerNewDonation}
            handleClick={() => alert('register')}
          />
        </div>
      )}
      <BottomMenu />
    </div>
  )
}

DonationList.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect(DonationList)
