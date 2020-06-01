import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useRouteMatch } from 'react-router-dom'
import './style.scss'

import { exportListTitle, newExport, messageDeleteItemSuccess, messageDeleteItemFailure } from '../../../utils/strings'

import { showSuccessAlert, showFailureAlert } from '../../../utils/showAlert'

import { Header } from '../../../components/Header/Header'
import { Loader } from '../../../components/Loader'
import { BottomMenu } from '../../../components/BottomMenu'
import { Button, ButtonTypes } from '../../../components/Button'

import ReportItem from './ReportItem'
import { ReportIsVoid } from './ReportIsVoid'

import { connect, types } from '../../../store'
import { getReportList, deleteReport } from '../../../services/API/report'

function ReportList({ store: { reportList }, dispatch }) {
  const { push } = useHistory()
  const { path } = useRouteMatch()
  const [loading, setLoading] = useState(true)
  async function getReports() {
    setLoading(true)
    const { status, data } = await getReportList()

    if (status === 200) {
      dispatch({ type: types.SET_REPORT_LIST, payload: data })
    }
    setLoading(false)
  }

  const handleClick = () => push(`${path}/types`)
  useEffect(() => {
    getReports()
  }, [])

  async function deleteItem(id) {
    const { status } = await deleteReport(id)
    if (status === 204) {
      showSuccessAlert(dispatch, messageDeleteItemSuccess)
      const { data } = await getReportList()
      dispatch({ type: types.SET_REPORT_LIST, payload: data })
    } else {
      showFailureAlert(dispatch, messageDeleteItemFailure)
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="containerExportList">
        <div className="containerExportList__title">
          <Header title={exportListTitle} />
        </div>
        <div className="containerExportList__reportList">
          {!loading && reportList.length > 0 ? (
            reportList.map(({ id, details, statusText, timestamp, url, owner }) => (
              <ReportItem key={id} {...{ id, details, statusText, timestamp, url, owner }} deleteItem={deleteItem} />
            ))
          ) : (
            <ReportIsVoid />
          )}
        </div>
        <div className="containerExportList__button">
          <Button size={ButtonTypes.LARGE} typeButton="button" message={newExport} handleClick={handleClick} />
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
