import React from 'react'
import { func, array, string } from 'prop-types'

import { UnitFilter } from '../Unit'
import { Select } from '../../../../components/Select'
import { Input, inputTypes } from '../../../../components/Input'

import { chooseLeader, unit } from '../../../../utils/strings'

import './styles.scss'

function LeaderFilter({
  site,
  sites,
  states,
  leader,
  cities,
  setSite,
  setLeader,
  selectedState,
  selectedCity,
  setSelectedCity,
  setSelectedState,
}) {
  return (
    <>
      <div className="leaderFilter-container">
        <Input
          value={leader}
          isRequired={false}
          placeholder={chooseLeader}
          inputType={inputTypes.TEXT}
          handleOnChange={setLeader}
        />
        <Select value={site} getValue={setSite} optionsList={sites} placeholder={unit} />
      </div>
      <UnitFilter
        states={states}
        cities={cities}
        selectedCity={selectedCity}
        selectedState={selectedState}
        setSelectedCity={setSelectedCity}
        setSelectedState={setSelectedState}
      />
    </>
  )
}

LeaderFilter.propTypes = {
  site: string.isRequired,
  cities: array.isRequired,
  states: array.isRequired,
  setSite: func.isRequired,
  leader: string.isRequired,
  setLeader: func.isRequired,
  selectedCity: string.isRequired,
  selectedState: string.isRequired,
  setSelectedCity: func.isRequired,
  setSelectedState: func.isRequired,
}

export { LeaderFilter }
