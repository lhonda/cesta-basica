import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from '../../../store'

import { Loader } from '../../../components/Loader'

import { Button, ButtonTypes } from '../../../components/Button'
import { ChargeItem, ChargeIsEmpty } from './CommonComponents'

import { ChargesList } from '../../../services/API/chargeList'
import { chargeTypesList } from '../ChargeTypesList'

import { buttonAddChargeText } from '../../../utils/strings'
import { formatDate } from '../../../utils/formatDateToptbr'

import './ChargeList.scss'

function ChargeList({ store, match, dispatch }) {
  const [loading, setLoading] = useState()

  const {
    chargeList,
    user: { role },
  } = store

  const { url } = match

  const matchTypeName = (type) => chargeTypesList.find((e) => e.value === type).string

  const matchProcessStatus = (value) => {
    return value === 'Processado com sucesso' ? 'Processado' : 'Erro'
  }

  useEffect(() => {
    getChargeList()
  }, [])

  async function getChargeList() {
    setLoading(true)
    await ChargesList(dispatch)
    setLoading(false)
  }

  const render = () => {
    return chargeList?.length > 0 ? (
      <div className={`containerCharge__list containerCharge__list--${role}`}>
        {chargeList.map((item) => {
          const { _id, fileName, createdAt, type, status } = item
          return (
            <ChargeItem
              key={_id}
              fileName={fileName}
              date={formatDate(createdAt)}
              chargeType={matchTypeName(type)}
              status={matchProcessStatus(status)}
            />
          )
        })}
      </div>
    ) : (
      <ChargeIsEmpty whichMessage={role} />
    )
  }

  return (
    <div className="containerCharge">
      {loading && !chargeList && <Loader />}
      {render()}

      <div className="containerCharge__button">
        <Link
          to={{
            pathname: `${url}/add`,
            state: {
              title: `${buttonAddChargeText}`,
            },
          }}
        >
          <Button size={ButtonTypes.LARGE} typeButton="button" message={buttonAddChargeText} />
        </Link>
      </div>
    </div>
  )
}

ChargeList.propTypes = {
  store: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(ChargeList)
