import React from 'react'

import { Button, ButtonTypes } from '../../components/Button'
import { BottomMenu } from '../DonationList/CommonComponents'

const ChargeList = () => {
  return (
    <div className="containerDonation">
      <div className="containerDonation__button">
        <Button
          size={ButtonTypes.LARGE}
          typeButton="button"
          message={'Adicionar carga'}
          handleClick={() => alert('register')}
        />
      </div>

      <BottomMenu isAdmin={true} />
    </div>
  )
}

export default ChargeList

