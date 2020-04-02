import React from 'react'

import { RegisterForm } from './Form'
import { Title } from '../../components/Title'
import { BackButton } from '../../components/ButtonIcon'

import './DonationRegister.scss'

export default function DonationRegister() {
  function goBack() {
    console.log('goBack')
  }
  function onSubmit(request) {
    console.log('onSubmit - request: ', request)
  }

  return (
    <div className="component-container">
      <BackButton goBack={goBack} />
      <Title message="Cadastrar entrega" />
      <RegisterForm handleSubmit={onSubmit} />
    </div>
  )
}
