import React from 'react'
import PropTypes from 'prop-types'
import './Title.scss'

export default function Title({ message }) {
  return <h2 className="titleTerms">{message}</h2>
}
Title.propTypes = {
  message: PropTypes.string.isRequired,
}
