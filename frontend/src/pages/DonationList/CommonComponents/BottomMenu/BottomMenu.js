import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

import './BottomMenu.scss'

import { icBasket, icCharge, icProfile } from '../../../../assets/icons'

function BottomMenu({ isAdmin }) {
  return (
    <nav className="containerMenu">
      <ul>
        <li>
          <NavLink to="/donation-list" activeClassName="donations">
            <img src={icBasket} alt="Ícone de cesta com um coração dentro" />
          </NavLink>
        </li>

        {isAdmin && (
          <li>
            <NavLink to="/charge" activeClassName="charges">
              <img src={icCharge} alt="Ícone de pasta com dados" />
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/profile" activeClassName="profile">
            <img src={icProfile} alt="Ícone de uma pessoa" />
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

BottomMenu.propTypes = {
  isAdmin: PropTypes.bool,
}

export default BottomMenu
