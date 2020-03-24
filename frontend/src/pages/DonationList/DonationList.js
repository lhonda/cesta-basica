import React from 'react'
import './DonationList.scss'
import { connect } from '../../store'

import { Loader } from '../../components/Loader'

import { DonationHeader } from './DonationHeader'
import { DonationIsEmpty } from './DonationIsEmpty'
import { BottomMenu } from './BottomMenu'

function DonationList({ store, dispatch }) {
  return (
    <>
      <Loader />
      <div>
        <DonationHeader />
        <DonationIsEmpty />
        <BottomMenu />
      </div>
    </>
  )
}

export default connect(DonationList)
