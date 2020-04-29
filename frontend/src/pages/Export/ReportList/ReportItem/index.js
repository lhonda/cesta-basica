import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '../../../../store'

import { formatDate } from '../../../../utils/formatDateToptbr'
import { handleRedirectSymptoms } from '../../../../services/handles'

import './style.scss'

import { icDelete } from '../../../../assets/icons'

const ReportItem = ({ id, details, statusText, timestamp, url, deleteItem }) => {
  return (
    <div className="reportItem" onClick={() => url && handleRedirectSymptoms(url)}>
      <div className="reportItem__detailsRow1">
        <span>{details}</span>
        <img
          className="reportItem__detailsRow1__icon"
          src={icDelete}
          alt="icon for information of delete an item"
          height={15}
          onClick={() => deleteItem(id)}
        />
      </div>
      <div className="reportItem__detailsRow2">
        <span>{statusText}</span>
        <span className="reportItem__detailsRow2__date">{formatDate(timestamp)}</span>
      </div>
    </div>
  )
}

ReportItem.propTypes = {
  id: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  url: PropTypes.string,
}

ReportItem.defaultProps = {
  url: '',
}

export default connect(ReportItem)
