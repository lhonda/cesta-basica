import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Terms } from '../../components/Terms'
import { Button, ButtonTypes } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import './Term.scss'

import { Loader } from '../../components/Loader'
import { declareTermUse, cancel, singin, titleTerms, locationPermission } from '../../utils/strings'
import { AcceptTerms } from '../../services/API/terms'
import { handleCheckedDeclararion, handleClickCancelTerms } from '../../services/handles'

function TermsPage({ store, dispatch, history }) {
  const [loading, setLoading] = useState(false)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  async function handleAcceptTerms() {
    setLoading(true)
    await AcceptTerms(history)
    setLoading(false)
  }
  useEffect(() => {
    getGeoLocation()
  }, [])

  function getGeoLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }

  return (
    <>
      {loading && <Loader />}
      <div className="container-terms">
        <div className="header-terms">
          <Title message={titleTerms} />
        </div>
        <div className="main-terms">
          {!latitude && !longitude && <div className="alert warning">{locationPermission}</div>}
          <Terms />
          <div style={{ margin: '1.2rem 0 0 0 ' }}>
            <Checkbox
              handleChecked={() => handleCheckedDeclararion(store, dispatch)}
              checked={store.declaration}
              message={declareTermUse}
              disabled={!latitude && !longitude}
            />
          </div>
        </div>
        <div className="containerFooter">
          <div className="containerFooter__buttons">
            <Button
              type={ButtonTypes.OUTLINE}
              message={cancel}
              handleClick={() => handleClickCancelTerms(dispatch, history)}
            />
            <Button disable={!store.declaration} message={singin} handleClick={handleAcceptTerms} />
          </div>
        </div>
      </div>
    </>
  )
}

TermsPage.propTypes = {
  store: PropTypes.shape({
    declaration: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(TermsPage)
