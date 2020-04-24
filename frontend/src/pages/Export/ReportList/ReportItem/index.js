import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { formatDate } from '../../../../utils/formatDateToptbr'
import { handleRedirectSymptoms } from '../../../../services/handles'

const ReportItem = ({ details, statusText, timestamp, url }) => (
  <div className="reportItem" onClick={() => url && handleRedirectSymptoms(url)}>
    <span>{details}</span>
    <div className="reportItem__details">
      <span>{statusText}</span>
      <span className="reportItem__details__date">{formatDate(timestamp)}</span>
    </div>
  </div>
)

ReportItem.propTypes = {
  details: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  url: PropTypes.string,
}

ReportItem.defaultProps = {
  url: '',
}

export { ReportItem }
