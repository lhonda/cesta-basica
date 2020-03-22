import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'

import { RouteWrapper as Route } from './routeWrapper'

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
