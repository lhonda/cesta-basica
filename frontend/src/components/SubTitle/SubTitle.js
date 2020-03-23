import React from 'react'
import PropTypes from 'prop-types'
import './SubTitle.scss'

import { SubTitleTypes } from './SubTitleTypes'

function SubTitle({ type, message }) {
  if (type === SubTitleTypes.STRONG) return <h3 className="subtitle">{message}</h3>
  if (type === SubTitleTypes.NORMAL) return <span className="subtitle-normal">{message}</span>
}
SubTitle.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
}
SubTitle.defaultProp = {
  type: SubTitleTypes.STRONG,
}

export default SubTitle
