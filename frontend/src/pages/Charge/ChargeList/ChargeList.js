import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from '../../../store'

import { Button, ButtonTypes } from '../../../components/Button'
import { ChargeItem, ChargeIsEmpty } from './CommonComponents'

import { buttonAddChargeText } from '../../../utils/strings'

import './ChargeList.scss'

const ChargeList = ({ match, store }) => {
  const {
    user: { role },
  } = store

  const { url } = match

  const mockChargeList = [
    { id: 1, fileName: 'pacotes_tk_abril', date: '01/04/2020', chargeType: 'Pacotes' },
    { id: 2, fileName: 'novos_lideres_abril', date: '03/04/2020', chargeType: 'Líder' },
  ]

  const render = () => {
    return mockChargeList.length > 0 ? (
      <div className={`containerCharge__list containerCharge__list--${role}`}>
        {mockChargeList.map((item) => {
          console.log(item);
          
          const { id, fileName, date, chargeType } = item
          return <ChargeItem key={id} fileName={fileName} date={date} chargeType={chargeType} />
        })}
      </div>
    ) : (
      <ChargeIsEmpty whichMessage={role} />
    )
  }

  return (
    <div className="chargeList">
      {render()}

      <div className="chargeList__button">
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

export default connect(ChargeList)
