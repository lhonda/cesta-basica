import React from 'react'
import { func, array, string } from 'prop-types'

import { Select } from '../../../../components/Select'

import { countryStateFirstLetterCapitalized, cityFirstLetterCapitalized, chooseState } from '../../../../utils/strings'

import './styles.scss'

function UnitFilter({
  selectedState,
  setSelectedState,
  states,
  selectedCity,
  setSelectedCity,
  cities,
  disableState,
  disableCity,
}) {
  return (
    <div className="unitFilter-container">
      <Select
        disabled={disableState()}
        optionsList={states}
        value={selectedState}
        getValue={setSelectedState}
        placeholder={countryStateFirstLetterCapitalized}
      />
      <Select
        disabled={disableCity()}
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
  disableCity: func,
  disableState: func,
  cities: array.isRequired,
  states: array.isRequired,
  selectedCity: string.isRequired,
  selectedState: string.isRequired,
  setSelectedCity: func.isRequired,
  setSelectedState: func.isRequired,
}

UnitFilter.defaultProps = {
  disableCity: () => {},
  disableState: () => {},
}

export { UnitFilter }
