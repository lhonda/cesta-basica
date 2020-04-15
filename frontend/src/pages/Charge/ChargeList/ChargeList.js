import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from '../../../store'

import { Button, ButtonTypes } from '../../../components/Button'
import { ChargeItem, ChargeIsEmpty } from './CommonComponents'

import { buttonAddChargeText } from '../../../utils/strings'

import './ChargeList.scss'

const ChargeList = ({ history, match, store }) => {
  const {
    user: { role },
  } = store

  const { url } = match

  const chargeList = []

  const render = () => {
    return chargeList.length > 0 ? (
      <div className={`containerCharge__list containerCharge__list--${role}`}>
        {chargeList.map((item) => {
          const { quantity, status, donationId } = item
          return (
            <ChargeItem
              title={donationId}
              quantity={quantity}
              key={donationId}
              stateDonation={status}
              donationId={donationId}
              userRole={role}
            />
          )
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
