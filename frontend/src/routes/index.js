import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'

import Route from './routeWrapper'

import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Terms } from '../pages/Terms'
import { Checklist } from '../pages/Checklist'

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/terms" exact component={Terms} />
      <Route path="/checklist" exact component={Checklist} />
    </Switch>
  </BrowserRouter>
)
