import React from 'react'
import PropTypes from 'prop-types'

import { LogoBack } from '../Logo'
import { Title } from '../Title'
import { ButtonIcon } from '../ButtonIcon'
import { Legend, LegendTypes } from '../Legend'

import { back } from '../../utils/strings'

import './styles.scss'

export default function Header({ onGoBackClick, title, message, onMessageClick }) {
  return (
    <>
      <div className="header-button">
        <ButtonIcon handleClick={onGoBackClick}>
          <LogoBack height="10" />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>
      <div className="header-content">
        <div className="header-title">
          <Title message={title} />
        </div>
        {message && (
          <button className="header-message" onClick={onMessageClick} type="button">
            <h5>{message}</h5>
          </button>
        )}
      </div>
    </>
  )
}

Header.propTypes = {
  message: PropTypes.string,
  onMessageClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  onGoBackClick: PropTypes.func.isRequired,
}

Header.defaultProps = {
  message: '',
  onMessageClick: () => {},
}
