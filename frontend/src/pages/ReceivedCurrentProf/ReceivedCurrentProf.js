import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { connect, types } from '../../store'
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
  const { push } = useHistory()
  const [fullName, setFullName] = useState('')
  const [CPF, setCPF] = useState('')
  const [image, setImage] = useState()
  const [delivered, setDelivered] = useState(false)

  const [loading, setLoading] = useState(false)
  const returnPage = () => push(`/donation/${id}/received/current`)
  const donationInfo = store.cardList.find((item) => item.voucherId === voucher)

  function isDelivered() {
    const { status, receivedName, receivedCpf } = donationInfo
    if (status === 2 && receivedName && receivedCpf) {
      setFullName(receivedName)
      setCPF(receivedCpf)
      return setDelivered(status === 2 ? 'true' : 'false')
    } else if (status === 3) {
      setDelivered('false')
    } else {
      setDelivered('null')
    }
  }

  useEffect(() => {
    isDelivered()
  }, [])

  function handleOnchangeSelect(value) {
    setDelivered(value)
    if (value === 'false') {
      setFullName('')
      setCPF('')
    }
  }

  const optionsList = [
    {
      value: 'null',
      string: 'Selecione',
    },
    {
      value: true,
      string: 'Entregue',
    },
    {
      value: false,
      string: 'Não Entregue',
    },
  ]

  // limpar dados quando delivered mudar e quando o delivered for true, tem de validar se foto tem conteudo para habilitar botão
  // dispatch para limpar store d d do o voucher atual
  const disableButton = delivered !== 'null' ? (delivered === 'true' ? !(fullName !== '') : false) : true

  const handleImageFile = (event) => {
    setImage(event.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const clearCpf = CPF.replace(/\./g, '').replace(/-/g, '')
    const data = { id, voucher, delivered, CPF: clearCpf, fullName, image }

    if (delivered === 'false') {
      const cleanDataUserDonation = { ...donationInfo }
      cleanDataUserDonation.receivedCpf = ''
      cleanDataUserDonation.delivered = ''
      cleanDataUserDonation.receivedName = ''

      const cleanCard = store.cardList.filter(card  => card.voucherId !== donationInfo.voucherId)

      const newCardList = [...cleanCard, cleanDataUserDonation]

      dispatch({ type: types.SET_CARD_LIST, payload: newCardList })
    }
    await DonationVoucher(data, store, returnPage)
    setLoading(false)
  }

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="container-donation-received-current-prof">
          <div className="sidebar-donation-received-current-prof">
            <ButtonIcon handleClick={returnPage}>
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
              getValue={handleOnchangeSelect}
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
