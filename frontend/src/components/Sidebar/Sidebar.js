import React from 'react'
import PropTypes from 'prop-types'
import './Sidebar.scss'

function Sidebar({ steps, current }) {
  return (
    <div className="container-steps">
      <ul className="progressbar">
        <li className="actived" />
        <li className="active" />
        <li />
      </ul>
    </div>
  )
}

Sidebar.propTypes = {
  steps: PropTypes.number,
  current: PropTypes.number,
}
Sidebar.defaultProps = {
  steps: 3,
  current: 1,
}

export default Sidebar
