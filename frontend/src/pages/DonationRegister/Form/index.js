import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { inputTypes } from '../../../components/Input/InputTypes'
import { Input, InputSelectSearch } from '../../../components/Input'
import { ConfirmButton } from '../../../components/Button/ConfirmButton'

import './Form.scss'

const data = [{ name: 'Chocolate' }, { name: 'Coconut' }, { name: 'Mint' }, { name: 'Strawberry' }, { name: 'Vanilla' }]

function RegisterForm({ handleSubmit }) {
  const [leaderName, setLeaderName] = useState('')
  const [unitName, setUnitName] = useState('')
  const [donationId, setDonationId] = useState('')
  const [cardQuantity, setCardQuantity] = useState('')
  const [date, setDate] = useState('')

  function verifyRequest() {
    return !!(leaderName === '' || unitName === '' || donationId === '' || cardQuantity === '' || date === '')
  }
  return (
    <div className="form-container">
      <form
        className="form-content"
        onSubmit={() => handleSubmit({ leaderName, unitName, donationId, cardQuantity, date })}
      >
        <InputSelectSearch
          data={data}
          value={leaderName}
          placeholder="Escolher lider"
          inputType={inputTypes.TEXT}
          handleChange={setLeaderName}
        />
        <InputSelectSearch
          data={data}
          value={unitName}
          placeholder="Unidade"
          inputType={inputTypes.TEXT}
          handleChange={setUnitName}
        />
        <InputSelectSearch
          data={data}
          value={donationId}
          placeholder="Bordero"
          inputType={inputTypes.TEXT}
          handleChange={setDonationId}
        />
        <Input
          value={cardQuantity}
          placeholder="Quantidade de cartoes"
          inputType={inputTypes.TEXT}
          handleOnChange={setCardQuantity}
        />
        <Input
          value={date}
          placeholder="Data de envio"
          inputType={inputTypes.DATE}
          handleOnChange={setDate}
          maxDate="9999-12-31"
        />
        <div className="component-footer">
          <ConfirmButton
            handleClick={() => handleSubmit({ leaderName, unitName, donationId, cardQuantity, date })}
            disable={verifyRequest()}
          />
        </div>
      </form>
    </div>
  )
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export { RegisterForm }
