import React from 'react'
import { string, func } from 'prop-types'

import { Title } from '../Title'

import './styles.scss'

function Header({ title, message, onMessageClick }) {
  return (
    <div className="header-container">
      <div className="header-title">
        <Title message={title} />
      </div>
      {message && (
        <button onClick={onMessageClick} type="button">
          <h5>{message}</h5>
        </button>
      )}
    </div>
  )
}

Header.propTypes = {
  message: string,
  onMessageClick: func,
  title: string.isRequired,
}

Header.defaultProps = {
  message: '',
  onMessageClick: () => {},
}

export { Header }
