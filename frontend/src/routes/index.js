import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={() => <div>root</div>} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Switch>
  </BrowserRouter>
)
