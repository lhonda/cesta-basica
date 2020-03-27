import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Status } from '../../components/Status'
import { Sidebar } from '../../components/Sidebar'
import { Legend, LegendTypes } from '../../components/Legend'
import { Paragraph, ParagraphTypes } from '../../components/Paragraph'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { LogoBack } from '../../components/Logo'

import './Donation.scss'

import {
  back,
  contate,
  contateNumber,
  titleDonation,
  statusDonationWait,
  legendDonationWaitDate,
  legendDonationWaitAmount,
  legendDonationWaitButton,
} from '../../utils/strings'

function DonationPage({ store, dispatch }) {
  const { push, location, goBack } = useHistory()
  const { id } = useParams()
  return (
    <div className="container-donation">
      <div className="sidebar-donation-prof">
        <ButtonIcon handleClick={goBack}>
          <LogoBack height={10} />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>

      <div className="header-donation">
        <Title message={`${titleDonation} ${id}`} />
        <Status message={statusDonationWait} />
        <Sidebar />
      </div>
      <div className="details-donation">
        <div className="details-date">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitDate} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={store.donation.received.date} />
        </div>
        <div className="details-amount">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={legendDonationWaitAmount} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={store.donation.received.amount} />
        </div>
      </div>
      <hr />
      <div className="main-donation">
        <Paragraph size={ParagraphTypes.MEDIUM} content="legendDonationWaitInformation" />
        <SubTitle size={SubTitleTypes.MEDIUM} type={SubTitleTypes.STRONG} message={contate} />
        <SubTitle size={SubTitleTypes.MEDIUM} type={SubTitleTypes.NORMAL} message={contateNumber} />
      </div>
      <hr />

      <Paragraph content="legendDonationWaitInformationButton" />

      <div className="footer-donation">
        <Button
          handleClick={() => push(`${location.pathname}/prof`)}
          size={ButtonTypes.LARGE}
          message={legendDonationWaitButton}
        />
      </div>
    </div>
  )
}
DonationPage.propTypes = {
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

export default connect(DonationPage)
