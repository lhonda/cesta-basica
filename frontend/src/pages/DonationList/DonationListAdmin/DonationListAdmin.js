import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DonationListAdmin.scss'
import { connect, types } from '../../../store'

import { Loader } from '../../../components/Loader'

import { DonationHeader, DonationIsEmpty, DonationItem, BottomMenu } from '../CommonComponents'
import { Button, ButtonTypes } from '../../../components/Button'

import { registerNewDonation } from '../../../utils/strings'

function DonationListAdmin({ store, dispatch, history }) {
  const [loading, setLoading] = useState()
  async function getDonationListAdmin() {
    setLoading(true)
    setLoading(false)
  }
  useEffect(() => getDonationListAdmin(), [])
  return (
    <>
      {loading && <Loader />}
      <div className="containerDonation">
        <DonationHeader />

        <div className="containerDonation__list">
          <DonationIsEmpty whichMessage="admin" />
        </div>

        <div className="containerDonation__button">
          <Button
            size={ButtonTypes.LARGE}
            typeButton="button"
            message={registerNewDonation}
            handleClick={() => alert('oi')}
          />
        </div>
        <BottomMenu />
      </div>
    </>
  )
}

DonationListAdmin.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(DonationListAdmin)
