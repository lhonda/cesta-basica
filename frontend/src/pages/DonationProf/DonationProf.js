import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { LogoBack } from '../../components/Logo'
import { Input, inputTypes } from '../../components/Input'
import { File } from '../../components/File'
import { Legend, LegendTypes } from '../../components/Legend'
import { Paragraph, ParagraphTypes } from '../../components/Paragraph'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'

import './DonationProf.scss'

import {
  confirm,
  back,
  titleDonationProf,
  legendInputCardNumber,
  legendInputCardDeliveryStatus,
  legendInputFullName,
  legendInputCpf,
  legendPicDelivery,
  legendInputAddPic,
  legendAddPicPersonReceiveCard,
} from '../../utils/strings'

function DonationPage({ store, dispatch }) {
  const { goBack } = useHistory()
  const [cardNumber, setcardNumber] = useState('')
  const [deliveryStatus, setDeliveryStatus] = useState('')
  const [fullName, setFullName] = useState('')
  const [cpf, setCpf] = useState('')
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
        <div className="container-inputs">
          <Input
            ignoreValidate
            inputType={inputTypes.NUMBER}
            size={inputTypes.SIZE_LARGE}
            handleOnChange={setcardNumber}
            value={cardNumber}
            placeholder={legendInputCardNumber}
          />
          <Input
            ignoreValidate
            inputType={inputTypes.NUMBER}
            size={inputTypes.SIZE_LARGE}
            handleOnChange={setDeliveryStatus}
            value={deliveryStatus}
            placeholder={legendInputCardDeliveryStatus}
          />
          <Input
            ignoreValidate
            inputType={inputTypes.NUMBER}
            size={inputTypes.SIZE_LARGE}
            handleOnChange={setFullName}
            value={fullName}
            placeholder={legendInputFullName}
          />
          <Input
            ignoreValidate
            inputType={inputTypes.NUMBER}
            size={inputTypes.SIZE_LARGE}
            handleOnChange={setCpf}
            value={cpf}
            placeholder={legendInputCpf}
          />
        </div>
      </div>

      <Legend type={LegendTypes.NORMAL} message={legendAddPicPersonReceiveCard} />
      <div className="main-donation-prof">
        <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicDelivery} />
        <File placeholder={legendInputAddPic} />
      </div>

      <div className="footer-donation-prof">
        <Button
          size={ButtonTypes.LARGE}
          message={confirm}
          disable={!cardNumber || !deliveryStatus || !fullName || !cpf}
        />
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
