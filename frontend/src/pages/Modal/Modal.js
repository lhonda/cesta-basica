import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { Title } from '../../components/Title'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Paragraph } from '../../components/Paragraph'
import { Button, ButtonTypes } from '../../components/Button'
import './Modal.scss'

import { contate, contateNumber } from '../../utils/strings'

ReactModal.setAppElement('#root')

function ModalPage({ isOpenModal, title, actionExit }) {
  return (
    <ReactModal
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
        content: {
          height: '58vh',
          top: '50%',
          marginTop: '-29vh',
        },
      }}
      shouldCloseOnOverlayClick={false}
      isOpen={isOpenModal}
      contentLabel={title}
      onRequestClose={actionExit}
    >
      <Title message={title} />
      <Paragraph content="completeDeliveryThanks" />
      <Paragraph content="completeDeliveryInformationContate" />
      <SubTitle size={SubTitleTypes.MEDIUM} type={SubTitleTypes.STRONG} message={contate} />
      <SubTitle size={SubTitleTypes.MEDIUM} type={SubTitleTypes.NORMAL} message={contateNumber} />
      <div className="modal-button">
        <Button message="OK" handleClick={actionExit} />
      </div>
    </ReactModal>
  )
}
ModalPage.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  actionExit: PropTypes.func.isRequired,
}

export default ModalPage
