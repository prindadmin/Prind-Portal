import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from '../SignInUpBox.module.css'

import ReactGA from 'react-ga';
/*
import {
  Callout
} from '@blueprintjs/core'
*/
// Functions
//import CanUseWebP from '../../../Functions/CheckIfWebpSupported'
import GetObjectFromParameters from '../../../Functions/GetObjectFromParameters'

import * as Endpoints from '../../../Data/Endpoints'
import * as STRINGS from '../../../Data/Strings'
import * as ComponentStates from '../../ComponentStates'

// TODO: FUTURE: Test error message

class ResetPassword extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
    setNewPassword: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired
  }

  constructor() {
    super()
    this.state = {
      password: '',
      confirmPassword: '',
      errorMessage: '',
      state: ComponentStates.QUIESCENT,
    }
  }

  componentDidMount () {
    // Register pageview with GA
    ReactGA.pageview(this.props.location.pathname);
  }

  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  resetPassword = (e) => {
    e.preventDefault();

    const confirmPassword =  this.state.confirmPassword
    const password = this.state.password

    // If passwords do not match
    if (password !== confirmPassword) {
      this.setState({
        state: ComponentStates.PASSWORD_RESET_FAILED,
        errorMessage: STRINGS.PASSWORDS_DO_NOT_MATCH,
      })
      return;
    }

    const query = GetObjectFromParameters(this.props.location.search)

    const values = {
      password,
      ...query
    }

    this.setState({
      state: ComponentStates.LOADING,
      errorMessage: ''
    })

    this.props.setNewPassword(values, this.passwordResetSuccess, this.passwordResetFailed)
  }

  passwordResetSuccess = (result) => {
    //console.log(result)
    this.setState({
      state: ComponentStates.PASSWORD_RESET_SUCCESS,
    })
  }

  passwordResetFailed = (result) => {
    //console.log(result)
    this.setState({
      state: ComponentStates.PASSWORD_RESET_FAILED,
      errorMessage: result.message,
    })
  }

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

  getSpinner = () => {
    return (
      <React.Fragment>
        <div className={`lds-ring ${classes.spinnerRing}`}><div></div><div></div><div></div><div></div></div>
      </React.Fragment>
    )
  }

  getSuccess = () => {
    return (
      <div className='auth-form'>
        <h3 style={{ marginBottom: "2em" }}>{STRINGS.YOUR_PASSWORD_WAS_SUCCESSFULLY_CHANGED}</h3>
        <input
          id="submit"
          type="submit"
          value={ STRINGS.ACCOUNT_BACK_TO_LOGIN_PAGE }
          className={`${classes.button} ${classes.submitButton}`}
          onClick={() => {this.props.history.push(Endpoints.SIGNINPAGE)}} />
      </div>
    )
  }

  getResetPassword = () => {
    return (
      <form id="reset-password-form" onSubmit={(e) => e.preventDefault()} className={classes.form}>

        <label htmlFor='password'>{STRINGS.PLACEHOLDER_PASSWORD}</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder={ STRINGS.PLACEHOLDER_PASSWORD }
          value={this.state.password}
          onChange={this.handleInputChange}
          className={ this.state.password === '' ? "default" : "filled" }/>

        <label htmlFor='password'>{STRINGS.PLACEHOLDER_REPEAT_PASSWORD}</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder={ STRINGS.PLACEHOLDER_REPEAT_PASSWORD }
          value={this.state.confirmPassword}
          onChange={this.handleInputChange}
          className={ this.state.confirmPassword === '' ? "default" : "filled" }/>

        {
          this.state.state === ComponentStates.PASSWORD_RESET_FAILED ?
          <div className={classes.errorText}>
            <div>
              { this.state.errorMessage }
            </div>
          </div> : null
        }

        <input
          id="submit"
          type="submit"
          value={ STRINGS.BUTTON_CHANGE_PASSWORD }
          className={`${classes.button} ${classes.submitButton}`}
          onClick={(e) => this.resetPassword(e)}/>

      </form>
    )
  }

  getResetPasswordFailed = () => {
    return (
      <React.Fragment>
        {
          this.getResetPassword()
        }
      </React.Fragment>
    )
  }

  render () {
    return (
      <React.Fragment>
        { this.getLogo() }
        {
          this.state.state === ComponentStates.QUIESCENT ? this.getResetPassword() :  null
        }
        {
          this.state.state === ComponentStates.LOADING ? this.getSpinner() : null
        }
        {
          this.state.state === ComponentStates.PASSWORD_RESET_SUCCESS ? this.getSuccess() : null
        }
        {
          this.state.state === ComponentStates.PASSWORD_RESET_FAILED ? this.getResetPasswordFailed() : null
        }
      </React.Fragment>
    )
  }
}

export default ResetPassword
