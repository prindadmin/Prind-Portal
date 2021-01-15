import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'
import * as States from '../../States'
import ReactGA from 'react-ga';

// Components
const SignUpBox  = lazy(() => import('./SignUpBox'));
const SignInBox  = lazy(() => import('./SignInBox'));
const ForgotPasswordBox = lazy(() => import('./ForgotPasswordBox'));

// FUTURE: Make the "Click here" text change the mouse icon like a real link

export class SignInUpBox extends Component {
  static propTypes = {
    isSignIn: PropTypes.bool
  }


  constructor(props) {
    super()

    var signInShown = false

    if(props.isSignIn !== undefined) {
      signInShown = props.isSignIn
    }

    this.state = {
      showSignInForm: signInShown,
      showSignUpForm: false,
      showForgotPasswordForm: false,
    }
  }

  componentDidMount () {
    ReactGA.pageview(this.props.location.pathname)
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

  toggleVisibleForm = (formToShow) => {

    if (formToShow === States.SIGNINFORM) {
      this.setState({
        showSignInForm: true,
        showSignUpForm: false,
        showForgotPasswordForm: false,
      })
      return;
    }

    if (formToShow === States.SIGNUPFORM) {
      this.setState({
        showSignInForm: false,
        showSignUpForm: true,
        showForgotPasswordForm: false,
      })
      return;
    }

    if (formToShow === States.FORGOTPASSWORDFORM) {
      this.setState({
        showSignInForm: false,
        showSignUpForm: false,
        showForgotPasswordForm: true,
      })
      return;
    }

    // default showing
    this.setState({
      showSignInForm: true,
      showSignUpForm: false,
      showForgotPasswordForm: false,
    })
  }

  render () {

    console.log(this.state)

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
        </div>
      </div>
    )
  }
}

export default SignInUpBox
