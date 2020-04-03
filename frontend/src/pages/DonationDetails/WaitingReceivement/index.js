import React from 'react'
import PropTypes from 'prop-types'

import { HeaderWithSideBar } from '../../../components/Header'
import { Legend, LegendTypes } from '../../../components/Legend'

import './styles.scss'

import {
  legendDonationWaitStatus,
  leader,
  unit,
  deliveredDate,
  cardsQuantity,
  statusDonationWait,
} from '../../../utils/strings'

function WaitingReceivement({ current, status }) {
  return (
    <>
      <HeaderWithSideBar onGoBackClick={() => {}} title="DonationId/Bordero" current={current} steps={4} />
      <div className="component-waitingReceivement-content">
        <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitStatus} />
        <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={status} />
        <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={leader} />
        <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message="Carlos Alberto Nascimento" />
        <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={unit} />
        <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message="Motivar" />
        <div className="component-waitingReceivement-footer">
          <div>
            <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={deliveredDate} />
            <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message="22/03/2020" />
          </div>
          <div>
            <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={cardsQuantity} />
            <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message="50" />
          </div>
        </div>
      </div>
    </>
  )
}

WaitingReceivement.propTypes = {
  status: PropTypes.string,
  current: PropTypes.number,
}

WaitingReceivement.defaultProps = {
  status: statusDonationWait,
  current: 1,
}

export { WaitingReceivement }
