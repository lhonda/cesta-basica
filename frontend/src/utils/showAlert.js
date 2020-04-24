import { types } from '../store'
import { alertTypes } from '../components/Alert'

function showAlert(dispatch, message, alertType) {
  dispatch({ type: types.SHOW_ALERT, payload: { message, type: alertType } })
}

export const showSuccessAlert = (dispatch, message) => showAlert(dispatch, message, alertTypes.SUCCESS)
export const showFailureAlert = (dispatch, message) => showAlert(dispatch, message, alertTypes.FAILURE)
