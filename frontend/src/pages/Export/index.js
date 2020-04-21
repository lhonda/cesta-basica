import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { ExportType } from './Type'

function Export() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={path} exact component={() => <div>lista</div>} />
      <Route path={`${path}/types`} component={ExportType} />
    </Switch>
  )
}

export { Export }
