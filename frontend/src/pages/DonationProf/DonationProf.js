import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { LogoBack } from '../../components/Logo'
import { Input, inputTypes } from '../../components/Input'
import {Items, ItemsTypes} from '../../components/Items'
import { File, FileTypes } from '../../components/File'
import { Legend, LegendTypes } from '../../components/Legend'
import { Paragraph, ParagraphTypes } from '../../components/Paragraph'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Loader } from '../../components/Loader'
import { icSuccess } from '../../assets/icons'

// import { Upload } from '../../services/API/upload'

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
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageFile = (event) => {
    setImage(event.target.files[0])
  }

  const handleClickButton = async () => {
    setLoading(true)

    // await Upload({ donationId: 1, file: image })
    setLoading(false)
  }

  return (
    <div className="container-donation-prof">
      {loading && <Loader />}
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
          <Items
            type={ItemsTypes.SELECT}
            size={ItemsTypes.LARGE}
            align={ItemsTypes.CENTER}
            handleClick={() => setDeliveryStatus()}
          />
          <Input
            ignoreValidate
            inputType={inputTypes.TEXT}
            size={inputTypes.SIZE_LARGE}
            handleOnChange={setFullName}
            value={fullName}
            placeholder={legendInputFullName}
          />
          <Input
            inputType={inputTypes.CPF}
            size={inputTypes.SIZE_LARGE}
            handleOnChange={setCpf}
            value={cpf}
            placeholder={legendInputCpf}
            maxLength={14}
          />
        </div>
      </div>

      <Legend type={LegendTypes.NORMAL} message={legendAddPicPersonReceiveCard} />
      <div className="main-donation-prof">
        <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicDelivery} />
        {!image ? (
          <File handleImage={handleImageFile} placeholder={legendInputAddPic} />
        ) : (
          <img
            className="customInput__icon"
            src={icSuccess}
            alt="icon for information warning or success"
            height={18}
          />
        )}
      </div>

      <div className="footer-donation-prof">
        <Button
          handleClick={handleClickButton}
          size={ButtonTypes.LARGE}
          message={confirm}
          disable={!cardNumber || !deliveryStatus || !fullName || !cpf || !image}
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
