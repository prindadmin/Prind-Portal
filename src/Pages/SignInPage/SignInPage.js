import React, { Component } from 'react'

// Tools
import ReactGA from 'react-ga';

// Data
import * as Endpoints from '../../Data/Endpoints'

// Components
import SignInUpBox from '../../Components/SignInUpBox'
import { CanUseWebP } from '../../Components/Common/CheckIfWebpSupported'

export class SignInPage extends Component {

  constructor() {
    super()
    this.state = {
      username: undefined
    }
  }

  componentDidMount() {
    // Register pageview with GA
    ReactGA.pageview("/signInPage");
  }

  componentDidUpdate(prevProps) {
    const { state } = this.props.location
    if(state !== undefined && state !== prevProps.location.state) {
      this.setState({
        username: state.username
      })
    }
  }


  render () {
    const { location } = this.props
    const pageStyle = CanUseWebP ? {
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
