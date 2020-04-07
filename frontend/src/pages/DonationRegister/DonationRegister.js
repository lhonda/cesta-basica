import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from '../../store'

import { RegisterForm } from './Form'
import { Title } from '../../components/Title'
import { BackButton } from '../../components/ButtonIcon'

import './DonationRegister.scss'

function DonationRegister({ store, dispatch }) {
  const { leaderList, donationList } = store
  const history = useHistory()

  function goBack() {
    history.push('/donation-list')
  }
  function onSubmit(request) {
    console.log('onSubmit - request: ', request)
  }

  return (
    <div className="component-container">
      <BackButton goBack={goBack} />
      <Title message="Cadastrar entrega" />
      <RegisterForm
        handleSubmit={onSubmit}
        leaderList={leaderList || []}
        donationList={donationList || []}
        dispatch={dispatch}
      />
    </div>
  )
}

export default connect(DonationRegister)
