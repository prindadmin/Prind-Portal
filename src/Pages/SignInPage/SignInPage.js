import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Tools
import ReactGA from 'react-ga';

// Data
import * as Endpoints from '../../Data/Endpoints'

// Components
import SignInUpBox from '../../Components/SignInUpBox'
import { CanUseWebP } from '../../Components/../Functions/CheckIfWebpSupported'

export class SignInPage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        username: PropTypes.string
      }),
    }).isRequired
  }

  constructor() {
    super()
    this.state = {
      username: undefined
    }
  }

  componentDidMount() {
    const { pathname, state } = this.props.location
    // Register pageview with GA
    ReactGA.pageview(pathname);

    if (!state) {
      return;
    }

    this.setState({
      username: state.username
    })
  }

  componentDidUpdate(prevProps) {
    const { state } = this.props.location

    if (!state) {
      return;
    }

    if(state.username !== undefined && state !== prevProps.location.state) {
      this.setState({
        username: state.username
      })
    }
  }


  render () {
    const { location } = this.props
    const pageStyle = CanUseWebP() ? {
      backgroundImage: `url(/images/backgrounds/building-site-1.webp)`
    } : {
      backgroundImage: `url(/images/backgrounds/building-site-1.png)`
    }

    // Work out if the sign-in page should be shown, or the sign up page
    const props = {
      isSignIn: location.pathname === Endpoints.SIGNINPAGE,
      isSignUp: location.pathname === Endpoints.SIGNUPPAGE,
      isForgotPassword: location.pathname === Endpoints.FORGOTPASSWORDPAGE,
      isPasswordReset: location.pathname === Endpoints.RESETPASSWORDPAGE,
    }


    return (
      <div id='sign-in-up-page' className='full-width full-height' style={pageStyle}>
        <SignInUpBox
          reference='sign-in-up-box'
          backgroundColor="#FFFFFF"
          username={this.state.username}
          {...props}
        />
      </div>
    )
  }
}

export default SignInPage
