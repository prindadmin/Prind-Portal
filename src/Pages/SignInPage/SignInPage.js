import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import classes from './SignInPage.module.css'

// Tools
import ReactGA from 'react-ga';

// Data
import * as ENDPOINTS from '../../Data/Endpoints'
import { MOBILE_BREAK_WIDTH } from '../../Data/Constants'

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
      username: undefined,
      screenDimensions: {
        width: 0,
        height: 0
      }
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    const { pathname, state } = this.props.location
    // Register pageview with GA
    ReactGA.pageview(pathname);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

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

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      screenDimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  }


  background = () => {
    // TODO: Customise for larger screen resolutions
    if (this.state.screenDimensions.width > MOBILE_BREAK_WIDTH) {
      return {
        backgroundImage: [
          'url(/images/elements/strings-cropped.png)'
        ],
        backgroundRepeat: 'no-repeat',
        backgroundSize: '30vw 120%',
        backgroundPosition: 'left 55vw top 0px'
      }
    }
    return {
      backgroundImage: [
        'url(/images/elements/strings-cropped.png)'
      ],
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100vw 120%',
      backgroundPosition: 'left -30vw top 0px'
    }
  }

  headerLogInButton = () => {
    if (this.state.screenDimensions.width > MOBILE_BREAK_WIDTH) {
      return (
        <button type='submit' className={`${classes.button} ${classes.logInButton}` }>
          <a href={`${ENDPOINTS.DEFAULTPAGE}`}>
            <span>
              Log in
              <img src='/images/icons/login.svg' alt='Log in' style={{ marginLeft: '0.67em', transform: 'translateY(2px)' }}/>
            </span>
          </a>
        </button>
      )
    }
    return <button className={`${classes.button} secondary ${classes.logInButton}`} style={{ height: '39px', width:'39px', padding: '13px'}}><a href={`${ENDPOINTS.DEFAULTPAGE}`}><img src='/images/icons/login.svg' alt='Log in' /></a></button>
  }


  render () {
    const { location } = this.props

    // Work out if the sign-in page should be shown, or the sign up page
    const props = {
      isSignIn: location.pathname === ENDPOINTS.SIGNINPAGE,
      isSignUp: location.pathname === ENDPOINTS.SIGNUPPAGE,
      isForgotPassword: location.pathname === ENDPOINTS.FORGOTPASSWORDPAGE,
      isPasswordReset: location.pathname === ENDPOINTS.RESETPASSWORDPAGE,
    }


    return (
      <div id='sign-in-up-page' className={`full-width full-height ${classes.page}`} style={this.background()}>
        <div className={classes.topRow}>
          <Route render={({ history }) => (
            <img src='/images/logos/prin-d-logo-white.png' alt='' className={classes.logoImage} onClick={() => { history.push(ENDPOINTS.DEFAULTPAGE) }}/>
          )}/>
          { this.headerLogInButton() }
          <Route render={() => (
            <input type='submit' className={`${classes.button} ${classes.arrangeDemoButton}`} value='Arrange a demo' onClick={() => { window.location.href = `https://prind.tech/arrange-demo` }}/>
          )}/>
        </div>
        <SignInUpBox
          reference='sign-in-up-box'
          backgroundColor="#FFFFFF"
          screenDimensions={this.state.screenDimensions}
          username={this.state.username}
          {...props}
        />
      </div>
    )
  }
}

export default SignInPage
