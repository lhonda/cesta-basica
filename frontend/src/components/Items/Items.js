import React from 'react'
import PropTypes from 'prop-types'

import './Items.scss'

function Title({ title }) {
  return (
    <div className="item">
      <h5>{title}</h5>
    </div>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Title
