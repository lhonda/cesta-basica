import React from 'react'
import PropTypes from 'prop-types'

import { icX } from '../../../assets/icons'

const ItemList = ({ title, remove }) => (
  <div className="item">
    <p>{title}</p>
    <a onClick={() => remove(title)} className="item__remove">
      <img src={icX} alt="letter x" />
    </a>
  </div>
)

ItemList.propTypes = {
  title: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
}

export { ItemList }
