import React from 'react'
import PropTypes from 'prop-types'

import { LogoBack } from '../Logo'
import { Title } from '../Title'
import { ButtonIcon } from '../ButtonIcon'
import { Legend, LegendTypes } from '../Legend'

import { back } from '../../utils/strings'

export default function Header({ onGoBackClick, title }) {
  return (
    <div className="component-header">
      <div className="sidebar-donation-prof">
        <ButtonIcon handleClick={onGoBackClick}>
          <LogoBack height="10" />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>
      <Title message={title} />
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onGoBackClick: PropTypes.func.isRequired,
}
