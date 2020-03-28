import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Items, ItemsTypes } from '../../components/Items'
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
import { Loader } from '../../components/Loader'
import { icSuccess } from '../../assets/icons'

import { Upload } from '../../services/API/upload'

import './ReceivedCurrentProf.scss'

import {
  confirm,
  back,
  titleDonationProf,
  legendAddPicPersonReceiveCard,
  legendInputCardDeliveryStatus,
  legendPicDonation,
  legendInputAddPic,
  legendInputFullName,
  placeholderCPF,
} from '../../utils/strings'

function ReceivedCurrentProfPage({ store, dispatch }) {
  const { voucher } = useParams()
  const { goBack } = useHistory()
  const [fullName, setFullName] = useState('')
  const [CPF, setCPF] = useState('')
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleImageFile = (event) => {
    setImage(event.target.files[0])
  }

  const handleClickButton = async () => {
    setLoading(true)
    await Upload({ donationId: 1, file: image })
    setLoading(false)
  }

  return (
    <div className="container-donation-received-current-prof">
      {loading && <Loader />}
      <div className="sidebar-donation-received-current-prof">
        <ButtonIcon handleClick={goBack}>
          <LogoBack height={10} />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>
      <div className="header-donation-received-current-prof">
        <Title message={`${titleDonationProf}`} />
        <Paragraph size={ParagraphTypes.MEDIUM} content="descriptionDonationProf" />
        <Items size={ItemsTypes.LARGE} align={ItemsTypes.START} title={`Cartão Nº ${voucher}`} />
        <div style={{ paddingBottom: '.7rem' }} />
        <Items
          placeholder={legendInputCardDeliveryStatus}
          size={ItemsTypes.LARGE}
          type={ItemsTypes.SELECT}
          align={ItemsTypes.START}
        />
        <div style={{ paddingBottom: '.7rem' }} />
        <Input
          placeholder={legendInputFullName}
          inputType={inputTypes.TEXT}
          minLength="2"
          maxLength="30"
          value={fullName}
          handleOnChange={setFullName}
        />
        <div style={{ paddingBottom: '.7rem' }} />
        <Input
          placeholder={placeholderCPF}
          inputType={inputTypes.CPF}
          minLength="6"
          maxLength="14"
          value={CPF}
          handleOnChange={setCPF}
        />
      </div>
      <div className="details-donation-received-current-prof" />
      <div className="main-donation-received-current-prof">
        <Legend size={LegendTypes.SIZE_LARGE} message={legendAddPicPersonReceiveCard} />
        <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicDonation} />
        {!image ? (
          <File file={image} handleImage={handleImageFile} placeholder={legendInputAddPic} />
        ) : (
          <img
            className="customInput__icon"
            src={icSuccess}
            alt="icon for information warning or success"
            height={18}
          />
        )}
      </div>

      <div className="footer-donation-received-current-prof">
        <Button handleClick={handleClickButton} size={ButtonTypes.LARGE} message={confirm} disable />
      </div>
    </div>
  )
}
ReceivedCurrentProfPage.propTypes = {
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

export default connect(ReceivedCurrentProfPage)
