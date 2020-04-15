import React from 'react'

import { Route, Switch, useLocation, useRouteMatch, useHistory } from 'react-router-dom'

import { Legend, LegendTypes } from '../../../components/Legend'
import { BottomMenu } from '../../DonationList/CommonComponents'
import { ChargeHeader } from '../ChargeList/CommonComponents/ChargeHeader'

import { ChargeAdd, ChargeList } from '..'
import { ButtonIcon } from '../../../components/ButtonIcon'
import { LogoBack } from '../../../components/Logo'

import { back, chargeTitlePage } from '../../../utils/strings'

import './Charge.scss'

const Charge = () => {
  let history = useHistory()
  const { goBack } = history
  const location = useLocation()
  let { path } = useRouteMatch()

  return (
    <div className="chargeList">
      {location.state && (
        <div className="backContainer">
          <ButtonIcon handleClick={goBack}>
            <LogoBack height={10} />
          </ButtonIcon>
          <Legend type={LegendTypes.STRONG} message={back} />
        </div>
      )}

      <ChargeHeader title={location.state ? location.state.title : chargeTitlePage} />

      <Switch>
        <Route path={path} exact component={ChargeList} />
        <Route path="/charge/add" component={ChargeAdd} />
      </Switch>

      {location.pathname === '/charge' ? <BottomMenu isAdmin={true} /> : <></>}
    </div>
  )
}

export default Charge
