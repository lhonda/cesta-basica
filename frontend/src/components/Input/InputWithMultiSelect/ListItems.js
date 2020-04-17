import React from 'react'
import PropTypes from 'prop-types'

import { ItemList } from './ItemList'

const ListItems = ({ selected, removeItem }) => (
  <div className="listItems">
    {selected.map((item) => (
      <ItemList key={Math.random()} remove={removeItem} title={item} />
    ))}
  </div>
)

ListItems.propTypes = {
  selected: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
}

export { ListItems }
