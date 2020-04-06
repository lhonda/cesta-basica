import React from 'react'
import PropTypes from 'prop-types'

export const Undeliverable = ({ comment }) => (
  <div className="containerDonationDetails__delivered--mt">
    <span className="containerDonationDetails__delivered__title">Comentario do lider</span>
    <div className="containerDonationDetails__delivered__comment">{comment}</div>
  </div>
)

Undeliverable.propTypes = {
  comment: PropTypes.string.isRequired,
}
