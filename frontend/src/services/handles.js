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
