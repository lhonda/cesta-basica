import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Items, ItemsTypes } from '../../components/Items'
import { LogoBack } from '../../components/Logo'
import { Input, inputTypes } from '../../components/Input'
import { File } from '../../components/File'
import { Legend, LegendTypes } from '../../components/Legend'
import { Paragraph, ParagraphTypes } from '../../components/Paragraph'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Loader } from '../../components/Loader'
import { Select } from '../../components/Select'

import { Upload } from '../../services/API/upload'

import './ReceivedCurrentProf.scss'
import { DonationVoucher } from '../../services/API/donationList'
import {
  confirm,
  back,
  titleDonationProf,
  legendAddPicPersonReceiveCard,
  legendPicDonation,
  legendInputAddPic,
  legendInputFullName,
  placeholderCPF,
} from '../../utils/strings'

function ReceivedCurrentProfPage({ store, dispatch }) {
  const { id, voucher } = useParams()
  const { goBack, push } = useHistory()
  const [fullName, setFullName] = useState('')
  const [CPF, setCPF] = useState('')
  const [image, setImage] = useState()
  const [delivered, setDelivered] = useState(false)

  const [loading, setLoading] = useState(false)

  const optionsList = [
    {
      value: true,
      string: 'Entregue',
    },
    {
      value: false,
      string: 'Não Entregue',
    },
  ]

  const disableButton = delivered === 'true' ? !(fullName !== '') : false

  const handleImageFile = (event) => {
    setImage(event.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const clearCpf = CPF.replace(/\./g, '').replace(/-/g, '')
    const data = { id, voucher, delivered, CPF: clearCpf, fullName, image }
    const goToDonateList = () => push(`/donation/${id}/received/current`)
    await DonationVoucher(data, store, goToDonateList)
    setLoading(false)
  }

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className="container-donation-received-current-prof">
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
          <Select
            value={delivered}
            placeholder="Status da entrega do cartão"
            getValue={setDelivered}
            optionsList={optionsList}
          />
          <div style={{ paddingBottom: '.7rem' }} />
          {delivered === 'true' && (
            <>
              <Input
                placeholder={legendInputFullName}
                inputType={inputTypes.TEXT}
                minLength="2"
                maxLength="30"
                value={fullName}
                handleOnChange={setFullName}
              />
              {fullName.length >= 2 ? <></> : <div style={{ paddingBottom: '.7rem' }} />}
              <Input
                placeholder={placeholderCPF}
                inputType={inputTypes.CPF}
                minLength="14"
                maxLength="14"
                value={CPF}
                isRequired={false}
                handleOnChange={setCPF}
              />
              <div className="details-donation-received-current-prof" />
              <div className="main-donation-received-current-prof">
                <Legend size={LegendTypes.SIZE_LARGE} message={legendAddPicPersonReceiveCard} />
                <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicDonation} />
                <File file={image} handleImage={handleImageFile} placeholder={legendInputAddPic} />
              </div>
            </>
          )}
        </div>
        <div className="footer-donation-received-current-prof">
          <Button size={ButtonTypes.LARGE} message={confirm} disable={disableButton} />
        </div>
      </form>
    </>
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
