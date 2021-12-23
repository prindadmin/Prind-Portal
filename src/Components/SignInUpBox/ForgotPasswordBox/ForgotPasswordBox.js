import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from '../SignInUpBox.module.css'

// Data
import * as STRINGS from '../../../Data/Strings'
import * as States from '../../../States'
import * as ComponentStates from '../../ComponentStates'

// Components
//import CanUseWebP from '../../../Functions/CheckIfWebpSupported'

export class ForgotPasswordBox extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      state: ComponentStates.QUIESCENT,
      email: '',
      errorMessage: '',
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  resetPassword = (e) => {
    e.preventDefault();

    // Remove the error if it is showing
    this.setState({
      state: ComponentStates.LOADING,
      errorMessage: '',
    })

    // Request sign in
    this.props.resetPassword(this.state.email.toLowerCase(), this.passwordResetSuccessful, this.passwordResetFailed)
  }


  passwordResetSuccessful = (result) => {
    //console.log("password reset successful")
    this.setState({
      state: ComponentStates.FORGOT_PASSWORD_SUCCESS,
    })
  }


  passwordResetFailed = (result) => {
    //console.log(result)
    this.setState({
      state: ComponentStates.FORGOT_PASSWORD_FAILED,
      errorMessage: result.message,
    })
  }

  // TODO: FUTURE: Can we fake this test to show with and without webp version
  getLogo = () => {
    const logoLocation = "/images/logos/prin-d-logo-white.png"
    return (
      <React.Fragment>
        <div className="logo-container">
          <a href="https://prind.tech" target="_blank" rel="noopener noreferrer"><img src={logoLocation} alt="Prin-D Technology logo"></img></a>
        </div>
      </React.Fragment>
    )
  }

  getForgotPasswordForm = () => {
    return (
      <form id="forgot-password-form" className={classes.form} onSubmit={(e) => e.preventDefault()}>

        <label htmlFor='email'>{STRINGS.PLACEHOLDER_EMAIL}</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder={ STRINGS.PLACEHOLDER_EMAIL }
          value={this.state.email}
          onChange={this.handleInputChange}
          className={ this.state.email === '' ? "default" : "filled" }/>

        <input
          id="submit"
          type="submit"
          value={ STRINGS.BUTTON_SEND_PASSWORD_RESET_CODE }
          className={`${classes.button} ${classes.submitButton}`}
          onClick={(e) => this.resetPassword(e)}/>

        <div className='spacer' />

        <p id="sign-in-form-text" className="sign-up-in-text" onClick={(e) => this.props.toggleVisibleForm(States.SIGNINFORM)}>{STRINGS.ALREADY_HAVE_AN_ACCOUNT}</p>

      </form>
    )
  }

  getForgotPasswordFailed = () => {
    return(
      <React.Fragment>
        <div className='error-callout'>
          <p>{ this.state.errorMessage }</p>
        </div>
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
        <div className={`lds-ring ${classes.spinnerRing}`}><div></div><div></div><div></div><div></div></div>
      </React.Fragment>
    )
  }

  onPasswordSuccessClick = () => {
    if (process.env.REACT_APP_IS_PROCORE === "True") {
      window.open(encodeURI(process.env.REACT_APP_PROCORE_LOGIN_URL), "_self")
      return;
    }
    this.props.toggleVisibleForm(States.SIGNINFORM)
  }

  getForgotPasswordSuccess = () => {
    return (
      <div className='password-request-success'>
        <h3>{STRINGS.YOUR_CHANGE_PASSWORD_REQUEST_WAS_SUCCESS}</h3>
        <div className='spacer' />
        <input
          id="submit"
          type="submit"
          value={ STRINGS.ACCOUNT_BACK_TO_LOGIN_PAGE }
          className={`${classes.button} ${classes.submitButton}`}
          onClick={() => this.onPasswordSuccessClick()}/>
      </div>
    )
  }

  render () {
    return (
      <React.Fragment>
        { this.getLogo() }
        {
          this.state.state === ComponentStates.QUIESCENT ? this.getForgotPasswordForm() : null
        }
        {
          this.state.state === ComponentStates.LOADING ? this.getSpinner() : null
        }
        {
          this.state.state === ComponentStates.FORGOT_PASSWORD_FAILED ? this.getForgotPasswordFailed() : null
        }
        {
          this.state.state === ComponentStates.FORGOT_PASSWORD_SUCCESS ? this.getForgotPasswordSuccess() : null
        }
      </React.Fragment>
    )
  }
}
export default ForgotPasswordBox
