import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'

export default function HeaderWithFilter({ onGoBackClick, title, message, onMessageClick }) {
  return <Header onGoBackClick={onGoBackClick} title={title} message={message} onMessageClick={onMessageClick} />
}

HeaderWithFilter.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onGoBackClick: PropTypes.func.isRequired,
  onMessageClick: PropTypes.func.isRequired,
}
