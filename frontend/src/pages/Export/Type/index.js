import React from 'react'

import { RadioButton } from '../../../components/RadioButton'
import { HeaderWithGoBack } from '../../../components/Header'
import { Button, ButtonTypes } from '../../../components/Button'

import {
  unit,
  leader,
  exportType,
  cardsFirstLetterCapitalized,
  borderoFirstLetterCapitalized,
  continueFirstLetterCapitalized,
} from '../../../utils/strings'

import './styles.scss'

function ExportType() {
  function handleGoBack() {
    console.log('onGoBack')
  }
  return (
    <div className="exportType-container">
      <div className="exportType-header">
        <HeaderWithGoBack onGoBackClick={handleGoBack} title={exportType} />
      </div>
      <div className="exportType-content">
        <div className="exportType-radioBtn">
          <RadioButton options={[unit, leader, borderoFirstLetterCapitalized, cardsFirstLetterCapitalized]} />
        </div>
        <div className="exportType-footer">
          <Button disable={() => {}} size={ButtonTypes.LARGE} message={continueFirstLetterCapitalized} />
        </div>
      </div>
    </div>
  )
}

export { ExportType }
