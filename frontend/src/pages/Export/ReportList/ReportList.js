import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { exportListTitle } from '../../../utils/strings'

import { Header } from '../../../components/Header/Header'

import { connect, types } from '../../../store'
import { getReportList } from '../../../services/API/report'

function ReportList({ store, dispatch }) {
  const { reportList } = store
  async function getReports() {
    await getReportList()
  }
  useEffect(() => getReports(), [])

  return (
    <div className="containerExportList">
      <Header title={exportListTitle} />
      {JSON.stringify(reportList)}
    </div>
  )
}

ReportList.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(ReportList)
