import React, { useContext } from 'react'
import { types } from './types'

import { set, get, clear, checkExpiresCheckList } from '../services/storage'

export { types }
const dataStorage = get()
const cleanState = {
  user: {},
  auth: {
    token: null,
  },
  declaration: false,
  doneHealthCheck: checkExpiresCheckList(),
  donationList: null,
  photoReceived: null,
}

function saveState(newState) {
  set(newState)
  return get()
}

function logout() {
  clear()
  return cleanState
}

export const initialState = dataStorage || cleanState

export const Context = React.createContext()

const actionMap = {
  [types.SET_USER]: (state, payload) => saveState({ ...state, user: payload }),
  [types.SET_TOKEN]: (state, { token }) => saveState({ ...state, auth: { ...state.auth, token } }),
  [types.SET_DECLARATION]: (state, payload) => saveState({ ...state, declaration: payload }),
  [types.SET_HEALTHCHECK]: (state, payload) => saveState({ ...state, doneHealthCheck: payload }),
  [types.SET_LOGOUT]: () => logout(),
  [types.SET_DONATION_LIST]: (state, payload) => saveState({ ...state, donationList: payload }),
  [types.SET_PHOTO_RECEIVED]: (state, payload) => saveState({ ...state, photoReceived: payload }),
}

export function reducer(state, action) {
  console.log(`Store reducer is called with action ${action.type}`)
  return actionMap[action.type] ? actionMap[action.type](state, action.payload) : state
}

export function connect(Component) {
  return function ConnectedComponent(props) {
    const { store, dispatch } = useContext(Context)
    return <Component store={store} dispatch={dispatch} {...props} />
  }
}
