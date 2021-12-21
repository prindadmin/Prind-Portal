import React, { Component, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga';

import classes from './SignInUpBox.module.css'

import LoadingSpinner from '../LoadingSpinner'

import * as Endpoints from '../../Data/Endpoints'
import * as States from '../../States'

// Components
import SignUpBox from './SignUpBox'
import SignInBox from './SignInBox'
import ForgotPasswordBox from './ForgotPasswordBox'
import PasswordResetBox from './ResetPassword'

// FUTURE: Make the "Click here" text change the mouse icon like a real link

export class SignInUpBox extends Component {
  static propTypes = {
    isSignIn: PropTypes.bool.isRequired,
    isSignUp: PropTypes.bool.isRequired,
    isForgotPassword: PropTypes.bool.isRequired,
    isPasswordReset: PropTypes.bool.isRequired,
    username: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    auth: PropTypes.shape({
      isSignedIn: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      currentRoute: PropTypes.string.isRequired
    }).isRequired,
    screenDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  }


  constructor(props) {
    super()
    this.state = {
      showSignInForm: props.isSignIn,
      showSignUpForm: props.isSignUp,
      showForgotPasswordForm: props.isForgotPassword,
      showResetPasswordForm: props.isPasswordReset,
    }
  }

  componentDidMount() {
    this.checkIfLoggedIn({})
  }

  componentDidUpdate(prevProps) {
    this.checkIfLoggedIn(prevProps)
  }

  checkIfLoggedIn = (prevProps) => {
    const { auth, history, user } = this.props

    if (auth !== prevProps.auth) {
      if (auth.isSignedIn === States.AUTH_SUCCESS) {
        //console.log("redirecting to logged in page")
        history.push(user.currentRoute)
        return;
      }
    }
  }

  showSignInForm = () => {
    return (
      <SignInBox
        username={this.props.username}
        toggleVisibleForm={this.toggleVisibleForm}
        />
    )
  }

  showSignUpForm = () => {
    return (
      <SignUpBox
        toggleVisibleForm={this.toggleVisibleForm}
        />
    )
  }

  showForgotPasswordForm = () => {
    return (
      <ForgotPasswordBox
        toggleVisibleForm={this.toggleVisibleForm}
        />
    )
  }

  showPasswordResetForm = () => {
    return (
      <PasswordResetBox
        toggleVisibleForm={this.toggleVisibleForm}
        />
    )
  }

  toggleVisibleForm = (formToShow) => {

    if (formToShow === States.SIGNINFORM) {
      this.setState({
        showSignInForm: true,
        showSignUpForm: false,
        showForgotPasswordForm: false,
        showResetPasswordForm: false,
      })
      this.props.history.push(Endpoints.SIGNINPAGE)
      ReactGA.pageview(this.props.location.pathname)
      return;
    }

    if (formToShow === States.SIGNUPFORM) {
      this.setState({
        showSignInForm: false,
        showSignUpForm: true,
        showForgotPasswordForm: false,
        showResetPasswordForm: false,
      })
      this.props.history.push(Endpoints.SIGNUPPAGE)
      ReactGA.pageview(this.props.location.pathname)
      return;
    }

    if (formToShow === States.FORGOTPASSWORDFORM) {
      this.setState({
        showSignInForm: false,
        showSignUpForm: false,
        showForgotPasswordForm: true,
        showResetPasswordForm: false,
      })
      this.props.history.push(Endpoints.FORGOTPASSWORDPAGE)
      ReactGA.pageview(this.props.location.pathname)
      return;
    }

    // default showing
    this.setState({
      showSignInForm: true,
      showSignUpForm: false,
      showForgotPasswordForm: false,
      showResetPasswordForm: false,
    })
    this.props.history.push(Endpoints.SIGNINPAGE)
    ReactGA.pageview(this.props.location.pathname)
  }

  render () {
    return (
      <div id='component-sign-in-up-box' className={classes.signInUpBox}>
        <Suspense fallback={<LoadingSpinner />}>
          <div className={classes.signInUpBoxContainer}>
              {
                this.state.showSignInForm ? this.showSignInForm() : null
              }
              {
                this.state.showSignUpForm ? this.showSignUpForm() : null
              }
              {
                this.state.showForgotPasswordForm ? this.showForgotPasswordForm() : null
              }
              {
                this.state.showResetPasswordForm ? this.showPasswordResetForm() : null
              }
          </div>
        </Suspense>
      </div>
    )
  }
}

export default SignInUpBox
