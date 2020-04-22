import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { exportListTitle } from '../../../utils/strings'

import { Header } from '../../../components/Header/Header'

import { connect, types } from '../../../store'

function List({ store, dispatch }) {
  const { exportList } = store
  useEffect(() => { }, [])

  return (
    <div className="containerExportList">
      <Header title={exportListTitle} />
    </div>
  )
}

List.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(List)
