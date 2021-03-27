import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';
/*
import {
  Callout
} from '@blueprintjs/core'
*/
// Functions
import CanUseWebP from '../../../Functions/CheckIfWebpSupported'
import GetObjectFromParameters from '../../../Functions/GetObjectFromParameters'

import * as Endpoints from '../../../Data/Endpoints'
import * as Strings from '../../../Data/Strings'
import * as ComponentStates from '../../ComponentStates'

// TODO: Test error message

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
        errorMessage: Strings.PASSWORDS_DO_NOT_MATCH,
      })
      return;
    }

    //console.log(this.props.location.search)

    // TODO: Test this
    const query = GetObjectFromParameters(this.props.location.search)

    console.log(query)

    const values = {
      password,
      ...query
    }

    //console.log(values)

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
    const logoName = "/images/logos/buildingim-logo"
    const logoLocation = CanUseWebP ? `${logoName}.webp` : `${logoName}.png`

    return (
      <React.Fragment>
        <div className="logo-container">
          <a href="https://buildingim.com" target="_blank" rel="noopener noreferrer"><img src={logoLocation} alt="BuildingIM logo"></img></a>
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
        <h3>{Strings.YOUR_PASSWORD_WAS_SUCCESSFULLY_CHANGED}</h3>
        <input
          id="submit"
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
      <form id="reset-password-form" onSubmit={(e) => e.preventDefault()} className='sign-in-form form'>

        <input
          id="password"
          name="password"
          type="password"
          placeholder={ Strings.PLACEHOLDER_PASSWORD }
          value={this.state.password}
          onChange={this.handleInputChange}
          className={ this.state.password === '' ? "default" : "filled" }/>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder={ Strings.PLACEHOLDER_REPEAT_PASSWORD }
          value={this.state.confirmPassword}
          onChange={this.handleInputChange}
          className={ this.state.confirmPassword === '' ? "default" : "filled" }/>

        <div className='spacer' />

        <input
          id="submit"
          type="submit"
          value={ Strings.BUTTON_CHANGE_PASSWORD }
          className="submit-button"
          onClick={(e) => this.resetPassword(e)}/>

      </form>
    )
  }

  getResetPasswordFailed = () => {
    return (
      <React.Fragment>
        <div className='error-callout'>
          <div>
            { this.state.errorMessage }
          </div>
        </div>
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
          this.state.state === ComponentStates.PASSWORD_RESET_FAILED ? this.getResetPasswordFailed(): null
        }
      </React.Fragment>
    )
  }
}

export default ResetPassword
