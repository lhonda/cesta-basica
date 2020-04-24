import React from 'react'
import { func, array, string } from 'prop-types'

import { UnitFilter } from '../Unit'
import { Select } from '../../../../components/Select'
import { inputTypes, InputSelectSearch } from '../../../../components/Input'

import { chooseLeader, unit, chooseSite } from '../../../../utils/strings'

import './styles.scss'

function LeaderFilter({
  site,
  sites,
  states,
  leader,
  cities,
  setSite,
  setLeader,
  leaderList,
  disableCity,
  disableState,
  selectedCity,
  selectedState,
  setSelectedCity,
  setSelectedState,
}) {
  const convertListLeader = leaderList.map(({ name, login }) => ({ value: login, label: name }))
  return (
    <>
      <div className="leaderFilter-container">
        <InputSelectSearch
          data={convertListLeader}
          value={leader}
          placeholder={chooseLeader}
          inputType={inputTypes.TEXT}
          handleChange={setLeader}
        />
        <Select value={site} getValue={setSite} optionsList={sites} placeholder={unit} />
      </div>
      <UnitFilter
        states={states}
        cities={cities}
        disableCity={disableCity}
        disableState={disableState}
        selectedCity={selectedCity}
        selectedState={selectedState}
        setSelectedCity={setSelectedCity}
        setSelectedState={setSelectedState}
      />
    </>
  )
}

LeaderFilter.propTypes = {
  disableCity: func,
  disableState: func,
  site: string.isRequired,
  sites: array.isRequired,
  cities: array.isRequired,
  states: array.isRequired,
  setSite: func.isRequired,
  leader: string.isRequired,
  setLeader: func.isRequired,
  leaderList: string.isRequired,
  selectedCity: string.isRequired,
  selectedState: string.isRequired,
  setSelectedCity: func.isRequired,
  setSelectedState: func.isRequired,
}
LeaderFilter.defaultProps = {
  disableCity: () => {},
  disableState: () => {},
}

export { LeaderFilter }
