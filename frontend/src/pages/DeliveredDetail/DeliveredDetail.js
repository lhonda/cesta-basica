import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DeliveredDetail.scss'

import { connect } from '../../store'

import { CardList } from '../../services/API/cardList'

function DeliveredDetail({ store, dispatch, history, match }) {
  const { id, voucher } = match.params
  const { goBack } = history
  useEffect(() => CardList(), [])
  return (
    <div>
      <button onClick={goBack}></button>
      alo
      {JSON.stringify(store.donationList[0])}
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
