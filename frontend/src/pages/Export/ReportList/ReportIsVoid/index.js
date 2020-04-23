import React from 'react'
import './style.scss'

import { reportIsVoid } from '../../../../utils/strings'
import { icEmptyDonationList } from '../../../../assets/icons'

const ReportIsVoid = () => (
  <div className="containerIsEmpty">
    <span dangerouslySetInnerHTML={{ __html: reportIsVoid }} />
    <img src={icEmptyDonationList} alt="void basket" />
  </div>
)

export { ReportIsVoid }
