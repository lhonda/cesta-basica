import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from '../store/store'

function RouteWrapper({ component: Component, isPrivate, store, ...rest }) {
  const { auth } = store

  if (!auth.token && isPrivate) {
    return <Redirect to="/" />
  }

  if (auth.token && !isPrivate) {
    return <Redirect to="/logged" />
  }

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
