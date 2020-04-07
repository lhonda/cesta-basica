import React from 'react'
import { parseISO, addDays, format } from 'date-fns'
import PropTypes from 'prop-types'

import { WaitingReceivement } from '../WaitingReceivement'
import { Legend, LegendTypes } from '../../../components/Legend'

import { ShowImageButtonWithTitle } from '../../../components/ShowImageButtonWithTitle'

import { receivedData, deadlineDate, legendPicDonationWithNewLine } from '../../../utils/strings'
import { formatDate } from '../../../utils/formatDateToptbr'

import './styles.scss'

function DeliveredLeader({ current, donation }) {
  const { received } = donation

  function addOneDay() {
    const parsedDate = parseISO(received)
    const addedDate = addDays(parsedDate, 1)
    return format(addedDate, 'dd/MM/yyyy', {
      timeZone: 'America/Sao_Paulo',
    })
  }

  function getTime() {
    const parsedDate = parseISO(received)
    return format(parsedDate, 'HH:mm', {
      timeZone: 'America/Sao_Paulo',
    })
  }

  return (
    <>
      <WaitingReceivement current={current} donation={donation} />
      <div className="component-waitingReceivement-footer">
        <div>
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={receivedData} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={formatDate(received)} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={getTime()} />
        </div>
        <div>
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={deadlineDate} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={addOneDay()} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={getTime()} />
        </div>
      </div>
      <div className="component-deliveredLeader-imageButton">
        <ShowImageButtonWithTitle linkToImage="" text={legendPicDonationWithNewLine} />
      </div>
    </>
  )
}

DeliveredLeader.propTypes = {
  current: PropTypes.number,
  donation: PropTypes.shape({
    status: PropTypes.string.isRequired,
    statusText: PropTypes.string.isRequired,
    unitName: PropTypes.string.isRequired,
    leaderName: PropTypes.string.isRequired,
    deliveredDate: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  }).isRequired,
}

DeliveredLeader.defaultProps = {
  current: 2,
}

export { DeliveredLeader }
