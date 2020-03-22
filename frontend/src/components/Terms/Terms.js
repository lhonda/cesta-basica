import React from 'react'
import PropPypes from 'prop-types'
import './Terms.scss'
import * as terms from '../../utils/strings'

function Terms({ content }) {
  return <p className="terms">{terms[content]}</p>
}

Terms.propTypes = {
  content: PropPypes.string.isRequired,
}
export default Terms
