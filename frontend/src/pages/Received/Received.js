import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Status } from '../../components/Status'
import { Sidebar } from '../../components/Sidebar'
import { Legend, LegendTypes } from '../../components/Legend'
import { Paragraph, ParagraphTypes } from '../../components/Paragraph'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { LogoBack } from '../../components/Logo'

import { Loader } from '../../components/Loader'

import { DonationsList } from '../../services/API/donationList'

import './Received.scss'

import { formatDate } from '../../utils/formatDateToptbr'
import { formatDateTomorrow } from '../../utils/formaDateTomorrow'
import { findDonation } from '../../utils/findDonationByid'
import { formatHour } from '../../utils/formatHour'
import {
  back,
  legendDonationWaitStatus,
  legendDonationWaitDate,
  legendDonationWaitAmount,
  legendDonationReceivedButton,
  legendDonationDateFinal,
  deliveredToLeader,
} from '../../utils/strings'

import * as analytics from '../../services/analytics'

function ReceivedPage({ store, dispatch }) {
  const { id } = useParams()
  const { push, location, goBack } = useHistory()
  const [currentDonation, setCurrentDonation] = useState({})

  const [loading, setLoading] = useState()

  const fetchDonation = async () => {
    await DonationsList(dispatch)
  }

  useEffect(() => {
    const donation = findDonation(store, id)
    setCurrentDonation(donation || {})

    if (!donation.received) {
      setLoading(true)
      fetchDonation()
      setLoading(false)
    }
  }, [store])

  return (
    <div className="container-received">
      {loading && <Loader />}
      <div className="sidebar-donation-prof">
        <ButtonIcon handleClick={goBack}>
          <LogoBack height="10" />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>
      <div className="header-received">
        <Title message={`${id}`} />
        <Sidebar current={currentDonation.status} />
      </div>
      <div className="details-received">
        <div className="details-status">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitStatus} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={deliveredToLeader} />
        </div>
        <div className="details-amount">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={legendDonationWaitAmount} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={currentDonation.quantity || 0} />
        </div>
      </div>
      <div className="details-received">
        <div className="details-date">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitDate} />
          <Legend
            type={LegendTypes.STRONG}
            orientation={LegendTypes.START}
            message={formatDate(currentDonation.received)}
          />
          <Legend
            type={LegendTypes.STRONG}
            orientation={LegendTypes.START}
            message={formatHour(currentDonation.received)}
          />
        </div>
        <div className="details-amount">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={legendDonationDateFinal} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={formatDateTomorrow(currentDonation.received)} />
          <Legend
            type={LegendTypes.STRONG}
            orientation={LegendTypes.END}
            message={formatHour(currentDonation.received)}
          />
        </div>
      </div>
      <hr />
      <div className="main-received">
        <Paragraph size={ParagraphTypes.SMALL} content="descriptionDonationReceived" />
        <Paragraph size={ParagraphTypes.SMALL} content="descriptionDonationReceivedSecondparagraph" />
      </div>
      <div className="footer-received">
        <Button
          handleClick={() => {
            analytics.startDelivery(id)
            push(`${location.pathname}/current`)
          }}
          size={ButtonTypes.LARGE}
          message={legendDonationReceivedButton}
        />
      </div>
    </div>
  )
}
ReceivedPage.propTypes = {
  store: PropTypes.shape({
    donation: PropTypes.shape({
      received: PropTypes.shape({
        date: PropTypes.string,
        amount: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(ReceivedPage)
