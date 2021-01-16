import React, { Component } from 'react'
import qs from 'stringquery'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import {
  Callout
} from '@blueprintjs/core'

// Components
import { CanUseWebP } from '../../Common/CheckIfWebpSupported'

import ItemIcon from '../../Common/ItemIcon'
import * as Endpoints from '../../../Data/Endpoints'
import * as Strings from '../../../Data/Strings'
import * as ComponentState from '../States'

// TODO: Test error message

class ResetPassword extends Component {
  static propTypes = {
    toggleVisibleForm: PropTypes.func.isRequired,
    setNewPassword: PropTypes.func.isRequired,
    init: PropTypes.func,
    history: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      password: '',
      confirmPassword: '',
      errorMessage: '',
      state: ComponentState.QUIESCENT,
    }
  }

  componentDidMount () {
    // Register pageview with GA
    ReactGA.pageview(this.props.location.pathname);
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

    const confirmPassword =  e.target.elements.confirmPassword.value
    const password = e.target.elements.password.value

    // If passwords do not match
    if (password !== confirmPassword) {
      this.setState({
        state: ComponentState.PASSWORD_RESET_FAILED,
        errorMessage: Strings.PASSWORDS_DO_NOT_MATCH,
      })
      return;
    }

    const query = qs(this.props.location.search)

    console.log(query)

    const values = {
      password,
      ...query
    }

    console.log(values)

    this.setState({
      state: ComponentState.LOADING,
      errorMessage: ''
    })

    this.props.setNewPassword(values, this.passwordResetSuccess, this.passwordResetFailed)
  }

  passwordResetSuccess = (result) => {
    console.log(result)
    this.setState({
      state: ComponentState.PASSWORD_RESET_SUCCESS,
    })
  }

  passwordResetFailed = (result) => {
    console.log(result)
    this.setState({
      state: ComponentState.PASSWORD_RESET_FAILED,
      errorMessage: result.message,
    })
  }

  getLogo = () => {
    const logoName = "/images/logos/prind-tech-logo"
    const logoLocation = CanUseWebP ? `${logoName}.webp` : `${logoName}.png`

    return (
      <React.Fragment>
        <div className="logo-container">
          <a href="https://prind.tech" target="_blank" rel="noopener noreferrer"><img src={logoLocation} alt="Prin D Tech logo"></img></a>
        </div>
        <div className="welcome-text-heading">
          { Strings.WELCOME_TEXT }
        </div>
        <div className="welcome-text-body">
          { Strings.ENTER_A_NEW_PASSWORD }
        </div>
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

  getSuccess = () => {
    const style = {
      textAlign: 'center'
    }
    return (
      <div className='auth-form' style={style}>
        <ItemIcon size='8x' type='lock' />
        <h3>{Strings.YOUR_PASSWORD_WAS_SUCCESSFULLY_CHANGED}</h3>
        <input
          type="submit"
          value={ Strings.ACCOUNT_BACK_TO_LOGIN_PAGE }
          className="submit-button"
          onClick={() => {this.props.history.push(Endpoints.SIGNINPAGE)}}/>
        />
      </div>
    )
  }

  getResetPassword = () => {
    return (
      <form onSubmit={this.resetPassword} className='sign-in-form form'>

        <input
          id="password"
          name="password"
          type="password"
          placeholder={ Strings.PLACEHOLDER_PASSWORD }
          value={this.state.password}
          onChange={this.handleInputChange}
          className={ this.state.password === null ? "default" : "filled" }/>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder={ Strings.PLACEHOLDER_REPEAT_PASSWORD }
          value={this.state.confirmPassword}
          onChange={this.handleInputChange}
          className={ this.state.confirmPassword === null ? "default" : "filled" }/>

        <div className='spacer' />

        <input
          type="submit"
          value={ Strings.BUTTON_CHANGE_PASSWORD }
          className="submit-button" />

      </form>
    )
  }

  getResetPasswordFailed = () => {
    return (
      <React.Fragment>
        <Callout style={{marginBottom: '15px'}} intent='danger'>
          <div>
            { this.state.errorMessage }
          </div>
        </Callout>
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
          this.state.state === ComponentState.QUIESCENT ? this.getResetPassword() :  null
        }
        {
          this.state.state === ComponentState.LOADING ? this.getSpinner() : null
        }
        {
          this.state.state === ComponentState.PASSWORD_RESET_SUCCESS ? this.getSuccess() : null
        }
        {
          this.state.state === ComponentState.PASSWORD_RESET_FAILED ? this.getResetPasswordFailed(): null
        }
      </React.Fragment>
    )
  }
}

export default ResetPassword
