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
  legendDonationWaitDate,
  legendDonationWaitAmount,
  legendDonationReceivedFinishButton,
  legendDonationDateFinal,
  completeDeliveryTitle,
  legendDonationWaitStatus,
} from '../../utils/strings'
import { handleToggleModal } from '../../services/handles'
import { EndDonation } from '../../services/API/donationList'
import { formatDate } from '../../utils/formatDateToptbr'
import { formatDateTomorrow } from '../../utils/formaDateTomorrow'
import { findDonation } from '../../utils/findDonationByid'
import { formatHour } from '../../utils/formatHour'
import { Loader } from '../../components/Loader'

import { DonationStatus } from '../../utils/donationStatus'
import * as analytics from '../../services/analytics'

function ReceivedCurrentPage({ store, dispatch }) {
  const { id } = useParams()
  const history = useHistory()
  const { cardList } = store
  const [showModal, setShowModal] = useState(false)
  const [currentDonation, setCurrentDonation] = useState({})
  const { push, goBack } = useHistory()

  function endDonations() {
    EndDonation(id, () => push('/donation-list'))
  }

  async function retrieveCards() {
    await CardList(dispatch, id)
  }

  function clearCardList() {
    dispatch({ type: types.CLEAN_CARD_LIST })
  }

  function verifyIfCardsAreFilled() {
    const filteredCards = cardList.filter(
      (card) => card.status === DonationStatus.ENTREGUE.id || card.status === DonationStatus.NAO_ENTREGUE.id
    )
    return cardList.length > 0 && cardList.length === filteredCards.length
  }

  const handleClickItem = (voucher, state) =>
    state !== 'unfilled' && history.push(`${history.location.pathname}/${voucher}/prof`)

  useEffect(() => {
    clearCardList()

    const donation = findDonation(store, id)
    setCurrentDonation(donation || {})

    retrieveCards()

    if (cardList) {
      verifyIfCardsAreFilled()
    }
  }, [])

  return (
    <>
      { cardList &&
          cardList.length === 0 && <Loader /> }
      <div className="container-received-prof">
        <Modal
          closeModal={() => setShowModal(false)}
          isOpenModal={showModal}
          actionExit={endDonations}
          title={completeDeliveryTitle}
        />

        <div className="sidebar-donation-prof">
          <ButtonIcon handleClick={goBack}>
            <LogoBack height="10" />
          </ButtonIcon>
          <Legend type={LegendTypes.STRONG} message={back} />
        </div>

        <div className="header-received-prof">
          <Title message={`${id}`} />
          <Sidebar current={currentDonation.status} />
        </div>
        <div className="details-received">
          <div className="details-status">
            <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitStatus} />
            <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={statusDonationReceivedCurrent} />
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
        <div className="main-received-current-prof">
          {cardList &&
            cardList.map((card, i, arr) => {
              const state = arr[i - 1] ? (arr[i - 1].status > 1 ? 'filled' : 'unfilled') : 'first'

              return (
                <Items
                  key={card.voucherId}
                  state={state}
                  statusId={card.status}
                  type={ItemsTypes.BASKET}
                  size={ItemsTypes.LARGE}
                  handleClick={handleClickItem}
                  title={card.voucherId}
                />
              )
            })}
        </div>
      </div>
      <div className="footer-received-prof">
        <Button
          handleClick={() => {
            analytics.endDelivery(id)
            handleToggleModal(setShowModal)
          }}
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
