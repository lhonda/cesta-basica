import React from 'react'
import PropTypes from 'prop-types'

import './BottomMenu.scss'

import { icBasket, icCharge } from '../../../../assets/icons'

function BottomMenu({ isAdmin }) {
  return (
    <nav className="containerMenu">
      <ul>
        <li>
          <button>
            <img src={icBasket} alt="Ícone de cesta com um coração dentro" />
          </button>
        </li>

        {isAdmin && (
          <li>
            <button>
              <img src={icCharge} alt="Ícone de pasta com dados" />
            </button>
          </li>
        )}

      </ul>
    </nav>
  )
}

BottomMenu.propTypes = {
  isAdmin: PropTypes.bool
}

export default BottomMenu
