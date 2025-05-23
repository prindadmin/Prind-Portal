import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import * as States from '../../States'

class PrivateRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.shape({
      isSignedIn: PropTypes.string.isRequired
    }).isRequired,
    path: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      currentRoute: PropTypes.string.isRequired
    }).isRequired,
    component: PropTypes.object.isRequired,
    storeRoute: PropTypes.func.isRequired
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
    //console.log(`Path: ${this.props.path}`)
    //console.log(`Pathname: ${this.props.location.pathname}`)
    //console.log(`Current Route: ${this.props.user.currentRoute}`)

    const { pathname } = this.props.location
    const { currentRoute } = this.props.user

    // If the user is on the same page as the store already has, do nothing
    if (pathname === currentRoute) {
      return
    }

    this.props.storeRoute(pathname)
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
