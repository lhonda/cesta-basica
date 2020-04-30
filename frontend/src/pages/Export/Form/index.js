import React, { useState, useEffect } from 'react'
import { func, array } from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from '../../../store'

import { getCities } from '../../../services/API/city'
import { getStates } from '../../../services/API/state'
import { SiteList } from '../../../services/API/siteList'

import { UnitFilter } from './Unit'
import { LeaderFilter } from './Leader'

import { FilterForm } from '../../../components/FilterForm'
import { HeaderWithGoBack } from '../../../components/Header'
import { Button, ButtonTypes } from '../../../components/Button'

import { postReport } from '../../../services/API/report'
import { LeadersList } from '../../../services/API/leaderList'

import { formatCities, formatStates, formatStatus, formatSites } from '../../../utils/formatDataToSelectData'
import {
  unit,
  filter,
  chooseCity,
  chooseSite,
  chooseState,
  leader as leaderStr,
  cardsFirstLetterCapitalized,
  exportFirstLetterCapitalized,
  donationFirstLetterCapitalized,
  youCanChooseOneOrMoreFiltersForExport,
} from '../../../utils/strings'

import './styles.scss'

function ExportForm({ store, dispatch }) {
  const history = useHistory()
  const { states, cities, donationList, siteList, leaderList } = store
  const {
    location: {
      state: { selected },
    },
  } = history

  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState('')
  const [status, setStatus] = useState('')
  const [site, setSite] = useState(chooseSite)
  const [finalDate, setFinalDate] = useState('')
  const [countryState, setCountryState] = useState('')
  const [initialDate, setInitialDate] = useState('')
  const [leader, setLeader] = useState('')
  const [donations, setDonations] = useState([])

  async function getSitesList() {
    setIsLoading(true)
    await SiteList(dispatch)
    setIsLoading(false)
  }

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
    getSitesList()
  }, [])

  useEffect(() => {
    if (countryState !== '') {
      getCitiesList()
    }
  }, [countryState])

  useEffect(() => {
    if (site !== chooseSite) {
      setCountryState('')
      setCity('')
    }
  }, [site])

  function handleGoBack() {
    history.push('/export/types')
  }

  function getDonationIds() {
    return donationList.map((donation) => donation.donationId)
  }

  function disableCity() {
    return countryState === '' || countryState === chooseState || disableState()
  }
  function disableState() {
    return site !== chooseSite
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
          disableCity={disableCity}
          disableState={disableState}
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
          leaderList={leaderList}
          setSelectedCity={setCity}
          disableCity={disableCity}
          disableState={disableState}
          selectedState={countryState}
          sites={formatSites(siteList)}
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
        donations={donations}
        isLoading={isLoading}
        setLeader={setLeader}
        setStatus={setStatus}
        finalDate={finalDate}
        handleSubmit={() => {}}
        setDonations={setDonations}
        initialDate={initialDate}
        statusList={formatStatus()}
        countryState={countryState}
        setFinalDate={setFinalDate}
        sites={formatSites(siteList)}
        cities={formatCities(cities)}
        states={formatStates(states)}
        donationsList={getDonationIds()}
        setInitialDate={setInitialDate}
        setCountryState={setCountryState}
        subttitleMessage={youCanChooseOneOrMoreFiltersForExport}
        leaderList={leaderList}
      />
    )
  }

  async function getLeaderList() {
    await LeadersList(dispatch, leader)
  }

  useEffect(() => {
    if (leader.length >= 3) {
      getLeaderList()
    }
  }, [leader])

  function setType() {
    let type = 'sites'
    if (selected === leaderStr) {
      type = 'users'
    } else if (selected === donationFirstLetterCapitalized) {
      type = 'donation'
    } else if (selected === cardsFirstLetterCapitalized) {
      type = 'voucher'
    }
    return type
  }

  function navigateToExportList() {
    history.push('/export')
  }

  function setRequest() {
    let request = {}
    if (leader) {
      request = { ...request, leaderName: leader }
    }
    if (site && site !== chooseSite) {
      request = { ...request, siteId: site }
    }
    if (status) {
      request = { ...request, status }
    }
    if (donations && donations.length > 0) {
      request = { ...request, listDonationId: donations }
    }
    if (countryState) {
      request = { ...request, state: countryState }
    }
    if (city) {
      request = { ...request, city }
    }
    if (initialDate) {
      request = { ...request, dateFrom: initialDate }
    }
    if (finalDate) {
      request = { ...request, dateTo: finalDate }
    }
    return request
  }

  function handleSubmit() {
    postReport(dispatch, setRequest(), setType())
    navigateToExportList()
  }

  function enableButton() {
    return !!(
      leader === '' &&
      (site === '' || site === chooseSite) &&
      status === '' &&
      donations.length === 0 &&
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
      <div className="exportForm-footer">
        <Button
          size={ButtonTypes.LARGE}
          message={exportFirstLetterCapitalized}
          handleClick={handleSubmit}
          disable={selected === unit || selected === leaderStr ? false : enableButton()}
        />
      </div>
    </div>
  )
}

ExportForm.propTypes = {
  store: array.isRequired,
  dispatch: func.isRequired,
}

export default connect(ExportForm)
