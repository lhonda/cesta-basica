import React from 'react'
import PropTypes from 'prop-types'

import { WaitingReceivement } from '../WaitingReceivement'
import { Legend, LegendTypes } from '../../../components/Legend'

import { receivedData, deadlineDate } from '../../../utils/strings'

function DeliveredLeader({ current }) {
  return (
    <>
      <WaitingReceivement current={current} />
      <div className="component-waitingReceivement-footer">
        <div>
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={receivedData} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message="26/03/2020" />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message="12h03" />
        </div>
        <div>
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={deadlineDate} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message="27/03/2020" />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message="12h03" />
        </div>
      </div>
    </>
  )
}

DeliveredLeader.propTypes = {
  current: PropTypes.number,
}

DeliveredLeader.defaultProps = {
  current: 2,
}

export { DeliveredLeader }
