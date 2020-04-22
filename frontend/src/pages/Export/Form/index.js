import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from '../../../store'

import { getCities } from '../../../services/API/city'
import { getStates } from '../../../services/API/state'

import { UnitFilter } from './Unit'
import { LeaderFilter } from './Leader'

import { FilterForm } from '../../../components/FilterForm'
import { HeaderWithGoBack } from '../../../components/Header'
import { Button, ButtonTypes } from '../../../components/Button'

import { formatCities, formatStates, formatStatus } from '../../../utils/formatDataToSelectData'
import {
  unit,
  filter,
  chooseCity,
  chooseState,
  leader as leaderStr,
  exportFirstLetterCapitalized,
  youCanChooseOneOrMoreFiltersForExport,
} from '../../../utils/strings'

import './styles.scss'

function ExportForm({ store, dispatch }) {
  const history = useHistory()
  const { states, cities, donationList } = store
  const {
    location: {
      state: { selected },
    },
  } = history

  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState('')
  const [status, setStatus] = useState('')
  const [site, setSite] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [countryState, setCountryState] = useState('')
  const [initialDate, setInitialDate] = useState('')
  const [leader, setLeader] = useState('')
  const [borderos, setBorderos] = useState([])

  async function getCitiesList() {
    setIsLoading(true)
    await getCities(dispatch, countryState)
    setIsLoading(false)
  }

  async function getStatesList() {
    setIsLoading(true)
    await getStates(dispatch)
    setIsLoading(false)
  }

  useEffect(() => {
    getStatesList()
  }, [])

  useEffect(() => {
    if (countryState !== '') {
      getCitiesList()
    }
  }, [countryState])

  function handleGoBack() {
    history.push('/export/types')
  }

  function getDonationIds() {
    return donationList.map((donation) => donation.donationId)
  }

  function renderFilterComponent() {
    if (selected === unit) {
      return (
        <UnitFilter
          selectedCity={city}
          setSelectedCity={setCity}
          selectedState={countryState}
          states={formatStates(states)}
          cities={formatCities(cities)}
          setSelectedState={setCountryState}
        />
      )
    }
    if (selected === leaderStr) {
      return (
        <LeaderFilter
          site={site}
          leader={leader}
          setSite={setSite}
          selectedCity={city}
          setLeader={setLeader}
          setSelectedCity={setCity}
          selectedState={countryState}
          states={formatStates(states)}
          cities={formatCities(cities)}
          setSelectedState={setCountryState}
        />
      )
    }
    return (
      <FilterForm
        site={site}
        city={city}
        leader={leader}
        status={status}
        setSite={setSite}
        setCity={setCity}
        borderos={borderos}
        isLoading={isLoading}
        setLeader={setLeader}
        setStatus={setStatus}
        finalDate={finalDate}
        handleSubmit={() => { }}
        setBorderos={setBorderos}
        initialDate={initialDate}
        statusList={formatStatus()}
        countryState={countryState}
        setFinalDate={setFinalDate}
        cities={formatCities(cities)}
        states={formatStates(states)}
        borderoList={getDonationIds()}
        setInitialDate={setInitialDate}
        setCountryState={setCountryState}
        subttitleMessage={youCanChooseOneOrMoreFiltersForExport}
      />
    )
  }
  function handleSubmit() {
    const request = { leader, site, status, borderos, countryState, city, initialDate, finalDate }
    console.log('request: ', request)
  }

  function enableButton() {
    return !!(
      leader === '' &&
      site === '' &&
      status === '' &&
      borderos.length === 0 &&
      (countryState === '' || countryState === chooseState) &&
      (city === '' || city === chooseCity) &&
      initialDate === '' &&
      finalDate === ''
    )
  }

  return (
    <div className="exportForm-container">
      <div>
        <HeaderWithGoBack onGoBackClick={handleGoBack} title={filter} message={selected} />
        {renderFilterComponent()}
      </div>
      <div>
        <Button
          size={ButtonTypes.LARGE}
          message={exportFirstLetterCapitalized}
          handleClick={handleSubmit}
          disable={enableButton()}
        />
      </div>
    </div>
  )
}

export default connect(ExportForm)
