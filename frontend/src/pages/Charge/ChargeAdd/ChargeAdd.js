import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Select } from '../../../components/Select'
import { File } from '../../../components/File'
import { SubTitle, SubTitleTypes } from '../../../components/SubTitle'
import { Button, ButtonTypes } from '../../../components/Button'

import { Loader } from '../../../components/Loader'

import { ChargeUpload } from '../../../services/API/chargeUpload'

import './ChargeAdd.scss'

import { confirm, legendInputAddfile, legendInputChargeType, legendSheetCharge } from '../../../utils/strings'

import { chargeTypesList } from '../ChargeTypesList'

function ChargeAdd() {
  const history = useHistory()

  const [file, setFile] = useState('')
  const [chargeType, setChargeType] = useState('')
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleFile = (event) => {
    setFile(...file, event.target.files[0])
    setError('')
  }

  const handleClickButton = async () => {
    setLoading(true)
    const response = await ChargeUpload({ file, type: chargeType })
    const { status } = response

    setLoading(false)

    if (status === 200) {
      history.push('/charge')
    } else {
      setFile('')
      setError(response.data.message)
    }
  }

  const handleOnchangeSelect = (value) => {
    setChargeType(value)
    setError('')
  }

  return (
    <div className="chargeAdd container-charge-prof">
      {loading && <Loader />}

      <Select
        value={chargeType}
        placeholder={legendInputChargeType}
        getValue={handleOnchangeSelect}
        optionsList={chargeTypesList}
      />

      <div className="main-charge-prof">
        <SubTitle type={SubTitleTypes.LIGHT} width={SubTitleTypes.SIZE_SMALL} message={legendSheetCharge} />

        <File type=".csv" file={file} handleImage={handleFile} placeholder={legendInputAddfile} />
      </div>

      {error && <p style={{ color: 'red', maxHeight: 250, overflow: 'auto' }}>{error}</p>}

      <div className="footer-charge-prof">
        <Button
          handleClick={handleClickButton}
          disable={!file || !chargeType || error}
          size={ButtonTypes.LARGE}
          message={confirm}
        />
      </div>
    </div>
  )
}

export default ChargeAdd
