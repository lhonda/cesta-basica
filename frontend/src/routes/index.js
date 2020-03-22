import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import { Register } from '../pages/Register'

export const Routes = () => (
  <HashRouter>
    <Switch>
      <Route path="/" exact component={() => <div>bu</div>} />
      <Route path="/login" exact component={Register} />
      <Route path="/register" exact component={Register} />
    </Switch>
  </HashRouter>
)
