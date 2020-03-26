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

      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="1." />
      <Paragraph content="terms1" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="2." />
      <Paragraph content="terms2" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="3." />
      <Paragraph content="terms3" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="4." />
      <Paragraph content="terms4" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="5." />
      <Paragraph content="terms5" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="6." />
      <Paragraph content="terms6" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="7." />
      <Paragraph content="terms7" />
    </>
  )
}

export default Terms
