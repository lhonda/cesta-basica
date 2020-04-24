import React from 'react'
import { func, array, string } from 'prop-types'

import { Select } from '../../../../components/Select'

import { countryStateFirstLetterCapitalized, cityFirstLetterCapitalized } from '../../../../utils/strings'

import './styles.scss'

function UnitFilter({ selectedState, setSelectedState, states, selectedCity, setSelectedCity, cities }) {
  return (
    <div className="unitFilter-container">
      <Select
        disabled={false}
        optionsList={states}
        value={selectedState}
        getValue={setSelectedState}
        placeholder={countryStateFirstLetterCapitalized}
      />
      <Select
        disabled={false}
        isRequired={false}
        optionsList={cities}
        value={selectedCity}
        getValue={setSelectedCity}
        placeholder={cityFirstLetterCapitalized}
      />
    </div>
  )
}

UnitFilter.propTypes = {
  cities: array.isRequired,
  states: array.isRequired,
  selectedCity: string.isRequired,
  selectedState: string.isRequired,
  setSelectedCity: func.isRequired,
  setSelectedState: func.isRequired,
}

export { UnitFilter }
