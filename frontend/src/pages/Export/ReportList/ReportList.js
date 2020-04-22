import React, { useState, useEffect } from 'react'
import PropTypes, { object } from 'prop-types'
import './style.scss'

import { exportListTitle } from '../../../utils/strings'

import { Header } from '../../../components/Header/Header'

import { connect, types } from '../../../store'
import { getReportList } from '../../../services/API/report'

function ReportList({ store: { reportList }, dispatch }) {
  async function getReports() {
    const { status, data } = await getReportList()
    if (status === 200) {
      dispatch({ type: types.SET_REPORT_LIST, payload: data })
    }
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
  store: PropTypes.shape({
    reportList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(ReportList)
