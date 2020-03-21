import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import { Register } from '../pages/Register'

export const Routes = () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={() => <div>bu</div>} />
      <Route path="/login" component={Register} />
      <Route path="/register" component={Register} />
    </Switch>
  </HashRouter>
)
