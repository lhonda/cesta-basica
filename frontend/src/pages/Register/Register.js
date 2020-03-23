import React, { useState } from 'react'
import ModalComponent from '../../components/Modal'

import { introductionCompromise, titleTerms } from '../../utils/strings'

const Register = () => {
  const [modalShow, setModalShow] = useState(true)

  return (
    <div>
      <h1>Cadastro</h1>

      <ModalComponent show={modalShow} onHide={() => setModalShow(false)} title={titleTerms}>
        {introductionCompromise}
      </ModalComponent>
    </div>
  )
}

export default Register
