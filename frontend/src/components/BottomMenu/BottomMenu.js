import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

import './BottomMenu.scss'

import { icBasket, icCharge, icProfile, icExport } from '../../assets/icons'
import { basketIconLegend, chargeIconLegend, exportIconLegend, profileIconLegend } from '../../utils/strings'

export function BottomMenu({ isAdmin }) {
  return (
    <nav className="containerMenu">
      <ul>
        <li>
          <NavLink to="/donation-list" activeClassName="donations">
            <img src={icBasket} alt="Ícone de cesta com um coração dentro" />
            <p>{basketIconLegend}</p>
          </NavLink>
        </li>

        {isAdmin && (
          <>
            <li>
              <NavLink to="/charge" activeClassName="charges">
                <img src={icCharge} alt="Ícone de pasta com dados" />
                <p>{chargeIconLegend}</p>
              </NavLink>
            </li>

            <li>
              <NavLink to="/export" activeClassName="exports">
                <img src={icExport} alt="Ícone de representando um download" />
                <p>{exportIconLegend}</p>
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink to="/profile" activeClassName="profile">
            <img src={icProfile} alt="Ícone de uma pessoa" />
            <p>{profileIconLegend}</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

BottomMenu.propTypes = {
  isAdmin: PropTypes.bool,
}
