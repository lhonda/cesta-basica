import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { Modal } from '../Modal'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Status } from '../../components/Status'
import { Sidebar } from '../../components/Sidebar'
import { Legend, LegendTypes } from '../../components/Legend'
import { Items, ItemsTypes } from '../../components/Items'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { LogoBack } from '../../components/Logo'

import './ReceivedCurrent.scss'

import {
  back,
  statusDonationReceivedCurrent,
  titleDonation,
  legendDonationWaitDate,
  legendDonationWaitAmount,
  legendDonationReceivedFinishButton,
  legendDonationDateFinal,
  completeDeliveryTitle,
} from '../../utils/strings'
import { handleDonationReceivedVoucher, handleToggleModal } from '../../services/handles'

function ReceivedCurrentPage({ store, dispatch }) {
  const { id } = useParams()
  const [showModal, setShowModal] = useState(false)

  const { goBack } = useHistory()

  return (
    <div className="container-received-prof">
      <Modal
        isOpenModal={showModal}
        actionExit={() => handleToggleModal(setShowModal)}
        title={completeDeliveryTitle}
      />
      <div className="sidebar-donation-prof">
        <ButtonIcon handleClick={goBack}>
          <LogoBack height={'10'} />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>
      <div className="header-received-prof">
        <Title message={`${titleDonation} ${id}`} />
        <Status message={statusDonationReceivedCurrent} />
        <Sidebar current={3} />
      </div>
      <div className="details-received">
        <div className="details-amount">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitAmount} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={store.donation.received.amount} />
        </div>
      </div>
      <div className="details-received">
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
      </div>
      <div className="footer-received-prof">
        <Button
          handleClick={() => handleToggleModal(setShowModal)}
          size={ButtonTypes.LARGE}
          disable={store.donation.received.amount !== store.donation.gived.amount}
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
