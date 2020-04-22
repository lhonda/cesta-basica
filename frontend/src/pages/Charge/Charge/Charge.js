import React from 'react'
import { Route, Switch, useLocation, useRouteMatch, useHistory } from 'react-router-dom'

import { Legend, LegendTypes } from '../../../components/Legend'
import { BottomMenu } from '../../../components/BottomMenu'
import { ChargeHeader } from '../ChargeList/CommonComponents/ChargeHeader'
import { ChargeAdd } from '../ChargeAdd'
import { ChargeList } from '../ChargeList'
import { chargeTitlePage } from '../../../utils/strings'

import './Charge.scss'

export const Charge = () => {
  const history = useHistory()
  const { goBack } = history
  const location = useLocation()
  const { pathname, state } = location
  const { path } = useRouteMatch()

  function renderHeaderWithGoBack() {
    return (
      <div className="charge-header">
        <HeaderWithGoBack onGoBackClick={goBack} title={state.title} />
      </div>
    )
  }

  function renderHeader() {
    return (
      <div className="charge-header">
        <Header title={chargeTitlePage} />
      </div>
    )
  }

  return (
    <div className="chargeList">
      {state ? renderHeaderWithGoBack() : renderHeader()}
      <Switch>
        <Route path={path} exact component={ChargeList} />
        <Route path="/charge/add" component={ChargeAdd} />
      </Switch>

      {pathname === '/charge' && <BottomMenu isAdmin />}
    </div>
  )
}
