import React from 'react'
import { string, func } from 'prop-types'

import { Header } from '../Header'
import { LogoBack } from '../../Logo'
import { ButtonIcon } from '../../ButtonIcon'
import { Legend, LegendTypes } from '../../Legend'

import { back } from '../../../utils/strings'

import './styles.scss'

function HeaderWithGoBack({ onGoBackClick, title, message, onMessageClick }) {
  return (
    <>
      <div className="headerWithGoBack-button">
        <ButtonIcon handleClick={onGoBackClick}>
          <LogoBack height="10" />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>
      <Header title={title} message={message} onMessageClick={onMessageClick} />
    </>
  )
}

HeaderWithGoBack.propTypes = {
  message: string,
  onMessageClick: func,
  title: string.isRequired,
  onGoBackClick: func.isRequired,
}

HeaderWithGoBack.defaultProps = {
  message: '',
  onMessageClick: () => {},
}

export { HeaderWithGoBack }
