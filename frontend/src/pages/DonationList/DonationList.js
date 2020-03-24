import React from 'react'
import './DonationList.scss'
import { connect } from '../../store'

import { DonationHeader } from './DonationHeader'
import { DonationIsEmpty } from './DonationIsEmpty'
import { BottomMenu } from './BottomMenu'
import { icLoader } from '../../assets/icons'

function DonationList({ store, dispatch }) {
  return (
    <div>
      <img src={icLoader} alt="" height="50" hidden />
      <DonationHeader />
      <DonationIsEmpty />
      <BottomMenu />
    </div>
  )
}

export default connect(DonationList)
