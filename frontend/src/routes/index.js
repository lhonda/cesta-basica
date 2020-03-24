import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'

import Route from './routeWrapper'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Terms } from '../pages/Terms'
import { Checklist } from '../pages/Checklist'
import { Donation } from '../pages/Donation'
import { DonationProf } from '../pages/DonationProf'
import { Received } from '../pages/Received'

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={() => <div>root</div>} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/terms" exact component={Terms} />
      <Route path="/checklist" exact component={Checklist} />
      <Route path="/donation/:id/wait" exact component={Donation} />
      <Route path="/donation/:id/wait/prof" exact component={DonationProf} />
      <Route path="/donation/:id/received" exact component={Received} />
    </Switch>
  </BrowserRouter>
)
