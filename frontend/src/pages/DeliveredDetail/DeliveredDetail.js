import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './DeliveredDetail.scss'

import { connect } from '../../store'
import { CardList } from '../../services/API/cardList'

import { Header } from '../../components/Header'

import { DeliveryInformation } from './DeliveryInformation'
import { Delivered } from './Delivered'

const teste = [null, true, false]

function DeliveredDetail({ store, dispatch, history, match }) {
  const { id, voucher } = match.params
  const { goBack } = history
  const { delivered, receivedCpf, receivedName, statusText, status } = store.cardList.find(
    ({ voucherId }) => voucherId === voucher
  )
  useEffect(() => {
    CardList(dispatch, id)
  }, [])
  return (
    <div className="containerDonationDetails">
      <Header title={voucher} onGoBackClick={goBack} />

      <DeliveryInformation deliveryDate={delivered} statusDelivery={statusText} />

      {/* regular expression - colocar o formatador de cpf */}
      {teste[status] && (
        <Delivered recipientName={receivedName} recipientCPF={receivedCpf} linkToImage="https://www.google.com" />
      )}
    </div>
  )
}

DeliveredDetail.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
      voucher: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default connect(DeliveredDetail)
