import React from 'react'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'

import { HeaderWithSideBar } from '../../../components/Header'
import { Legend, LegendTypes } from '../../../components/Legend'

import './styles.scss'

import {
  legendDonationWaitStatus,
  leader,
  unit,
  deliveredDate as deliveredDateStr,
  cardsQuantity,
} from '../../../utils/strings'

import { formatDate } from '../../../utils/formatDateToptbr'

function WaitingReceivement({ current, donation }) {
  const { quantity, statusText, donationId, leaderName, siteName, created } = donation
  const history = useHistory()

  function navigateToDonationList() {
    history.push('/donation-list')
  }

  return (
    <>
      <HeaderWithSideBar onGoBackClick={navigateToDonationList} title={donationId} current={current} steps={4} />
      <div className="component-waitingReceivement-content">
        <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitStatus} />
        <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={statusText} />
        <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={leader} />
        <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={leaderName} />
        <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={unit} />
        <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={siteName} />
        <div className="component-waitingReceivement-footer">
          <div>
            <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={deliveredDateStr} />
            <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={formatDate(created)} />
          </div>
          <div>
            <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={cardsQuantity} />
            <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={quantity} />
          </div>
        </div>
      </div>
    </>
  )
}

WaitingReceivement.propTypes = {
  current: PropTypes.number,
  donation: PropTypes.shape({
    donationId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    statusText: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    leaderName: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  }).isRequired,
}

WaitingReceivement.defaultProps = {
  current: 1,
}

export { WaitingReceivement }
