import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './File.scss'

import { icSuccess } from '../../assets/icons'

function File({ placeholder, handleImage, file  }) {
  return (
    <>
      <form className="hidden">
        <input multiple={false} onChange={handleImage} id="input-new-image" type="file" accept="image/png, image/jpeg" />
      </form>

      {!file ? (
        <label className="label-send-image" htmlFor="input-new-image">
          {placeholder}
        </label>
      ) : (
        <p className="feedback">
          <img
            src={icSuccess}
            alt="icon for information warning or success"
            height={18}
          />
        </p>
      )
    }
    </>
  )
}

File.propTypes = {
  placeholder: PropTypes.string,
  handleImage: PropTypes.func,
  file: PropTypes.object,
}

File.defaultProps = {
  placeholder: '',
  handleImage: () => {},
  file: {},
}

export default File
