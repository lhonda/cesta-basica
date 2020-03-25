import { types } from '../store/types'

export const handleCheckedDeclararion = (store, dispatch) => {
  dispatch({
    type: types.SET_DECLARATION,
    payload: !store.declaration,
  })
}
export const handleCheckedHealth = (store, dispatch) => {
  dispatch({
    type: types.SET_HEALTHCHECK,
    payload: !store.health,
  })
}
export const handleRedirectSymptoms = (url) => {
  window.open(url, '_blank')
}

export const handleDonationReceivedVoucher = (voucher) => {
  window.location.pathname += `/${voucher}/prof`
}

export const handleToggleModal = (setModal) => {
  setModal((value) => !value)
}
