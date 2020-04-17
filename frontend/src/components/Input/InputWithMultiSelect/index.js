import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { ListItems } from './ListItems'

function InputWithMultiSelect({ placeholder, optionData, selected, getSelected }) {
  const [currenteValue, setCurrentValue] = useState()

  const currentOptions = optionData.filter((item) => !selected.includes(item))

  function onSelectedChange({ target: { value: valueInput } }) {
    setCurrentValue(valueInput)
    const checkInList = currentOptions.find((item) => item === valueInput)
    if (checkInList) {
      setCurrentValue('')
      getSelected([...selected, checkInList].reverse())
    }
  }

  function removeItemInList(itemToRemove) {
    const filtered = selected.filter((item) => item !== itemToRemove)
    getSelected(filtered)
  }

  return (
    <div className="containerMultiSelect">
      <input type="text" list="options" value={currenteValue} onInput={onSelectedChange} placeholder={placeholder} />
      <datalist id="options">
        {currentOptions.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>

      {selected.length > 0 && <ListItems selected={selected} removeItem={removeItemInList} />}
    </div>
  )
}

InputWithMultiSelect.propTypes = {
  placeholder: PropTypes.string,
  optionData: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.array.isRequired,
  getSelected: PropTypes.func.isRequired,
}

InputWithMultiSelect.defaultProps = {
  placeholder: '',
}

export { InputWithMultiSelect }
