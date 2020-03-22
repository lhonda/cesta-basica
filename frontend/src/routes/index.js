import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'

export const Routes = () => (
  <HashRouter>
    <Switch>
      <Route path="/" exact component={() => <div>root</div>} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Switch>
  </HashRouter>
)
