import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import * as state from '../../states'

class PrivateRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.object
  }

  render() {
    let { auth } = this.props
    const { component: Component, ...rest } = this.props

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
