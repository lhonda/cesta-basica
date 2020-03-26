import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { LogoBack } from '../../components/Logo'
import { Input, inputTypes } from '../../components/Input'
import { File, FileTypes } from '../../components/File'
import { Status } from '../../components/Status'
import { Sidebar } from '../../components/Sidebar'
import { Legend, LegendTypes } from '../../components/Legend'
import { Paragraph, ParagraphTypes } from '../../components/Paragraph'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon, ButtonIconTypes } from '../../components/ButtonIcon'

import { RadioButton } from '../../components/RadioButton'

import './DonationProf.scss'

import {
  confirm,
  back,
  titleDonationProf,
  legendInputAmountDonation,
  legendPicDonation,
  legendInputAddPic,
  legendPicFiscalNode,
  legendNFQuestion,
  WORD_YES,
  WORD_NO,
} from '../../utils/strings'

function DonationPage({ store, dispatch }) {
  const { goBack } = useHistory()
  const [numberDonation, setNumberDonation] = useState('')
  const [showNF, setShowNF] = useState('')
  // const
  return (
    <div className="container-donation-prof">
      <div className="sidebar-donation-prof">
        <ButtonIcon handleClick={goBack}>
          <LogoBack height={10} />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>
      <div className="header-donation-prof">
        <Title message={`${titleDonationProf}`} />
        <Paragraph size={ParagraphTypes.LIGHT} content="descriptionDonationProf" />
        <Input
          ignoreValidate
          inputType={inputTypes.NUMBER}
          size={inputTypes.SIZE_LARGE}
          handleOnChange={setNumberDonation}
          value={numberDonation}
          placeholder={legendInputAmountDonation}
        />
      </div>

      <div className="main-donation-prof">
        <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicDonation} />
        <File placeholder={legendInputAddPic} />
      </div>

      <div className="main-donation-prof-radio">
        <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendNFQuestion} />
        <RadioButton
          handleChecked={e => setShowNF(e.target.value)}
          name="nf"
          options={[WORD_YES, WORD_NO]}
        />
      </div>

      {showNF && showNF === 'Sim' && (
        <div className="main-donation-prof">
          <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicFiscalNode} />
          <File placeholder={legendInputAddPic} />
        </div>
      )}

      <div className="footer-donation-prof">
        <Button size={ButtonTypes.LARGE} message={confirm} />
      </div>
    </div>
  )
}
DonationPage.propTypes = {
  store: PropTypes.shape({
    donation: PropTypes.shape({
      received: PropTypes.shape({
        date: PropTypes.string,
        amount: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(DonationPage)
