import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga';

import * as Endpoints from '../../Data/Endpoints'
import * as States from '../../States'

// Components
const SignUpBox  = lazy(() => import('./SignUpBox'));
const SignInBox  = lazy(() => import('./SignInBox'));
const ForgotPasswordBox = lazy(() => import('./ForgotPasswordBox'));
const PasswordResetBox = lazy(() => import('./ResetPassword'));

// FUTURE: Make the "Click here" text change the mouse icon like a real link

export class SignInUpBox extends Component {
  static propTypes = {
    isSignIn: PropTypes.bool.isRequired,
    isSignUp: PropTypes.bool.isRequired,
    isForgotPassword: PropTypes.bool.isRequired,
    isPasswordReset: PropTypes.bool.isRequired,
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

  showSignInForm = () => {
    return (
      <SignInBox
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
  }

  render () {
    return (
      <div id='component-sign-in-up-box'>
        <div className="component-sign-in-up-box-content-container">
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
      </div>
    )
  }
}

export default SignInUpBox
