import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { RadioButton } from '../../../components/RadioButton'
import { HeaderWithGoBack } from '../../../components/Header'
import { Button, ButtonTypes } from '../../../components/Button'

import {
  unit,
  leader,
  exportType,
  cardsFirstLetterCapitalized,
  donationFirstLetterCapitalized,
  continueFirstLetterCapitalized,
} from '../../../utils/strings'

import './styles.scss'

function ExportType() {
  const history = useHistory()
  const [selected, setSelected] = useState('')

  function navigateToExportList() {
    history.push('/export')
  }

  function handleGoBack() {
    navigateToExportList()
  }
  function handleClick() {
    history.push('/export/filters', { selected })
  }
  function handleRadioChange(event) {
    setSelected(event.target.value)
  }
  function enabledButton() {
    return selected === ''
  }

  return (
    <div className="exportType-container">
      <div className="exportType-header">
        <HeaderWithGoBack onGoBackClick={handleGoBack} title={exportType} />
      </div>
      <div className="exportType-content">
        <div className="exportType-radioBtn">
          <RadioButton
            handleChecked={handleRadioChange}
            options={[unit, leader, donationFirstLetterCapitalized, cardsFirstLetterCapitalized]}
          />
        </div>
        <div className="exportType-footer">
          <Button
            size={ButtonTypes.LARGE}
            message={continueFirstLetterCapitalized}
            handleClick={handleClick}
            disable={enabledButton()}
          />
        </div>
      </div>
    </div>
  )
}

export { ExportType }
