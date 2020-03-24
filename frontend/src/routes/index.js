import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'

import Route from './routeWrapper'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Terms } from '../pages/Terms'
import { Checklist } from '../pages/Checklist'

import { DonationList } from '../pages/DonationList'
import { Donation } from '../pages/Donation'
import { DonationProf } from '../pages/DonationProf'
import { Received } from '../pages/Received'
import { ReceivedCurrent } from '../pages/ReceivedCurrent'

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/terms" exact component={Terms} />
      <Route path="/checklist" exact component={Checklist} />
      <Route path="/donation-list" exact component={DonationList} isPrivate />
      <Route path="/donation/:id/wait" exact component={Donation} />
      <Route path="/donation/:id/wait/prof" exact component={DonationProf} />
      <Route path="/donation/:id/received" exact component={Received} />
      <Route path="/donation/:id/received/current" exact component={ReceivedCurrent} />
    </Switch>
  </BrowserRouter>
)
