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

// TODO: make this stay on screen once reset is sent

export class ForgotPasswordBox extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      showSignInError: false,
      username: '',
      password: '',
    }
  }

  componentDidUpdate() {
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  resetPassword = (e) => {
    e.preventDefault();

    // Remove the error if it is showing
    this.setState({
      showErrorSigningIn: false,
    })

    // Request sign in
    this.props.resetPassword(e.target.elements.email.value.toLowerCase(), this.passwordResetSuccessful, this.passwordResetFailed)
  }


  passwordResetSuccessful = (result) => {
    console.log("password reset successful")
    this.props.history.push(this.props.user.currentRoute)
  }


  passwordResetFailed = (result) => {
    console.log(result)
    this.setState({
        showErrorSigningIn: true,
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
          { Strings.PLEASE_FILL_IN_EMAIL_TO_RESET_PASSWORD }
        </div>
      </React.Fragment>
    )
  }

  getSignInForm = () => {
    return (
      <form className="sign-in-form form" onSubmit={this.resetPassword}>

        <input
          id="email"
          name="email"
          type="text"
          placeholder={ Strings.PLACEHOLDER_EMAIL }
          value={this.state.email}
          onChange={this.handleInputChange}
          className={ this.state.email === null ? "default" : "filled" }/>


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
          value={ Strings.BUTTON_SEND_PASSWORD_RESET_CODE }
          className="submit-button" />

        <div className='spacer' />

        <p className="sign-up-in-text" onClick={(e) => this.props.toggleVisibleForm(States.SIGNINFORM)}>{Strings.ALREADY_HAVE_AN_ACCOUNT}</p>

      </form>
    )
  }


  render () {
    return (
      <React.Fragment>
        { this.getLogo() }
        { this.getSignInForm() }
      </React.Fragment>
    )
  }
}
export default ForgotPasswordBox
