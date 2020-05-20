import React from 'react'
import { Route, Switch, useLocation, useRouteMatch, useHistory } from 'react-router-dom'

import PropTypes from 'prop-types'
import { openUrlDonationById, openUrlVoucherById } from '../../services/API/donationList'
import './ShowImageButtonWithTitle.scss'

import { icClips } from '../../assets/icons'

function ShowImageButtonWithTitle({ linkToImage, text }) {
  const { path } = useRouteMatch()

  const getCurrentUserRoute = () => path.split('/').length === 4

  function handleClick(e) {
    e.preventDefault()
    getCurrentUserRoute() ? openUrlDonationById(linkToImage) : openUrlVoucherById(linkToImage)
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
