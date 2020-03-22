import React from 'react'
import PropsType from 'prop-types'
import './Paragraph.scss'
import * as terms from '../../utils/strings'

function Paragraph({ content }) {
  return <p className="paragraph">{terms[content]}</p>
}

Paragraph.propTypes = {
  content: PropsType.string.isRequired,
}

export default Paragraph
