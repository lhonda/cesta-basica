import React from 'react'
import { string, number, func, bool } from 'prop-types'

import { Notification } from '../../Notification'
import { Header } from '../Header'

import './styles.scss'

function HeaderWithIcon({ title, icon, qntd, onClick, isAdmin }) {
  return (
    <div className="headerWithIcon-container">
      <Header title={title} />
      {isAdmin && (
        <div>
          <div className="header-notification">
            <Notification qntd={qntd} />
          </div>
          <button onClick={onClick} type="button">
            <img src={icon} alt="botao para filtrar doaçoes" />
          </button>
        </div>
      )}
    </div>
  )
}

HeaderWithIcon.propTypes = {
  isAdmin: bool,
  qntd: number,
  onClick: func,
  title: string.isRequired,
  icon: string.isRequired,
}

HeaderWithIcon.defaultProps = {
  qntd: null,
  isAdmin: false,
  onClick: () => {},
}

export { HeaderWithIcon }
