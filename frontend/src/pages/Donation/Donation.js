import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Status } from '../../components/Status'
import { Sidebar } from '../../components/Sidebar'

import './Donation.scss'

import { titleDonation, statusDonationWait } from '../../utils/strings'
import {} from '../../services/handles'

function DonationPage({ store, dispatch }) {
  const { id } = useParams()

  return (
    <div className="container-donation">
      <div className="header-donation">
        <Title message={`${titleDonation} ${id}`} />
        <Status message={statusDonationWait} />
        <Sidebar />
      </div>
    </div>
  )
}
DonationPage.propTypes = {
  store: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(DonationPage)
