import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { ExportType } from './Type'
import ExportForm from './Form'

function Export() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={path} exact component={() => <div>lista</div>} />
      <Route path={`${path}/types`} component={ExportType} />
      <Route path={`${path}/filters`} component={ExportForm} />
    </Switch>
  )
}

export { Export }
