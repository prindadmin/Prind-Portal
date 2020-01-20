import React from 'react'
import PropTypes from 'prop-types'

import { config } from 'aws-cognito-promises'

class Auth extends React.Component {
  static propTypes = {
    getUser: PropTypes.func
  }

  componentWillMount() {
    config.set({
      region: process.env.REACT_APP_REGION,
      UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      ClientId: process.env.REACT_APP_CLIENT_ID
    })

    this.props.getUser()
  }

  render() {
    return null
  }
}

export default Auth
