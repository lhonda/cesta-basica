import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import { Button } from '../Button'

import { connect } from '../../store'

function ModalComponent({ children, title, show, onHide }) {
  const wrapper = createRef()

  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-90w" aria-labelledby="modal-component">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <section ref={wrapper}>{children}</section>
      </Modal.Body>

      <Modal.Footer>
        <Button message="Ok" handleClick={onHide} />
      </Modal.Footer>
    </Modal>
  )
}

ModalComponent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
}

export default connect(ModalComponent)
