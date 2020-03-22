import React from 'react'
import './Terms.scss'
import * as terms from '../../utils/strings'

export default function Terms({ content }) {
  return <p className="terms">{terms[content]}</p>
}
