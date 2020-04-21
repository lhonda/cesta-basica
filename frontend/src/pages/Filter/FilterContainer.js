import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from '../../store'

import { getCities } from '../../services/API/city'
import { getStates } from '../../services/API/state'
import { setFilters } from '../../services/API/filters'

import { Loader } from '../../components/Loader'
import { Select } from '../../components/Select'
import { HeaderWithGoBack } from '../../components/Header'
import { Button, ButtonTypes } from '../../components/Button'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Input, inputTypes, InputWithMultiSelect } from '../../components/Input'

import { formatCities, formatStates, formatStatus } from '../../utils/formatDataToSelectData'
import {
  unit,
  filter,
  cleanFilter,
  chooseCity,
  chooseState,
  maxSentDate,
  chooseLeader,
  cityFirstLetterCapitalized,
  youCanChooseOneOrMoreFilters,
  statusFirstLetterCapitalized,
  filterFirstLetterCapitalized,
  borderoFirstLetterCapitalized,
  finalDateFirstLetterCapitalized,
  initialDateFirstLetterCapitalized,
  countryStateFirstLetterCapitalized,
} from '../../utils/strings'

import './styles.scss'

function FilterContainer({ store, dispatch }) {
  const history = useHistory()
  const { donationList, cities, states, filters } = store

  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState(filters.city ? filters.city : '')
  const [status, setStatus] = useState(filters.status ? filters.status : '')
  const [site, setSite] = useState(filters.siteId ? filters.siteId : '')
  const [finalDate, setFinalDate] = useState(filters.dateFrom ? filters.dateFrom : '')
  const [countryState, setCountryState] = useState(filters.state ? filters.state : '')
  const [initialDate, setInitialDate] = useState(filters.dateTo ? filters.dateTo : '')
  const [leader, setLeader] = useState(filters.leaderName ? filters.leaderName : '')
  const [borderos, setBorderos] = useState(filters.listDonationId ? filters.listDonationId : [])

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

  async function handleSubmit(e) {
    e.preventDefault()

    const request = {
      leaderName: leader,
      siteId: site,
      status,
      listDonationId: borderos,
      state: countryState,
      city,
      dateTo: finalDate,
      dateFrom: initialDate,
    }

    setFilters(dispatch, request)
    navigateToDonationList()
  }

  function disabledStateCity() {
    return site !== ''
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
            <Input
              value={leader}
              isRequired={false}
              placeholder={chooseLeader}
              inputType={inputTypes.TEXT}
              handleOnChange={setLeader}
            />
            <Input
              value={site}
              placeholder={unit}
              isRequired={false}
              handleOnChange={setSite}
              inputType={inputTypes.TEXT}
            />
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
              disabled={disabledStateCity()}
              placeholder={countryStateFirstLetterCapitalized}
            />
            <Select
              value={city}
              isRequired={false}
              getValue={setCity}
              disabled={disabledStateCity()}
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
