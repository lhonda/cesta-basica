import React from 'react'
import PropTypes from 'prop-types'
import { ItemsTypes } from './ItemsTypes'
import { LogoBasket } from '../Logo'
import './Items.scss'

function Item({ title, type, complete }) {
  const components = {
    [ItemsTypes.SYMPTOMS]: (
      <div className="item">
        <h5>{title}</h5>
      </div>
    ),
    [ItemsTypes.BASKET]: (
      <div className={`item-basket ${complete ? 'complete' : ''}`}>
        <span>{`Cesta ${title}`}</span>
        <LogoBasket />
      </div>
    ),
  }

  return components[type]
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  complete: PropTypes.bool,
}
Item.defaultProps = {
  type: ItemsTypes.SYMPTOMS,
  complete: false,
}

export default Item
