import React from 'react'
import { string, array, func, bool } from 'prop-types'

import { Loader } from '../Loader'
import { Select } from '../Select'
import { SubTitle, SubTitleTypes } from '../SubTitle'
import { Input, inputTypes, InputWithMultiSelect, InputSelectSearch } from '../Input'

import {
  unit,
  maxSentDate,
  chooseLeader,
  chooseSite,
  cityFirstLetterCapitalized,
  statusFirstLetterCapitalized,
  donationFirstLetterCapitalized,
  finalDateFirstLetterCapitalized,
  initialDateFirstLetterCapitalized,
  countryStateFirstLetterCapitalized,
  chooseState,
} from '../../utils/strings'

import './styles.scss'

function FilterForm({
  leader,
  site,
  city,
  sites,
  states,
  cities,
  status,
  setSite,
  setCity,
  borderos,
  setLeader,
  setStatus,
  finalDate,
  isLoading,
  statusList,
  setBorderos,
  initialDate,
  borderoList,
  handleSubmit,
  countryState,
  setFinalDate,
  setInitialDate,
  setCountryState,
  subttitleMessage,
  leaderList,
}) {
  const convertListLeader = leaderList.map(({ name, login }) => ({ value: login, label: name }))
  function disableCity() {
    return countryState === '' || countryState === chooseState
  }
  function disableState() {
    return site !== chooseSite
  }
  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="filterForm-subtitle">
          <SubTitle type={SubTitleTypes.LIGHT} width={SubTitleTypes.SIZE_LARGE} message={subttitleMessage} />
        </div>
        <div className="filterForm-content">
          <InputSelectSearch
            data={convertListLeader}
            value={leader}
            placeholder={chooseLeader}
            inputType={inputTypes.TEXT}
            handleChange={setLeader}
          />
          <Select value={site} getValue={setSite} optionsList={sites} placeholder={unit} />
          <Select
            value={status}
            getValue={setStatus}
            optionsList={statusList}
            placeholder={statusFirstLetterCapitalized}
          />
          <InputWithMultiSelect
            selected={borderos}
            getSelected={setBorderos}
            optionData={borderoList}
            placeholder={donationFirstLetterCapitalized}
          />
          <Select
            optionsList={states}
            value={countryState}
            disabled={disableState()}
            getValue={setCountryState}
            placeholder={countryStateFirstLetterCapitalized}
          />
          <Select
            value={city}
            isRequired={false}
            getValue={setCity}
            disabled={disableCity()}
            optionsList={cities}
            placeholder={cityFirstLetterCapitalized}
          />
          <div className="filterForm-dates">
            <div className="filterForm-initialDate">
              <Input
                isRequired={false}
                value={initialDate}
                maxsentDate={maxSentDate}
                inputType={inputTypes.DATE}
                handleOnChange={setInitialDate}
                placeholder={initialDateFirstLetterCapitalized}
              />
            </div>
            <div className="filterForm-finalDate">
              <Input
                isRequired={false}
                value={finalDate}
                maxsentDate={maxSentDate}
                inputType={inputTypes.DATE}
                handleOnChange={setFinalDate}
                placeholder={finalDateFirstLetterCapitalized}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
FilterForm.propTypes = {
  leader: string.isRequired,
  site: string.isRequired,
  city: string.isRequired,
  sites: array.isRequired,
  states: array.isRequired,
  cities: array.isRequired,
  status: string.isRequired,
  setSite: func.isRequired,
  setCity: func.isRequired,
  borderos: array.isRequired,
  setLeader: func.isRequired,
  setStatus: func.isRequired,
  finalDate: string.isRequired,
  isLoading: bool.isRequired,
  statusList: array.isRequired,
  setBorderos: func.isRequired,
  initialDate: string.isRequired,
  borderoList: array.isRequired,
  handleSubmit: func.isRequired,
  countryState: string.isRequired,
  setFinalDate: func.isRequired,
  setInitialDate: func.isRequired,
  setCountryState: func.isRequired,
  subttitleMessage: string.isRequired,
  leaderList: array.isRequired,
}

export { FilterForm }
