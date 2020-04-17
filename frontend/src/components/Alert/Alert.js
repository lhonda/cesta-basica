import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { connect, types as typesStore } from '../../store'

export const alertTypes = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  WARNING: 'warning',
}

function Alert({ dispatch, store }) {
  const [isAlert, setIsAlert] = useState(false)
  const close = () => dispatch({ type: typesStore.HIDE_ALERT })
  const { message, type } = store.notification
  useEffect(() => {
    console.log(message)
    if (!message && !type) {
      return setInterval(() => {
        setIsAlert(false)
        close()
      }, 7000)
    }
    return setIsAlert(true)
  }, [store.notification])

  return (
    isAlert && (
      <a href="#" onClick={close} className={`Alert Alert--${alertTypes.SUCCESS}`}>
        {message}
      </a>
    )
  )
}

Alert.propTypes = {
  store: PropTypes.shape({
    notification: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(Alert)
