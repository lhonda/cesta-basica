import React from 'react'
import PropTypes from 'prop-types'
import './ProofOfDelivery.scss'

import { deliveredPhoto } from '../../utils/strings'
import { icClips } from '../../assets/icons'

function ProofOfDelivery({ linkToImage }) {
  function handleClick(e) {
    e.preventDefault()
    if (linkToImage) {
      window.open(linkToImage, '_blank')
    }
  }
  return (
    <>
      <div className="containerProofOfDelivery">
        <div className="containerProofOfDelivery__text" dangerouslySetInnerHTML={{ __html: deliveredPhoto }} />

        <a className="containerProofOfDelivery__button" onClick={handleClick}>
          <img src={icClips} height={16} width={24} alt="attachment icon" />
        </a>
      </div>
      <hr />
    </>
  )
}

ProofOfDelivery.propTypes = {
  linkToImage: PropTypes.string.isRequired,
}

export default ProofOfDelivery
