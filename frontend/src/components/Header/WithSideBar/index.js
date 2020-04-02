import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import { Sidebar } from '../../Sidebar'

export default function HeaderWithSideBar({ onGoBackClick, title }) {
  return (
    <>
      <Header onGoBackClick={onGoBackClick} title={title} />
      <Sidebar />
    </>
  )
}

HeaderWithSideBar.propTypes = {
  title: PropTypes.string.isRequired,
  onGoBackClick: PropTypes.func.isRequired,
}
