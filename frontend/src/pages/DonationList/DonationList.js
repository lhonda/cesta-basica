import React, { useState, useEffect } from 'react'
import './DonationList.scss'
import { connect } from '../../store'

import { Loader } from '../../components/Loader'

import { DonationHeader } from './DonationHeader'
import { DonationIsEmpty } from './DonationIsEmpty'
import { DonationItem } from './DonationItem'
import { BottomMenu } from './BottomMenu'

const mock = [
  {
    title: 'Doação A',
    quantity: '110 unidades',
    state: 'Esperando Recebimento',
  },
  {
    title: 'Doação B',
    quantity: '1100 unidades',
    state: 'Entregue',
  },
  {
    title: 'Doação C',
    quantity: '1355 unidades',
    state: 'Completo',
    isComplete: true,
  },
]

function DonationList({ store, dispatch }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <>
      {loading && <Loader />}
      <DonationHeader />
      {true ? (
        <div className="donationList">
          {mock.map((item) => {
            const { title, quantity, state, isComplete } = item
            return <DonationItem title={title} quantity={quantity} stateDonation={state} isComplete={isComplete} />
          })}
        </div>
      ) : (
          <DonationIsEmpty />
        )}
      <BottomMenu />
    </>
  )
}

export default connect(DonationList)
