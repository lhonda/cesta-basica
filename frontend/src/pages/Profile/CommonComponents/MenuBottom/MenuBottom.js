import React from 'react'

import { NavLink } from 'react-router-dom'

import './MenuBottom.scss'
import { icBasket, icCharge, icProfile} from '../../../../assets/icons'
function MenuBottom () {

    return (
      <nav className="containerMenu">
        <ul>

            <li>
              <NavLink to="/charge" activeClassName="charges">
                <img src={icCharge} alt="Ícone de pasta com dados" />
              </NavLink>
            </li>

          <li>
            <NavLink to="/donation-list" activeClassName="donations">
              <img src={icBasket} alt="Ícone de cesta com um coração dentro" />
            </NavLink>
          </li>           
        
          <li>
              <NavLink to="/profile" activeClassName="profile">
                <img src={icProfile} alt="Ícone de uma pessoa" />
              </NavLink>
          </li>
  
        </ul>
      </nav>
    )
  }

  export default MenuBottom;