import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DonationListAdmin.scss'
import { connect, types } from '../../../store'

import { Loader } from '../../../components/Loader'

import { DonationHeader, DonationIsEmpty, DonationItem, BottomMenu } from '../CommonComponents'

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
        <DonationIsEmpty />
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
