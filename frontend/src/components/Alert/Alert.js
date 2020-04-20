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
  const hide = isAlert ? {} : { display: 'none' }
  const { message, type } = store.notification
  useEffect(() => {
    if (message === '' && type === '' && isAlert) {
      setIsAlert(false)
    } else if (message !== '' && type !== '' && !isAlert) {
      setIsAlert(true)
      setTimeout(() => {
        setIsAlert(false)
        close()
      }, 5000)
    }
  }, [message, type])

  return (
    <span onClick={close} className={`Alert Alert--${type}`} style={hide}>
      {message}
    </span>
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
