import React from 'react'
import { SubTitle, SubTitleTypes } from '../SubTitle'
import { Paragraph } from '../Paragraph'
import './Terms.scss'

function Terms() {
  return (
    <>
      <Paragraph content="introductionCompromise" />
      <Paragraph content="considerations1" />
      <Paragraph content="considerations2" />
      <Paragraph content="considerations3" />
      <Paragraph content="considerations4" />

      <ol className="termsOrdenedList">
        <li>
          <Paragraph content="terms1" />
        </li>

        <li>
          <Paragraph content="terms2" />
        </li>

        <li>
          <Paragraph content="terms3" />
        </li>

        <li>
          <Paragraph content="terms4" />
        </li>

        <li>
          <Paragraph content="terms5" />
        </li>

        <li>
          <Paragraph content="terms6" />
        </li>

        <li>
          <Paragraph content="terms7" />
        </li>
      </ol>
    </>
  )
}

export default Terms
