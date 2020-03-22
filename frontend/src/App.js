import React, {useReducer} from 'react'
import * as Store from './store/store'

import { Routes } from './routes'

export default function App() {
 const [store, dispatch] = useReducer(Store.reducer, Store.initialState)

  return (
      <Routes />
  )
}
