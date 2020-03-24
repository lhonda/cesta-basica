import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Status } from '../../components/Status'
import { Sidebar } from '../../components/Sidebar'
import { Legend, LegendTypes } from '../../components/Legend'
import { Items, ItemsTypes } from '../../components/Items'
import { Button, ButtonTypes } from '../../components/Button'

import './ReceivedCurrent.scss'

import {
  statusDonationReceivedCurrent,
  titleDonation,
  legendDonationType,
  legendDonationWaitDate,
  legendDonationWaitAmount,
  legendDonationReceivedFinishButton,
  legendDonationDateFinal,
} from '../../utils/strings'
import { handleDonationReceived, handleDonationReceivedVoucher } from '../../services/handles'

function ReceivedCurrentPage({ store, dispatch }) {
  const { id } = useParams()

  return (
    <div className="container-received-prof">
      <div className="header-received-prof">
        <Title message={`${titleDonation} ${id}`} />
        <Status message={statusDonationReceivedCurrent} />
        <Sidebar current={3} />
      </div>
      <div className="details-received-prof">
        <div className="details-date">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationType} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={store.donation.received.type} />
        </div>
        <div className="details-amount">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={legendDonationWaitAmount} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={store.donation.received.amount} />
        </div>
      </div>
      <div className="details-received-prof">
        <div className="details-date">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitDate} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={store.donation.received.date} />
        </div>
        <div className="details-amount">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={legendDonationDateFinal} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={store.donation.received.deadline} />
        </div>
      </div>
      <hr />
      <div className="main-received-current-prof">
        <Items
          type={ItemsTypes.BASKET}
          size={ItemsTypes.LARGE}
          handleClick={handleDonationReceivedVoucher}
          complete
          title="#JKKS5LSLA8"
        />
        <Items
          type={ItemsTypes.BASKET}
          size={ItemsTypes.LARGE}
          handleClick={handleDonationReceivedVoucher}
          title="#JKKS5LSLA8"
        />
        <Items
          type={ItemsTypes.BASKET}
          size={ItemsTypes.LARGE}
          handleClick={handleDonationReceivedVoucher}
          title="#JKKS5LSLA8"
        />
        <Items
          type={ItemsTypes.BASKET}
          size={ItemsTypes.LARGE}
          handleClick={handleDonationReceivedVoucher}
          title="#JKKS5LSLA8"
        />
        <Items
          type={ItemsTypes.BASKET}
          size={ItemsTypes.LARGE}
          handleClick={handleDonationReceivedVoucher}
          title="#JKKS5LSLA8"
        />
        <Items
          type={ItemsTypes.BASKET}
          size={ItemsTypes.LARGE}
          handleClick={handleDonationReceivedVoucher}
          title="#JKKS5LSLA8"
        />
      </div>
      <div className="footer-received-prof">
        <Button
          handleClick={() => handleDonationReceived('prof')}
          size={ButtonTypes.LARGE}
          disable={store.donation.received.amount !== store.donation.gived}
          message={legendDonationReceivedFinishButton}
        />
      </div>
    </div>
  )
}
ReceivedCurrentPage.propTypes = {
  store: PropTypes.shape({
    donation: PropTypes.shape({
      received: PropTypes.shape({
        date: PropTypes.string,
        amount: PropTypes.number,
      }).isRequired,
      gived: PropTypes.shape({
        amount: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(ReceivedCurrentPage)
