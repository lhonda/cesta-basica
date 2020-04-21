import React from 'react'
import { useHistory } from 'react-router-dom'
import { string, bool, number } from 'prop-types'

import { connect } from '../../../../store'
import { icFilter } from '../../../../assets/icons'

import { donationTitlePage } from '../../../../utils/strings'
import { HeaderWithIcon } from '../../../../components/Header'

import './DonationHeader.scss'

function DonationHeader({ title, isAdmin, qntd }) {
  const history = useHistory()

  function navigateToFilter() {
    history.push('/filter')
  }

  return <HeaderWithIcon title={title} icon={icFilter} qntd={qntd} onClick={navigateToFilter} isAdmin={isAdmin} />
}

DonationHeader.propTypes = {
  title: string,
  isAdmin: bool,
  qntd: number,
}

DonationHeader.defaultProps = {
  title: donationTitlePage,
  isAdmin: false,
  qntd: 0,
}

export default connect(DonationHeader)
