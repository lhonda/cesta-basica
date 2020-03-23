import React from 'react'
import PropTypes from 'prop-types'
import './SubTitle.scss'

import { SubTitleTypes } from './SubTitleTypes'

function SubTitle({ type, message }) {
  const component = {
    [SubTitleTypes.STRONG]: <h3 className="subtitle">{message}</h3>,
    [SubTitleTypes.NORMAL]: <span className="subtitle-normal">{message}</span>,
  }
  return component[type]
}
SubTitle.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
}
SubTitle.defaultProps = {
  type: SubTitleTypes.STRONG,
}

export default SubTitle
