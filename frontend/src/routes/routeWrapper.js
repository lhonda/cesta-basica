import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

function RouteWrapper({ component: Component, isPrivate, ...rest }) {
  // const signed = true
  console.log(store)
  // if (!signed && isPrivate) {
  //   return <Redirect to="/login" />
  // }

  // if (signed && !isPrivate) {
  //   return <Redirect to="/logged" />
  // }

  return <Route {...rest} component={Component} />
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
}

RouteWrapper.defaultProps = {
  isPrivate: false,
}

export { RouteWrapper }
