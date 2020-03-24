import React from 'react'
import PropTypes from 'prop-types'
import './SubTitle.scss'

import { SubTitleTypes } from './SubTitleTypes'

function SubTitle({ size, type, message }) {
  return <h3 className={`subtitle ${size} ${type}`}>{message}</h3>
}
SubTitle.propTypes = {
  message: PropTypes.string.isRequired,
  size: PropTypes.string,
  type: PropTypes.string,
}
SubTitle.defaultProps = {
  type: SubTitleTypes.NORMAL,
  size: SubTitleTypes.SMALL,
}

export default SubTitle
