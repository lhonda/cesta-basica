import React, { useContext } from 'react'
import { types } from './types'

export { types }

export const initialState = {
  user: {},
  auth: {
    token: null,
  },
  declaration: false,
}

export const Context = React.createContext()

const actionMap = {
  [types.SET_USER]: (state, payload) => ({
    ...state,
    user: payload,
  }),
  [types.SET_TOKEN]: (state, { token }) => ({
    ...state,
    auth: {
      ...state.auth,
      token,
    },
  }),
  [types.SET_DECLARATION]: (state, payload) => ({
    ...state,
    declaration: payload
  }),
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
