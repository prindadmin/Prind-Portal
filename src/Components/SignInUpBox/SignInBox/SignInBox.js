import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data
import * as Strings from '../../../Data/Strings'
import * as States from '../../../States'

// Components
import { CanUseWebP } from '../../Common/CheckIfWebpSupported'

import {
  Callout,
} from '@blueprintjs/core'

// FUTURE: Make the "Click here" text change the mouse icon like a real link
// FUTURE: Add icons to username and password boxes

export class SignInBox extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      showSignInError: false,
      isSigningIn: false,
      username: '',
      password: '',
    }
  }

  componentDidMount () {
    this.props.init()
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  forgotPasswordClicked = () => {
    console.log("forgot password was clicked")
    this.props.toggleVisibleForm(States.FORGOTPASSWORDFORM)
  }


  signIn = (e) => {
    e.preventDefault();

    const userDetails = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    }

    // Remove the error if it is showing
    this.setState({
      showErrorSigningIn: false,
      isSigningIn: true,
    })

    // Lower the case of the email address to ensure it is always lower case
    userDetails.email = userDetails.email.toLowerCase()

    // Request sign in
    this.props.signIn(userDetails, this.signInSuccessful, this.signInFailed)
  }


  signInSuccessful = (result) => {
    console.log("sign in successful")
    this.props.history.push(this.props.user.currentRoute)
  }


  signInFailed = (result) => {
    console.log(result)
    // TODO: Implement sign in message
    this.setState({
        showErrorSigningIn: true,
        isSigningIn: false,
    })
  }

  getLogo = () => {
    const logoLocation = CanUseWebP ? "/images/logos/prind-tech-logo.webp" : "/images/logos/prind-tech-logo.png"

    return (
      <React.Fragment>
        <div className="logo-container">
          <a href="https://prind.tech" target="_blank" rel="noopener noreferrer"><img src={logoLocation} alt="Prin D Tech logo"></img></a>
        </div>
        <div className="welcome-text-heading">
          { Strings.WELCOME_TEXT }
        </div>
        <div className="welcome-text-body">
          { Strings.PLEASE_SIGN_IN_TEXT }
        </div>
      </React.Fragment>
    )
  }

  // TODO: Add in signing in spinner
  getLoadingSpinner = () => {
    return (
      <React.Fragment>
        <div className='lds-ring'><div></div><div></div><div></div><div></div></div>
      </React.Fragment>
    )
  }

  getSignInForm = () => {
    return (
      <form className="sign-in-form form" onSubmit={this.signIn}>

        <input
          id="email"
          name="email"
          type="text"
          placeholder={ Strings.PLACEHOLDER_EMAIL }
          value={this.state.email}
          onChange={this.handleInputChange}
          className={ this.state.email === null ? "default" : "filled" }/>

        <input
          id="password"
          name="password"
          type="password"
          placeholder={ Strings.PLACEHOLDER_PASSWORD }
          value={this.state.password}
          onChange={this.handleInputChange}
          className={ this.state.password === null ? "default" : "filled" }/>

        <p className="forgot-your-password-text" onClick={this.forgotPasswordClicked}>{Strings.BUTTON_FORGOT_PASSWORD}</p>

        <div className='spacer' />
        {
          this.state.showErrorSigningIn ?
          <Callout style={{marginBottom: '15px'}} intent='danger'>
            <p>{ this.props.auth.error.message }</p>
          </Callout> :
          null
        }

        <input
          type="submit"
          value={ Strings.BUTTON_LOGIN }
          className="submit-button" />

        <div className='spacer' />

        <p className="sign-up-in-text" onClick={(e) => this.props.toggleVisibleForm(States.SIGNUPFORM)}>{Strings.DONT_HAVE_AN_ACCOUNT}</p>

      </form>
    )
  }


  render () {
    return (
      <React.Fragment>
        { this.getLogo() }
        {
          this.state.isSigningIn ? this.getLoadingSpinner() : this.getSignInForm()
        }
      </React.Fragment>
    )
  }
}
export default SignInBox
