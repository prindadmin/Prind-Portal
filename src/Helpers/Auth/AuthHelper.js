import React from 'react'
import PropTypes from 'prop-types'

class AuthHelper {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  getIdentityJWT = () => {
    const { idToken, refreshToken, accessToken } = this.props.auth.info

    const currentEpochSeconds = new Date().getTime() / 1000

    // If the token is due to expire or has expired, get a new token
    if (idToken.payload.exp < currentEpochSeconds + 300) {
      this.getNewIdentityToken()
    }
  }

  getNewIdentityToken = () => {



  }


}

export default AuthHelper
