import React, { useState } from 'react'
import './Login.scss'

import { titleLoginScreen, subTitleLoginScreen, placeholderCPF, typeYourPassword } from '../../utils/strings'

import { Input, inputTypes } from '../../components/Input'

function Login() {
  const [CPF, setCPF] = useState('')
  const [password, setPassword] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <div className="containerLogin">
      <h2 className="containerLogin--textCenter">{titleLoginScreen}</h2>
      <h5 className="containerLogin--textCenter containerLogin__subtitle">{subTitleLoginScreen}</h5>

      <form onSubmit={handleSubmit} className="containerLogin__form">
        <div style={{ marginTop: '1.8rem' }} />
        <Input
          placeholder={placeholderCPF}
          inputType={inputTypes.CPF}
          minLength="14"
          maxLength="14"
          value={CPF}
          handleOnChange={setCPF}
        />

        <div style={{ marginTop: '1.2rem' }} />
        <Input
          placeholder={typeYourPassword}
          inputType={inputTypes.PASSWORD}
          minLength="14"
          maxLength="14"
          value={password}
          handleOnChange={setPassword}
        />
      </form>
    </div>
  )
}

export default Login
