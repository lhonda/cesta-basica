import React from 'react'
import PropTypes from 'prop-types'
import './ShowImageButtonWithTitle.scss'

import { icClips } from '../../assets/icons'

function ShowImageButtonWithTitle({ linkToImage, text }) {
  function handleClick(e) {
    e.preventDefault()
    if (linkToImage) {
      window.open(linkToImage, '_blank')
    }
  }
  return (
    <>
      <div className="containerProofOfDelivery">
        <div className="containerProofOfDelivery__text" dangerouslySetInnerHTML={{ __html: text }} />

        <a className="containerProofOfDelivery__button" onClick={handleClick}>
          <img src={icClips} height={16} width={24} alt="attachment icon" />
        </a>
      </div>
      <hr />
    </>
  )
}

ShowImageButtonWithTitle.propTypes = {
  linkToImage: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default ShowImageButtonWithTitle
