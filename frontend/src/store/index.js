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
  donationList: [],
  photoReceived: null,
  userLocation: {},
  cardList: [],
  leaderList: null,
  siteList: null,
  notification: {
    message: '',
    type: '',
  },
  chargeList: [],
  cities: [],
  states: [],
  filters: {},
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
  [types.SET_USER_LOCATION]: (state, payload) => saveState({ ...state, userLocation: payload }),
  [types.SET_TOKEN]: (state, { token }) => saveState({ ...state, auth: { ...state.auth, token } }),
  [types.SET_DECLARATION]: (state, payload) => saveState({ ...state, declaration: payload }),
  [types.SET_HEALTHCHECK]: (state, payload) => saveState({ ...state, doneHealthCheck: payload }),
  [types.SET_SITE_LIST]: (state, payload) => saveState({ ...state, siteList: payload }),
  [types.SET_CHARGE_LIST]: (state, payload) => saveState({ ...state, chargeList: payload }),
  [types.SET_LOGOUT]: () => logout(),
  [types.SET_DONATION_LIST]: (state, payload) => saveState({ ...state, donationList: payload }),
  [types.SET_LEADER_LIST]: (state, payload) => saveState({ ...state, leaderList: payload }),
  [types.SET_PHOTO_RECEIVED]: (state, payload) => saveState({ ...state, photoReceived: payload }),
  [types.SET_CARD_LIST]: (state, payload) => saveState({ ...state, cardList: payload }),
  [types.CLEAN_CARD_LIST]: (state) => saveState({ ...state, cardList: [] }),
  [types.SET_DONATION_DETAILS]: (state, payload) => saveState({ ...state, donation: payload }),
  [types.CLEAN_DONATION_DETAILS]: (state) => saveState({ ...state, donation: null }),
  [types.SHOW_ALERT]: (state, payload) => ({ ...state, notification: payload }),
  [types.HIDE_ALERT]: (state) => ({ ...state, notification: { message: '', type: '' } }),
  [types.SET_CITIES]: (state, payload) => saveState({ ...state, cities: payload }),
  [types.SET_STATES]: (state, payload) => saveState({ ...state, states: payload }),
  [types.SET_FILTERS]: (state, payload) => saveState({ ...state, filters: payload }),
}

export function reducer(state, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action.payload) : state
}

export function connect(Component) {
  return function ConnectedComponent(props) {
    const { store, dispatch } = useContext(Context)
    return <Component store={store} dispatch={dispatch} {...props} />
  }
}
