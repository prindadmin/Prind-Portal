import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import * as state from '../../states'

import * as Endpoints from '../../endpoints'

class PrivateRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.object
  }

  storeRoute = () => {

    if (this.props.path === this.props.user.route) {
      return
    }

    if (this.props.path !== Endpoints.DEFAULTLOGGEDINPAGE && this.props.path !== "/signin") {
      this.props.storeRoute(this.props.path)
    }

  }


  render() {
    let { auth } = this.props
    const { component: Component, ...rest } = this.props

    // Store the route so that the correct page can be loaded if a login is required
    this.storeRoute()

    return (
      <Route
        { ...rest }
        render={props => {
          return auth.isSignedIn === state.AUTH_SUCCESS ? (
            <Component { ...props } />
          ) : (
            <Redirect to="/signin" />
          )
        }}
      />
    )
  }
}

export default PrivateRoute
