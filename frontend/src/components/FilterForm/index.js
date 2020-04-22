import React from 'react'

import { Loader } from '../Loader'
import { Select } from '../Select'
import { SubTitle, SubTitleTypes } from '../SubTitle'
import { Input, inputTypes, InputWithMultiSelect } from '../Input'

import {
  unit,
  maxSentDate,
  chooseLeader,
  cityFirstLetterCapitalized,
  statusFirstLetterCapitalized,
  borderoFirstLetterCapitalized,
  finalDateFirstLetterCapitalized,
  initialDateFirstLetterCapitalized,
  countryStateFirstLetterCapitalized,
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
}) {
  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="filterForm-subtitle">
          <SubTitle type={SubTitleTypes.LIGHT} width={SubTitleTypes.SIZE_LARGE} message={subttitleMessage} />
        </div>
        <div className="filterForm-content">
          <Input
            value={leader}
            isRequired={false}
            placeholder={chooseLeader}
            inputType={inputTypes.TEXT}
            handleOnChange={setLeader}
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
            placeholder={borderoFirstLetterCapitalized}
          />
          <Select
            disabled={false}
            optionsList={states}
            value={countryState}
            getValue={setCountryState}
            placeholder={countryStateFirstLetterCapitalized}
          />
          <Select
            value={city}
            isRequired={false}
            getValue={setCity}
            disabled={false}
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

export { FilterForm }
