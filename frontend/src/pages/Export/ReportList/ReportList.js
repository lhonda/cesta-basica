import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { exportListTitle } from '../../../utils/strings'

import { Header } from '../../../components/Header/Header'
import { Loader } from '../../../components/Loader'

import { ReportItem } from './ReportItem'

import { connect, types } from '../../../store'
import { getReportList } from '../../../services/API/report'

function ReportList({ store: { reportList }, dispatch }) {
  const [loading, setLoading] = useState(true)
  async function getReports() {
    setLoading(true)
    const { status, data } = await getReportList()
    if (status === 200) {
      dispatch({ type: types.SET_REPORT_LIST, payload: data })
    }
    setLoading(false)
  }
  const reportListComponent = (
    <div className="containerExportList__reportList">
      {reportList.map(({ details, statusText, timestamp, url }) => (
        <ReportItem key={`${Math.random()}`} {...{ details, statusText, timestamp, url }} />
      ))}
    </div>
  )
  useEffect(() => getReports(), [])
  return (
    <>
      {loading && <Loader />}
      <div className="containerExportList">
        <Header title={exportListTitle} />
        {!loading ? reportListComponent : <div>vazoio</div>}
      </div>
    </>
  )
}

ReportList.propTypes = {
  store: PropTypes.shape({
    reportList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(ReportList)
