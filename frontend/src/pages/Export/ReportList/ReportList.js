import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { exportListTitle, newExport } from '../../../utils/strings'

import { Header } from '../../../components/Header/Header'
import { Loader } from '../../../components/Loader'
import { BottomMenu } from '../../../components/BottomMenu'
import { Button, ButtonTypes } from '../../../components/Button'

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
  useEffect(() => getReports(), [])
  return (
    <>
      {loading && <Loader />}
      <div className="containerExportList">
        <div className="containerExportList__title">
          <Header title={exportListTitle} />
        </div>
        <div className="containerExportList__reportList">
          {!loading ? (
            reportList.map(({ details, statusText, timestamp, url }) => (
              <ReportItem key={`${Math.random()}`} {...{ details, statusText, timestamp, url }} />
            ))
          ) : (
              <div>vazoio</div>
            )}
        </div>
        <div className="containerExportList__button">
          <Button size={ButtonTypes.LARGE} typeButton="button" message={newExport} handleClick={() => { }} />
        </div>
      </div>
      <BottomMenu isAdmin />
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
