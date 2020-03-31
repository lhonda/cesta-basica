import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from '../store'
import { setToken } from '../services/API'

import { checkExpiresCheckList } from '../services/storage'

export const nextRouteToRole = {
  leader: '/donation-list',
  admin: '/donation-list/admin',
}

function RouteWrapper({ component: Component, isPrivate, store, ...rest }) {
  const {
    auth,
    user: { role },
  } = store
  const { path } = rest

  if (!auth.token && isPrivate) {
    return <Redirect to="/login" />
  }

  if (auth.token) {
    if (path === '/login' || path === '/') {
      return <Redirect to={nextRouteToRole[role] || '/'} />
    }

    const doneHealthCheck = checkExpiresCheckList()
    if (role !== 'leader' && !doneHealthCheck && path !== '/checklist') {
      return <Redirect to="/checklist" />
    }
  }

  setToken(auth.token)
  return <Route {...rest} component={Component} />
}

RouteWrapper.propTypes = {
  store: PropTypes.object.isRequired,
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
}

RouteWrapper.defaultProps = {
  isPrivate: false,
}

export default connect(RouteWrapper)
