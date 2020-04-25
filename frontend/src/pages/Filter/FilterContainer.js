import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from '../../store'

import { getCities } from '../../services/API/city'
import { getStates } from '../../services/API/state'
import { setFilters } from '../../services/API/filters'
import { SiteList } from '../../services/API/siteList'
import { LeadersList } from '../../services/API/leaderList'

import { Loader } from '../../components/Loader'
import { Select } from '../../components/Select'
import { HeaderWithGoBack } from '../../components/Header'
import { Button, ButtonTypes } from '../../components/Button'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Input, inputTypes, InputWithMultiSelect, InputSelectSearch } from '../../components/Input'

import { formatCities, formatStates, formatStatus, formatSites } from '../../utils/formatDataToSelectData'
import {
  unit,
  filter,
  chooseLeader,
  cleanFilter,
  chooseCity,
  chooseState,
  maxSentDate,
  cityFirstLetterCapitalized,
  donationFilterSuccessMessage,
  youCanChooseOneOrMoreFilters,
  statusFirstLetterCapitalized,
  filterFirstLetterCapitalized,
  borderoFirstLetterCapitalized,
  finalDateFirstLetterCapitalized,
  initialDateFirstLetterCapitalized,
  countryStateFirstLetterCapitalized,
  chooseSite,
} from '../../utils/strings'

import { showSuccessAlert } from '../../utils/showAlert'

import './styles.scss'

function FilterContainer({ store, dispatch }) {
  const history = useHistory()
  const { donationList, cities, states, filters, siteList, leaderList } = store

  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState(filters.city ? filters.city : '')
  const [status, setStatus] = useState(filters.status ? filters.status : '')
  const [site, setSite] = useState(filters.siteId ? filters.siteId : chooseSite)
  const [finalDate, setFinalDate] = useState(filters.dateFrom ? filters.dateFrom : '')
  const [countryState, setCountryState] = useState(filters.state ? filters.state : '')
  const [initialDate, setInitialDate] = useState(filters.dateTo ? filters.dateTo : '')
  const [leader, setLeader] = useState(filters.leaderName ? filters.leaderName : '')
  const [borderos, setBorderos] = useState(filters.listDonationId ? filters.listDonationId : [])

  async function getLeaderList() {
    await LeadersList(dispatch, leader)
  }

  useEffect(() => {
    if (leader.length >= 3) {
      getLeaderList()
    }
  }, [leader])

  useEffect(() => {
    if (site !== chooseSite) {
      setCountryState('')
      setCity('')
    }
  }, [site])

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

  async function handleSubmit(e) {
    e.preventDefault()

    const request = {
      leaderName: leader,
      siteId: site !== chooseSite ? site : '',
      status,
      listDonationId: borderos,
      state: countryState,
      city,
      dateTo: finalDate,
      dateFrom: initialDate,
    }

    setFilters(dispatch, request)
    showSuccessAlert(dispatch, donationFilterSuccessMessage)
    navigateToDonationList()
  }

  function disableCity() {
    return countryState === '' || countryState === chooseState || disableState()
  }
  function disableState() {
    return site !== chooseSite
  }

  function verifyRequest() {
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

  function handleCleanFilter() {
    setLeader('')
    setSite('')
    setStatus('')
    setBorderos([])
    setCountryState('')
    setInitialDate('')
    setFinalDate('')
    setCity('')
    setFilters(dispatch, {
      leaderName: '',
      siteId: '',
      status: '',
      listDonationId: [],
      state: '',
      city: '',
      dateTo: '',
      dateFrom: '',
    })
  }

  function getDonationIds() {
    return donationList.map((donation) => donation.donationId)
  }

  function navigateToDonationList() {
    history.push('/donation-list')
  }

  const convertListLeader = leaderList.map(({ name, login }) => ({ value: login, label: name }))

  return (
    <>
      {isLoading && <Loader />}
      <div className="filter-container">
        <HeaderWithGoBack
          title={filter}
          message={cleanFilter}
          onMessageClick={handleCleanFilter}
          onGoBackClick={navigateToDonationList}
        />
        <form className="formFilter-container" onSubmit={handleSubmit}>
          <div className="formFilter-subtitle">
            <SubTitle
              type={SubTitleTypes.LIGHT}
              width={SubTitleTypes.SIZE_LARGE}
              message={youCanChooseOneOrMoreFilters}
            />
          </div>
          <div className="formFilter-content">
            <InputSelectSearch
              data={convertListLeader}
              value={leader}
              placeholder={chooseLeader}
              inputType={inputTypes.TEXT}
              handleChange={setLeader}
            />
            <Select value={site} getValue={setSite} optionsList={formatSites(siteList)} placeholder={unit} />
            <Select
              value={status}
              getValue={setStatus}
              optionsList={formatStatus()}
              placeholder={statusFirstLetterCapitalized}
            />
            <InputWithMultiSelect
              selected={borderos}
              getSelected={setBorderos}
              optionData={getDonationIds()}
              placeholder={borderoFirstLetterCapitalized}
            />
            <Select
              optionsList={formatStates(states)}
              value={countryState}
              getValue={setCountryState}
              disabled={disableState()}
              placeholder={countryStateFirstLetterCapitalized}
            />
            <Select
              value={city}
              isRequired={false}
              getValue={setCity}
              disabled={disableCity()}
              optionsList={formatCities(cities)}
              placeholder={cityFirstLetterCapitalized}
            />
            <div className="formFilter-dates">
              <div className="formFilter-initialDate">
                <Input
                  isRequired={false}
                  value={initialDate}
                  maxsentDate={maxSentDate}
                  inputType={inputTypes.DATE}
                  handleOnChange={setInitialDate}
                  placeholder={initialDateFirstLetterCapitalized}
                />
              </div>
              <div className="formFilter-finalDate">
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
          <div className="formFilter-footer">
            <Button disable={verifyRequest()} size={ButtonTypes.LARGE} message={filterFirstLetterCapitalized} />
          </div>
        </form>
      </div>
    </>
  )
}

FilterContainer.propTypes = {
  store: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(FilterContainer)
