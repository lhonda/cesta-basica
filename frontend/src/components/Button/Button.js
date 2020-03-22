import React from 'react'
import './Button.scss'

export default function Button({ type = 'fill', message }) {
  return <button className={`button-${type}`}>{message}</button>
}
