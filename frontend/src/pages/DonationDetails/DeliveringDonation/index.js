import React, { useState } from 'react'

import { Loader } from '../../../components/Loader'
import { DeliveredLeader } from '../DeliveredLeader'
import { CardList } from '../../../components/CardList'

function DeliveringDonation() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      {loading && <Loader />}
      <DeliveredLeader current={3} />
      <CardList setLoading={setLoading} />
    </>
  )
}

export { DeliveringDonation }
