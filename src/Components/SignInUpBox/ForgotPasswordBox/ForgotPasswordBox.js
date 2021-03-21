import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data
import * as Strings from '../../../Data/Strings'
import * as States from '../../../States'
import * as ComponentState from '../States'

// Components
import { CanUseWebP } from '../../../Functions/CheckIfWebpSupported'

import {
  Callout,
} from '@blueprintjs/core'


export class ForgotPasswordBox extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      state: ComponentState.QUIESCENT,
      username: '',
      password: '',
      errorMessage: '',
    }
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
      state: ComponentState.LOADING,
      errorMessage: '',
    })

    // Request sign in
    this.props.resetPassword(e.target.elements.email.value.toLowerCase(), this.passwordResetSuccessful, this.passwordResetFailed)
  }


  passwordResetSuccessful = (result) => {
    console.log("password reset successful")
    this.setState({
      state: ComponentState.FORGOT_PASSWORD_SUCCESS,
    })
  }


  passwordResetFailed = (result) => {
    console.log(result)
    this.setState({
      state: ComponentState.FORGOT_PASSWORD_FAILED,
      errorMessage: result.message,
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

  getForgotPasswordForm = () => {
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

        <input
          type="submit"
          value={ Strings.BUTTON_SEND_PASSWORD_RESET_CODE }
          className="submit-button" />

        <div className='spacer' />

        <p className="sign-up-in-text" onClick={(e) => this.props.toggleVisibleForm(States.SIGNINFORM)}>{Strings.ALREADY_HAVE_AN_ACCOUNT}</p>

      </form>
    )
  }

  getForgotPasswordFailed = () => {
    return(
      <React.Fragment>
        <Callout style={{marginBottom: '15px'}} intent='danger'>
          <p>{ this.state.errorMessage }</p>
        </Callout>
        <div className='spacer' />
        {
          this.getForgotPasswordForm()
        }
      </React.Fragment>
    )
  }

  getSpinner = () => {
    return (
      <React.Fragment>
        <div className='lds-ring'><div></div><div></div><div></div><div></div></div>
      </React.Fragment>
    )
  }

  getForgotPasswordSuccess = () => {
    return (
      <div className='password-request-success'>
        <h3>{Strings.YOUR_CHANGE_PASSWORD_REQUEST_WAS_SUCCESS}</h3>
        <div className='spacer' />
        <input
          type="submit"
          value={ Strings.ACCOUNT_BACK_TO_LOGIN_PAGE }
          className="submit-button"
          onClick={() => this.props.toggleVisibleForm(States.SIGNINFORM)}/>
      </div>
    )
  }

  render () {

    console.log(this.state.state)

    return (
      <React.Fragment>
        { this.getLogo() }
        {
          this.state.state === ComponentState.QUIESCENT ? this.getForgotPasswordForm() : null
        }
        {
          this.state.state === ComponentState.LOADING ? this.getSpinner() : null
        }
        {
          this.state.state === ComponentState.FORGOT_PASSWORD_FAILED ? this.getForgotPasswordFailed() : null
        }
        {
          this.state.state === ComponentState.FORGOT_PASSWORD_SUCCESS ? this.getForgotPasswordSuccess() : null
        }
      </React.Fragment>
    )
  }
}
export default ForgotPasswordBox
