import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ItemsTypes } from './ItemsTypes'
import { LogoBasket } from '../Logo'

import * as Options from './selectOptions'

import { DonationStatus } from '../../utils/donationStatus'

import './Items.scss'

function RenderOptions() {
  const options = Object.values(Options)
  options.unshift('Status da Entrega')
  return options.map((o, i) => (
    <option value={0} selected={i === 0} disabled={i === 0}>
      {o}
    </option>
  ))
}

function Item({ title, size, align, handleClick, type, statusId, state }) {
  const [status, setStatus] = useState('')
  function verifyStatusText() {
    if (statusId === DonationStatus.ENTREGUE.id) {
      setStatus('complete')
    } else if (statusId === DonationStatus.NAO_ENTREGUE.id) {
      setStatus('not-complete')
    } else if (statusId === DonationStatus.ENTREGUE_LIDER.id) {
      setStatus('initial')
    }
  }

  useEffect(() => {
    verifyStatusText()
  }, [])

  const components = {
    [ItemsTypes.SYMPTOMS]: (
      <div className={`item ${size} ${align} item--medium`}>
        <span>{title}</span>
      </div>
    ),
    [ItemsTypes.SELECT]: (
      <div className={`item ${size} ${align}`}>
        <select>{RenderOptions()}</select>
      </div>
    ),
    [ItemsTypes.BASKET]: (
      <div onClick={() => handleClick(title, state)} className={`item-basket ${size} ${align} ${status} ${state}`}>
        <span>{`Cartão ${title}`}</span>
        <LogoBasket />
      </div>
    ),
  }

  return components[type]
}

Item.propTypes = {
  statusId: PropTypes.number,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.string,
  state: PropTypes.string,
  complete: PropTypes.bool,
  handleClick: PropTypes.func,
}
Item.defaultProps = {
  statusId: 1,
  type: ItemsTypes.SYMPTOMS,
  size: ItemsTypes.SMALL,
  align: ItemsTypes.CENTER,
  handleClick: () => {},
}

export default Item
