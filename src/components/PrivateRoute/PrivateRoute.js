import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import * as States from '../../States'

import * as Endpoints from '../../Data/Endpoints'

import { Auth } from 'aws-amplify';

// FUTURE: projects/create isn't linkable to...

class PrivateRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.storeRoute()
  }

  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path) {
      // Store the route so that the correct page can be loaded if a login is required
      this.storeRoute()
    }
  }

  // Store route with project number if this is a project (currently ignores the project ID)
  storeRoute = () => {

    const { pathname } = this.props.location
    const { currentRoute } = this.props.user

    // If the user is on the same page as the store already has, do nothing
    if (pathname === currentRoute) {
      return
    }

    // If the users path is not equal the default logged in page, store the path
    if (pathname !== Endpoints.DEFAULTLOGGEDINPAGE) {
      this.props.storeRoute(pathname)
    }

  }


  render() {
    let { auth } = this.props
    const { component: Component, ...rest } = this.props

    return (
      <Route
        { ...rest }
        render={props => {
          return auth.isSignedIn === States.AUTH_SUCCESS ? (
            <Component { ...props } />
          ) : (
            <Redirect to="/" />
          )
        }}
      />
    )
  }
}

export default PrivateRoute
