import React, { Component } from 'react'

// Tools
import ReactGA from 'react-ga';

// Data
import * as Endpoints from '../../Data/Endpoints'

// Components
import SignInUpBox from '../../Components/SignInUpBox'
import { CanUseWebP } from '../../Components/Common/CheckIfWebpSupported'

export class SignInPage extends Component {

  componentDidMount() {
    // Register pageview with GA
    ReactGA.pageview("/signInPage");
  }


  render () {
    const { location } = this.props
    const pageStyle = CanUseWebP ? {
      backgroundImage: `url(/images/backgrounds/construction-1.webp)`
    } : {
      backgroundImage: `url(/images/backgrounds/construction-1.png)`
    }

    // Work out if the sign-in page should be shown, or the sign up page
    var isSignIn = location.pathname === Endpoints.SIGNINPAGE

    return (
      <div id='sign-in-up-page' className='full-width full-height' style={pageStyle}>
        <SignInUpBox
          reference='sign-in-up-box'
          backgroundColor="#FFFFFF"
          isSignIn={isSignIn}
        />
      </div>
    )
  }
}

export default SignInPage
