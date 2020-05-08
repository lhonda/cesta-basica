import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '../../../../store'

import { formatDate } from '../../../../utils/formatDateToptbr'
import { handleRedirectSymptoms } from '../../../../services/handles'

import { icDelete } from '../../../../assets/icons'

import { formatHour } from '../../../../utils/formatHour'

import './style.scss'

const ReportItem = ({ id, details, statusText, timestamp, url, owner, deleteItem }) => {
  if (owner) {
    var firstName = owner.split(' ', 1)
  }
  const openItem = () => url && handleRedirectSymptoms(url)
  return (
    <div className="reportItem">
      <div className="reportItem__detailsRow1">
        <span onClick={() => openItem()}>{details}</span>
        <img
          className="reportItem__detailsRow1__icon"
          src={icDelete}
          alt="icon for information of delete an item"
          height={15}
          onClick={() => deleteItem(id)}
        />
      </div>
      <div className="reportItem__detailsRow2" onClick={() => openItem()}>
        <span>{statusText}</span>
        <span className="reportItem__detailsRow2__date">{formatDate(timestamp)}</span>
      </div>
      <div className="reportItem__detailsRow3" onClick={() => openItem()}>
        {owner && (
          <>
            <span>Gerado por: {firstName}</span>
          </>
        )}
        <span></span>
        <span>{formatHour(timestamp)}</span>
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
  deleteItem: PropTypes.func.isRequired,
}

ReportItem.defaultProps = {
  url: '',
}

export default connect(ReportItem)
