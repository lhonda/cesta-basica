import React from 'react'
import PropTypes from 'prop-types'

import { completeName, CPF } from '../../../utils/strings'
import { ProofOfDelivery } from '../../../components/ProofOfDelivery'

import { maskToCpf } from '../../../utils/masksInput'

export const Delivered = ({ recipientName, recipientCPF, linkToImage }) => (
  <>
    <div className="containerDonationDetails__delivered--mt containerDonationDetails__delivered--left">
      <div className="containerDonationDetails__delivered__title" dangerouslySetInnerHTML={{ __html: completeName }} />
      <div className="containerDonationDetails__delivered__value">{recipientName}</div>
    </div>

    {recipientCPF && (
      <div className="containerDonationDetails__delivered--mt containerDonationDetails__delivered--left">
        <div className="containerDonationDetails__delivered__title">{CPF}</div>
        <div className="containerDonationDetails__delivered__value">{maskToCpf(String(recipientCPF))}</div>
      </div>
    )}

    <div className="containerDonationDetails__delivered--mt" />
    {/* refatorar o componente */}
    <ProofOfDelivery linkToImage={linkToImage} />
  </>
)

Delivered.propTypes = {
  recipientName: PropTypes.string.isRequired,
  recipientCPF: PropTypes.string,
  linkToImage: PropTypes.string,
}

Delivered.defaultProps = {
  recipientCPF: '',
  linkToImage: '',
}
