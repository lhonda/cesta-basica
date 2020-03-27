import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { Symptoms } from '../../components/Symptoms'
import { Legend } from '../../components/Legend'
import { Link } from '../../components/Link'

import './Checklist.scss'

import { Loader } from '../../components/Loader'
import {
  declareChecklist,
  LegendChecklist,
  linkChecklist,
  descriptionChecklist,
  send,
  titleChecklist,
} from '../../utils/strings'
import { handleCheckedHealth, handleRedirectSymptoms } from '../../services/handles'

function ChecklistPage({ store, dispatch, history }) {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleChecked = () => setChecked(!checked)
  async function handleSend() {
    setLoading(true)
    await handleCheckedHealth(dispatch, history)
    setLoading(false)
  }
  return (
    <>
      {loading && <Loader />}
      <div className="container-checklist">
        <div className="header-checklist">
          <Title message={titleChecklist} />
          <SubTitle type={SubTitleTypes.NORMAL} message={descriptionChecklist} />
        </div>
        <div className="main-checklist">
          <Symptoms />
          <Legend message={LegendChecklist} />
          <Link action={() => handleRedirectSymptoms('https://google.com.br')} message={linkChecklist} />
          <Checkbox handleChecked={handleChecked} checked={checked} message={declareChecklist} />
        </div>
        <div className="footer-checklist">
          <Button disable={!checked} message={send} handleClick={handleSend} />
        </div>
      </div>
    </>
  )
}
ChecklistPage.propTypes = {
  store: PropTypes.shape({
    health: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(ChecklistPage)
