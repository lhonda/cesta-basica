import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { Modal } from '../Modal'
import { connect, types } from '../../store'
import { Title } from '../../components/Title'
import { Status } from '../../components/Status'
import { Sidebar } from '../../components/Sidebar'
import { Legend, LegendTypes } from '../../components/Legend'
import { Items, ItemsTypes } from '../../components/Items'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { LogoBack } from '../../components/Logo'

import { CardList } from '../../services/API/cardList'

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
import { handleToggleModal } from '../../services/handles'
import { EndDonation } from '../../services/API/donationList'
import { findDonation } from '../../utils/findDonationByid'
import { formatDate } from '../../utils/formatDateToptbr'
import { Loader } from '../../components/Loader'


import { DonationStatus } from '../../utils/donationStatus'

function ReceivedCurrentPage({ store, dispatch }) {
  const { id } = useParams()
  const history = useHistory()
  const { cardList } = store
  const [showModal, setShowModal] = useState(false)
  const [currentDonation, setCurrentDonation] = useState({})
  const [loading, setloading] = useState(false)

  const { goBack, push } = useHistory()
  function endDonations() {
    EndDonation(id, () => push('/donation-list'))
  }

  async function retrieveCards() {
    await CardList(dispatch, id)
  }

  function verifyIfCardsAreFilled() {
    const filteredCards = cardList.filter(
      (card) =>
        (card.status === DonationStatus.ENTREGUE.id) ||
        card.status === DonationStatus.NAO_ENTREGUE.id
    )
    return cardList.length === filteredCards.length
  }
  const handleClickItem = (voucher) => history.push(`${history.location.pathname}/${voucher}/prof`)
  useEffect(() => {
    setloading(true)
    dispatch({ type: types.CLEAN_CARD_LIST })
    const donation = findDonation(store, id)
    setCurrentDonation(donation || {})
    retrieveCards()
    if (cardList) {
      verifyIfCardsAreFilled()
    }
    setloading(false)
  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className="container-received-prof">
        <Modal isOpenModal={showModal} actionExit={endDonations} title={completeDeliveryTitle} />
        <div className="sidebar-donation-prof">
          <ButtonIcon handleClick={goBack}>
            <LogoBack height="10" />
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
            <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={cardList && cardList.length} />
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
          </div>
          <div className="details-amount">
            <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={legendDonationDateFinal} />
            <Legend
              type={LegendTypes.STRONG}
              orientation={LegendTypes.END}
              message={formatDate(currentDonation.completed)}
            />
          </div>
        </div>
        <hr />
        <div className="main-received-current-prof">
          {cardList &&
            cardList.map((card) => (
              <Items
                statusId={card.status}
                type={ItemsTypes.BASKET}
                size={ItemsTypes.LARGE}
                handleClick={handleClickItem}
                title={card.voucherId}
              />
            ))}
        </div>
      </div>
      <div className="footer-received-prof">
        <Button
          handleClick={() => handleToggleModal(setShowModal)}
          size={ButtonTypes.LARGE}
          disable={cardList && !verifyIfCardsAreFilled()}
          message={legendDonationReceivedFinishButton}
        />
      </div>
    </>
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
